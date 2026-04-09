import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [therapists, setTherapists] = useState([])
  const [tab, setTab] = useState('pending')
  const [editId, setEditId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  const PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'maga2024'

  useEffect(() => { if (authed) fetchAll() }, [authed])

  async function fetchAll() {
    const { data } = await supabase
      .from('therapists').select('*')
      .order('created_at', { ascending: false })
    setTherapists(data || [])
  }

  async function approve(id) {
    await supabase.from('therapists').update({ approved: true }).eq('id', id)
    fetchAll()
  }

  async function remove(id) {
    if (!confirm('למחוק את המטפל?')) return
    await supabase.from('therapists').delete().eq('id', id)
    fetchAll()
  }

  async function toggleFeatured(id, current) {
    await supabase.from('therapists').update({ featured: !current }).eq('id', id)
    fetchAll()
  }

  async function saveEdit() {
    setSaving(true)
    await supabase.from('therapists').update(editForm).eq('id', editId)
    setSaving(false)
    setEditId(null)
    fetchAll()
  }

  const S = {
    page: { minHeight: '100vh', background: '#0f0f0f', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' },
    bar: { background: '#1a1a1a', borderBottom: '1px solid #2a2a2a', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    wrap: { maxWidth: 800, margin: '0 auto', padding: '28px 20px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 28 },
    stat: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: '16px', textAlign: 'center' },
    tabs: { display: 'flex', gap: 8, marginBottom: 20 },
    tab: (active) => ({ background: active ? '#0F6E56' : '#1a1a1a', color: active ? '#fff' : '#888', border: 'none', borderRadius: 20, padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }),
    card: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 18, padding: 16, marginBottom: 10, display: 'flex', gap: 12, alignItems: 'flex-start' },
    av: (bg) => ({ width: 44, height: 44, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0, overflow: 'hidden' }),
    pendingBadge: { background: '#2d2000', color: '#f59e0b', fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 700, display: 'inline-block', marginBottom: 4 },
    approvedBadge: { background: '#052e1a', color: '#34d399', fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 700, display: 'inline-block', marginBottom: 4 },
    btnApprove: { background: '#0F6E56', color: '#fff', border: 'none', borderRadius: 10, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', marginBottom: 6, width: '100%' },
    btnEdit: { background: '#2a2a2a', color: '#ccc', border: 'none', borderRadius: 10, padding: '7px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', marginBottom: 6, width: '100%' },
    btnStar: { background: '#2d2000', color: '#f59e0b', border: 'none', borderRadius: 10, padding: '7px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', marginBottom: 6, width: '100%' },
    btnDel: { background: '#2d0a0a', color: '#f87171', border: 'none', borderRadius: 10, padding: '7px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', width: '100%' },
    input: { width: '100%', background: '#2a2a2a', border: '1px solid #3a3a3a', borderRadius: 10, padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 8 },
  }

  const AV_COLORS = ['#1D9E75','#7C3AED','#B45309','#BE185D','#1D4ED8','#0F766E']

  if (!authed) return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 24, padding: 32, width: '100%', maxWidth: 360, textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, background: '#0F6E56', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 auto 16px' }}>מ</div>
        <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>לוח ניהול</h1>
        <p style={{ color: '#666', fontSize: 13, marginBottom: 24 }}>מגע — כניסת מנהל</p>
        <input type="password" placeholder="סיסמה" value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (password === PASS ? setAuthed(true) : alert('סיסמה שגויה'))}
          style={{ ...S.input, marginBottom: 12, textAlign: 'center', fontSize: 16, letterSpacing: 4 }}
          dir="ltr" />
        <button onClick={() => password === PASS ? setAuthed(true) : alert('סיסמה שגויה')}
          style={{ width: '100%', background: '#0F6E56', color: '#fff', border: 'none', borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          כניסה
        </button>
      </div>
    </div>
  )

  const pending = therapists.filter(t => !t.approved)
  const approved = therapists.filter(t => t.approved)
  const shown = tab === 'pending' ? pending : approved

  return (
    <>
      <Head><title>Admin — מגע</title><meta name="robots" content="noindex" /></Head>
      <div style={S.page}>
        <div style={S.bar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, background: '#0F6E56', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>מ</div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>מגע — Admin</span>
          </div>
          <Link href="/" style={{ color: '#666', fontSize: 12, border: '1px solid #2a2a2a', borderRadius: 8, padding: '5px 12px', textDecoration: 'none' }}>צפה באתר →</Link>
        </div>

        <div style={S.wrap}>
          <div style={S.statsGrid}>
            {[['סה״כ', therapists.length, '#fff'], ['ממתינים', pending.length, pending.length > 0 ? '#f59e0b' : '#fff'], ['מאושרים', approved.length, '#34d399']].map(([l, v, c]) => (
              <div key={l} style={S.stat}>
                <div style={{ fontSize: 28, fontWeight: 800, color: c }}>{v}</div>
                <div style={{ fontSize: 11, color: '#555', marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={S.tabs}>
            <button style={S.tab(tab === 'pending')} onClick={() => setTab('pending')}>ממתינים ({pending.length})</button>
            <button style={S.tab(tab === 'approved')} onClick={() => setTab('approved')}>מאושרים ({approved.length})</button>
          </div>

          {shown.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#444', fontSize: 14 }}>
              {tab === 'pending' ? '✓ אין בקשות ממתינות' : 'אין מטפלים מאושרים'}
            </div>
          ) : shown.map((t, i) => (
            <div key={t.id} style={S.card}>
              <div style={S.av(AV_COLORS[i % AV_COLORS.length])}>
                {t.image_url ? <img src={t.image_url} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : t.name?.[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {editId === t.id ? (
                  <div>
                    <input value={editForm.name || ''} onChange={e => setEditForm({ ...editForm, name: e.target.value })} placeholder="שם" style={S.input} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <input value={editForm.area || ''} onChange={e => setEditForm({ ...editForm, area: e.target.value })} placeholder="אזור" style={S.input} />
                      <input value={editForm.price || ''} onChange={e => setEditForm({ ...editForm, price: e.target.value })} placeholder="מחיר" type="number" style={S.input} />
                    </div>
                    <textarea value={editForm.description || ''} onChange={e => setEditForm({ ...editForm, description: e.target.value })} placeholder="תיאור" rows={2}
                      style={{ ...S.input, resize: 'vertical' }} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={saveEdit} disabled={saving} style={{ ...S.btnApprove, width: 'auto', padding: '7px 20px' }}>{saving ? 'שומר...' : 'שמור'}</button>
                      <button onClick={() => setEditId(null)} style={{ ...S.btnEdit, width: 'auto', padding: '7px 16px' }}>ביטול</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={t.approved ? S.approvedBadge : S.pendingBadge}>{t.approved ? 'מאושר/ת' : 'ממתין/ה'}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#666', lineHeight: 1.6 }}>
                      📍 {t.area} · 💰 {t.price}₪ · 📞 {t.phone}<br />
                      💆 {(t.types || []).join(', ')}
                      {t.description && <><br />📝 {t.description.substring(0, 60)}{t.description.length > 60 ? '...' : ''}</>}
                    </div>
                  </>
                )}
              </div>
              {editId !== t.id && (
                <div style={{ flexShrink: 0, minWidth: 80 }}>
                  {!t.approved && <button onClick={() => approve(t.id)} style={S.btnApprove}>אשר ✓</button>}
                  <button onClick={() => { setEditId(t.id); setEditForm({ name: t.name, area: t.area, price: t.price, description: t.description || '' }) }} style={S.btnEdit}>ערוך</button>
                  <button onClick={() => toggleFeatured(t.id, t.featured)} style={S.btnStar}>{t.featured ? 'הסר ★' : 'מובחר ★'}</button>
                  <button onClick={() => remove(t.id)} style={S.btnDel}>מחק</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}