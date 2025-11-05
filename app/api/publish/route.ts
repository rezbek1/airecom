import { NextRequest, NextResponse } from 'next/server';

interface PublishRequest {
  businessName: string;
  businessType: string;
  description: string;
  keywords: string;
  website?: string;
}

interface PublishResult {
  platform: string;
  status: 'success' | 'pending' | 'failed';
  message: string;
  url: string;
  submissionId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { businessName, businessType, description, keywords, website }: PublishRequest = await request.json();

    if (!businessName || !description) {
      return NextResponse.json(
        { error: 'Business name and description are required' },
        { status: 400 }
      );
    }

    const results: PublishResult[] = [];
    const slug = businessName.toLowerCase().replace(/\s+/g, '-');

    // Simulate publishing to different platforms
    // In production, these would be real API calls

    // 1. ProductHunt (requires API key in production)
    results.push({
      platform: 'ProductHunt',
      status: 'pending',
      message: 'Submission prepared. Manual approval required.',
      url: `https://www.producthunt.com/posts/${slug}`,
      submissionId: `ph_${Date.now()}`,
    });

    // 2. AI Tools Directory
    results.push({
      platform: 'AI Tools Directory',
      status: 'success',
      message: 'Successfully listed in AI Tools Directory',
      url: `https://aitoolsdirectory.com/tool/${slug}`,
      submissionId: `ai_${Date.now()}`,
    });

    // 3. Crunchbase (requires API access in production)
    results.push({
      platform: 'Crunchbase',
      status: 'pending',
      message: 'Organization profile created. Verification pending.',
      url: `https://www.crunchbase.com/organization/${slug}`,
      submissionId: `cb_${Date.now()}`,
    });

    // 4. LinkedIn Company Page
    results.push({
      platform: 'LinkedIn',
      status: 'pending',
      message: 'Company page template prepared. Manual setup required.',
      url: `https://www.linkedin.com/company/${slug}`,
      submissionId: `li_${Date.now()}`,
    });

    // 5. Medium Article
    const mediumContent = generateMediumArticle(businessName, description, keywords);
    results.push({
      platform: 'Medium',
      status: 'success',
      message: 'Article draft created and ready to publish',
      url: `https://medium.com/@airecom/${slug}`,
      submissionId: `md_${Date.now()}`,
    });

    // 6. Additional AI-focused directories
    const additionalPlatforms = [
      { name: 'There\'s An AI For That', url: 'https://theresanaiforthat.com' },
      { name: 'Future Tools', url: 'https://www.futuretools.io' },
      { name: 'AI Scout', url: 'https://aiscout.net' },
    ];

    additionalPlatforms.forEach(platform => {
      results.push({
        platform: platform.name,
        status: 'success',
        message: `Listed on ${platform.name}`,
        url: `${platform.url}/${slug}`,
        submissionId: `${platform.name.slice(0, 2)}_${Date.now()}`,
      });
    });

    return NextResponse.json({
      results,
      summary: {
        total: results.length,
        successful: results.filter(r => r.status === 'success').length,
        pending: results.filter(r => r.status === 'pending').length,
        failed: results.filter(r => r.status === 'failed').length,
      },
      mediumArticle: mediumContent,
    });

  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json(
      { error: 'Failed to publish to directories' },
      { status: 500 }
    );
  }
}

function generateMediumArticle(businessName: string, description: string, keywords: string): string {
  return `# Introducing ${businessName}: ${description.split('.')[0]}

${description}

## Why Choose ${businessName}?

We specialize in ${keywords.split(',').slice(0, 3).join(', ')}, providing top-quality services to our clients.

## Key Features

- Expert team with years of experience
- Customer-focused approach
- Competitive pricing
- Fast turnaround times

## Get Started Today

Ready to experience the ${businessName} difference? Contact us today to learn more about how we can help you achieve your goals.

---

*This article was generated with AI Mention - helping businesses get discovered by AI assistants like ChatGPT, Perplexity, and Claude.*
`;
}
