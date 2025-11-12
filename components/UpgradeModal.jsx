/**
 * UpgradeModal - модальное окно для перехода на Premium
 * Freemium: 250₪/месяц
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Sparkles, Lock } from 'lucide-react';

const UpgradeModal = ({ isOpen, onClose, lang = 'he' }) => {
  if (!isOpen) return null;

  const translations = {
    he: {
      title: 'שדרג ל-Premium',
      subtitle: 'קבל גישה מלאה לכל התכונות',
      price: '₪250',
      perMonth: '/חודש',
      upgrade: 'שדרג עכשיו',
      cancel: 'ביטול',
      freemium: 'חינם',
      premium: 'Premium',
      feature1: 'בדיקה אחת לשעה',
      feature2: 'רק מצב Yes/No',
      feature3: 'ללא היסטוריה',
      feature4: 'ללא דוחות',
      premiumFeature1: 'בדיקות ללא הגבלה',
      premiumFeature2: 'מיקום + הקשר מלא',
      premiumFeature3: 'היסטוריה מלאה',
      premiumFeature4: 'דוחות וגרפים',
      premiumFeature5: 'בדיקות שבועיות אוטומטיות',
      premiumFeature6: 'ייצוא ל-PDF/CSV',
    },
    ru: {
      title: 'Перейти на Premium',
      subtitle: 'Получите полный доступ ко всем функциям',
      price: '250₪',
      perMonth: '/месяц',
      upgrade: 'Перейти сейчас',
      cancel: 'Отмена',
      freemium: 'Бесплатно',
      premium: 'Premium',
      feature1: '1 проверка в час',
      feature2: 'Только Yes/No',
      feature3: 'Без истории',
      feature4: 'Без отчётов',
      premiumFeature1: 'Безлимитные проверки',
      premiumFeature2: 'Позиция + полный контекст',
      premiumFeature3: 'Полная история',
      premiumFeature4: 'Отчёты и графики',
      premiumFeature5: 'Автопроверка каждую неделю',
      premiumFeature6: 'Экспорт в PDF/CSV',
    },
    en: {
      title: 'Upgrade to Premium',
      subtitle: 'Get full access to all features',
      price: '250₪',
      perMonth: '/month',
      upgrade: 'Upgrade Now',
      cancel: 'Cancel',
      freemium: 'Free',
      premium: 'Premium',
      feature1: '1 check per hour',
      feature2: 'Yes/No only',
      feature3: 'No history',
      feature4: 'No reports',
      premiumFeature1: 'Unlimited checks',
      premiumFeature2: 'Position + full context',
      premiumFeature3: 'Full history',
      premiumFeature4: 'Reports & graphs',
      premiumFeature5: 'Weekly auto-checks',
      premiumFeature6: 'Export to PDF/CSV',
    },
  };

  const t = translations[lang];

  const handleUpgrade = () => {
    // Redirect to payment link
    const paymentUrl = process.env.NEXT_PUBLIC_PAYMENT_LINK_URL || 'https://your-payment-provider.com/checkout';
    window.open(paymentUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <Card className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto border-blue-500/30">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-16 h-16 text-blue-500 animate-pulse" />
          </div>
          <CardTitle className="text-3xl gradient-text">{t.title}</CardTitle>
          <CardDescription className="text-lg text-slate-300 mt-2">{t.subtitle}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Freemium Plan */}
            <div className="glass-card p-6 border border-slate-500/30 rounded-lg relative">
              <Badge className="absolute top-4 right-4" variant="outline">
                {t.freemium}
              </Badge>
              <h3 className="text-2xl font-bold mb-4 text-slate-300">{t.freemium}</h3>
              <p className="text-4xl font-bold mb-6 text-slate-400">₪0</p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-400">
                  <XCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                  <span>{t.feature1}</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <XCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                  <span>{t.feature2}</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <XCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                  <span>{t.feature3}</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <XCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                  <span>{t.feature4}</span>
                </li>
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="glass-card p-6 border-2 border-blue-500/50 rounded-lg relative neon-glow">
              <Badge className="absolute top-4 right-4 bg-blue-600">
                {t.premium}
              </Badge>
              <h3 className="text-2xl font-bold mb-4 gradient-text">{t.premium}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-blue-400">{t.price}</span>
                <span className="text-xl text-slate-400">{t.perMonth}</span>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-400 mt-0.5" />
                  <span className="text-white">{t.premiumFeature1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-400 mt-0.5" />
                  <span className="text-white">{t.premiumFeature2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-400 mt-0.5" />
                  <span className="text-white">{t.premiumFeature3}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-400 mt-0.5" />
                  <span className="text-white">{t.premiumFeature4}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-400 mt-0.5" />
                  <span className="text-white">{t.premiumFeature5}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-400 mt-0.5" />
                  <span className="text-white">{t.premiumFeature6}</span>
                </li>
              </ul>

              <Button
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 neon-glow text-lg py-6"
                onClick={handleUpgrade}
              >
                <Sparkles className="w-5 h-5 me-2" />
                {t.upgrade}
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" onClick={onClose} className="neon-glow-hover">
              {t.cancel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpgradeModal;
