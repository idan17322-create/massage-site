import Head from 'next/head'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import TherapistCard from '../components/TherapistCard'
import SearchBar from '../components/SearchBar'
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

  const AREAS = ['תל אביב והמרכז','ירושלים','חיפה והצפון','באר שבע והדרום','השרון','גוש דן']
  const TYPES = ['שוודי','רקמות עמוקות','ספורט','הריון','שיאצו','רפלקסולוגיה','לימפה']

  useEffect(() => {
    fetchTherapists()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [therapists, query, area, type])

  async function fetchTherapists() {
    const { data } = await supabase
      .from('therapists')
      .select('*')
      .eq('approved', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
    setTherapists(data || [])
    setLoading(false)
  }

  function applyFilters() {
    let list = [...therapists]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.area.toLowerCase().includes(q) ||
        (t.types || []).some(x => x.toLowerCase().includes(q)) ||
        (t.description || '').toLowerCase().includes(q)
      )
    }
    if (area) list = list.filter(t => t.area === area)
    if (type) list = list.filter(t => (t.types || []).includes(type))
    setFiltered(list)
  }

  return (
    <>
      <Head>
        <title>מגע — מטפלים מוסמכים עד אליך הביתה</title>
        <meta name="description" content="מצא מטפל עיסוי מוסמך ומאושר באזורך. עיסוי שוודי, רקמות עמוקות, הריון ועוד — הכל בלחיצה אחת." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="מגע — מטפלים מוסמכים עד אליך הביתה" />
        <meta property="og:description" content="מצא מטפל עיסוי מאושר באזורך תוך דקה. עיסוי ביתי מקצועי בכל הארץ." />
        <meta property="og:image" content="https://yourdomain.co.il/og-image.jpg" />
        <meta property="og:url" content="https://yourdomain.co.il" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessibilityWidget />

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-700 rounded-xl flex items-center justify-center text-white font-bold text-sm">מ</div>
            <span className="font-semibold text-gray-900 text-lg tracking-tight">מגע</span>
          </Link>
          <Link href="/join" className="bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-emerald-800 transition-colors">
            הצטרף כמטפל
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-emerald-700 pt-14 pb-10 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-emerald-300 text-xs uppercase tracking-widest mb-3 font-medium">פלטפורמת העיסוי #1 בישראל</p>
          <h1 className="text-white text-4xl font-bold leading-tight mb-3 tracking-tight">
            מטפל מוסמך<br /><span className="text-emerald-300">עד אליך הביתה</span>
          </h1>
          <p className="text-emerald-200 text-base mb-8 leading-relaxed">
            בחר אזור, מצא מטפל מאושר, שלח הודעה — הכל בפחות מדקה
          </p>
          <div className="flex justify-center gap-8 mb-8 text-center">
            {[['200+','מטפלים'],['4.9','דירוג ממוצע'],['כל הארץ','אזורים']].map(([n,l],i)=>(
              <div key={i}>
                <div className="text-white text-2xl font-bold">{n}</div>
                <div className="text-emerald-300 text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
          {/* Search */}
          <div className="bg-white rounded-2xl p-4 shadow-xl text-right">
            <SearchBar query={query} setQuery={setQuery} />
            <div className="flex gap-2 mt-3 flex-wrap">
              <select
                value={area} onChange={e => setArea(e.target.value)}
                className="flex-1 min-w-[130px] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-emerald-500"
              >
                <option value="">כל האזורים</option>
                {AREAS.map(a => <option key={a}>{a}</option>)}
              </select>
              <select
                value={type} onChange={e => setType(e.target.value)}
                className="flex-1 min-w-[130px] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-emerald-500"
              >
                <option value="">כל הטיפולים</option>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <main className="max-w-5xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 font-semibold text-lg">
            {filtered.length > 0 ? `${filtered.length} מטפלים` : 'מטפלים מאושרים'}
          </h2>
          {(area || type || query) && (
            <button onClick={() => { setArea(''); setType(''); setQuery('') }}
              className="text-emerald-600 text-sm hover:underline">
              נקה סינון
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map(i => (
              <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-64" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium text-gray-500">לא נמצאו מטפלים</p>
            <p className="text-sm mt-1">נסה לשנות את הסינון</p>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(t => <TherapistCard key={t.id} therapist={t} />)}
          </div>
        )}
      </main>

      {/* JOIN BAND */}
      <section className="bg-emerald-700 py-12 px-5 text-center">
        <h2 className="text-white text-2xl font-bold mb-2">אתה מטפל מוסמך?</h2>
        <p className="text-emerald-200 text-sm mb-6 leading-relaxed">קבל לקוחות חדשים באזורך.<br />הרשמה חינמית, אישור תוך 24 שעות.</p>
        <Link href="/join" className="bg-white text-emerald-700 font-semibold px-7 py-3 rounded-full text-sm hover:bg-emerald-50 transition-colors inline-block">
          הצטרף עכשיו
        </Link>
      </section>

      <Footer />
      <WhatsAppFAB />
    </>
  )
}