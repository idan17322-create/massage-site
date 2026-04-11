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

const LEGAL_CONSENT = 'אני מאשר שקראתי והסכמתי לתנאי השימוש, לתקנון המטפלים ולמדיניות הפרטיות. אני מצהיר כי אני פועל מרצוני החופשי, בעל הסמכה מתאימה ופוטר את הנהלת האתר מכל אחריות לכל נזק, ישיר או עקיף, שעלול להיגרם מהשימוש בשירות.'

export default function Join() {
  const [form, setForm]                 = useState({ name:'', phone:'', city:'', experience:'', description:'' })
  const [types, setTypes]               = useState([])
  const [imageFile, setImageFile]       = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [agreed, setAgreed]             = useState(false)
  const [loading, setLoading]           = useState(false)
  const [success, setSuccess]           = useState(false)
  const [errors, setErrors]             = useState({})

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  function toggleType(t) {
    setTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
    if (errors.types) setErrors({ ...errors, types: '' })
  }

  function handleImage(e) {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { alert('התמונה גדולה מדי — מקסימום 5MB'); return }
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = ev => setImagePreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'שם חובה'
    if (!form.phone.match(/^0[0-9]{9}$/)) e.phone = 'מספר טלפון לא תקין (10 ספרות)'
    if (!form.city.trim()) e.city = 'נא להזין עיר פעילות'
    if (types.length === 0) e.types = 'בחר לפחות סוג טיפול אחד'
    if (!agreed) e.agreed = 'יש לאשר את כל התנאים כדי להמשיך'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      setTimeout(() => {
        const el = document.querySelector('[role="alert"]')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 50)
      return
    }
    setLoading(true)

    let imageUrl = null

    if (imageFile) {
      const ext = imageFile.name.split('.').pop().toLowerCase()
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('therapist-images')
        .upload(filename, imageFile, { contentType: imageFile.type, upsert: false })

      if (uploadError) {
        alert('שגיאה בהעלאת התמונה: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('therapist-images')
        .getPublicUrl(uploadData.path)

      imageUrl = urlData.publicUrl
    }

    const phone = form.phone.replace(/[^0-9]/g, '')
    const waPhone = phone.startsWith('0') ? '972' + phone.slice(1) : phone
    const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent('היי ' + form.name + ', הגעתי דרך אתר מגע ואשמח לקבוע עיסוי 🙏')}`

    const { error } = await supabase.from('therapists').insert([{
      name: form.name.trim(),
      phone: form.phone,
      city: form.city.trim(),
      area: form.city.trim(),
      types,
      price: 0, // ברירת מחדל עד שנסגר מול עידן
      experience: form.experience ? parseInt(form.experience) : null,
      description: form.description.trim(),
      image_url: imageUrl,
      wa_link: waLink,
      approved: false,
      featured: false,
      agreed_to_terms: true,
      agreed_at: new Date().toISOString(),
      terms_version: '2.0',
      agreed_text: LEGAL_CONSENT,
    }])

    setLoading(false)
    if (error) { alert('שגיאה בשליחה: ' + error.message); return }
    setSuccess(true)
  }

  if (success) return (
    <div style={{ minHeight: '100vh', background: '#f9f9f7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif' }}>
      <div style={{ background: '#fff', borderRadius: 28, padding: 40, maxWidth: 440, width: '100%', textAlign: 'center', border: '1px solid #eee', boxShadow: '0 4px 30px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 10, letterSpacing: '-0.4px' }}>הבקשה נשלחה!</h2>
        <p style={{ color: '#777', lineHeight: 1.75, marginBottom: 16, fontSize: 15 }}>
          תודה שנרשמת למגע.<br />נבדוק את הפרטים ונחזור אליך תוך 24 שעות.
        </p>
        <div style={{ background: '#f0fdf4', borderRadius: 14, padding: 16, marginBottom: 24, textAlign: 'right' }}>
          <p style={{ fontSize: 13, color: '#065F46', fontWeight: 700, marginBottom: 6 }}>מה קורה עכשיו?</p>
          <p style={{ fontSize: 13, color: '#166534', lineHeight: 1.8 }}>
            ✓ הנהלת האתר תבדוק את הפרטים<br />
            ✓ ייתכן שנבקש תעודות הסמכה<br />
            ✓ <strong>ניצור איתך קשר בוואטסאפ לתיאום התשלום והפרסום</strong><br />
            ✓ לאחר האישור תופיע בפלטפורמה
          </p>
        </div>
        <Link href="/" style={{ background: '#0F6E56', color: '#fff', borderRadius: 20, padding: '12px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
          חזור לעמוד הבית
        </Link>
      </div>
    </div>
  )

  const inp = (err) => ({
    width: '100%', border: `1.5px solid ${err ? '#f87171' : '#efefef'}`,
    borderRadius: 14, padding: '12px 14px', fontSize: 14,
    color: '#111', background: '#fafafa', fontFamily: 'inherit',
    outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box'
  })

  return (
    <>
      <Head>
        <title>הצטרף כמטפל — מגע</title>
        <meta name="robots" content="noindex" />
      </Head>

      <nav style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #f0f0f0', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'inherit', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: '#0F6E56', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>מ</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#111' }}>מגע</span>
        </Link>
        <Link href="/" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← חזרה לאתר</Link>
      </nav>

      <main style={{ maxWidth: 560, margin: '0 auto', padding: '36px 20px 60px', fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 6, letterSpacing: '-0.4px' }}>הצטרף כמטפל</h1>
          <p style={{ color: '#aaa', fontSize: 14 }}>מלא את הפרטים — נאשר ונפרסם אותך תוך 24 שעות</p>
        </div>

        {/* באנר מחיר — סקרני וחדש */}
        <div style={{ background: '#f0fdf4', borderRadius: 18, padding: '16px 20px', marginBottom: 20, border: '1.5px solid #9FE1CB', textAlign: 'center' }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#065F46', marginBottom: 6 }}>💎 הצטרפות למאגר המטפלים</p>
          <p style={{ fontSize: 14, color: '#0F6E56', lineHeight: 1.7, margin: 0 }}>
            הצטרפות למאגר כרוכה בתשלום דמי מנוי חודשיים לאחר אישור המנהל.<br />
            <strong>פרטים מדויקים יישלחו אליך בוואטסאפ לאחר בדיקת התעודות.</strong>
          </p>
        </div>

        {/* קישור לתקנון מטפלים */}
        <div style={{ background: '#fffbeb', borderRadius: 14, padding: '12px 16px', marginBottom: 20, border: '1px solid #FCD34D', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: '#92400E', fontWeight: 600 }}>📋 חשוב לקרוא לפני ההרשמה</span>
          <a href="/therapist-terms" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: '#0F6E56', fontWeight: 700, textDecoration: 'none', border: '1px solid #0F6E56', borderRadius: 20, padding: '4px 12px' }}>
            תקנון מטפלים ←
          </a>
        </div>

        <form onSubmit={handleSubmit} noValidate style={{ background: '#fff', borderRadius: 24, padding: 24, border: '1px solid #efefef', display: 'flex', flexDirection: 'column', gap: 18, boxShadow: '0 2px 20px rgba(0,0,0,0.04)' }}>

          {/* תמונה */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div onClick={() => document.getElementById('img-input').click()}
              style={{ width: 90, height: 90, borderRadius: '50%', background: '#f5f5f5', overflow: 'hidden', border: '2px dashed #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              role="button" tabIndex={0} aria-label="העלה תמונת פרופיל"
              onKeyDown={e => e.key === 'Enter' && document.getElementById('img-input').click()}>
              {imagePreview
                ? <img src={imagePreview} alt="תצוגה מקדימה" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: 30 }}>📷</span>}
            </div>
            <input id="img-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
            <button type="button" onClick={() => document.getElementById('img-input').click()}
              style={{ background: 'none', border: 'none', color: '#0F6E56', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {imagePreview ? 'החלף תמונה' : 'העלה תמונת פרופיל'}
            </button>
            <p style={{ fontSize: 11, color: '#ccc' }}>מקסימום 5MB · JPG / PNG</p>
          </div>

          {/* שם */}
          <div>
            <label htmlFor="f-name" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>שם מלא *</label>
            <input id="f-name" name="name" value={form.name} onChange={handleInput} placeholder="שם פרטי ומשפחה" style={inp(errors.name)} />
            {errors.name && <p role="alert" style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
          </div>

          {/* טלפון */}
          <div>
            <label htmlFor="f-phone" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>טלפון וואטסאפ *</label>
            <input id="f-phone" name="phone" value={form.phone} onChange={handleInput} placeholder="0501234567" type="tel" dir="ltr" style={inp(errors.phone)} />
            {errors.phone && <p role="alert" style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
            <p style={{ fontSize: 11, color: '#bbb', marginTop: 4 }}>לקוחות יפנו אליך ישירות לוואטסאפ</p>
          </div>

          {/* עיר (שדה טקסט פתוח במקום רשימה) */}
          <div>
            <label htmlFor="f-city" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>עיר פעילות מרכזית *</label>
            <input id="f-city" name="city" value={form.city} onChange={handleInput} placeholder="לדוגמה: תל אביב, אילת, קיבוץ דפנה..." style={inp(errors.city)} />
            {errors.city && <p role="alert" style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.city}</p>}
          </div>

          {/* סוגי טיפולים */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 12 }}>
              סוגי טיפולים *
              {types.length > 0 && (
                <span style={{ fontSize: 11, color: '#0F6E56', fontWeight: 700, marginRight: 8, background: '#E1F5EE', padding: '2px 8px', borderRadius: 10 }}>
                  {types.length} נבחרו
                </span>
              )}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {TYPE_CATEGORIES.map(cat => (
                <div key={cat.label}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#bbb', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 8 }}>{cat.label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {cat.types.map(t => (
                      <button key={t} type="button" onClick={() => toggleType(t)} aria-pressed={types.includes(t)}
                        style={{ padding: '7px 14px', borderRadius: 20, fontSize: 13, border: '1.5px solid', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                          borderColor: types.includes(t) ? '#0F6E56' : '#e8e8e8',
                          background: types.includes(t) ? '#0F6E56' : '#fafafa',
                          color: types.includes(t) ? '#fff' : '#555',
                          fontWeight: types.includes(t) ? 700 : 400 }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {errors.types && <p role="alert" style={{ color: '#f87171', fontSize: 12, marginTop: 8 }}>{errors.types}</p>}
          </div>

          {/* ניסיון */}
          <div>
            <label htmlFor="f-exp" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>שנות ניסיון</label>
            <input id="f-exp" name="experience" value={form.experience} onChange={handleInput} placeholder="5" type="number" min="0" dir="ltr" style={inp(false)} />
          </div>

          {/* תיאור */}
          <div>
            <label htmlFor="f-desc" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>תיאור קצר</label>
            <textarea id="f-desc" name="description" value={form.description} onChange={handleInput}
              placeholder="ספר על עצמך — ניסיון, גישה, מה מיוחד בטיפולים שלך..."
              rows={3} style={{ ...inp(false), resize: 'vertical', lineHeight: 1.6 }} />
          </div>

          {/* checkbox תקנון */}
          <div style={{ background: errors.agreed ? '#fff5f5' : '#f9fdf9', borderRadius: 16, padding: 18, border: `1.5px solid ${errors.agreed ? '#f87171' : '#d4edda'}` }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
              <input
                type="checkbox" checked={agreed}
                onChange={e => { setAgreed(e.target.checked); if (errors.agreed) setErrors({ ...errors, agreed: '' }) }}
                aria-required="true"
                style={{ width: 20, height: 20, marginTop: 3, accentColor: '#0F6E56', cursor: 'pointer', flexShrink: 0 }}
              />
              <span style={{ fontSize: 13, color: '#333', lineHeight: 1.75 }}>
                <strong>{LEGAL_CONSENT}</strong>
                <br />
                <span style={{ fontSize: 12, color: '#888', marginTop: 6, display: 'block' }}>
                  קראתי את:{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#0F6E56', fontWeight: 700, textDecoration: 'none' }}>תנאי שימוש</a>
                  {' · '}
                  <a href="/therapist-terms" target="_blank" rel="noopener noreferrer" style={{ color: '#0F6E56', fontWeight: 700, textDecoration: 'none' }}>תקנון מטפלים</a>
                  {' · '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#0F6E56', fontWeight: 700, textDecoration: 'none' }}>מדיניות פרטיות</a>
                </span>
              </span>
            </label>
            {errors.agreed && <p role="alert" style={{ color: '#f87171', fontSize: 12, marginTop: 8, marginRight: 32 }}>{errors.agreed}</p>}
          </div>

          <input name="website" tabIndex="-1" autoComplete="off" style={{ display: 'none' }} />

          <button type="submit" disabled={loading}
            style={{ background: loading ? '#7ec9b0' : agreed ? '#0F6E56' : '#ccc', color: '#fff', border: 'none', borderRadius: 16, padding: '15px', fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', boxShadow: agreed ? '0 4px 14px rgba(15,110,86,0.3)' : 'none' }}>
            {loading ? 'שולח בקשה...' : 'שלח בקשת הרשמה →'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#bbb', lineHeight: 1.7 }}>
            הבקשה עוברת לאישור ידני על ידי הנהלת האתר.<br />
            ייתכן שנבקש תעודות הסמכה לפני האישור.
          </p>
        </form>
      </main>
    </>
  )
}