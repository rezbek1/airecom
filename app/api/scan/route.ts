import { NextRequest, NextResponse } from 'next/server';

interface ScanResult {
  score: number;
  issues: string[];
  recommendations: string[];
  hasSchema: boolean;
  hasMeta: boolean;
  loadSpeed: 'fast' | 'medium' | 'slow';
  platforms: {
    chatgpt: { visible: boolean; score: number };
    perplexity: { visible: boolean; score: number };
    googleAI: { visible: boolean; score: number };
    claude: { visible: boolean; score: number };
  };
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch website content
    let hasSchema = false;
    let hasMeta = false;
    let loadSpeed: 'fast' | 'medium' | 'slow' = 'medium';
    let issues: string[] = [];
    let recommendations: string[] = [];

    try {
      const startTime = Date.now();
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; AIRecom/1.0; +https://airecom.vercel.app)',
        },
        signal: AbortSignal.timeout(10000), // 10s timeout
      });

      const loadTime = Date.now() - startTime;
      const html = await response.text();

      // Check load speed
      if (loadTime < 1000) loadSpeed = 'fast';
      else if (loadTime > 3000) loadSpeed = 'slow';

      // Check for Schema.org markup
      hasSchema = html.includes('schema.org') || html.includes('"@type"');

      // Check for meta tags
      hasMeta = html.includes('<meta name="description"') &&
                html.includes('<title>');

      // Analyze issues
      if (!hasSchema) {
        issues.push('No Schema.org markup found');
        recommendations.push('Add Schema.org structured data (LocalBusiness, Organization, etc.)');
      }

      if (!hasMeta) {
        issues.push('Missing essential meta tags');
        recommendations.push('Add meta description and proper title tags optimized for AI');
      }

      if (loadSpeed === 'slow') {
        issues.push('Slow loading speed detected');
        recommendations.push('Optimize images and enable caching to improve load times');
      }

      if (!html.includes('og:title')) {
        issues.push('Missing Open Graph tags');
        recommendations.push('Add Open Graph meta tags for better social sharing');
      }

      if (!html.includes('robots')) {
        issues.push('No robots meta tag found');
        recommendations.push('Add robots meta tag to control AI crawler access');
      }

    } catch (fetchError) {
      issues.push('Unable to fetch website content');
      recommendations.push('Ensure website is accessible and not blocking automated requests');
    }

    // Check AI platform visibility (simulated for MVP)
    // In production, you'd call actual AI APIs or use specialized tools
    const platforms = {
      chatgpt: {
        visible: hasSchema && hasMeta,
        score: hasSchema && hasMeta ? 75 : 30,
      },
      perplexity: {
        visible: hasSchema,
        score: hasSchema ? 80 : 25,
      },
      googleAI: {
        visible: hasMeta && loadSpeed !== 'slow',
        score: hasMeta && loadSpeed !== 'slow' ? 70 : 35,
      },
      claude: {
        visible: hasSchema || hasMeta,
        score: (hasSchema ? 40 : 0) + (hasMeta ? 35 : 0),
      },
    };

    // Calculate overall score
    const platformScores = Object.values(platforms).map(p => p.score);
    const avgPlatformScore = platformScores.reduce((a, b) => a + b, 0) / platformScores.length;

    let score = Math.round(avgPlatformScore);
    if (loadSpeed === 'fast') score += 10;
    if (issues.length === 0) score = Math.min(100, score + 15);

    const result: ScanResult = {
      score: Math.min(100, Math.max(0, score)),
      issues,
      recommendations,
      hasSchema,
      hasMeta,
      loadSpeed,
      platforms,
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Scan error:', error);
    return NextResponse.json(
      { error: 'Failed to scan website' },
      { status: 500 }
    );
  }
}
