import Head from 'next/head'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

const TYPE_CATEGORIES = [
  { label: 'עיסויים קלאסיים', types: ['שוודי','רקמות עמוקות','ספורט','תאילנדי','הריון'] },
  { label: 'טיפולים מיוחדים', types: ['שיאצו','רפלקסולוגיה','לימפה','אבנים חמות','עיסוי פנים','ארומתרפיה'] },
  { label: 'רפואה משלימה',    types: ['רפואה סינית / דיקור','כוסות רוח','עיסוי הוליסטי','טיפול רגשי-גוף'] },
  { label: 'שיקום ובריאות',   types: ['פיזיותרפיה'] }
]

const LEGAL_CONSENT = 'אני מאשר שקראתי והסכמתי לתנאי השימוש, לתקנון המטפלים ולמדיניות הפרטיות. אני מצהיר כי אני פועל מרצוני החופשי, בעל הסמכה מתאימה ופוטר את הנהלת האתר מכל אחריות לכל נזק, ישיר או עקיף.'

export default function Join() {
  const [form, setForm] = useState({ 
    name:'', phone:'', city:'', experience:'', description:'', 
    gender: '', is_mobile: true, price: '' 
  })
  const [types, setTypes] = useState([])
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  function handleInput(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  function toggleType(t) {
    setTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  function handleImage(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = ev => setImagePreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'שם חובה'
    if (!form.phone.match(/^0[0-9]{9}$/)) e.phone = 'מספר לא תקין'
    if (!form.city.trim()) e.city = 'חובה להזין עיר'
    if (!form.gender) e.gender = 'נא לבחור מגדר'
    if (!form.price) e.price = 'נא להזין מחיר התחלתי'
    if (types.length === 0) e.types = 'בחר לפחות טיפול אחד'
    if (!agreed) e.agreed = 'יש לאשר את התנאים'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    
    setLoading(true)
    let imageUrl = null

    if (imageFile) {
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}`
      const { data: uploadData } = await supabase.storage.from('therapist-images').upload(filename, imageFile)
      if (uploadData) {
        const { data: urlData } = supabase.storage.from('therapist-images').getPublicUrl(uploadData.path)
        imageUrl = urlData.publicUrl
      }
    }

    const phone = form.phone.replace(/[^0-9]/g, '')
    const waPhone = phone.startsWith('0') ? '972' + phone.slice(1) : phone
    const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent('היי ' + form.name + ', הגעתי דרך אתר מגע ואשמח לקבוע עיסוי 🙏')}`

    const { error } = await supabase.from('therapists').insert([{
      name: form.name.trim(),
      phone: form.phone,
      city: form.city.trim(),
      gender: form.gender,
      is_mobile: form.is_mobile,
      price: parseInt(form.price),
      types,
      experience: form.experience ? parseInt(form.experience) : null,
      description: form.description.trim(),
      image_url: imageUrl,
      wa_link: waLink,
      approved: false
    }])

    setLoading(false)
    if (error) { alert('שגיאה: ' + error.message); return }
    setSuccess(true)
  }

  const inpStyle = (err) => ({
    width: '100%', border: `1.5px solid ${err ? '#f87171' : '#efefef'}`,
    borderRadius: 14, padding: '12px', fontSize: 14, background: '#fafafa', fontFamily: 'inherit'
  })

  if (success) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20 }}>
      <div>
        <h2 style={{fontSize: 28, marginBottom: 10}}>✅ נשלח בהצלחה!</h2>
        <p>נבדוק את הפרטים ונחזור אליך תוך 24 שעות.</p>
        <Link href="/" style={{marginTop: 20, display: 'inline-block', color: '#0F6E56', fontWeight: 700}}>חזרה לדף הבית</Link>
      </div>
    </div>
  )

  return (
    <main style={{ maxWidth: 500, margin: '0 auto', padding: '40px 20px', direction: 'rtl', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>הצטרפות כמטפל</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* תמונה */}
        <div style={{ textAlign: 'center' }}>
          <div onClick={() => document.getElementById('img-input').click()} style={{ width: 100, height: 100, borderRadius: '50%', background: '#eee', margin: '0 auto', cursor: 'pointer', overflow: 'hidden', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {imagePreview ? <img src={imagePreview} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : '📷'}
          </div>
          <input id="img-input" type="file" hidden onChange={handleImage} />
        </div>

        <div>
          <label style={{display:'block', marginBottom:5, fontSize:13, fontWeight:700}}>שם מלא *</label>
          <input name="name" value={form.name} onChange={handleInput} style={inpStyle(errors.name)} />
        </div>

        <div>
          <label style={{display:'block', marginBottom:5, fontSize:13, fontWeight:700}}>מגדר *</label>
          <div style={{display:'flex', gap:10}}>
            {['male', 'female'].map(g => (
              <button type="button" key={g} onClick={() => setForm({...form, gender: g})} style={{ flex: 1, padding: '10px', borderRadius: 12, border: '1.5px solid', cursor:'pointer', background: form.gender === g ? '#0F6E56' : '#fff', color: form.gender === g ? '#fff' : '#555', borderColor: form.gender === g ? '#0F6E56' : '#eee' }}>
                {g === 'male' ? 'גבר' : 'אישה'}
              </button>
            ))}
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap:10}}>
          <div>
            <label style={{display:'block', marginBottom:5, fontSize:13, fontWeight:700}}>עיר *</label>
            <input name="city" value={form.city} onChange={handleInput} style={inpStyle(errors.city)} />
          </div>
          <div>
            <label style={{display:'block', marginBottom:5, fontSize:13, fontWeight:700}}>מחיר התחלתי (₪) *</label>
            <input name="price" type="number" value={form.price} onChange={handleInput} placeholder="למשל: 250" style={inpStyle(errors.price)} />
          </div>
        </div>

        <div>
          <label style={{display:'flex', alignItems:'center', gap:10, cursor:'pointer', fontSize:14}}>
            <input type="checkbox" name="is_mobile" checked={form.is_mobile} onChange={handleInput} style={{width:18, height:18}} />
            אני נותן שירות נייד (מגיע לבית הלקוח)
          </label>
        </div>

        <div>
          <label style={{display:'block', marginBottom:10, fontSize:13, fontWeight:700}}>סוגי טיפולים *</label>
          <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
            {TYPE_CATEGORIES.flatMap(c => c.types).map(t => (
              <button type="button" key={t} onClick={() => toggleType(t)} style={{ padding:'6px 12px', borderRadius:20, border:'1.5px solid', fontSize:12, cursor:'pointer', background: types.includes(t) ? '#E1F5EE' : '#fff', color: types.includes(t) ? '#0F6E56' : '#777', borderColor: types.includes(t) ? '#0F6E56' : '#eee' }}>{t}</button>
            ))}
          </div>
        </div>

        <div>
          <label style={{display:'block', marginBottom:5, fontSize:13, fontWeight:700}}>תיאור וניסיון</label>
          <textarea name="description" value={form.description} onChange={handleInput} rows={3} style={inpStyle()} />
        </div>

        <div style={{padding: 15, background: '#fef3c7', borderRadius: 12, fontSize: 12}}>
          <label style={{display:'flex', gap:10, cursor:'pointer'}}>
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
            {LEGAL_CONSENT}
          </label>
        </div>

        <button type="submit" disabled={loading} style={{ background: '#0F6E56', color: '#fff', border: 'none', padding: '16px', borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
          {loading ? 'שולח...' : 'שלח בקשת הרשמה'}
        </button>

      </form>
    </main>
  )
}