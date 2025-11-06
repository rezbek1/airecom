"use client";
import { Shield, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const translations = {
  ru: {
    encrypted: "Данные зашифрованы",
    security: "AES-256-GCM шифрование"
  },
  en: {
    encrypted: "Data Encrypted",
    security: "AES-256-GCM Encryption"
  },
  he: {
    encrypted: "נתונים מוצפנים",
    security: "הצפנת AES-256-GCM"
  }
};

export default function SecurityBadge({ lang = 'en', variant = 'full' }) {
  const t = translations[lang] || translations.en;

  if (variant === 'compact') {
    return (
      <Badge className="glass-card border-green-500/30 bg-green-500/10 text-green-400 flex items-center gap-1.5 px-3 py-1.5">
        <Lock className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">{t.encrypted}</span>
      </Badge>
    );
  }

  return (
    <div className="glass-card border-green-500/30 bg-green-500/5 rounded-lg p-4 flex items-center gap-3 neon-glow">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-green-400" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-4 h-4 text-green-400" />
          <h3 className="text-sm font-bold text-green-300">{t.encrypted}</h3>
        </div>
        <p className="text-xs text-slate-400">{t.security}</p>
      </div>
    </div>
  );
}
