import Head from 'next/head'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import SearchBar from '../components/SearchBar'
import TherapistCard from '../components/TherapistCard'
import WhatsAppFAB from '../components/WhatsAppFAB'
import AccessibilityWidget from '../components/AccessibilityWidget'
import Footer from '../components/Footer'

export default function Home() {
  const [therapists, setTherapists] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [area, setArea] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchTherapists()
  }, [])

  useEffect(() => {
    let result = therapists
    if (area) result = result.filter(t => t.area === area)
    if (query) {
      result = result.filter(t => 
        t.name.toLowerCase().includes(query.toLowerCase()) || 
        t.description?.toLowerCase().includes(query.toLowerCase())
      )
    }
    setFiltered(result)
  }, [area, query, therapists])

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
    <div className="bg-[#F5F5F7] min-h-screen font-sans text-right" dir="rtl">
      <Head>
        <title>מגע | מטפלים מוסמכים</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AccessibilityWidget />
      <WhatsAppFAB />

      {/* Hero Section - Apple Style */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-black tracking-tight mb-8">
            מגע. <span className="text-gray-400">פשוט מבריק.</span>
          </h1>
          <p className="text-2xl text-gray-500 font-medium max-w-2xl mx-auto mb-12">
            המטפלים הכי טובים בפתח תקווה ובכל הארץ, <br className="hidden md:block" />
            במרחק לחיצה אחת.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-xl p-2 rounded-3xl shadow-2xl border border-white/20 flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <SearchBar query={query} setQuery={setQuery} />
            </div>
            <select 
              onChange={(e) => setArea(e.target.value)}
              className="md:w-56 bg-transparent border-none px-6 py-4 outline-none text-gray-600 font-semibold text-lg cursor-pointer"
            >
              <option value="">כל האזורים</option>
              <option value="תל אביב והמרכז">תל אביב והמרכז</option>
              <option value="ירושלים">ירושלים</option>
              <option value="חיפה והצפון">חיפה והצפון</option>
              <option value="באר שבע והדרום">באר שבע והדרום</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-black">מטפלים מוסמכים</h2>
          <span className="text-gray-400 font-medium">{filtered.length} מטפלים נמצאו</span>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map(t => (
              <TherapistCard key={t.id} therapist={t} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[2rem] border border-gray-100">
            <p className="text-2xl text-gray-300 font-medium">לא מצאנו מטפלים תחת הסינון הזה...</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}