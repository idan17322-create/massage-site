import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function Admin() {
  const [password, setPassword] = useState('')
  const [isAuth, setIsAuth] = useState(false)
  const [pending, setPending] = useState([])

  const checkAuth = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuth(true)
      fetchPending()
    } else {
      alert('סיסמה שגויה')
    }
  }

  async function fetchPending() {
    const { data } = await supabase.from('therapists').select('*').eq('approved', false)
    setPending(data || [])
  }

  async function approve(id) {
    await supabase.from('therapists').update({ approved: true }).eq('id', id)
    fetchPending()
  }

  if (!isAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
        <h1 className="text-2xl font-bold mb-4">ניהול אתר מגע</h1>
        <input 
          type="password" 
          placeholder="סיסמת מנהל" 
          className="p-3 border rounded-xl mb-4 text-center"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={checkAuth} className="bg-emerald-700 text-white px-8 py-2 rounded-full font-bold">כניסה</button>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl mx-auto" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">מטפלים הממתינים לאישור</h1>
      {pending.length === 0 ? (
        <p className="text-gray-500">אין מטפלים חדשים כרגע.</p>
      ) : (
        <div className="space-y-4">
          {pending.map(t => (
            <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{t.name}</h3>
                <p className="text-sm text-gray-600">{t.phone} | {t.area}</p>
                <p className="text-xs text-gray-500 mt-1">{t.types?.join(', ')}</p>
              </div>
              <button onClick={() => approve(t.id)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">אשר מטפל</button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-10 pt-6 border-t">
        <Link href="/" className="text-emerald-700 font-medium">← חזרה לאתר</Link>
      </div>
    </div>
  )
}