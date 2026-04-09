import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
export default function Privacy() {
  return (
    <>
      <Head><title>מדיניות פרטיות — מגע</title></Head>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-700 rounded-xl flex items-center justify-center text-white font-bold text-sm">מ</div>
            <span className="font-semibold text-gray-900 text-lg">מגע</span>
          </Link>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-5 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">מדיניות פרטיות</h1>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section><h2 className="text-lg font-semibold text-gray-800 mb-2">איסוף מידע</h2><p>האתר אוסף מידע שנמסר מרצון על ידי המטפלים בעת ההרשמה: שם, טלפון, אזור, תמונה ופרטי התמחות. מידע זה משמש אך ורק לצורך הצגת פרופיל המטפל.</p></section>
          <section><h2 className="text-lg font-semibold text-gray-800 mb-2">שימוש במידע</h2><p>המידע לא יועבר לצד שלישי ללא הסכמה מפורשת. המידע משמש להצגת פרופיל המטפל בלבד.</p></section>
          <section><h2 className="text-lg font-semibold text-gray-800 mb-2">אבטחת מידע</h2><p>המידע מאוחסן בצורה מאובטחת באמצעות Supabase, שירות ענן מאובטח העומד בתקני אבטחה בינלאומיים.</p></section>
          <section><h2 className="text-lg font-semibold text-gray-800 mb-2">זכות למחיקה</h2><p>כל מטפל רשאי לבקש מחיקת הפרטים שלו מהאתר בכל עת על ידי פנייה אלינו: info@maga.co.il</p></section>
        </div>
      </main>
      <Footer />
    </>
  )
}
