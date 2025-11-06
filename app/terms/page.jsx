"use client";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold gradient-text mb-8">Terms of Service / תנאי שימוש</h1>

        <div className="space-y-8 text-slate-300">
          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms / קבלת התנאים</h2>
            <p className="mb-4">
              <strong>English:</strong> By accessing and using AI Recomendation services provided by Limed Solution, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
            <p dir="rtl">
              <strong>עברית:</strong> על ידי גישה ושימוש בשירותי AI Recomendation המסופקים על ידי Limed Solution, אתה מקבל ומסכים להיות כפוף לתנאי שימוש אלה. אם אינך מסכים לתנאים אלה, אנא אל תשתמש בשירותים שלנו.
            </p>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">2. Service Description / תיאור השירות</h2>
            <p className="mb-4">
              <strong>English:</strong> AI Recomendation provides:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>AI visibility analysis for websites</li>
              <li>Optimization recommendations</li>
              <li>Content publishing services</li>
              <li>GPT bot configuration tools</li>
            </ul>
            <p className="mb-4" dir="rtl">
              <strong>עברית:</strong> AI Recomendation מספקת:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2" dir="rtl">
              <li>ניתוח נראות AI לאתרים</li>
              <li>המלצות אופטימיזציה</li>
              <li>שירותי פרסום תוכן</li>
              <li>כלי תצורת בוט GPT</li>
            </ul>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities / אחריות המשתמש</h2>
            <p className="mb-4">
              <strong>English:</strong> You agree to:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Provide accurate information</li>
              <li>Use the service lawfully and ethically</li>
              <li>Not attempt to harm or disrupt the service</li>
              <li>Respect intellectual property rights</li>
            </ul>
            <p className="mb-4" dir="rtl">
              <strong>עברית:</strong> אתה מסכים:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2" dir="rtl">
              <li>לספק מידע מדויק</li>
              <li>להשתמש בשירות באופן חוקי ואתי</li>
              <li>לא לנסות לפגוע או להפריע לשירות</li>
              <li>לכבד זכויות קניין רוחני</li>
            </ul>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability / הגבלת אחריות</h2>
            <p className="mb-4">
              <strong>English:</strong> Limed Solution provides this service "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>
            <p dir="rtl">
              <strong>עברית:</strong> Limed Solution מספקת שירות זה "כמות שהוא" ללא אחריות מכל סוג שהוא. איננו אחראים לנזקים הנובעים מהשימוש שלך בשירות, לרבות אך לא רק נזקים ישירים, עקיפים, מקריים או תוצאתיים.
            </p>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property / קניין רוחני</h2>
            <p className="mb-4">
              <strong>English:</strong> All content, features, and functionality of AI Recomendation are owned by Limed Solution and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p dir="rtl">
              <strong>עברית:</strong> כל התוכן, התכונות והפונקציונליות של AI Recomendation הם בבעלות Limed Solution ומוגנים על ידי חוקי זכויות יוצרים, סימני מסחר וקניין רוחני אחרים בינלאומיים.
            </p>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">6. Termination / סיום</h2>
            <p className="mb-4">
              <strong>English:</strong> We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
            </p>
            <p dir="rtl">
              <strong>עברית:</strong> אנו שומרים לעצמנו את הזכות לסיים או להשעות את הגישה שלך לשירותים שלנו בכל עת, ללא הודעה מוקדמת, בגין התנהגות שאנו מאמינים שמפרה את תנאי השימוש האלה או מזיקה למשתמשים אחרים, לנו או לצדדים שלישיים.
            </p>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">7. Governing Law / דין חל</h2>
            <p className="mb-4">
              <strong>English:</strong> These Terms of Service shall be governed by and construed in accordance with the laws of the State of Israel, without regard to its conflict of law provisions.
            </p>
            <p dir="rtl">
              <strong>עברית:</strong> תנאי שימוש אלה יהיו כפופים ויפורשו בהתאם לחוקי מדינת ישראל, ללא קשר להוראות ברירת הדין שלה.
            </p>
          </section>

          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">8. Contact / יצירת קשר</h2>
            <p className="mb-4">
              <strong>English:</strong> For questions about these Terms of Service, please contact:
            </p>
            <div className="mb-4 p-4 bg-slate-800 rounded">
              <p><strong>Company:</strong> Limed Solution</p>
              <p><strong>Email:</strong> info@limed.co.il</p>
              <p><strong>Address:</strong> Israel</p>
            </div>
            <p dir="rtl">
              <strong>עברית:</strong> לשאלות לגבי תנאי שימוש אלה, אנא צור קשר:
            </p>
            <div className="p-4 bg-slate-800 rounded" dir="rtl">
              <p><strong>חברה:</strong> Limed Solution</p>
              <p><strong>דוא"ל:</strong> info@limed.co.il</p>
              <p><strong>כתובת:</strong> ישראל</p>
            </div>
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
