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
      </Head>

      <AccessibilityWidget />
      <WhatsAppFAB />

      <section className="pt-24 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-black tracking-tight mb-6">
          מגע. <span className="text-gray-400">פשוט מבריק.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          המטפלים הכי טובים בפתח תקווה ובכל הארץ, במרחק לחיצה אחת.
        </p>

        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-2 rounded-3xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <SearchBar query={query} setQuery={setQuery} />
          </div>
          <select 
            onChange={(e) => setArea(e.target.value)}
            className="md:w-48 bg-transparent border-none px-4 py-3 outline-none text-gray-600 font-medium cursor-pointer"
          >
            <option value="">כל האזורים</option>
            <option value="תל אביב והמרכז">תל אביב והמרכז</option>
            <option value="חיפה והצפון">חיפה והצפון</option>
            <option value="באר שבע והדרום">באר שבע והדרום</option>
          </select>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="text-center py-20 text-gray-400">טוען מטפלים...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map(t => (
              <TherapistCard key={t.id} therapist={t} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
 