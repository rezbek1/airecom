"use client";
import { useState, useEffect } from 'react';
import { Accessibility, X, Plus, Minus, Eye, Type, ZoomIn, Contrast, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const translations = {
  ru: {
    title: "Настройки доступности",
    fontSize: "Размер текста",
    contrast: "Контрастность",
    textSpacing: "Интервал текста",
    lineHeight: "Высота строки",
    cursor: "Крупный курсор",
    links: "Подчеркивание ссылок",
    reset: "Сбросить"
  },
  en: {
    title: "Accessibility Settings",
    fontSize: "Font Size",
    contrast: "Contrast",
    textSpacing: "Text Spacing",
    lineHeight: "Line Height",
    cursor: "Large Cursor",
    links: "Underline Links",
    reset: "Reset"
  },
  he: {
    title: "הגדרות נגישות",
    fontSize: "גודל גופן",
    contrast: "ניגודיות",
    textSpacing: "ריווח טקסט",
    lineHeight: "גובה שורה",
    cursor: "סמן גדול",
    links: "קישורים מודגשים",
    reset: "איפוס"
  }
};

export default function AccessibilityWidget({ lang = 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 0,
    contrast: 'normal',
    textSpacing: 0,
    lineHeight: 0,
    largeCursor: false,
    underlineLinks: false
  });

  const t = translations[lang] || translations.en;

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }
  }, []);

  // Apply settings to document
  const applySettings = (newSettings) => {
    const root = document.documentElement;

    // Font size adjustment
    root.style.setProperty('--a11y-font-scale', `${1 + (newSettings.fontSize * 0.1)}`);

    // Text spacing
    root.style.setProperty('--a11y-letter-spacing', `${newSettings.textSpacing * 0.05}em`);

    // Line height
    root.style.setProperty('--a11y-line-height', `${1.5 + (newSettings.lineHeight * 0.1)}`);

    // Contrast
    if (newSettings.contrast === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large cursor
    if (newSettings.largeCursor) {
      root.classList.add('large-cursor');
    } else {
      root.classList.remove('large-cursor');
    }

    // Underline links
    if (newSettings.underlineLinks) {
      root.classList.add('underline-links');
    } else {
      root.classList.remove('underline-links');
    }
  };

  // Update settings
  const updateSettings = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
    applySettings(newSettings);
  };

  // Reset settings
  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 0,
      contrast: 'normal',
      textSpacing: 0,
      lineHeight: 0,
      largeCursor: false,
      underlineLinks: false
    };
    setSettings(defaultSettings);
    localStorage.setItem('accessibility-settings', JSON.stringify(defaultSettings));
    applySettings(defaultSettings);
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-4 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg neon-glow flex items-center justify-center transition-all hover:scale-110"
        aria-label={t.title}
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div
          className={`fixed ${lang === 'he' ? 'left-4' : 'right-4'} bottom-20 z-50 w-80 glass-card rounded-lg shadow-2xl neon-glow p-4 space-y-4`}
          dir={lang === 'he' ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-600 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Accessibility className="w-5 h-5" />
              {t.title}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Type className="w-4 h-4" />
                {t.fontSize}
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateSettings('fontSize', Math.max(-2, settings.fontSize - 1))}
                  className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                  aria-label="Decrease font size"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white w-8 text-center">{settings.fontSize}</span>
                <button
                  onClick={() => updateSettings('fontSize', Math.min(5, settings.fontSize + 1))}
                  className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                  aria-label="Increase font size"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Contrast */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Contrast className="w-4 h-4" />
              {t.contrast}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => updateSettings('contrast', 'normal')}
                className={`flex-1 h-10 rounded ${settings.contrast === 'normal' ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'} text-white text-sm font-medium transition-colors`}
              >
                Normal
              </button>
              <button
                onClick={() => updateSettings('contrast', 'high')}
                className={`flex-1 h-10 rounded ${settings.contrast === 'high' ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'} text-white text-sm font-medium transition-colors`}
              >
                High
              </button>
            </div>
          </div>

          {/* Text Spacing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <ZoomIn className="w-4 h-4" />
                {t.textSpacing}
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateSettings('textSpacing', Math.max(0, settings.textSpacing - 1))}
                  className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                  aria-label="Decrease text spacing"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white w-8 text-center">{settings.textSpacing}</span>
                <button
                  onClick={() => updateSettings('textSpacing', Math.min(5, settings.textSpacing + 1))}
                  className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                  aria-label="Increase text spacing"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Line Height */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {t.lineHeight}
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateSettings('lineHeight', Math.max(0, settings.lineHeight - 1))}
                  className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                  aria-label="Decrease line height"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white w-8 text-center">{settings.lineHeight}</span>
                <button
                  onClick={() => updateSettings('lineHeight', Math.min(5, settings.lineHeight + 1))}
                  className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                  aria-label="Increase line height"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Toggle Options */}
          <div className="space-y-2 border-t border-slate-600 pt-3">
            <button
              onClick={() => updateSettings('largeCursor', !settings.largeCursor)}
              className={`w-full h-10 rounded flex items-center justify-between px-3 ${settings.largeCursor ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'} text-white text-sm font-medium transition-colors`}
            >
              <span className="flex items-center gap-2">
                <MousePointer className="w-4 h-4" />
                {t.cursor}
              </span>
              <div className={`w-10 h-6 rounded-full relative transition-colors ${settings.largeCursor ? 'bg-blue-400' : 'bg-slate-600'}`}>
                <div className={`absolute top-1 ${settings.largeCursor ? (lang === 'he' ? 'left-1' : 'right-1') : (lang === 'he' ? 'right-1' : 'left-1')} w-4 h-4 rounded-full bg-white transition-all`}></div>
              </div>
            </button>

            <button
              onClick={() => updateSettings('underlineLinks', !settings.underlineLinks)}
              className={`w-full h-10 rounded flex items-center justify-between px-3 ${settings.underlineLinks ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'} text-white text-sm font-medium transition-colors`}
            >
              <span className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                {t.links}
              </span>
              <div className={`w-10 h-6 rounded-full relative transition-colors ${settings.underlineLinks ? 'bg-blue-400' : 'bg-slate-600'}`}>
                <div className={`absolute top-1 ${settings.underlineLinks ? (lang === 'he' ? 'left-1' : 'right-1') : (lang === 'he' ? 'right-1' : 'left-1')} w-4 h-4 rounded-full bg-white transition-all`}></div>
              </div>
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetSettings}
            className="w-full h-10 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
          >
            {t.reset}
          </button>
        </div>
      )}
    </>
  );
}
