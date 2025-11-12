/**
 * Website Parser - парсит сайты для извлечения метаданных
 * Извлекает: H1, meta description, keywords, business type, robots.txt
 */

import * as cheerio from 'cheerio';

export interface ParsedWebsiteData {
  businessName: string;
  businessType: 'restaurant' | 'accounting' | 'consulting' | 'retail' | 'services' | 'other';
  description: string;
  keywords: string[];
  h1: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  hasSchema: boolean;
  url: string;
}

export interface RobotsCheck {
  exists: boolean;
  compatible: boolean;
  message: string;
  content?: string;
}

export interface LLMsCheck {
  exists: boolean;
  compatible: boolean;
  message: string;
  content?: string;
}

/**
 * Парсит HTML сайта и извлекает метаданные
 */
export async function parseWebsite(url: string): Promise<ParsedWebsiteData> {
  try {
    // Fetch website HTML
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'AIRecom Bot/1.0 (+https://airecom.vercel.app)',
      },
      signal: AbortSignal.timeout(10000), // 10 seconds timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract meta data
    const h1 = $('h1').first().text().trim();
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const keywords = $('meta[name="keywords"]').attr('content')?.split(',').map(k => k.trim()) || [];
    const ogTitle = $('meta[property="og:title"]').attr('content');
    const ogDescription = $('meta[property="og:description"]').attr('content');

    // Check for Schema.org structured data
    const hasSchema = $('script[type="application/ld+json"]').length > 0;

    // Business name detection
    const businessName = ogTitle || h1 || $('title').text().trim() || new URL(url).hostname;

    // Business type detection
    const bodyText = $('body').text().toLowerCase();
    const businessType = detectBusinessType(bodyText, keywords);

    // Description
    const description = metaDescription || ogDescription ||
                       $('p').first().text().trim().slice(0, 200) ||
                       'No description available';

    return {
      businessName,
      businessType,
      description,
      keywords,
      h1,
      metaDescription,
      ogTitle,
      ogDescription,
      hasSchema,
      url,
    };
  } catch (error) {
    console.error('Error parsing website:', error);
    throw new Error(`Failed to parse website: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Проверяет robots.txt
 */
export async function checkRobotsTxt(url: string): Promise<RobotsCheck> {
  try {
    const robotsUrl = new URL('/robots.txt', url).href;
    const response = await fetch(robotsUrl, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return {
        exists: false,
        compatible: false,
        message: 'robots.txt not found - recommend creating one',
      };
    }

    const content = await response.text();

    // Check if AI bots are allowed
    const blocksChatGPT = content.toLowerCase().includes('gptbot') && content.toLowerCase().includes('disallow');
    const blocksClaude = content.toLowerCase().includes('claudebot') && content.toLowerCase().includes('disallow');
    const blocksAll = content.includes('User-agent: *') && content.toLowerCase().includes('disallow: /');

    if (blocksChatGPT || blocksClaude || blocksAll) {
      return {
        exists: true,
        compatible: false,
        message: 'robots.txt blocks AI crawlers - this reduces AI visibility',
        content,
      };
    }

    return {
      exists: true,
      compatible: true,
      message: 'robots.txt found and AI-friendly',
      content,
    };
  } catch (error) {
    return {
      exists: false,
      compatible: false,
      message: 'Could not check robots.txt',
    };
  }
}

/**
 * Проверяет llms.txt (AI-specific content file)
 */
export async function checkLLMsTxt(url: string): Promise<LLMsCheck> {
  try {
    const llmsUrl = new URL('/llms.txt', url).href;
    const response = await fetch(llmsUrl, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return {
        exists: false,
        compatible: false,
        message: 'llms.txt not found - this is optional but recommended for AI optimization',
      };
    }

    const content = await response.text();

    return {
      exists: true,
      compatible: true,
      message: 'llms.txt found - excellent AI optimization!',
      content,
    };
  } catch (error) {
    return {
      exists: false,
      compatible: false,
      message: 'llms.txt not found',
    };
  }
}

/**
 * Определяет тип бизнеса на основе контента сайта
 */
function detectBusinessType(
  bodyText: string,
  keywords: string[]
): 'restaurant' | 'accounting' | 'consulting' | 'retail' | 'services' | 'other' {
  const text = bodyText + ' ' + keywords.join(' ');

  // Restaurant keywords
  if (
    text.includes('restaurant') ||
    text.includes('menu') ||
    text.includes('food') ||
    text.includes('dining') ||
    text.includes('cuisine') ||
    text.includes('ресторан') ||
    text.includes('меню') ||
    text.includes('מסעדה')
  ) {
    return 'restaurant';
  }

  // Accounting keywords
  if (
    text.includes('accounting') ||
    text.includes('bookkeeping') ||
    text.includes('tax') ||
    text.includes('cpa') ||
    text.includes('бухгалтер') ||
    text.includes('налог') ||
    text.includes('חשבונאות') ||
    text.includes('רואה חשבון')
  ) {
    return 'accounting';
  }

  // Consulting keywords
  if (
    text.includes('consulting') ||
    text.includes('consultant') ||
    text.includes('advisory') ||
    text.includes('strategy') ||
    text.includes('консалтинг') ||
    text.includes('консультант') ||
    text.includes('ייעוץ')
  ) {
    return 'consulting';
  }

  // Retail keywords
  if (
    text.includes('shop') ||
    text.includes('store') ||
    text.includes('retail') ||
    text.includes('ecommerce') ||
    text.includes('магазин') ||
    text.includes('חנות')
  ) {
    return 'retail';
  }

  // Services keywords
  if (
    text.includes('service') ||
    text.includes('услуг') ||
    text.includes('שירות')
  ) {
    return 'services';
  }

  return 'other';
}

/**
 * Генерирует рекомендации на основе парсинга
 */
export function generateRecommendations(
  parsed: ParsedWebsiteData,
  robotsCheck: RobotsCheck,
  llmsCheck: LLMsCheck
): {
  priority: string[];
  robots_txt_template?: string;
  llms_txt_template?: string;
  schema_org_needed: boolean;
} {
  const recommendations: string[] = [];

  // Check Schema.org
  if (!parsed.hasSchema) {
    recommendations.push('Add Schema.org structured data');
  }

  // Check meta description
  if (!parsed.metaDescription || parsed.metaDescription.length < 120) {
    recommendations.push('Improve meta description (120-160 characters)');
  }

  // Check robots.txt
  if (!robotsCheck.exists || !robotsCheck.compatible) {
    recommendations.push('Create AI-friendly robots.txt');
  }

  // Check llms.txt
  if (!llmsCheck.exists) {
    recommendations.push('Create llms.txt for AI optimization');
  }

  // Generate templates
  const robots_txt_template = !robotsCheck.compatible ?
    `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${parsed.url}/sitemap.xml` : undefined;

  const llms_txt_template = !llmsCheck.exists ?
    `# ${parsed.businessName}

## About
${parsed.description}

## Services
[Add your main services here]

## Contact
Website: ${parsed.url}

## Keywords
${parsed.keywords.join(', ')}` : undefined;

  return {
    priority: recommendations,
    robots_txt_template,
    llms_txt_template,
    schema_org_needed: !parsed.hasSchema,
  };
}
