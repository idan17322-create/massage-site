import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
export default function Terms() {
  return (
    <>
      <Head><title>תקנון — מגע</title></Head>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-700 rounded-xl flex items-center justify-center text-white font-bold text-sm">מ</div>
            <span className="font-semibold text-gray-900 text-lg">מגע</span>
          </Link>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-5 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">תקנון האתר</h1>
        <div className="prose prose-gray space-y-6 text-gray-600 leading-relaxed">
          <section><h2 className="text-lg font-semibold text-gray-800 mb-2">1. כללי</h2><p>אתר מגע (להלן: "האתר") הינו פלטפורמה לחיבור בין מטפלים בעיסוי ובין לקוחות המחפשים שירותי עיסוי. השימוש באתר מהווה הסכמה לתנאי תקנון זה.</p></section>
          <section><h2 className="text-lg font-semibold text-gray-800 mb-2">2. שירות הפלטפורמה</h2><p>האתר משמש כפלטפורמת תיווך בלבד. האתר אינו אחראי לאיכות השירותים הניתנים על ידי המטפלים, לביטול פגישות, לנזקים מכל סוג שהוא הנובעים מהשימוש בשירותי המטפלים.</p></section>
          <section><h2 className="text-lg font-semibold text-gray-800 mb-2">3. מטפלים</h2><p>כל מטפל הרשום באתר עבר בדיקה ראשונית על ידי צוות האתר. עם זאת, האתר אינו מהווה ערובה למקצועיות המטפל. האחריות על הצגת פרטים נכונים מוטלת על המטפל בלבד.</p></section>
          <section><h2 className="text-lg font-semibold text-gray-800 mb-2">4. שינויים בתקנון</h2><p>האתר שומר לעצמו את הזכות לשנות את התקנון בכל עת. שינויים יפורסמו באתר.</p></section>
        </div>
      </main>
      <Footer />
    </>
  )
}
