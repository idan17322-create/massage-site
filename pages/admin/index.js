import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import Head from 'next/head'

export default function Admin() {
  const [password, setPassword] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)
  const [therapists, setTherapists] = useState([])

  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'maga2024'

  useEffect(() => {
    if (isAuthed) fetchAll()
  }, [isAuthed])

  async function fetchAll() {
    const { data } = await supabase.from('therapists').select('*').order('created_at', { ascending: false })
    setTherapists(data || [])
  }

  async function toggleApprove(id, status) {
    await supabase.from('therapists').update({ approved: status }).eq('id', id)
    fetchAll()
  }

  if (!isAuthed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100" dir="rtl">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
          <h1 className="text-2xl font-bold mb-6">כניסת מנהל</h1>
          <input 
            type="password" 
            placeholder="סיסמה" 
            className="w-full border p-3 rounded-xl mb-4 text-center"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            onClick={() => password === ADMIN_PASS ? setIsAuthed(true) : alert('סיסמה שגויה')}
            className="w-full bg-black text-white p-3 rounded-xl font-bold"
          >
            כניסה
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto text-right" dir="rtl">
      <Head><title>ניהול מטפלים | מגע</title></Head>
      <h1 className="text-3xl font-bold mb-8">ניהול בקשות הצטרפות</h1>
      <div className="space-y-4">
        {therapists.map(t => (
          <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{t.name}</h3>
              <p className="text-gray-500">{t.area} | {t.phone}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => toggleApprove(t.id, !t.approved)}
                className={`px-6 py-2 rounded-full font-bold ${t.approved ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}
              >
                {t.approved ? 'בטל אישור' : 'אשר מטפל'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}