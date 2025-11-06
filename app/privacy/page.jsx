"use client";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold gradient-text mb-8">Privacy Policy / מדיניות פרטיות</h1>

        <div className="space-y-8 text-slate-300">
          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">1. General Information / מידע כללי</h2>
            <p className="mb-4">
              <strong>English:</strong> This privacy policy describes how AI Recomendation by Limed Solution ("we", "us", "our") collects, uses, and protects your personal information in accordance with Amendment 13 of the Privacy Protection Law, 1981 (תיקון 13 לחוק הגנת הפרטיות, התשמ"א-1981).
            </p>
            <p className="mb-4" dir="rtl">
              <strong>עברית:</strong> מדיניות פרטיות זו מתארת כיצד AI Recomendation של Limed Solution ("אנו", "שלנו") אוספת, משתמשת ומגינה על המידע האישי שלך בהתאם לתיקון 13 לחוק הגנת הפרטיות, התשמ"א-1981.
            </p>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect / מידע שאנו אוספים</h2>
            <p className="mb-4">
              <strong>English:</strong> We collect the following types of information:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Website URLs you submit for analysis</li>
              <li>Business information (name, type, description)</li>
              <li>Usage data and analytics</li>
              <li>Cookies and tracking technologies</li>
            </ul>
            <p className="mb-4" dir="rtl">
              <strong>עברית:</strong> אנו אוספים את סוגי המידע הבאים:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2" dir="rtl">
              <li>כתובות אתרים שאתה שולח לניתוח</li>
              <li>מידע עסקי (שם, סוג, תיאור)</li>
              <li>נתוני שימוש וניתוח</li>
              <li>עוגיות וטכנולוגיות מעקב</li>
            </ul>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information / כיצד אנו משתמשים במידע שלך</h2>
            <p className="mb-4">
              <strong>English:</strong> We use your information to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Provide AI visibility analysis services</li>
              <li>Generate optimization recommendations</li>
              <li>Improve our services and user experience</li>
              <li>Communicate with you about our services</li>
            </ul>
            <p className="mb-4" dir="rtl">
              <strong>עברית:</strong> אנו משתמשים במידע שלך כדי:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2" dir="rtl">
              <li>לספק שירותי ניתוח נראות AI</li>
              <li>ליצור המלצות אופטימיזציה</li>
              <li>לשפר את השירותים וחוויית המשתמש שלנו</li>
              <li>לתקשר איתך על השירותים שלנו</li>
            </ul>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies and Tracking / עוגיות ומעקב</h2>
            <p className="mb-4">
              <strong>English:</strong> In accordance with Amendment 13, we inform you that this website uses cookies. By continuing to use this site, you consent to our use of cookies. You can disable cookies in your browser settings at any time.
            </p>
            <p dir="rtl">
              <strong>עברית:</strong> בהתאם לתיקון 13, אנו מודיעים לך שאתר זה משתמש בעוגיות. על ידי המשך השימוש באתר זה, אתה מסכים לשימוש שלנו בעוגיות. אתה יכול להשבית עוגיות בהגדרות הדפדפן שלך בכל עת.
            </p>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights / הזכויות שלך</h2>
            <p className="mb-4">
              <strong>English:</strong> Under Israeli privacy law, you have the right to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p className="mb-4" dir="rtl">
              <strong>עברית:</strong> על פי חוק הפרטיות הישראלי, יש לך זכות:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2" dir="rtl">
              <li>לגשת למידע האישי שלך</li>
              <li>לבקש תיקון מידע לא מדויק</li>
              <li>לבקש מחיקת המידע שלך</li>
              <li>למשוך הסכמה לעיבוד נתונים</li>
            </ul>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Security / אבטחת מידע</h2>
            <p className="mb-4">
              <strong>English:</strong> We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p dir="rtl">
              <strong>עברית:</strong> אנו מיישמים אמצעים טכניים וארגוניים מתאימים כדי להגן על המידע האישי שלך מפני גישה לא מורשית, שינוי, גילוי או הרס.
            </p>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us / צור קשר</h2>
            <p className="mb-4">
              <strong>English:</strong> For privacy-related inquiries or to exercise your rights, please contact us at:
            </p>
            <div className="mb-4 p-4 bg-slate-800 rounded">
              <p><strong>Company:</strong> Limed Solution</p>
              <p><strong>Email:</strong> info@limed.co.il</p>
              <p><strong>Address:</strong> Israel</p>
            </div>
            <p dir="rtl">
              <strong>עברית:</strong> לפניות הקשורות לפרטיות או כדי לממש את זכויותיך, אנא צור איתנו קשר בכתובת:
            </p>
            <div className="p-4 bg-slate-800 rounded" dir="rtl">
              <p><strong>חברה:</strong> Limed Solution</p>
              <p><strong>דוא"ל:</strong> info@limed.co.il</p>
              <p><strong>כתובת:</strong> ישראל</p>
            </div>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy / שינויים במדיניות זו</h2>
            <p className="mb-4">
              <strong>English:</strong> We may update this privacy policy from time to time. The date of the last update will be indicated at the top of this page.
            </p>
            <p dir="rtl">
              <strong>עברית:</strong> אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. תאריך העדכון האחרון יצוין בראש דף זה.
            </p>
          </section>

          <div className="glass-card p-6 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-center">
              <strong>Last Updated:</strong> January 2025<br />
              <strong>עודכן לאחרונה:</strong> ינואר 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
