/**
 * AI Client - интеграция с Claude и ChatGPT
 * Проверяет видимость сайта в AI-системах
 */

import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { generateVisibilityPrompt, parseAIResponse, validateAIMention, Language } from './prompts';
import { ParsedWebsiteData } from './parser';

export interface AICheckResult {
  mentioned: boolean;
  position: number | null;
  context: string | null;
  confidence: number;
  rawResponse?: string;
  error?: string;
}

/**
 * Проверяет видимость сайта через Claude
 */
export async function checkClaude(
  websiteData: ParsedWebsiteData,
  language: Language = 'he'
): Promise<AICheckResult> {
  try {
    // Temporarily disabled - model not available
    console.log('[Claude] Temporarily disabled due to model availability issues');
    return {
      mentioned: false,
      position: null,
      context: null,
      confidence: 0,
      error: 'Claude temporarily disabled',
    };

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return {
        mentioned: false,
        position: null,
        context: null,
        confidence: 0,
        error: 'ANTHROPIC_API_KEY not configured',
      };
    }

    const anthropic = new Anthropic({ apiKey });

    const prompt = generateVisibilityPrompt(websiteData, language);

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      temperature: 0.3, // Lower temperature for more consistent results
      system: prompt.systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt.userPrompt,
        },
      ],
    });

    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block: any) => block.text)
      .join('\n');

    // Parse response
    const parsed = parseAIResponse(responseText, websiteData.url);

    // Validate mention
    const validation = validateAIMention(responseText, websiteData.url, websiteData);

    if (!validation.isValid) {
      return {
        mentioned: false,
        position: null,
        context: null,
        confidence: 0,
        rawResponse: responseText,
        error: validation.reason,
      };
    }

    return {
      ...parsed,
      rawResponse: responseText,
    };
  } catch (error) {
    console.error('Claude API error:', error);
    return {
      mentioned: false,
      position: null,
      context: null,
      confidence: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Проверяет видимость сайта через ChatGPT
 */
export async function checkChatGPT(
  websiteData: ParsedWebsiteData,
  language: Language = 'he'
): Promise<AICheckResult> {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return {
        mentioned: false,
        position: null,
        context: null,
        confidence: 0,
        error: 'OPENAI_API_KEY not configured',
      };
    }

    const openai = new OpenAI({ apiKey });

    const prompt = generateVisibilityPrompt(websiteData, language);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Latest GPT-4 model
      messages: [
        {
          role: 'system',
          content: prompt.systemPrompt,
        },
        {
          role: 'user',
          content: prompt.userPrompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const responseText = completion.choices[0]?.message?.content || '';

    // Parse response
    const parsed = parseAIResponse(responseText, websiteData.url);

    // Validate mention
    const validation = validateAIMention(responseText, websiteData.url, websiteData);

    if (!validation.isValid) {
      return {
        mentioned: false,
        position: null,
        context: null,
        confidence: 0,
        rawResponse: responseText,
        error: validation.reason,
      };
    }

    return {
      ...parsed,
      rawResponse: responseText,
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    return {
      mentioned: false,
      position: null,
      context: null,
      confidence: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Проверяет видимость через Perplexity (заглушка для будущего)
 */
export async function checkPerplexity(
  websiteData: ParsedWebsiteData,
  language: Language = 'he'
): Promise<AICheckResult> {
  // Placeholder - будет реализовано позже
  return {
    mentioned: false,
    position: null,
    context: 'Perplexity API integration coming soon',
    confidence: 0,
    error: 'Not implemented yet',
  };
}

/**
 * Проверяет видимость через Grok (заглушка для будущего)
 */
export async function checkGrok(
  websiteData: ParsedWebsiteData,
  language: Language = 'he'
): Promise<AICheckResult> {
  // Placeholder - будет реализовано позже
  return {
    mentioned: false,
    position: null,
    context: 'Grok API integration coming soon',
    confidence: 0,
    error: 'Not implemented yet',
  };
}

/**
 * Проверяет видимость через Gemini (заглушка для будущего)
 */
export async function checkGemini(
  websiteData: ParsedWebsiteData,
  language: Language = 'he'
): Promise<AICheckResult> {
  // Placeholder - будет реализовано позже
  return {
    mentioned: false,
    position: null,
    context: 'Gemini API integration coming soon',
    confidence: 0,
    error: 'Not implemented yet',
  };
}

/**
 * Проверяет видимость во всех AI-системах параллельно
 */
export async function checkAllAI(
  websiteData: ParsedWebsiteData,
  language: Language = 'he',
  onProgress?: (platform: string, result: AICheckResult) => void
): Promise<{
  claude: AICheckResult;
  chatgpt: AICheckResult;
  perplexity: AICheckResult;
  grok: AICheckResult;
  gemini: AICheckResult;
}> {
  // Запускаем все проверки параллельно
  const [claude, chatgpt, perplexity, grok, gemini] = await Promise.all([
    checkClaude(websiteData, language).then((result) => {
      onProgress?.('claude', result);
      return result;
    }),
    checkChatGPT(websiteData, language).then((result) => {
      onProgress?.('chatgpt', result);
      return result;
    }),
    checkPerplexity(websiteData, language).then((result) => {
      onProgress?.('perplexity', result);
      return result;
    }),
    checkGrok(websiteData, language).then((result) => {
      onProgress?.('grok', result);
      return result;
    }),
    checkGemini(websiteData, language).then((result) => {
      onProgress?.('gemini', result);
      return result;
    }),
  ]);

  return {
    claude,
    chatgpt,
    perplexity,
    grok,
    gemini,
  };
}

/**
 * Вычисляет общий score видимости (0-100)
 */
export function calculateVisibilityScore(results: {
  claude: AICheckResult;
  chatgpt: AICheckResult;
  perplexity: AICheckResult;
  grok: AICheckResult;
  gemini: AICheckResult;
}): number {
  const platforms = [results.claude, results.chatgpt, results.perplexity, results.grok, results.gemini];

  // Считаем сколько платформ упоминают сайт
  const mentionCount = platforms.filter((p) => p.mentioned).length;

  // Базовый score от количества упоминаний
  let score = (mentionCount / platforms.length) * 100;

  // Бонус за высокую позицию
  const avgPosition =
    platforms
      .filter((p) => p.position !== null)
      .map((p) => p.position!)
      .reduce((sum, pos) => sum + pos, 0) /
    platforms.filter((p) => p.position !== null).length;

  if (!isNaN(avgPosition) && avgPosition <= 3) {
    score += 10; // Бонус за топ-3
  }

  // Штраф за низкий confidence
  const avgConfidence =
    platforms.reduce((sum, p) => sum + p.confidence, 0) / platforms.length;

  if (avgConfidence < 50) {
    score -= 15;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}
