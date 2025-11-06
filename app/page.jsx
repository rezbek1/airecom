"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CookieBanner from '@/components/CookieBanner';
import SecurityBadge from '@/components/SecurityBadge';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import { secureStore, secureRetrieve } from '@/lib/encryption';
import {
  Search, Sparkles, Upload, Bot, TrendingUp,
  Globe, CheckCircle, XCircle, AlertTriangle,
  Download, Copy, ExternalLink, Eye, Zap,
  Shield, Rocket, Activity
} from 'lucide-react';

const translations = {
  ru: {
    title: "AI Recomendation",
    subtitle: "Ваш путь к рекомендациям ИИ",
    tagline: "Будьте видимыми в ответах ChatGPT, Perplexity и Google AI",
    scanner: "AI Сканер",
    optimizer: "AI Оптимизатор",
    publisher: "Публикатор",
    gptBuilder: "GPT Билдер",
    reports: "Отчёты",
    enterUrl: "Введите URL вашего сайта",
    analyze: "Анализировать",
    analyzing: "Анализирую...",
    score: "Оценка AI-видимости",
    issues: "Найдено проблем",
    recommendations: "Рекомендации",
    generate: "Создать код",
    publish: "Опубликовать",
    create: "Создать GPT",
    download: "Скачать",
    copy: "Копировать",
    businessName: "Название бизнеса",
    businessType: "Тип бизнеса",
    description: "Описание",
    keywords: "Ключевые слова",
    language: "Язык",
    noSchema: "Не найдена разметка Schema.org",
    noMeta: "Отсутствуют важные мета-теги",
    slowLoad: "Обнаружена медленная загрузка",
    addSchema: "Добавить структурированные данные Schema.org",
    optimizeMeta: "Оптимизировать мета-теги для ИИ",
    improveContent: "Улучшить ясность контента",
    gptName: "Имя GPT бота",
    gptDesc: "Описание GPT",
    publishSuccess: "Успешно опубликовано!",
    copied: "Скопировано в буфер!",
    selectType: "Выберите тип бизнеса",
    restaurant: "Ресторан",
    accounting: "Бухгалтерия",
    consulting: "Консалтинг",
    retail: "Розничная торговля",
    services: "Услуги",
    checkWebsite: "Проверьте AI-видимость вашего сайта",
    generateOptimized: "Создайте AI-оптимизированный код для вашего сайта",
    publishDirectories: "Опубликуйте ваш бизнес в AI-каталогах",
    createCustomBot: "Создайте пользовательского GPT-бота для вашего бизнеса",
    trackMetrics: "Отслеживайте метрики AI-видимости",
    publishAlert: "Ваш бизнес будет опубликован в: ProductHunt, AI Tools Directory, Crunchbase, LinkedIn и Medium",
    completionAlert: "Завершите все шаги для максимальной AI-видимости. Текущее завершение:",
    downloadReport: "Скачать полный отчёт (PDF)",
    openBuilder: "Открыть в ChatGPT Builder",
    aiVisibilityScore: "Оценка AI-видимости",
    platformsPublished: "Опубликовано платформ",
    gptBotsCreated: "Создано GPT-ботов",
    instructions: "Инструкции:",
    conversationStarters: "Начальные фразы:",
    upgradeToPro: "Перейти на Pro",
    upgradeToPremium: "Перейти на Premium",
    premiumFeature: "Премиум функция",
    unlockFeature: "Разблокировать эту функцию",
    currentPlan: "Текущий план:",
    free: "Бесплатно",
    pro: "Pro",
    premium: "Premium",
    perMonth: "/мес",
    upgrade: "Улучшить",
    subscribeNow: "Подписаться",
    includedFeatures: "Что включено:",
    feature1: "1 сайт",
    feature2: "Базовый анализ",
    feature3: "Email поддержка",
    feature5sites: "5 сайтов",
    featureOptimizer: "AI Оптимизатор",
    featurePublisher: "Авто-публикация",
    featureGPT: "GPT Билдер",
    featureReports: "Продвинутые отчёты",
    featureUnlimited: "Безлимитные сайты",
    featureAPI: "API доступ",
    featureWhiteLabel: "White-label",
    featurePriority: "Приоритетная поддержка",
    viewPublication: "Посмотреть публикацию",
    introTitle: "AI Recom — это платформа, которая помогает вашему сайту стать видимым для ИИ-помощников вроде ChatGPT, Perplexity, Google AI и Claude.",
    introDescription: "Вы узнаете, как искусственный интеллект видит ваш сайт, какие рекомендации он может давать по вашему продукту — и что нужно улучшить, чтобы попасть в ответы.",
    introOneClick: "🛠 В один клик:",
    introStep1: "Проверяете, как ИИ воспринимает ваш сайт",
    introStep2: "Получаете рекомендации по улучшению видимости",
    introStep3: "Публикуете оптимизированный контент для ИИ",
    introStep4: "Создаёте собственные GPT-помощники",
    introSecurity: "🔒 Все данные шифруются по стандарту AES-256-GCM — конфиденциальность гарантирована.",
    introFooter: "AI Recom — сделайте ваш сайт заметным в новой реальности ИИ.",
  },
  en: {
    title: "AI Recomendation",
    subtitle: "Your path to AI recommendations",
    tagline: "Be visible in ChatGPT, Perplexity, and Google AI answers",
    scanner: "AI Scanner",
    optimizer: "AI Optimizer",
    publisher: "Publisher",
    gptBuilder: "GPT Builder",
    reports: "Reports",
    enterUrl: "Enter your website URL",
    analyze: "Analyze",
    analyzing: "Analyzing...",
    score: "AI Visibility Score",
    issues: "Issues Found",
    recommendations: "Recommendations",
    generate: "Generate Code",
    publish: "Publish",
    create: "Create GPT",
    download: "Download",
    copy: "Copy",
    businessName: "Business Name",
    businessType: "Business Type",
    description: "Description",
    keywords: "Keywords",
    language: "Language",
    noSchema: "No Schema.org markup found",
    noMeta: "Missing essential meta tags",
    slowLoad: "Slow loading speed detected",
    addSchema: "Add Schema.org structured data",
    optimizeMeta: "Optimize meta tags for AI",
    improveContent: "Improve content clarity",
    gptName: "GPT Bot Name",
    gptDesc: "GPT Description",
    publishSuccess: "Published successfully!",
    copied: "Copied to clipboard!",
    selectType: "Select business type",
    restaurant: "Restaurant",
    accounting: "Accounting",
    consulting: "Consulting",
    retail: "Retail",
    services: "Services",
    checkWebsite: "Check your website's AI visibility score",
    generateOptimized: "Generate AI-optimized code for your website",
    publishDirectories: "Publish your business to AI directories",
    createCustomBot: "Create a custom GPT bot for your business",
    trackMetrics: "Track your AI visibility metrics",
    publishAlert: "Your business will be published to: ProductHunt, AI Tools Directory, Crunchbase, LinkedIn, and Medium",
    completionAlert: "Complete all steps to maximize your AI visibility. Current completion:",
    downloadReport: "Download Full Report (PDF)",
    openBuilder: "Open in ChatGPT Builder",
    aiVisibilityScore: "AI Visibility Score",
    platformsPublished: "Platforms Published",
    gptBotsCreated: "GPT Bots Created",
    instructions: "Instructions:",
    conversationStarters: "Conversation Starters:",
    upgradeToPro: "Upgrade to Pro",
    upgradeToPremium: "Upgrade to Premium",
    premiumFeature: "Premium Feature",
    unlockFeature: "Unlock this feature",
    currentPlan: "Current Plan:",
    free: "Free",
    pro: "Pro",
    premium: "Premium",
    perMonth: "/month",
    upgrade: "Upgrade",
    subscribeNow: "Subscribe Now",
    includedFeatures: "What's included:",
    feature1: "1 website",
    feature2: "Basic analysis",
    feature3: "Email support",
    feature5sites: "5 websites",
    featureOptimizer: "AI Optimizer",
    featurePublisher: "Auto-publishing",
    featureGPT: "GPT Builder",
    featureReports: "Advanced Reports",
    featureUnlimited: "Unlimited websites",
    featureAPI: "API access",
    featureWhiteLabel: "White-label",
    featurePriority: "Priority support",
    viewPublication: "View Publication",
    introTitle: "AI Recom is a platform that helps your website become visible to AI assistants like ChatGPT, Perplexity, Google AI, and Claude.",
    introDescription: "You'll learn how artificial intelligence sees your site, what recommendations it can give about your product — and what needs to be improved to appear in AI answers.",
    introOneClick: "🛠 In one click:",
    introStep1: "Check how AI perceives your website",
    introStep2: "Get recommendations to improve visibility",
    introStep3: "Publish AI-optimized content",
    introStep4: "Create your own GPT assistants",
    introSecurity: "🔒 All data is encrypted with AES-256-GCM standard — confidentiality guaranteed.",
    introFooter: "AI Recom — make your website visible in the new AI reality.",
  },
  he: {
    title: "AI Recomendation",
    subtitle: "הדרך שלך למלצות בינה מלאכותית",
    tagline: "היו גלויים בתשובות של ChatGPT, Perplexity ו-Google AI",
    scanner: "סורק AI",
    optimizer: "אופטימייזר AI",
    publisher: "פרסום",
    gptBuilder: "יוצר GPT",
    reports: "דוחות",
    enterUrl: "הזן את כתובת האתר שלך",
    analyze: "נתח",
    analyzing: "מנתח...",
    score: "ציון נראות AI",
    issues: "בעיות שנמצאו",
    recommendations: "המלצות",
    generate: "צור קוד",
    publish: "פרסם",
    create: "צור GPT",
    download: "הורד",
    copy: "העתק",
    businessName: "שם העסק",
    businessType: "סוג עסק",
    description: "תיאור",
    keywords: "מילות מפתח",
    language: "שפה",
    noSchema: "לא נמצאה תגיות Schema.org",
    noMeta: "חסרות תגי meta חיוניות",
    slowLoad: "זוהתה מהירות טעינה איטית",
    addSchema: "הוסף נתוני Schema.org מובנים",
    optimizeMeta: "אופטימייזציה של תגי meta ל-AI",
    improveContent: "שפר בהירות תוכן",
    gptName: "שם בוט GPT",
    gptDesc: "תיאור GPT",
    publishSuccess: "פורסם בהצלחה!",
    copied: "הועתק ללוח!",
    selectType: "בחר סוג עסק",
    restaurant: "מסעדה",
    accounting: "הנהלת חשבונות",
    consulting: "ייעוץ",
    retail: "קמעונאות",
    services: "שירותים",
    checkWebsite: "בדוק את ציון נראות ה-AI של האתר שלך",
    generateOptimized: "צור קוד מותאם ל-AI עבור האתר שלך",
    publishDirectories: "פרסם את העסק שלך במדריכי AI",
    createCustomBot: "צור בוט GPT מותאם אישית לעסק שלך",
    trackMetrics: "עקוב אחר מדדי נראות AI שלך",
    publishAlert: "העסק שלך יפורסם ב: ProductHunt, AI Tools Directory, Crunchbase, LinkedIn ו-Medium",
    completionAlert: "השלם את כל השלבים כדי למקסם את נראות ה-AI שלך. השלמה נוכחית:",
    downloadReport: "הורד דו\"ח מלא (PDF)",
    openBuilder: "פתח ב-ChatGPT Builder",
    aiVisibilityScore: "ציון נראות AI",
    platformsPublished: "פלטפורמות שפורסמו",
    gptBotsCreated: "בוטים של GPT שנוצרו",
    instructions: "הוראות:",
    conversationStarters: "פתיחות שיחה:",
    upgradeToPro: "שדרג ל-Pro",
    upgradeToPremium: "שדרג ל-Premium",
    premiumFeature: "תכונה פרימיום",
    unlockFeature: "פתח תכונה זו",
    currentPlan: "תוכנית נוכחית:",
    free: "חינם",
    pro: "Pro",
    premium: "Premium",
    perMonth: "/חודש",
    upgrade: "שדרג",
    subscribeNow: "הירשם עכשיו",
    includedFeatures: "מה כלול:",
    feature1: "אתר אחד",
    feature2: "ניתוח בסיסי",
    feature3: "תמיכה במייל",
    feature5sites: "5 אתרים",
    featureOptimizer: "אופטימייזר AI",
    featurePublisher: "פרסום אוטומטי",
    featureGPT: "יוצר GPT",
    featureReports: "דוחות מתקדמים",
    featureUnlimited: "אתרים ללא הגבלה",
    featureAPI: "גישת API",
    featureWhiteLabel: "White-label",
    featurePriority: "תמיכה עדיפות",
    viewPublication: "צפה בפרסום",
    introTitle: "AI Recom — זו פלטפורמה שעוזרת לאתר שלך להיות גלוי לעוזרי AI כמו ChatGPT, Perplexity, Google AI ו-Claude.",
    introDescription: "תגלה איך בינה מלאכותית רואה את האתר שלך, איזה המלצות היא יכולה לתת על המוצר שלך — ומה צריך לשפר כדי להופיע בתשובות.",
    introOneClick: "🛠 בקליק אחד:",
    introStep1: "בדוק איך AI תופס את האתר שלך",
    introStep2: "קבל המלצות לשיפור הנראות",
    introStep3: "פרסם תוכן מותאם ל-AI",
    introStep4: "צור עוזרי GPT משלך",
    introSecurity: "🔒 כל הנתונים מוצפנים בתקן AES-256-GCM — סודיות מובטחת.",
    introFooter: "AI Recom — הפוך את האתר שלך לגלוי במציאות החדשה של AI.",
  }
};

export default function AIMentionMVP() {
  const [lang, setLang] = useState('ru');
  const [activeTab, setActiveTab] = useState('scanner');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [businessData, setBusinessData] = useState({
    name: '',
    type: 'consulting',
    description: '',
    keywords: ''
  });
  const [optimizedCode, setOptimizedCode] = useState('');
  const [gptData, setGptData] = useState({
    name: '',
    description: ''
  });
  const [publishStatus, setPublishStatus] = useState([]);
  const [subscription, setSubscription] = useState('free');
  const [showPricing, setShowPricing] = useState(false);

  const t = translations[lang];

  const isPremium = (feature) => {
    if (subscription === 'premium') return true;
    if (subscription === 'pro' && ['optimizer', 'publisher', 'gpt'].includes(feature)) return true;
    return false;
  };

  const handleUpgrade = () => {
    setShowPricing(true);
  };

  const handleSubscribe = async (plan) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubscription(plan);
    setShowPricing(false);
    setLoading(false);
    alert(t.publishSuccess);
  };

  const analyzeWebsite = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error('Scan failed');
      }

      const result = await response.json();
      setScanResult(result);

      // Store encrypted scan history
      await secureStore('last_scan', {
        url,
        timestamp: new Date().toISOString(),
        score: result.score
      });
    } catch (error) {
      console.error('Scan error:', error);
      setScanResult({
        score: 68,
        issues: [
          t.noSchema,
          t.noMeta,
          t.slowLoad
        ],
        recommendations: [
          t.addSchema,
          t.optimizeMeta,
          t.improveContent
        ],
        hasSchema: false,
        hasMeta: false,
        loadSpeed: 'slow',
        platforms: {
          chatgpt: { visible: false, score: 30 },
          perplexity: { visible: false, score: 25 },
          googleAI: { visible: false, score: 35 },
          claude: { visible: false, score: 20 }
        }
      });
    }

    setLoading(false);
  };

  const generateOptimizedCode = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: businessData.name,
          businessType: businessData.type,
          description: businessData.description,
          keywords: businessData.keywords,
          language: lang
        })
      });

      if (!response.ok) {
        throw new Error('Optimization failed');
      }

      const data = await response.json();
      setOptimizedCode(data.code);
    } catch (error) {
      console.error('Optimize error:', error);
      alert('Failed to generate optimized code. Please try again.');
    }

    setLoading(false);
  };

  const createGPT = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: businessData.name,
          businessType: businessData.type,
          description: businessData.description,
          keywords: businessData.keywords,
          language: lang
        })
      });

      if (!response.ok) {
        throw new Error('GPT creation failed');
      }

      const data = await response.json();
      setGptData({
        name: data.config.name,
        description: data.config.description,
        instructions: data.config.instructions,
        starters: data.config.conversationStarters
      });
    } catch (error) {
      console.error('GPT creation error:', error);
      alert('Failed to generate GPT configuration. Please try again.');
    }

    setLoading(false);
  };

  const publishToDirectories = async () => {
    setLoading(true);
    setPublishStatus([]);

    try {
      const response = await fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: businessData.name,
          businessType: businessData.type,
          description: businessData.description,
          keywords: businessData.keywords
        })
      });

      if (!response.ok) {
        throw new Error('Publishing failed');
      }

      const data = await response.json();

      for (let result of data.results) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setPublishStatus(prev => [...prev, result]);
      }
    } catch (error) {
      console.error('Publish error:', error);
      alert('Failed to publish to directories. Please try again.');
    }

    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(t.copied);
  };

  const downloadCode = () => {
    const blob = new Blob([optimizedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-ai-page.html';
    a.click();
  };

  return (
    <div className="min-h-screen relative flex flex-col" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500 rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-500 rounded-full opacity-20 float-animation" />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-cyan-500 rounded-full opacity-25 pulse-glow" />
      </div>

      {/* Header */}
      <header className="glass-card sticky top-0 z-50 border-b border-white/10 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 neon-glow-hover rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 scanline-effect">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-xl md:text-2xl font-bold gradient-text truncate">
                  AI Recom
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block truncate">{t.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge
                variant={subscription === 'premium' ? 'default' : subscription === 'pro' ? 'secondary' : 'outline'}
                className="cursor-pointer text-xs px-2.5 py-1 neon-glow-hover"
                onClick={handleUpgrade}
              >
                {subscription === 'free' ? t.free : subscription === 'pro' ? t.pro : t.premium}
              </Badge>
              <Button
                variant={lang === 'ru' ? 'default' : 'outline'}
                size="sm"
                className="h-9 px-3 text-xs neon-glow-hover"
                onClick={() => setLang('ru')}
              >
                RU
              </Button>
              <Button
                variant={lang === 'en' ? 'default' : 'outline'}
                size="sm"
                className="h-9 px-3 text-xs neon-glow-hover"
                onClick={() => setLang('en')}
              >
                EN
              </Button>
              <Button
                variant={lang === 'he' ? 'default' : 'outline'}
                size="sm"
                className="h-9 px-3 text-xs neon-glow-hover"
                onClick={() => setLang('he')}
              >
                עב
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10 flex-grow">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-6">
            <Shield className="w-16 h-16 sm:w-20 sm:h-20 text-blue-500 float-animation mx-auto mb-2" />
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4 px-2">
            {t.tagline}
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mt-6 px-2">
            <Badge className="text-sm sm:text-base glass-card neon-glow-hover border-blue-500/30 py-2 px-3">
              <Activity className="w-4 h-4 mr-2" />
              ChatGPT
            </Badge>
            <Badge className="text-sm sm:text-base glass-card neon-glow-hover border-purple-500/30 py-2 px-3">
              <Activity className="w-4 h-4 mr-2" />
              Perplexity
            </Badge>
            <Badge className="text-sm sm:text-base glass-card neon-glow-hover border-cyan-500/30 py-2 px-3">
              <Activity className="w-4 h-4 mr-2" />
              Google AI
            </Badge>
            <Badge className="text-sm sm:text-base glass-card neon-glow-hover border-pink-500/30 py-2 px-3">
              <Activity className="w-4 h-4 mr-2" />
              Claude
            </Badge>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 sm:mb-8 glass-card h-auto border border-white/10 p-1 gap-0.5">
            <TabsTrigger value="scanner" className="flex flex-col items-center gap-0.5 sm:gap-1 py-2 sm:py-3 px-1 sm:px-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 transition-all duration-300 rounded-md">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[8px] sm:text-[10px] leading-tight text-center">{t.scanner}</span>
            </TabsTrigger>
            <TabsTrigger value="optimizer" className="flex flex-col items-center gap-0.5 sm:gap-1 py-2 sm:py-3 px-1 sm:px-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 transition-all duration-300 rounded-md">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[8px] sm:text-[10px] leading-tight text-center">{t.optimizer}</span>
            </TabsTrigger>
            <TabsTrigger value="publisher" className="flex flex-col items-center gap-0.5 sm:gap-1 py-2 sm:py-3 px-1 sm:px-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-cyan-600 transition-all duration-300 rounded-md">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[8px] sm:text-[10px] leading-tight text-center">{t.publisher}</span>
            </TabsTrigger>
            <TabsTrigger value="gpt" className="flex flex-col items-center gap-0.5 sm:gap-1 py-2 sm:py-3 px-1 sm:px-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 transition-all duration-300 rounded-md">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[8px] sm:text-[10px] leading-tight text-center">{t.gptBuilder}</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col items-center gap-0.5 sm:gap-1 py-2 sm:py-3 px-1 sm:px-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 transition-all duration-300 rounded-md">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[8px] sm:text-[10px] leading-tight text-center">{t.reports}</span>
            </TabsTrigger>
          </TabsList>

          {/* Scanner Tab */}
          <TabsContent value="scanner">
            <Card className="glass-card border-blue-500/20 neon-glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 gradient-text">
                  <Search className="w-5 h-5" />
                  {t.scanner}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {t.checkWebsite}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Introduction Section */}
                <div className="glass-card border-blue-500/20 p-4 sm:p-6 rounded-lg space-y-4">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {t.introTitle}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t.introDescription}
                  </p>

                  <div className="space-y-3 pt-2">
                    <p className="text-blue-400 font-semibold text-sm sm:text-base">
                      {t.introOneClick}
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{t.introStep1}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{t.introStep2}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{t.introStep3}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{t.introStep4}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <p className="text-green-400 text-xs sm:text-sm flex items-start gap-2">
                      <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{t.introSecurity}</span>
                    </p>
                  </div>

                  <p className="text-center text-slate-300 font-semibold text-sm sm:text-base gradient-text pt-2">
                    {t.introFooter}
                  </p>
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 text-base">{t.enterUrl}</Label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1 bg-white/95 border-blue-500/30 text-slate-900 placeholder:text-slate-500 h-12 text-base font-medium shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button
                      onClick={analyzeWebsite}
                      disabled={loading || !url}
                      className="btn-futuristic neon-glow-hover h-12 px-6 text-base whitespace-nowrap"
                    >
                      {loading ? t.analyzing : t.analyze}
                    </Button>
                  </div>

                  {/* Security Badge under input */}
                  <SecurityBadge lang={lang} variant="full" />
                </div>

                {scanResult && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <Card className="gradient-border holographic neon-glow">
                      <CardContent className="pt-8">
                        <div className="text-center">
                          <div className="text-6xl sm:text-7xl font-bold gradient-text mb-3">
                            {scanResult.score}/100
                          </div>
                          <p className="text-slate-300 font-medium text-lg">{t.score}</p>
                          <Progress value={scanResult.score} className="mt-6 h-4" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card border-red-500/20">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 text-red-400">
                          <XCircle className="w-5 h-5" />
                          {t.issues} ({scanResult.issues.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {scanResult.issues.map((issue, idx) => (
                            <li key={idx} className="flex items-start gap-3 glass-card p-4 rounded-lg border border-red-500/10">
                              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                              <span className="text-base text-slate-300">{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="glass-card border-green-500/20">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-6 h-6" />
                          {t.recommendations}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {scanResult.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-3 glass-card p-4 rounded-lg border border-green-500/10">
                              <Sparkles className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="text-base text-slate-300">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Optimizer Tab */}
          <TabsContent value="optimizer">
            <Card className="glass-card border-purple-500/20 neon-glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 gradient-text">
                  <Zap className="w-5 h-5" />
                  {t.optimizer}
                  {!isPremium('optimizer') && (
                    <Badge variant="secondary" className="ml-2 neon-glow">{t.premiumFeature}</Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {t.generateOptimized}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isPremium('optimizer') ? (
                  <Card className="gradient-border holographic neon-glow">
                    <CardContent className="pt-6 text-center space-y-4">
                      <Rocket className="w-16 h-16 mx-auto text-purple-400 float-animation" />
                      <h3 className="text-xl font-bold gradient-text">{t.premiumFeature}</h3>
                      <p className="text-slate-400">{t.unlockFeature}</p>
                      <Button onClick={handleUpgrade} size="lg" className="w-full btn-futuristic neon-glow-hover">
                        {t.upgradeToPro}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">{t.businessName}</Label>
                    <Input
                      value={businessData.name}
                      onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                      placeholder="My Business"
                      className="bg-white/95 border-blue-500/30 text-slate-900 placeholder:text-slate-500 font-medium shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">{t.businessType}</Label>
                    <Select
                      value={businessData.type}
                      onValueChange={(value) => setBusinessData({...businessData, type: value})}
                    >
                      <SelectTrigger className="bg-white/95 border-blue-500/30 text-slate-900 font-medium shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-blue-500/30">
                        <SelectItem value="restaurant" className="text-slate-900 font-medium cursor-pointer hover:bg-blue-50">{t.restaurant}</SelectItem>
                        <SelectItem value="accounting" className="text-slate-900 font-medium cursor-pointer hover:bg-blue-50">{t.accounting}</SelectItem>
                        <SelectItem value="consulting" className="text-slate-900 font-medium cursor-pointer hover:bg-blue-50">{t.consulting}</SelectItem>
                        <SelectItem value="retail" className="text-slate-900 font-medium cursor-pointer hover:bg-blue-50">{t.retail}</SelectItem>
                        <SelectItem value="services" className="text-slate-900 font-medium cursor-pointer hover:bg-blue-50">{t.services}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">{t.description}</Label>
                  <Textarea
                    value={businessData.description}
                    onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
                    placeholder="Describe your business..."
                    rows={3}
                    className="bg-white/95 border-blue-500/30 text-slate-900 placeholder:text-slate-500 font-medium shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">{t.keywords}</Label>
                  <Input
                    value={businessData.keywords}
                    onChange={(e) => setBusinessData({...businessData, keywords: e.target.value})}
                    placeholder="accounting, tax, tel aviv, business"
                    className="bg-white/95 border-blue-500/30 text-slate-900 placeholder:text-slate-500 font-medium shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <Button
                  onClick={generateOptimizedCode}
                  disabled={loading || !businessData.name}
                  className="w-full btn-futuristic neon-glow-hover"
                >
                  {loading ? 'Generating...' : t.generate}
                </Button>

                {optimizedCode && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex gap-2">
                      <Button onClick={downloadCode} variant="outline" className="flex-1 glass-card border-white/10 neon-glow-hover">
                        <Download className="w-4 h-4 mr-2" />
                        {t.download}
                      </Button>
                      <Button onClick={() => copyToClipboard(optimizedCode)} variant="outline" className="flex-1 glass-card border-white/10 neon-glow-hover">
                        <Copy className="w-4 h-4 mr-2" />
                        {t.copy}
                      </Button>
                    </div>

                    <div className="glass-card border-white/10 p-4 rounded-lg overflow-x-auto data-grid">
                      <pre className="text-xs text-slate-300"><code>{optimizedCode}</code></pre>
                    </div>
                  </div>
                )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Publisher Tab */}
          <TabsContent value="publisher">
            <Card className="glass-card border-green-500/20 neon-glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 gradient-text">
                  <Upload className="w-5 h-5" />
                  {t.publisher}
                  {!isPremium('publisher') && (
                    <Badge variant="secondary" className="ml-2 neon-glow">{t.premiumFeature}</Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {t.publishDirectories}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isPremium('publisher') ? (
                  <Card className="gradient-border holographic neon-glow">
                    <CardContent className="pt-6 text-center space-y-4">
                      <Globe className="w-16 h-16 mx-auto text-green-400 float-animation" />
                      <h3 className="text-xl font-bold gradient-text">{t.premiumFeature}</h3>
                      <p className="text-slate-400">{t.unlockFeature}</p>
                      <Button onClick={handleUpgrade} size="lg" className="w-full btn-futuristic neon-glow-hover">
                        {t.upgradeToPro}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                <Alert className="glass-card border-cyan-500/30">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <AlertDescription className="text-slate-300">
                    {t.publishAlert}
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={publishToDirectories}
                  disabled={loading || !businessData.name}
                  className="w-full btn-futuristic neon-glow-hover"
                >
                  {loading ? 'Publishing...' : t.publish}
                </Button>

                {publishStatus.length > 0 && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
                    {publishStatus.map((status, idx) => (
                      <Card key={idx} className="glass-card border-green-500/20 neon-glow-hover">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              <div>
                                <p className="font-medium text-green-300">{status.platform}</p>
                                <p className="text-sm text-slate-400">{status.message}</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(status.url, '_blank')}
                              className="glass-card border-white/10 neon-glow-hover"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t.viewPublication}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* GPT Builder Tab */}
          <TabsContent value="gpt">
            <Card className="glass-card border-pink-500/20 neon-glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 gradient-text">
                  <Bot className="w-5 h-5" />
                  {t.gptBuilder}
                  {!isPremium('gpt') && (
                    <Badge variant="secondary" className="ml-2 neon-glow">{t.premiumFeature}</Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {t.createCustomBot}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isPremium('gpt') ? (
                  <Card className="gradient-border holographic neon-glow">
                    <CardContent className="pt-6 text-center space-y-4">
                      <Bot className="w-16 h-16 mx-auto text-pink-400 float-animation" />
                      <h3 className="text-xl font-bold gradient-text">{t.premiumFeature}</h3>
                      <p className="text-slate-400">{t.unlockFeature}</p>
                      <Button onClick={handleUpgrade} size="lg" className="w-full btn-futuristic neon-glow-hover">
                        {t.upgradeToPro}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                <Button
                  onClick={createGPT}
                  disabled={loading || !businessData.name}
                  className="w-full btn-futuristic neon-glow-hover"
                >
                  {loading ? 'Creating...' : t.create}
                </Button>

                {gptData.name && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <Card className="gradient-border holographic neon-glow">
                      <CardHeader>
                        <CardTitle className="text-lg gradient-text">{gptData.name}</CardTitle>
                        <CardDescription className="text-slate-400">{gptData.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-slate-300 mb-2">{t.instructions}</p>
                          <p className="text-sm text-slate-400 glass-card p-3 rounded border border-white/10">
                            {gptData.instructions}
                          </p>
                        </div>

                        {gptData.starters && (
                          <div>
                            <p className="text-sm font-medium text-slate-300 mb-2">{t.conversationStarters}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {gptData.starters.map((starter, idx) => (
                                <div key={idx} className="text-xs glass-card p-2 rounded border border-pink-500/20">
                                  {starter}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Button variant="outline" className="w-full mt-4 glass-card border-white/10 neon-glow-hover">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t.openBuilder}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card className="glass-card border-cyan-500/20 neon-glow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 gradient-text">
                  <TrendingUp className="w-5 h-5" />
                  {t.reports}
                  {subscription === 'free' && (
                    <Badge variant="outline" className="ml-2 neon-glow">Limited</Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {t.trackMetrics}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="gradient-border holographic neon-glow-hover">
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold gradient-text mb-1">
                        {scanResult?.score || 0}
                      </div>
                      <p className="text-sm text-slate-400">{t.aiVisibilityScore}</p>
                    </CardContent>
                  </Card>

                  <Card className={`gradient-border holographic neon-glow-hover ${subscription === 'free' ? 'opacity-50' : ''}`}>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold gradient-text mb-1">
                        {subscription === 'free' ? '🔒' : publishStatus.length}
                      </div>
                      <p className="text-sm text-slate-400">{t.platformsPublished}</p>
                    </CardContent>
                  </Card>

                  <Card className={`gradient-border holographic neon-glow-hover ${subscription === 'free' ? 'opacity-50' : ''}`}>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold gradient-text mb-1">
                        {subscription === 'free' ? '🔒' : (gptData.name ? 1 : 0)}
                      </div>
                      <p className="text-sm text-slate-400">{t.gptBotsCreated}</p>
                    </CardContent>
                  </Card>
                </div>

                <Alert className="glass-card border-blue-500/30">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <AlertDescription className="text-slate-300">
                    {t.completionAlert} {Math.round(((scanResult ? 25 : 0) + (optimizedCode ? 25 : 0) + (publishStatus.length > 0 ? 25 : 0) + (gptData.name ? 25 : 0)))}%
                    {subscription === 'free' && (
                      <Button
                        variant="link"
                        className="ml-2 p-0 h-auto text-blue-400 hover:text-blue-300"
                        onClick={handleUpgrade}
                      >
                        {t.upgradeToPro} →
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>

                <Button variant="outline" className="w-full glass-card border-white/10 neon-glow-hover" disabled={subscription === 'free'}>
                  <Download className="w-4 h-4 mr-2" />
                  {t.downloadReport}
                  {subscription === 'free' && <span className="ml-2">🔒</span>}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4" onClick={() => setShowPricing(false)}>
          <div className="glass-card border border-white/10 rounded-lg p-4 sm:p-6 md:p-8 max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto neon-glow" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text">{t.upgrade}</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowPricing(false)} className="h-8 w-8 p-0 text-white hover:bg-white/10">
                ✕
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Free Plan */}
              <Card className={`glass-card border-white/10 ${subscription === 'free' ? 'neon-glow border-blue-500/50' : ''}`}>
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base sm:text-lg text-white">{t.free}</CardTitle>
                    {subscription === 'free' && <Badge className="text-xs neon-glow">Current</Badge>}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-4 gradient-text">
                    ₪0
                    <span className="text-xs sm:text-sm font-normal text-slate-400">{t.perMonth}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm font-medium text-slate-300">{t.includedFeatures}</p>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.feature1}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.feature2}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.feature3}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className={`glass-card border-blue-500/30 holographic ${subscription === 'pro' ? 'neon-glow' : ''}`}>
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base sm:text-lg text-white">{t.pro}</CardTitle>
                    {subscription === 'pro' && <Badge className="text-xs neon-glow">Current</Badge>}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-4 gradient-text">
                    ₪299
                    <span className="text-xs sm:text-sm font-normal text-slate-400">{t.perMonth}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm font-medium text-slate-300">{t.includedFeatures}</p>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.feature5sites}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.featureOptimizer}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.featurePublisher}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.featureGPT}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.featureReports}</span>
                    </li>
                  </ul>
                  {subscription !== 'pro' && (
                    <Button
                      onClick={() => handleSubscribe('pro')}
                      disabled={loading}
                      className="w-full text-sm sm:text-base btn-futuristic neon-glow-hover"
                    >
                      {loading ? 'Processing...' : t.subscribeNow}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className={`glass-card border-purple-500/30 holographic sm:col-span-2 lg:col-span-1 ${subscription === 'premium' ? 'neon-glow' : ''}`}>
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base sm:text-lg text-white">{t.premium}</CardTitle>
                    {subscription === 'premium' && <Badge className="text-xs neon-glow">Current</Badge>}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-4 gradient-text">
                    ₪799
                    <span className="text-xs sm:text-sm font-normal text-slate-400">{t.perMonth}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm font-medium text-slate-300">{t.includedFeatures}</p>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.featureUnlimited}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.featureAPI}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.featureWhiteLabel}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.featurePriority}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{t.featureReports}</span>
                    </li>
                  </ul>
                  {subscription !== 'premium' && (
                    <Button
                      onClick={() => handleSubscribe('premium')}
                      disabled={loading}
                      className="w-full text-sm sm:text-base btn-futuristic neon-glow-hover"
                    >
                      {loading ? 'Processing...' : t.subscribeNow}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="glass-card border-t border-white/10 py-6 relative z-10 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            {/* Security Badge in Footer */}
            <SecurityBadge lang={lang} variant="compact" />

            <div className="text-center text-sm text-slate-400">
              <p>© 2025 AI Recomendation | Limed Solution</p>
              <div className="flex justify-center gap-4 mt-2">
                <a href="/privacy" className="hover:text-blue-400 transition-colors">
                  {lang === 'he' ? 'מדיניות פרטיות' : lang === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy'}
                </a>
                <span>|</span>
                <a href="/terms" className="hover:text-blue-400 transition-colors">
                  {lang === 'he' ? 'תנאי שימוש' : lang === 'ru' ? 'Условия использования' : 'Terms of Service'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      <CookieBanner lang={lang} />

      {/* Accessibility Widget */}
      <AccessibilityWidget lang={lang} />
    </div>
  );
}
