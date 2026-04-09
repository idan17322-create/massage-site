import Head from 'next/head'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)
 
const AREAS = ['תל אביב והמרכז','ירושלים','חיפה והצפון','באר שבע והדרום','השרון','גוש דן']
const TYPES = ['שוודי','רקמות עמוקות','ספורט','הריון','שיאצו','רפלקסולוגיה']
const AV_BG  = ['#E1F5EE','#EEF2FF','#FEF3C7','#FCE7F3','#F0FDF4','#EFF6FF']
const AV_FG  = ['#065F46','#3730A3','#92400E','#831843','#166534','#1E40AF']
 
export default function Home() {
  const [list, setList]       = useState([])
  const [show, setShow]       = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ]             = useState('')
  const [area, setArea]       = useState('')
  const [type, setType]       = useState('')
 
  useEffect(() => { load() }, [])
  useEffect(() => { filter() }, [list, q, area, type])
 
  async function load() {
    const { data } = await supabase
      .from('therapists').select('*')
      .eq('approved', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
    setList(data || [])
    setLoading(false)
  }
 
  function filter() {
    let r = [...list]
    if (q) {
      const lq = q.toLowerCase()
      r = r.filter(t =>
        t.name?.toLowerCase().includes(lq) ||
        t.area?.toLowerCase().includes(lq) ||
        (t.types||[]).some(x => x.toLowerCase().includes(lq))
      )
    }
    if (area) r = r.filter(t => t.area === area)
    if (type) r = r.filter(t => (t.types||[]).includes(type))
    setShow(r)
  }
 
  function waHref(t) {
    if (t.wa_link) return t.wa_link
    const n = (t.phone||'').replace(/\D/g,'')
    const intl = n.startsWith('0') ? '972'+n.slice(1) : n
    return `https://wa.me/${intl}?text=${encodeURIComponent('היי '+t.name+', הגעתי דרך אתר מגע ואשמח לקבוע עיסוי 🙏')}`
  }
 
  const WA_SVG = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13 13 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.135.562 4.14 1.54 5.873L.057 23.25a.75.75 0 00.916.916l5.377-1.483A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.852-.538-5.462-1.48l-.392-.23-3.35.924.924-3.35-.23-.392A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
 
  return (
    <>
      <Head>
        <title>מגע — מטפלים מוסמכים עד אליך הביתה</title>
        <meta name="description" content="מצא מטפל עיסוי מוסמך ומאושר באזורך." />
        <meta property="og:title" content="מגע — מטפלים מוסמכים עד אליך הביתה" />
        <meta property="og:description" content="מצא מטפל עיסוי מאושר באזורך תוך דקה." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
 
      {/* ── NAV ── */}
      <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.92)',backdropFilter:'blur(18px)',borderBottom:'1px solid #efefef',padding:'0 24px',height:56,display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'-apple-system,BlinkMacSystemFont,sans-serif'}}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <div style={{width:32,height:32,background:'#0F6E56',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:800,fontSize:15}}>מ</div>
          <span style={{fontWeight:700,fontSize:18,color:'#111',letterSpacing:'-0.4px'}}>מגע</span>
        </Link>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <Link href="/admin" style={{fontSize:13,color:'#888',textDecoration:'none',padding:'6px 14px',border:'1px solid #e8e8e8',borderRadius:20,fontWeight:500}}>ניהול</Link>
          <Link href="/join" style={{fontSize:13,color:'#fff',textDecoration:'none',padding:'7px 18px',background:'#0F6E56',borderRadius:20,fontWeight:700}}>הצטרף כמטפל</Link>
        </div>
      </nav>
 
      {/* ── HERO ── */}
      <div style={{background:'#0F6E56',padding:'52px 24px 40px',textAlign:'center',fontFamily:'-apple-system,BlinkMacSystemFont,sans-serif'}}>
        <p style={{color:'#9FE1CB',fontSize:11,letterSpacing:'1.8px',textTransform:'uppercase',marginBottom:12,fontWeight:600}}>פלטפורמת העיסוי #1 בישראל</p>
        <h1 style={{color:'#fff',fontSize:'clamp(30px,6vw,52px)',fontWeight:800,lineHeight:1.15,marginBottom:10,letterSpacing:'-0.5px'}}>
          מטפל מוסמך<br /><span style={{color:'#9FE1CB'}}>עד אליך הביתה</span>
        </h1>
        <p style={{color:'rgba(255,255,255,0.72)',fontSize:16,marginBottom:32,lineHeight:1.65}}>
          בחר אזור, מצא מטפל מאושר, שלח הודעה — הכל בפחות מדקה
        </p>
 
        {/* Stats */}
        <div style={{display:'flex',justifyContent:'center',gap:40,marginBottom:32}}>
          {[['200+','מטפלים'],['4.9','דירוג ממוצע'],['כל הארץ','אזורים']].map(([n,l])=>(
            <div key={l} style={{textAlign:'center'}}>
              <div style={{color:'#fff',fontSize:26,fontWeight:800,letterSpacing:'-0.5px'}}>{n}</div>
              <div style={{color:'rgba(255,255,255,0.55)',fontSize:11,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
 
        {/* Search card */}
        <div style={{background:'#fff',borderRadius:24,padding:20,maxWidth:580,margin:'0 auto',boxShadow:'0 24px 64px rgba(0,0,0,0.22)'}}>
          {/* Search input */}
          <div style={{position:'relative',marginBottom:12}}>
            <span style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',fontSize:16,color:'#ccc'}}>🔍</span>
            <input value={q} onChange={e=>setQ(e.target.value)}
              placeholder="חפש מטפל, אזור, סוג טיפול..."
              style={{width:'100%',border:'1.5px solid #efefef',borderRadius:14,padding:'13px 42px 13px 14px',fontSize:14,color:'#111',background:'#fafafa',outline:'none',boxSizing:'border-box',fontFamily:'inherit'}}
            />
          </div>
          {/* Selects */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
            <select value={area} onChange={e=>setArea(e.target.value)}
              style={{border:'1.5px solid #efefef',borderRadius:14,padding:'11px 12px',fontSize:13,color:'#444',background:'#fafafa',outline:'none',fontFamily:'inherit'}}>
              <option value="">כל האזורים</option>
              {AREAS.map(a=><option key={a}>{a}</option>)}
            </select>
            <select value={type} onChange={e=>setType(e.target.value)}
              style={{border:'1.5px solid #efefef',borderRadius:14,padding:'11px 12px',fontSize:13,color:'#444',background:'#fafafa',outline:'none',fontFamily:'inherit'}}>
              <option value="">כל הטיפולים</option>
              {TYPES.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          {/* Pills */}
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {['הכל','זמין עכשיו','מובחרים','עד 250₪'].map(f=>(
              <button key={f} style={{background:'#f5f5f5',border:'1px solid #ebebeb',borderRadius:20,padding:'5px 14px',fontSize:11,color:'#666',cursor:'pointer',fontFamily:'inherit'}}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
 
      {/* ── RESULTS ── */}
      <div style={{maxWidth:1120,margin:'0 auto',padding:'40px 20px',fontFamily:'-apple-system,BlinkMacSystemFont,sans-serif'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <h2 style={{fontSize:20,fontWeight:700,color:'#111'}}>
            {loading ? 'טוען מטפלים...' : `${show.length} מטפלים`}
          </h2>
          {(area||type||q) && (
            <button onClick={()=>{setArea('');setType('');setQ('')}}
              style={{color:'#0F6E56',background:'none',border:'none',cursor:'pointer',fontSize:13,fontFamily:'inherit',fontWeight:600}}>
              נקה סינון ×
            </button>
          )}
        </div>
 
        {loading ? (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))',gap:18}}>
            {[1,2,3,4,5,6].map(i=>(
              <div key={i} style={{background:'#f5f5f5',borderRadius:22,height:280,opacity:0.6}} />
            ))}
          </div>
        ) : show.length === 0 ? (
          <div style={{textAlign:'center',padding:'70px 0',color:'#bbb'}}>
            <div style={{fontSize:52,marginBottom:14}}>🔍</div>
            <p style={{fontSize:18,fontWeight:600,color:'#555',marginBottom:6}}>לא נמצאו מטפלים</p>
            <p style={{fontSize:13,color:'#aaa'}}>נסה לשנות את הסינון</p>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))',gap:18}}>
            {show.map((t,i)=>(
              <div key={t.id}
                style={{
                  background:'#fff',
                  border: t.featured ? '2px solid #1D9E75' : '1px solid #f0f0f0',
                  borderRadius:22,overflow:'hidden',
                  transition:'transform 0.18s, box-shadow 0.18s',
                  cursor:'default'
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 12px 36px rgba(0,0,0,0.09)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}
              >
                {t.featured && (
                  <div style={{background:'#0F6E56',color:'#fff',fontSize:11,fontWeight:700,textAlign:'center',padding:'6px 0',letterSpacing:'0.6px'}}>
                    ✦ מטפל מובחר
                  </div>
                )}
                <div style={{padding:20}}>
                  {/* Card header */}
                  <div style={{display:'flex',gap:13,marginBottom:13,alignItems:'flex-start'}}>
                    <div style={{width:54,height:54,borderRadius:17,background:AV_BG[i%6],display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:800,color:AV_FG[i%6],flexShrink:0,overflow:'hidden'}}>
                      {t.image_url
                        ? <img src={t.image_url} alt={t.name} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                        : t.name?.[0]
                      }
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap',marginBottom:3}}>
                        <span style={{fontSize:15,fontWeight:700,color:'#111'}}>{t.name}</span>
                        <span style={{background:'#E1F5EE',color:'#065F46',fontSize:10,padding:'2px 7px',borderRadius:10,fontWeight:700}}>מאושר/ת</span>
                      </div>
                      <div style={{fontSize:12,color:'#999',marginBottom:4}}>📍 {t.area} · ניידת</div>
                      {t.rating && (
                        <div style={{fontSize:12}}>
                          <span style={{color:'#F59E0B'}}>{'★'.repeat(Math.round(t.rating))}{'☆'.repeat(5-Math.round(t.rating))}</span>
                          <span style={{color:'#ccc',fontSize:11,marginRight:4}}> {t.rating} ({t.reviews_count || 0})</span>
                        </div>
                      )}
                    </div>
                  </div>
 
                  {/* Description */}
                  {t.description && (
                    <p style={{fontSize:13,color:'#777',lineHeight:1.6,marginBottom:13,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                      {t.description}
                    </p>
                  )}
 
                  {/* Type tags */}
                  <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:16}}>
                    {(t.types||[]).map(tag=>(
                      <span key={tag} style={{background:'#f8f8f8',border:'1px solid #eee',borderRadius:20,fontSize:11,padding:'3px 10px',color:'#666'}}>
                        {tag}
                      </span>
                    ))}
                  </div>
 
                  {/* Footer */}
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',borderTop:'1px solid #f5f5f5',paddingTop:14}}>
                    <div>
                      <div style={{fontSize:17,fontWeight:800,color:'#111',letterSpacing:'-0.3px'}}>מ-{t.price}₪</div>
                      <div style={{fontSize:11,color:'#bbb',marginTop:1}}>לטיפול של 60 דקות</div>
                    </div>
                    <a href={waHref(t)} target="_blank" rel="noopener noreferrer"
                      style={{background:'#1D9E75',color:'#fff',borderRadius:14,padding:'10px 18px',fontSize:13,fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',gap:7,transition:'background 0.15s'}}
                      onMouseEnter={e=>e.currentTarget.style.background='#0F6E56'}
                      onMouseLeave={e=>e.currentTarget.style.background='#1D9E75'}
                    >
                      {WA_SVG} שלח הודעה
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
 
      {/* ── JOIN BAND ── */}
      <div style={{background:'#0F6E56',padding:'56px 24px',textAlign:'center',fontFamily:'-apple-system,BlinkMacSystemFont,sans-serif'}}>
        <h2 style={{color:'#fff',fontSize:28,fontWeight:800,marginBottom:8,letterSpacing:'-0.4px'}}>אתה מטפל מוסמך?</h2>
        <p style={{color:'rgba(255,255,255,0.65)',fontSize:15,marginBottom:28,lineHeight:1.65}}>
          קבל לקוחות חדשים באזורך.<br/>הרשמה חינמית, אישור תוך 24 שעות.
        </p>
        <Link href="/join" style={{background:'#fff',color:'#0F6E56',borderRadius:30,padding:'14px 34px',fontSize:15,fontWeight:800,textDecoration:'none',display:'inline-block',letterSpacing:'-0.2px'}}>
          הצטרף עכשיו
        </Link>
      </div>
 
      {/* ── FOOTER ── */}
      <footer style={{background:'#fff',borderTop:'1px solid #f0f0f0',padding:'22px 24px',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',gap:12,maxWidth:1120,margin:'0 auto',fontFamily:'-apple-system,BlinkMacSystemFont,sans-serif'}}>
        <div style={{display:'flex',alignItems:'center',gap:9}}>
          <div style={{width:28,height:28,background:'#0F6E56',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:800,fontSize:13}}>מ</div>
          <span style={{fontWeight:700,color:'#0F6E56',fontSize:15}}>מגע</span>
        </div>
        <div style={{display:'flex',gap:22}}>
          {[['תקנון','/terms'],['פרטיות','/privacy'],['צור קשר','mailto:info@maga.co.il']].map(([l,h])=>(
            <a key={l} href={h} style={{fontSize:13,color:'#bbb',textDecoration:'none'}}>{l}</a>
          ))}
        </div>
        <p style={{fontSize:12,color:'#ddd'}}>© 2024 מגע. כל הזכויות שמורות.</p>
      </footer>
 
      {/* ── WhatsApp FAB ── */}
      <a href="https://wa.me/972500000000" target="_blank" rel="noopener noreferrer"
        aria-label="צור קשר בוואטסאפ"
        style={{position:'fixed',bottom:24,left:20,zIndex:999,width:54,height:54,background:'#25D366',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 22px rgba(37,211,102,0.45)',textDecoration:'none',transition:'transform 0.15s'}}
        onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'}
        onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
      >
        <svg width="27" height="27" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13 13 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.135.562 4.14 1.54 5.873L.057 23.25a.75.75 0 00.916.916l5.377-1.483A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.852-.538-5.462-1.48l-.392-.23-3.35.924.924-3.35-.23-.392A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </>
  )
}