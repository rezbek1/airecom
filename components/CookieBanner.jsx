"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const translations = {
  ru: {
    title: "Мы используем cookies",
    message: "Этот сайт использует cookies для улучшения пользовательского опыта. Продолжая использовать сайт, вы соглашаетесь с нашей политикой конфиденциальности согласно תיקון 13 חוק הגנת הפרטיות.",
    accept: "Принять",
    decline: "Отклонить",
    settings: "Настройки",
    privacy: "Политика конфиденциальности"
  },
  en: {
    title: "We use cookies",
    message: "This site uses cookies to improve user experience. By continuing to use the site, you agree to our privacy policy in accordance with Amendment 13 of the Privacy Protection Law.",
    accept: "Accept",
    decline: "Decline",
    settings: "Settings",
    privacy: "Privacy Policy"
  },
  he: {
    title: "אנו משתמשים בעוגיות",
    message: "אתר זה משתמש בעוגיות לשיפור חוויית המשתמש. המשך השימוש באתר מהווה הסכמה למדיניות הפרטיות שלנו בהתאם לתיקון 13 לחוק הגנת הפרטיות.",
    accept: "אשר",
    decline: "דחה",
    settings: "הגדרות",
    privacy: "מדיניות פרטיות"
  }
};

export default function CookieBanner({ lang = 'en' }) {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[lang] || translations.en;

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in slide-in-from-bottom-5">
      <div className="container mx-auto max-w-6xl">
        <div className="glass-card border border-blue-500/30 rounded-lg p-6 neon-glow relative">
          <button
            onClick={handleDecline}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="flex-1">
              <h3 className="text-xl font-bold gradient-text mb-2">{t.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4 md:mb-0">
                {t.message}
              </p>
              <a
                href="/privacy"
                className="text-blue-400 hover:text-blue-300 text-sm underline inline-block mt-2"
              >
                {t.privacy}
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                onClick={handleDecline}
                variant="outline"
                className="glass-card border-white/10 hover:bg-white/10 w-full sm:w-auto"
              >
                {t.decline}
              </Button>
              <Button
                onClick={handleAccept}
                className="btn-futuristic neon-glow-hover w-full sm:w-auto"
              >
                {t.accept}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
