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
import { 
  Search, Sparkles, Upload, Bot, TrendingUp, 
  Globe, CheckCircle, XCircle, AlertTriangle,
  Download, Copy, ExternalLink, Eye, Zap
} from 'lucide-react';

const translations = {
  ru: {
    title: "AI Mention",
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
  },
  en: {
    title: "AI Mention",
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
  },
  he: {
    title: "AI Mention",
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
    noSchema: "לא נמצא Schema.org",
    noMeta: "חסרים תגי meta חיוניים",
    slowLoad: "זוהתה מהירות טעינה איטית",
    addSchema: "הוסף נתונים מובנים Schema.org",
    optimizeMeta: "אופטימיזציה של תגי meta עבור AI",
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
    publishDirectories: "פרסם את העסק שלך בקטלוגי AI",
    createCustomBot: "צור בוט GPT מותאם אישית לעסק שלך",
    trackMetrics: "עקוב אחר מדדי נראות ה-AI שלך",
    publishAlert: "העסק שלך יפורסם ב: ProductHunt, AI Tools Directory, Crunchbase, LinkedIn ו-Medium",
    completionAlert: "השלם את כל השלבים כדי למקסם את נראות ה-AI שלך. השלמה נוכחית:",
    downloadReport: "הורד דוח מלא (PDF)",
    openBuilder: "פתח ב-ChatGPT Builder",
    aiVisibilityScore: "ציון נראות AI",
    platformsPublished: "פלטפורמות שפורסמו",
    gptBotsCreated: "בוטים GPT שנוצרו",
    instructions: "הוראות:",
    conversationStarters: "משפטי פתיחה:",
    upgradeToPro: "שדרג ל-Pro",
    upgradeToPremium: "שדרג ל-Premium",
    premiumFeature: "תכונת פרימיום",
    unlockFeature: "בטל נעילה של תכונה זו",
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
  const [subscription, setSubscription] = useState('free'); // 'free', 'pro', 'premium'
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
    
    // UPay.co.il integration
    const upayUrl = 'https://secure.upay.co.il/order/';
    
    // Plan details for UPay
    const planDetails = {
      pro: {
        amount: 299,
        productName: 'AI Mention Pro',
        productId: 'ai-mention-pro'
      },
      premium: {
        amount: 799,
        productName: 'AI Mention Premium',
        productId: 'ai-mention-premium'
      }
    };
    
    const selectedPlan = planDetails[plan];
    
    // Create UPay payment URL
    const upayParams = new URLSearchParams({
      amount: selectedPlan.amount,
      currency: 'ILS',
      productName: selectedPlan.productName,
      productId: selectedPlan.productId,
      // Add your UPay merchant credentials here
      // merchantId: 'YOUR_MERCHANT_ID',
      // returnUrl: window.location.origin + '/payment-success',
      // cancelUrl: window.location.origin + '/payment-cancel',
    });
    
    // For demo purposes - simulate payment
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, redirect to UPay:
    // window.location.href = upayUrl + '?' + upayParams.toString();
    
    // For demo - just update subscription
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
    } catch (error) {
      console.error('Scan error:', error);
      // Fallback demo data
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

      // Simulate progressive publishing with delays
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
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${lang === 'he' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate">
                  {t.title}
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-600 hidden sm:block">{t.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Badge 
                variant={subscription === 'premium' ? 'default' : subscription === 'pro' ? 'secondary' : 'outline'}
                className="cursor-pointer text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1"
                onClick={handleUpgrade}
              >
                {subscription === 'free' ? t.free : subscription === 'pro' ? t.pro : t.premium}
              </Badge>
              <Button
                variant={lang === 'ru' ? 'default' : 'outline'}
                size="sm"
                className="h-7 sm:h-9 px-2 sm:px-3 text-xs"
                onClick={() => setLang('ru')}
              >
                RU
              </Button>
              <Button
                variant={lang === 'en' ? 'default' : 'outline'}
                size="sm"
                className="h-7 sm:h-9 px-2 sm:px-3 text-xs"
                onClick={() => setLang('en')}
              >
                EN
              </Button>
              <Button
                variant={lang === 'he' ? 'default' : 'outline'}
                size="sm"
                className="h-7 sm:h-9 px-2 sm:px-3 text-xs"
                onClick={() => setLang('he')}
              >
                עב
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="text-center mb-4 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2 sm:mb-3 px-2">
            {t.tagline}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-3 sm:mt-4 px-2">
            <Badge variant="secondary" className="text-xs sm:text-sm">ChatGPT</Badge>
            <Badge variant="secondary" className="text-xs sm:text-sm">Perplexity</Badge>
            <Badge variant="secondary" className="text-xs sm:text-sm">Google AI</Badge>
            <Badge variant="secondary" className="text-xs sm:text-sm">Claude</Badge>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4 sm:mb-8 bg-white shadow-sm h-auto">
            <TabsTrigger value="scanner" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1 sm:px-3 text-xs sm:text-sm">
              <Search className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.scanner}</span>
              <span className="sm:hidden text-[10px]">Scan</span>
            </TabsTrigger>
            <TabsTrigger value="optimizer" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1 sm:px-3 text-xs sm:text-sm">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.optimizer}</span>
              <span className="sm:hidden text-[10px]">Opt</span>
            </TabsTrigger>
            <TabsTrigger value="publisher" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1 sm:px-3 text-xs sm:text-sm">
              <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.publisher}</span>
              <span className="sm:hidden text-[10px]">Pub</span>
            </TabsTrigger>
            <TabsTrigger value="gpt" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1 sm:px-3 text-xs sm:text-sm">
              <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.gptBuilder}</span>
              <span className="sm:hidden text-[10px]">GPT</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1 sm:px-3 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t.reports}</span>
              <span className="sm:hidden text-[10px]">Rep</span>
            </TabsTrigger>
          </TabsList>

          {/* Scanner Tab */}
          <TabsContent value="scanner">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  {t.scanner}
                </CardTitle>
                <CardDescription>
                  {t.checkWebsite}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>{t.enterUrl}</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={analyzeWebsite}
                      disabled={loading || !url}
                    >
                      {loading ? t.analyzing : t.analyze}
                    </Button>
                  </div>
                </div>

                {scanResult && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    {/* Score */}
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                            {scanResult.score}/100
                          </div>
                          <p className="text-slate-600 font-medium">{t.score}</p>
                          <Progress value={scanResult.score} className="mt-4" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Issues */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-500" />
                          {t.issues} ({scanResult.issues.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {scanResult.issues.map((issue, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-700">{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Recommendations */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          {t.recommendations}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {scanResult.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-700">{rec}</span>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  {t.optimizer}
                  {!isPremium('optimizer') && (
                    <Badge variant="secondary" className="ml-2">{t.premiumFeature}</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {t.generateOptimized}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isPremium('optimizer') ? (
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardContent className="pt-6 text-center space-y-4">
                      <div className="text-4xl">🔒</div>
                      <h3 className="text-xl font-bold text-slate-800">{t.premiumFeature}</h3>
                      <p className="text-slate-600">{t.unlockFeature}</p>
                      <Button onClick={handleUpgrade} size="lg" className="w-full">
                        {t.upgradeToPro}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t.businessName}</Label>
                    <Input
                      value={businessData.name}
                      onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                      placeholder="My Business"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.businessType}</Label>
                    <Select
                      value={businessData.type}
                      onValueChange={(value) => setBusinessData({...businessData, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">{t.restaurant}</SelectItem>
                        <SelectItem value="accounting">{t.accounting}</SelectItem>
                        <SelectItem value="consulting">{t.consulting}</SelectItem>
                        <SelectItem value="retail">{t.retail}</SelectItem>
                        <SelectItem value="services">{t.services}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t.description}</Label>
                  <Textarea
                    value={businessData.description}
                    onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
                    placeholder="Describe your business..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t.keywords}</Label>
                  <Input
                    value={businessData.keywords}
                    onChange={(e) => setBusinessData({...businessData, keywords: e.target.value})}
                    placeholder="accounting, tax, tel aviv, business"
                  />
                </div>

                <Button 
                  onClick={generateOptimizedCode}
                  disabled={loading || !businessData.name}
                  className="w-full"
                >
                  {loading ? 'Generating...' : t.generate}
                </Button>

                {optimizedCode && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex gap-2">
                      <Button onClick={downloadCode} variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        {t.download}
                      </Button>
                      <Button onClick={() => copyToClipboard(optimizedCode)} variant="outline" className="flex-1">
                        <Copy className="w-4 h-4 mr-2" />
                        {t.copy}
                      </Button>
                    </div>
                    
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-xs"><code>{optimizedCode}</code></pre>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  {t.publisher}
                  {!isPremium('publisher') && (
                    <Badge variant="secondary" className="ml-2">{t.premiumFeature}</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {t.publishDirectories}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isPremium('publisher') ? (
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="pt-6 text-center space-y-4">
                      <div className="text-4xl">🔒</div>
                      <h3 className="text-xl font-bold text-slate-800">{t.premiumFeature}</h3>
                      <p className="text-slate-600">{t.unlockFeature}</p>
                      <Button onClick={handleUpgrade} size="lg" className="w-full">
                        {t.upgradeToPro}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                <Alert>
                  <Globe className="w-4 h-4" />
                  <AlertDescription>
                    {t.publishAlert}
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={publishToDirectories}
                  disabled={loading || !businessData.name}
                  className="w-full"
                >
                  {loading ? 'Publishing...' : t.publish}
                </Button>

                {publishStatus.length > 0 && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
                    {publishStatus.map((status, idx) => (
                      <Card key={idx} className="bg-green-50 border-green-200">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <div>
                                <p className="font-medium text-green-900">{status.platform}</p>
                                <p className="text-sm text-green-700">{status.message}</p>
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(status.url, '_blank')}
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  {t.gptBuilder}
                  {!isPremium('gpt') && (
                    <Badge variant="secondary" className="ml-2">{t.premiumFeature}</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {t.createCustomBot}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isPremium('gpt') ? (
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <CardContent className="pt-6 text-center space-y-4">
                      <div className="text-4xl">🔒</div>
                      <h3 className="text-xl font-bold text-slate-800">{t.premiumFeature}</h3>
                      <p className="text-slate-600">{t.unlockFeature}</p>
                      <Button onClick={handleUpgrade} size="lg" className="w-full">
                        {t.upgradeToPro}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                <Button 
                  onClick={createGPT}
                  disabled={loading || !businessData.name}
                  className="w-full"
                >
                  {loading ? 'Creating...' : t.create}
                </Button>

                {gptData.name && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                      <CardHeader>
                        <CardTitle className="text-lg">{gptData.name}</CardTitle>
                        <CardDescription>{gptData.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">{t.instructions}</p>
                          <p className="text-sm text-slate-600 bg-white/50 p-3 rounded">
                            {gptData.instructions}
                          </p>
                        </div>
                        
                        {gptData.starters && (
                          <div>
                            <p className="text-sm font-medium text-slate-700 mb-2">{t.conversationStarters}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {gptData.starters.map((starter, idx) => (
                                <div key={idx} className="text-xs bg-white/50 p-2 rounded border border-purple-200">
                                  {starter}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <Button variant="outline" className="w-full mt-4">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {t.reports}
                  {subscription === 'free' && (
                    <Badge variant="outline" className="ml-2">Limited</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {t.trackMetrics}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {scanResult?.score || 0}
                      </div>
                      <p className="text-sm text-slate-600">{t.aiVisibilityScore}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className={subscription === 'free' ? 'opacity-50' : ''}>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {subscription === 'free' ? '🔒' : publishStatus.length}
                      </div>
                      <p className="text-sm text-slate-600">{t.platformsPublished}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className={subscription === 'free' ? 'opacity-50' : ''}>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        {subscription === 'free' ? '🔒' : (gptData.name ? 1 : 0)}
                      </div>
                      <p className="text-sm text-slate-600">{t.gptBotsCreated}</p>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <Eye className="w-4 h-4" />
                  <AlertDescription>
                    {t.completionAlert} {Math.round(((scanResult ? 25 : 0) + (optimizedCode ? 25 : 0) + (publishStatus.length > 0 ? 25 : 0) + (gptData.name ? 25 : 0)))}%
                    {subscription === 'free' && (
                      <Button 
                        variant="link" 
                        className="ml-2 p-0 h-auto"
                        onClick={handleUpgrade}
                      >
                        {t.upgradeToPro} →
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>

                <Button variant="outline" className="w-full" disabled={subscription === 'free'}>
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4" onClick={() => setShowPricing(false)}>
          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">{t.upgrade}</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowPricing(false)} className="h-8 w-8 p-0">
                ✕
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Free Plan */}
              <Card className={subscription === 'free' ? 'border-2 border-blue-500' : ''}>
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base sm:text-lg">{t.free}</CardTitle>
                    {subscription === 'free' && <Badge className="text-xs">Current</Badge>}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-4">
                    ₪0
                    <span className="text-xs sm:text-sm font-normal text-slate-500">{t.perMonth}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm font-medium text-slate-700">{t.includedFeatures}</p>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.feature1}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.feature2}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.feature3}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className={`${subscription === 'pro' ? 'border-2 border-blue-500' : ''} bg-gradient-to-br from-blue-50 to-indigo-50`}>
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base sm:text-lg">{t.pro}</CardTitle>
                    {subscription === 'pro' && <Badge className="text-xs">Current</Badge>}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-4">
                    ₪299
                    <span className="text-xs sm:text-sm font-normal text-slate-500">{t.perMonth}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm font-medium text-slate-700">{t.includedFeatures}</p>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.feature5sites}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.featureOptimizer}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.featurePublisher}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.featureGPT}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.featureReports}</span>
                    </li>
                  </ul>
                  {subscription !== 'pro' && (
                    <Button 
                      onClick={() => handleSubscribe('pro')}
                      disabled={loading}
                      className="w-full text-sm sm:text-base"
                    >
                      {loading ? 'Processing...' : t.subscribeNow}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className={`${subscription === 'premium' ? 'border-2 border-blue-500' : ''} bg-gradient-to-br from-purple-50 to-pink-50 sm:col-span-2 lg:col-span-1`}>
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base sm:text-lg">{t.premium}</CardTitle>
                    {subscription === 'premium' && <Badge className="text-xs">Current</Badge>}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-4">
                    ₪799
                    <span className="text-xs sm:text-sm font-normal text-slate-500">{t.perMonth}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm font-medium text-slate-700">{t.includedFeatures}</p>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.featureUnlimited}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.featureAPI}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.featureWhiteLabel}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.featurePriority}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                      <span>{t.featureReports}</span>
                    </li>
                  </ul>
                  {subscription !== 'premium' && (
                    <Button 
                      onClick={() => handleSubscribe('premium')}
                      disabled={loading}
                      className="w-full text-sm sm:text-base"
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
      <footer className="bg-white/50 backdrop-blur-md border-t border-slate-200 mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p>© 2025 AI Mention | {lang === 'he' ? 'עשה בישראל' : lang === 'ru' ? 'Сделано в Израиле' : 'Made in Israel'}</p>
        </div>
      </footer>
    </div>
  );
}
