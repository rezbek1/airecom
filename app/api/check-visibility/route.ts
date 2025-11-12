/**
 * API Endpoint: /api/check-visibility
 * Главный endpoint для проверки видимости сайта в AI-системах
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  parseWebsite,
  checkRobotsTxt,
  checkLLMsTxt,
  generateRecommendations,
} from '@/lib/parser';
import {
  checkAllAI,
  calculateVisibilityScore,
} from '@/lib/ai-client';
import { Language } from '@/lib/prompts';
import {
  saveCheck,
  checkRateLimit,
  checkPremiumStatus,
} from '@/lib/firebase-client';

interface CheckVisibilityRequest {
  url: string;
  language?: Language;
  email?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckVisibilityRequest = await request.json();

    console.log('[CHECK-VISIBILITY] Received request:', { url: body.url, language: body.language, email: body.email });

    // Validate input
    if (!body.url) {
      console.error('[CHECK-VISIBILITY] URL is missing');
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(body.url);
    } catch (e) {
      console.error('[CHECK-VISIBILITY] Invalid URL format:', body.url, e);
      return NextResponse.json(
        { error: 'Invalid URL format. Please include http:// or https://' },
        { status: 400 }
      );
    }

    const url = body.url;
    const language: Language = body.language || 'he';
    const email = body.email || null;

    // Check if user is Premium
    const isPremium = email ? await checkPremiumStatus(email) : false;

    // Check rate limit for Freemium users
    if (!isPremium) {
      const rateLimit = await checkRateLimit(email);
      if (!rateLimit.allowed) {
        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            message: 'Freemium users limited to 5 checks per hour',
            remaining: rateLimit.remaining,
            resetIn: rateLimit.resetIn,
            upgradeUrl: process.env.PAYMENT_LINK_URL,
          },
          { status: 429 }
        );
      }
    }

    console.log(`[CHECK-VISIBILITY] Starting check for: ${url} (${language})`);

    // Step 1: Parse website
    console.log('[STEP 1] Parsing website...');
    const parsedData = await parseWebsite(url);

    // Step 2: Check robots.txt and llms.txt
    console.log('[STEP 2] Checking robots.txt and llms.txt...');
    const [robotsCheck, llmsCheck] = await Promise.all([
      checkRobotsTxt(url),
      checkLLMsTxt(url),
    ]);

    // Step 3: Check AI visibility across all platforms
    console.log('[STEP 3] Checking AI visibility...');
    const results = await checkAllAI(
      parsedData,
      language,
      (platform, result) => {
        console.log(`[AI-CHECK] ${platform}: mentioned=${result.mentioned}, confidence=${result.confidence}`);
      }
    );

    // Step 4: Calculate visibility score
    console.log('[STEP 4] Calculating visibility score...');
    const visibilityScore = calculateVisibilityScore(results);

    // Step 5: Generate recommendations
    console.log('[STEP 5] Generating recommendations...');
    const recommendations = generateRecommendations(
      parsedData,
      robotsCheck,
      llmsCheck
    );

    // Step 6: Save to Firebase
    console.log('[STEP 6] Saving to database...');
    const checkId = await saveCheck({
      siteUrl: url,
      email,
      isPremium,
      language,
      parsedData,
      robotsCheck,
      llmsCheck,
      results,
      visibilityScore,
      recommendations,
    });

    // Build response based on Premium status
    const response = {
      success: true,
      checkId,
      siteUrl: url,
      visibilityScore,
      parsedData: {
        businessName: parsedData.businessName,
        businessType: parsedData.businessType,
        description: parsedData.description,
      },
      robotsCheck: {
        exists: robotsCheck.exists,
        compatible: robotsCheck.compatible,
        message: robotsCheck.message,
      },
      llmsCheck: {
        exists: llmsCheck.exists,
        compatible: llmsCheck.compatible,
        message: llmsCheck.message,
      },
      results: {
        // Freemium: только mentioned (yes/no)
        // Premium: mentioned + position + context
        claude: {
          mentioned: results.claude.mentioned,
          position: isPremium ? results.claude.position : null,
          context: isPremium ? results.claude.context : null,
          confidence: results.claude.confidence,
        },
        chatgpt: {
          mentioned: results.chatgpt.mentioned,
          position: isPremium ? results.chatgpt.position : null,
          context: isPremium ? results.chatgpt.context : null,
          confidence: results.chatgpt.confidence,
        },
        perplexity: {
          mentioned: results.perplexity.mentioned,
          position: isPremium ? results.perplexity.position : null,
          context: isPremium ? results.perplexity.context : null,
          confidence: results.perplexity.confidence,
        },
        grok: {
          mentioned: results.grok.mentioned,
          position: isPremium ? results.grok.position : null,
          context: isPremium ? results.grok.context : null,
          confidence: results.grok.confidence,
        },
        gemini: {
          mentioned: results.gemini.mentioned,
          position: isPremium ? results.gemini.position : null,
          context: isPremium ? results.gemini.context : null,
          confidence: results.gemini.confidence,
        },
      },
      recommendations: {
        priority: recommendations.priority,
        ...(isPremium && {
          robots_txt_template: recommendations.robots_txt_template,
          llms_txt_template: recommendations.llms_txt_template,
        }),
      },
      isPremium,
      timestamp: Date.now(),
    };

    console.log(`[CHECK-VISIBILITY] Check completed: ${checkId}, score: ${visibilityScore}`);

    return NextResponse.json(response);
  } catch (error) {
    console.error('[CHECK-VISIBILITY] Error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS (if needed)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
