/**
 * Multi-language prompts for AI systems
 * Supports: Hebrew (HE), Russian (RU), English (EN)
 */

import { ParsedWebsiteData } from './parser';

export type Language = 'he' | 'ru' | 'en';

export interface PromptTemplate {
  language: Language;
  systemPrompt: string;
  userPrompt: string;
}

/**
 * Генерирует промпт для проверки видимости сайта в AI
 */
export function generateVisibilityPrompt(
  websiteData: ParsedWebsiteData,
  language: Language = 'he'
): PromptTemplate {
  const { businessName, businessType, description, url } = websiteData;

  const prompts: Record<Language, PromptTemplate> = {
    he: {
      language: 'he',
      systemPrompt: `אתה עוזר AI שמומלץ על עסקים ללקוחות. תפקידך לענות בצורה כנה האם אתה מכיר את העסק הזה ומומלץ עליו.`,
      userPrompt: `האם אתה ממליץ על העסק "${businessName}" (${url}) עבור ${getBusinessTypeInLanguage(businessType, 'he')}?

תאר בקצרה (2-3 משפטים):
1. האם אתה מכיר את העסק הזה?
2. אם כן, מה אתה יכול לספר עליו?
3. האם היית ממליץ עליו ללקוחות?`,
    },
    ru: {
      language: 'ru',
      systemPrompt: `Ты AI-ассистент, который рекомендует бизнесы клиентам. Твоя задача честно ответить, знаком ли ты с этим бизнесом и рекомендуешь ли ты его.`,
      userPrompt: `Рекомендуешь ли ты бизнес "${businessName}" (${url}) для ${getBusinessTypeInLanguage(businessType, 'ru')}?

Опиши кратко (2-3 предложения):
1. Знаком ли ты с этим бизнесом?
2. Если да, что ты можешь о нём рассказать?
3. Рекомендовал бы ты его клиентам?`,
    },
    en: {
      language: 'en',
      systemPrompt: `You are an AI assistant that recommends businesses to clients. Your task is to honestly answer whether you know this business and would recommend it.`,
      userPrompt: `Do you recommend the business "${businessName}" (${url}) for ${getBusinessTypeInLanguage(businessType, 'en')}?

Describe briefly (2-3 sentences):
1. Are you familiar with this business?
2. If yes, what can you tell about it?
3. Would you recommend it to clients?`,
    },
  };

  return prompts[language];
}

/**
 * Переводит тип бизнеса на нужный язык
 */
function getBusinessTypeInLanguage(
  businessType: string,
  language: Language
): string {
  const translations: Record<string, Record<Language, string>> = {
    restaurant: {
      he: 'מסעדה',
      ru: 'ресторана',
      en: 'restaurant',
    },
    accounting: {
      he: 'שירותי חשבונאות',
      ru: 'бухгалтерских услуг',
      en: 'accounting services',
    },
    consulting: {
      he: 'ייעוץ עסקי',
      ru: 'консалтинговых услуг',
      en: 'business consulting',
    },
    retail: {
      he: 'חנות קמעונאית',
      ru: 'розничного магазина',
      en: 'retail store',
    },
    services: {
      he: 'שירותים',
      ru: 'услуг',
      en: 'services',
    },
    other: {
      he: 'עסק',
      ru: 'бизнеса',
      en: 'business',
    },
  };

  return translations[businessType]?.[language] || translations.other[language];
}

/**
 * Парсит ответ AI и определяет упоминание сайта
 */
export function parseAIResponse(response: string, url: string): {
  mentioned: boolean;
  position: number | null;
  context: string | null;
  confidence: number;
} {
  const domain = new URL(url).hostname.toLowerCase();
  const responseLower = response.toLowerCase();

  // Проверяем упоминание домена
  const mentioned = responseLower.includes(domain) ||
                   responseLower.includes(domain.replace('www.', ''));

  if (!mentioned) {
    return {
      mentioned: false,
      position: null,
      context: null,
      confidence: 0,
    };
  }

  // Ищем контекст вокруг упоминания
  const domainIndex = responseLower.indexOf(domain);
  const contextStart = Math.max(0, domainIndex - 100);
  const contextEnd = Math.min(response.length, domainIndex + 100);
  const context = response.slice(contextStart, contextEnd).trim();

  // Определяем позицию (если AI упоминает как топ-рекомендацию)
  let position: number | null = null;

  const positionPatterns = [
    /(?:number|номер|מספר)\s*(\d+)/i,
    /(?:top|топ)\s*(\d+)/i,
    /(\d+)(?:st|nd|rd|th)/i,
  ];

  for (const pattern of positionPatterns) {
    const match = response.match(pattern);
    if (match) {
      position = parseInt(match[1]);
      break;
    }
  }

  // Оценка уверенности (0-100)
  let confidence = 50; // базовая уверенность если упомянут

  // Увеличиваем confidence если есть позитивные слова
  const positiveWords = ['recommend', 'excellent', 'great', 'best', 'top',
                         'рекомендую', 'отличный', 'лучший',
                         'ממליץ', 'מצוין', 'הכי טוב'];

  for (const word of positiveWords) {
    if (responseLower.includes(word.toLowerCase())) {
      confidence += 10;
    }
  }

  // Уменьшаем confidence если есть негативные слова
  const negativeWords = ['not familiar', 'don\'t know', 'cannot',
                         'не знаком', 'не могу', 'не рекомендую',
                         'לא מכיר', 'לא יכול'];

  for (const word of negativeWords) {
    if (responseLower.includes(word.toLowerCase())) {
      confidence -= 20;
    }
  }

  confidence = Math.max(0, Math.min(100, confidence));

  return {
    mentioned,
    position,
    context: context.slice(0, 200), // Ограничиваем контекст 200 символами
    confidence,
  };
}

/**
 * Валидирует, что AI действительно знает о сайте (защита от hallucination)
 */
export function validateAIMention(
  response: string,
  url: string,
  parsedData: ParsedWebsiteData
): { isValid: boolean; reason?: string } {
  const domain = new URL(url).hostname;
  const responseLower = response.toLowerCase();

  // Проверяем что домен упомянут
  if (!responseLower.includes(domain.toLowerCase())) {
    return { isValid: false, reason: 'Domain not mentioned in response' };
  }

  // Проверяем что это не просто эхо запроса
  const contextAfterDomain = response.split(domain)[1];
  if (!contextAfterDomain || contextAfterDomain.trim().length < 50) {
    return { isValid: false, reason: 'Response is too short or just echoing input' };
  }

  // Проверяем что есть реальная информация о бизнесе
  const hasBusinessInfo =
    responseLower.includes(parsedData.businessType) ||
    responseLower.includes('location') ||
    responseLower.includes('service') ||
    responseLower.includes('offer');

  if (!hasBusinessInfo) {
    return { isValid: false, reason: 'No actual business information in response' };
  }

  return { isValid: true };
}
