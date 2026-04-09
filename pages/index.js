import Head from 'next/head'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import SearchBar from '../components/SearchBar'
import TherapistCard from '../components/TherapistCard'
import WhatsAppFAB from '../components/WhatsAppFAB'
import AccessibilityWidget from '../components/AccessibilityWidget'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function Home() {
  const [therapists, setTherapists] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [area, setArea] = useState('')
  const [type, setType] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchTherapists()
  }, [])

  useEffect(() => {
    let result = therapists
    if (area) result = result.filter(t => t.area === area)
    if (type) result = result.filter(t => t.types?.includes(type))
    if (query) {
      result = result.filter(t => 
        t.name.toLowerCase().includes(query.toLowerCase()) || 
        t.description?.toLowerCase().includes(query.toLowerCase()) ||
        t.types?.some(type => type.includes(query))
      )
    }
    setFiltered(result)
  }, [area, type, query, therapists])

  async function fetchTherapists() {
    setLoading(true)
    const { data, error } = await supabase
      .from('therapists')
      .select('*')
      .eq('approved', true)
    
    if (!error && data) {
      setTherapists(data)
      setFiltered(data)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white min-h-screen font-sans text-right" dir="rtl">
      <Head>
        <title>מגע — פלטפורמת העיסוי #1 בישראל</title>
        <meta name="description" content="מצאו מטפלים מוסמכים עד הבית" />
      </Head>

      <AccessibilityWidget />
      <WhatsAppFAB />

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-5 bg-gradient-to-b from-emerald-50 to-white text-center">
        <p className="text-emerald-700 font-bold mb-3 tracking-wide">פלטפורמת העיסוי #1 בישראל</p>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
          מטפל מוסמך <br/> <span className="text-emerald-700">עד אליך הביתה</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          בחר אזור, מצא מטפל מאושר, שלח הודעה — הכל בפחות מדקה.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 md:gap-16 mb-12">
          <div><p className="text-2xl font-bold text-gray-900">200+</p><p className="text-gray-500 text-sm">מטפלים</p></div>
          <div><p className="text-2xl font-bold text-gray-900">4.9</p><p className="text-gray-500 text-sm">דירוג ממוצע</p></div>
          <div><p className="text-2xl font-bold text-gray-900">כל הארץ</p><p className="text-gray-500 text-sm">אזורים</p></div>
        </div>

        {/* Search & Filters */}
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-3xl shadow-xl border border-emerald-100 space-y-3 md:space-y-0 md:flex gap-3">
          <div className="flex-1">
            <SearchBar query={query} setQuery={setQuery} />
          </div>
          <select 
            onChange={(e) => setArea(e.target.value)}
            className="w-full md:w-48 border border-gray-100 rounded-2xl px-4 py-3 bg-gray-50 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          >
            <option value="">כל האזורים</option>
            <option value="תל אביב והמרכז">תל אביב והמרכז</option>
            <option value="ירושלים">ירושלים</option>
            <option value="חיפה והצפון">חיפה והצפון</option>
            <option value="באר שבע והדרום">באר שבע והדרום</option>
          </select>
          <select 
            onChange={(e) => setType(e.target.value)}
            className="w-full md:w-48 border border-gray-100 rounded-2xl px-4 py-3 bg-gray-50 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          >
            <option value="">כל הטיפולים</option>
            <option value="שוודי">שוודי</option>
            <option value="רקמות עמוקות">רקמות עמוקות</option>
            <option value="ספורט">ספורט</option>
            <option value="שיאצו">שיאצו</option>
          </select>
        </div>
      </section>

      {/* Therapists Grid */}
      <main className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">מטפלים מאושרים בקרבתך</h2>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700 mx-auto"></div>
            <p className="mt-4 text-gray-500 font-medium">טוען מטפלים...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(t => (
              <TherapistCard key={t.id} therapist={t} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900">לא נמצאו מטפלים</h3>
            <p className="text-gray-500 mt-2">נסה לשנות את הסינון או את החיפוש</p>
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-5 mb-20">
        <div className="bg-emerald-700 rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6">אתה מטפל מוסמך?</h2>
            <p className="text-emerald-50 text-lg mb-10 max-w-2xl mx-auto">
              הצטרף למאגר המטפלים המוביל בישראל, קבל לקוחות חדשים באזורך ונהל את היומן שלך בקלות. הרשמה חינמית, אישור תוך 24 שעות.
            </p>
            <Link href="/join" className="bg-white text-emerald-700 font-black px-10 py-5 rounded-2xl hover:bg-emerald-50 transition-all text-xl shadow-lg inline-block">
              הצטרף עכשיו
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        </div>
      </section>

      <Footer />
    </div>
  )
}