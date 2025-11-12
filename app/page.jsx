"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import CookieBanner from '@/components/CookieBanner';
import SecurityBadge from '@/components/SecurityBadge';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import UpgradeModal from '@/components/UpgradeModal';
import {
  Search, Sparkles, TrendingUp, Shield, Activity,
  CheckCircle, XCircle, Lock, Zap, AlertCircle
} from 'lucide-react';

export default function Home() {
  // State
  const [lang, setLang] = useState('he');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [checkResult, setCheckResult] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // Translations
  const translations = {
    he: {
      title: "AI Recom",
      subtitle: "הפלטפורמה לבדיקת נוכחות ב-AI",
      scanner: "בדיקה",
      reports: "דוחות",
      enterUrl: "הזן כתובת אתר",
      check: "בדוק",
      checking: "בודק...",
      score: "ציון נראות",
      upgrade: "שדרג ל-Premium",
      free: "חינם",
      premium: "Premium",
      mentioned: "מוזכר",
      notMentioned: "לא מוזכר",
      position: "מיקום",
      context: "הקשר",
      upgradeToSee: "שדרג כדי לראות",
      noChecks: "אין בדיקות עדיין",
      runFirst: "הרץ בדיקה ראשונה",
      platforms: "פלטפורמות AI",
      recommendation: "המלצות",
      intro: "AI Recom בודק איך בינה מלאכותית רואה את האתר שלך ב-5 מערכות: ChatGPT, Claude, Perplexity, Grok ו-Gemini.",
    },
    ru: {
      title: "AI Recom",
      subtitle: "Платформа проверки видимости в AI",
      scanner: "Проверка",
      reports: "Отчёты",
      enterUrl: "Введите адрес сайта",
      check: "Проверить",
      checking: "Проверяю...",
      score: "Оценка видимости",
      upgrade: "Перейти на Premium",
      free: "Бесплатно",
      premium: "Premium",
      mentioned: "Упоминается",
      notMentioned: "Не упоминается",
      position: "Позиция",
      context: "Контекст",
      upgradeToSee: "Обновитесь чтобы увидеть",
      noChecks: "Нет проверок",
      runFirst: "Запустите первую проверку",
      platforms: "AI платформы",
      recommendation: "Рекомендации",
      intro: "AI Recom проверяет как искусственный интеллект видит ваш сайт в 5 системах: ChatGPT, Claude, Perplexity, Grok и Gemini.",
    },
    en: {
      title: "AI Recom",
      subtitle: "AI Visibility Check Platform",
      scanner: "Scanner",
      reports: "Reports",
      enterUrl: "Enter website URL",
      check: "Check",
      checking: "Checking...",
      score: "Visibility Score",
      upgrade: "Upgrade to Premium",
      free: "Free",
      premium: "Premium",
      mentioned: "Mentioned",
      notMentioned: "Not Mentioned",
      position: "Position",
      context: "Context",
      upgradeToSee: "Upgrade to see",
      noChecks: "No checks yet",
      runFirst: "Run your first check",
      platforms: "AI Platforms",
      recommendation: "Recommendations",
      intro: "AI Recom checks how artificial intelligence sees your website across 5 systems: ChatGPT, Claude, Perplexity, Grok, and Gemini.",
    },
  };

  const t = translations[lang];

  // API Call - Check Visibility
  const handleCheck = async () => {
    if (!url) return;

    setLoading(true);
    setProgress(0);
    setCheckResult(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const response = await fetch('/api/check-visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          language: lang,
          email: null, // TODO: Add user authentication
        }),
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const error = await response.json();
        if (response.status === 429) {
          // Rate limit exceeded
          alert(error.message);
          setShowUpgrade(true);
          return;
        }
        throw new Error(error.message || 'Check failed');
      }

      const data = await response.json();
      setCheckResult(data);
    } catch (error) {
      console.error('Check error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="glass-card sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 neon-glow-hover rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">{t.title}</h1>
                <p className="text-xs text-slate-400">{t.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={isPremium ? 'default' : 'outline'}
                className="cursor-pointer neon-glow-hover"
                onClick={() => setShowUpgrade(true)}
              >
                {isPremium ? t.premium : t.free}
              </Badge>
              <Button variant={lang === 'ru' ? 'default' : 'outline'} size="sm" onClick={() => setLang('ru')}>RU</Button>
              <Button variant={lang === 'en' ? 'default' : 'outline'} size="sm" onClick={() => setLang('en')}>EN</Button>
              <Button variant={lang === 'he' ? 'default' : 'outline'} size="sm" onClick={() => setLang('he')}>עב</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero */}
        <div className="text-center mb-8">
          <Shield className="w-20 h-20 text-blue-500 mx-auto mb-4 float-animation" />
          <p className="text-slate-300 max-w-2xl mx-auto">{t.intro}</p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['ChatGPT', 'Claude', 'Perplexity', 'Grok', 'Gemini'].map(platform => (
              <Badge key={platform} className="glass-card neon-glow-hover border-blue-500/30 py-2 px-3">
                <Activity className="w-4 h-4 me-2" />
                {platform}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="scanner" className="w-full">
          <TabsList className="glass-card grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="scanner" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              {t.scanner}
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {t.reports}
            </TabsTrigger>
          </TabsList>

          {/* SCANNER TAB */}
          <TabsContent value="scanner">
            <Card className="glass-card border-blue-500/30">
              <CardHeader>
                <CardTitle className="gradient-text flex items-center gap-2">
                  <Search className="w-6 h-6" />
                  {t.scanner}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* URL Input */}
                <div className="space-y-2">
                  <Input
                    type="url"
                    placeholder={t.enterUrl}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-12 text-base bg-white text-slate-900"
                    disabled={loading}
                  />
                  <SecurityBadge variant="compact" lang={lang} />
                </div>

                <Button
                  onClick={handleCheck}
                  disabled={!url || loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 neon-glow text-lg"
                >
                  {loading ? (
                    <>
                      <Zap className="w-5 h-5 me-2 animate-pulse" />
                      {t.checking}
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 me-2" />
                      {t.check}
                    </>
                  )}
                </Button>

                {/* Progress */}
                {loading && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-center text-slate-400">{progress}%</p>
                  </div>
                )}

                {/* Results */}
                {checkResult && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    {/* Score */}
                    <Card className="glass-card border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-sm text-slate-400 mb-2">{t.score}</p>
                          <p className="text-6xl font-bold gradient-text">{checkResult.visibilityScore}/100</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* AI Platform Results */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        {t.platforms}
                      </h3>

                      {Object.entries(checkResult.results).map(([platform, result]) => (
                        <Card key={platform} className="glass-card border-slate-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <Activity className={`w-5 h-5 ${result.mentioned ? 'text-green-400' : 'text-red-400'}`} />
                                <h4 className="font-bold text-white capitalize">{platform}</h4>
                              </div>
                              <Badge variant={result.mentioned ? 'default' : 'destructive'}>
                                {result.mentioned ? t.mentioned : t.notMentioned}
                              </Badge>
                            </div>

                            {result.mentioned && (
                              <div className="space-y-2 text-sm">
                                {/* Position */}
                                {isPremium && result.position && (
                                  <div className="flex items-center gap-2 text-slate-300">
                                    <span className="text-slate-400">{t.position}:</span>
                                    <span className="font-bold text-blue-400">#{result.position}</span>
                                  </div>
                                )}

                                {/* Context */}
                                {isPremium && result.context ? (
                                  <div className="p-3 bg-slate-800/50 rounded border border-slate-700 text-slate-300">
                                    <p className="text-xs text-slate-400 mb-1">{t.context}:</p>
                                    <p>{result.context}</p>
                                  </div>
                                ) : result.mentioned && !isPremium && (
                                  <div className="p-3 bg-slate-900/50 rounded border border-blue-500/30 backdrop-blur relative">
                                    <div className="filter blur-sm text-slate-500 select-none">
                                      This is a sample context text that shows what Premium users can see...
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <Button
                                        size="sm"
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 neon-glow"
                                        onClick={() => setShowUpgrade(true)}
                                      >
                                        <Lock className="w-4 h-4 me-2" />
                                        {t.upgradeToSee}
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                {/* Confidence */}
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-400 text-xs">Confidence:</span>
                                  <Progress value={result.confidence} className="h-2 flex-1" />
                                  <span className="text-xs text-slate-300">{result.confidence}%</span>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Recommendations */}
                    {checkResult.recommendations && checkResult.recommendations.priority.length > 0 && (
                      <Card className="glass-card border-yellow-500/30">
                        <CardHeader>
                          <CardTitle className="text-yellow-400 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            {t.recommendation}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {checkResult.recommendations.priority.map((rec, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-slate-300">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {/* Upgrade CTA */}
                    {!isPremium && (
                      <Card className="glass-card border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-purple-900/30 neon-glow">
                        <CardContent className="p-6 text-center">
                          <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                          <h3 className="text-xl font-bold gradient-text mb-2">
                            {lang === 'he' ? 'שדרג ל-Premium' : lang === 'ru' ? 'Перейти на Premium' : 'Upgrade to Premium'}
                          </h3>
                          <p className="text-slate-300 mb-4">
                            {lang === 'he' ? 'קבל גישה מלאה למיקום, הקשר, היסטוריה ודוחות' :
                             lang === 'ru' ? 'Получите полный доступ к позициям, контексту, истории и отчётам' :
                             'Get full access to positions, context, history, and reports'}
                          </p>
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 neon-glow"
                            onClick={() => setShowUpgrade(true)}
                          >
                            <Sparkles className="w-5 h-5 me-2" />
                            {t.upgrade} - ₪250/
                            {lang === 'he' ? 'חודש' : lang === 'ru' ? 'месяц' : 'month'}
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* REPORTS TAB */}
          <TabsContent value="reports">
            <Card className="glass-card border-purple-500/30">
              <CardHeader>
                <CardTitle className="gradient-text flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  {t.reports}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {checkResult ? (
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      {lang === 'he' ? 'הבדיקה האחרונה' : lang === 'ru' ? 'Последняя проверка' : 'Last Check'}
                    </h3>
                    <p className="text-slate-400 mb-4">
                      {lang === 'he' ? 'ציון: ' : lang === 'ru' ? 'Оценка: ' : 'Score: '}
                      <span className="text-2xl font-bold gradient-text">{checkResult.visibilityScore}/100</span>
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(checkResult.timestamp).toLocaleString(lang)}
                    </p>

                    {!isPremium && (
                      <div className="mt-8 p-6 glass-card border border-blue-500/30 rounded-lg">
                        <Lock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                        <h4 className="text-lg font-bold text-white mb-2">
                          {lang === 'he' ? 'שדרג לראות היסטוריה מלאה' :
                           lang === 'ru' ? 'Обновитесь для полной истории' :
                           'Upgrade for Full History'}
                        </h4>
                        <Button
                          className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 neon-glow"
                          onClick={() => setShowUpgrade(true)}
                        >
                          <Sparkles className="w-4 h-4 me-2" />
                          {t.upgrade}
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-400 mb-2">{t.noChecks}</h3>
                    <p className="text-slate-500">{t.runFirst}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="glass-card border-t border-white/10 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © 2025 AI Recomendation | Limed Solution
          </p>
        </div>
      </footer>

      {/* Modals & Widgets */}
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} lang={lang} />
      <CookieBanner lang={lang} />
      <AccessibilityWidget lang={lang} />
    </div>
  );
}
