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

const WA_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="white" style={{flexShrink:0}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13 13 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.135.562 4.14 1.54 5.873L.057 23.25a.75.75 0 00.916.916l5.377-1.483A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.852-.538-5.462-1.48l-.392-.23-3.35.924.924-3.35-.23-.392A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

export default function Home() {
  const [list, setList]         = useState([])
  const [show, setShow]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [q, setQ]               = useState('')
  const [area, setArea]         = useState('')
  const [type, setType]         = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    load()
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  return (
    <>
      <Head>
        <title>מגע — מטפלים מוסמכים עד אליך הביתה</title>
        <meta name="description" content="מצא מטפל עיסוי מוסמך ומאושר באזורך." />
        <meta property="og:title" content="מגע — מטפלים מוסמכים עד אליך הביתה" />
        <meta property="og:description" content="מצא מטפל עיסוי מאושר באזורך תוך דקה." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background: #f9f9f7; }
          @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
          @keyframes shimmer { 0%,100%{opacity:.6} 50%{opacity:.3} }
          .fade-up { animation: fadeUp 0.55s ease both; }
          .card-hover { transition: transform 0.22s ease, box-shadow 0.22s ease; }
          .card-hover:hover { transform: translateY(-4px) !important; box-shadow: 0 16px 48px rgba(0,0,0,0.11) !important; }
          .wa-btn { transition: background 0.15s; }
          .wa-btn:hover { background: #0F6E56 !important; }
          input:focus, select:focus { border-color: #1D9E75 !important; box-shadow: 0 0 0 3px rgba(29,158,117,0.12) !important; outline: none !important; }
          @media (max-width: 600px) {
            .hero-title { font-size: 32px !important; }
            .search-grid { grid-template-columns: 1fr !important; }
            .cards-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </Head>

      {/* NAV */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:200,
        height:56,display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'0 24px',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : 'none',
        transition:'all 0.3s ease',
      }}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <div style={{width:34,height:34,background:'#0F6E56',borderRadius:11,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:800,fontSize:16,boxShadow:'0 2px 8px rgba(15,110,86,0.35)'}}>מ</div>
          <span style={{fontWeight:700,fontSize:19,color:scrolled?'#111':'#fff',letterSpacing:'-0.4px',transition:'color 0.3s'}}>מגע</span>
        </Link>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <Link href="/admin" style={{fontSize:13,color:scrolled?'#666':'rgba(255,255,255,0.85)',textDecoration:'none',padding:'6px 14px',border:`1px solid ${scrolled?'#e8e8e8':'rgba(255,255,255,0.35)'}`,borderRadius:20,fontWeight:500,transition:'all 0.3s'}}>ניהול</Link>
          <Link href="/join" style={{fontSize:13,color:'#fff',textDecoration:'none',padding:'7px 18px',background:'#0F6E56',borderRadius:20,fontWeight:700,boxShadow:'0 2px 12px rgba(15,110,86,0.4)'}}>הצטרף כמטפל</Link>
        </div>
      </nav>

      {/* HERO */}
      <div style={{minHeight:'92vh',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'url(https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1600&q=80)',backgroundSize:'cover',backgroundPosition:'center',filter:'brightness(0.42)'}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom, rgba(5,40,30,0.25) 0%, rgba(5,40,30,0.7) 100%)'}} />

        <div className="fade-up" style={{position:'relative',zIndex:2,textAlign:'center',padding:'100px 24px 60px',maxWidth:680,width:'100%'}}>
          <div style={{display:'inline-block',background:'rgba(255,255,255,0.15)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:30,padding:'5px 16px',fontSize:11,color:'rgba(255,255,255,0.9)',letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:20,fontWeight:600}}>
            פלטפורמת העיסוי #1 בישראל
          </div>
          <h1 className="hero-title" style={{color:'#fff',fontSize:52,fontWeight:800,lineHeight:1.1,marginBottom:16,letterSpacing:'-0.8px',textShadow:'0 2px 20px rgba(0,0,0,0.3)'}}>
            מטפל מוסמך<br />
            <span style={{color:'#6EE7B7'}}>עד אליך הביתה</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:17,marginBottom:40,lineHeight:1.7,textShadow:'0 1px 4px rgba(0,0,0,0.3)'}}>
            בחר אזור, מצא מטפל מאושר, שלח הודעה — הכל בפחות מדקה
          </p>

          <div style={{display:'flex',justifyContent:'center',marginBottom:36}}>
            <div style={{display:'flex',background:'rgba(255,255,255,0.1)',backdropFilter:'blur(12px)',borderRadius:18,border:'1px solid rgba(255,255,255,0.15)',overflow:'hidden'}}>
              {[['200+','מטפלים'],['4.9★','דירוג'],['כל הארץ','אזורים']].map(([n,l],i)=>(
                <div key={l} style={{padding:'14px 24px',textAlign:'center',borderRight:i<2?'1px solid rgba(255,255,255,0.15)':'none'}}>
                  <div style={{color:'#fff',fontSize:18,fontWeight:800}}>{n}</div>
                  <div style={{color:'rgba(255,255,255,0.6)',fontSize:10,marginTop:1}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{background:'rgba(255,255,255,0.97)',borderRadius:24,padding:20,maxWidth:560,margin:'0 auto',boxShadow:'0 32px 80px rgba(0,0,0,0.35)'}}>
            <div style={{position:'relative',marginBottom:12}}>
              <span style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',fontSize:16,color:'#bbb',pointerEvents:'none'}}>🔍</span>
              <input value={q} onChange={e=>setQ(e.target.value)}
                placeholder="חפש לפי שם, אזור או סוג טיפול..."
                style={{width:'100%',border:'1.5px solid #efefef',borderRadius:14,padding:'13px 44px 13px 14px',fontSize:14,color:'#111',background:'#fafafa',fontFamily:'inherit'}}
              />
            </div>
            <div className="search-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
              <select value={area} onChange={e=>setArea(e.target.value)}
                style={{border:'1.5px solid #efefef',borderRadius:14,padding:'11px 12px',fontSize:13,color:'#444',background:'#fafafa',fontFamily:'inherit'}}>
                <option value="">כל האזורים</option>
                {AREAS.map(a=><option key={a}>{a}</option>)}
              </select>
              <select value={type} onChange={e=>setType(e.target.value)}
                style={{border:'1.5px solid #efefef',borderRadius:14,padding:'11px 12px',fontSize:13,color:'#444',background:'#fafafa',fontFamily:'inherit'}}>
                <option value="">כל הטיפולים</option>
                {TYPES.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{position:'absolute',bottom:28,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:6,opacity:0.6}}>
          <span style={{color:'#fff',fontSize:11,letterSpacing:'0.5px'}}>גלול למטה</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>

      {/* RESULTS */}
      <div style={{background:'#f9f9f7',minHeight:'60vh'}}>
        <div style={{maxWidth:1140,margin:'0 auto',padding:'48px 20px 60px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:28}}>
            <div>
              <h2 style={{fontSize:22,fontWeight:700,color:'#111',letterSpacing:'-0.3px'}}>
                {loading ? 'טוען מטפלים...' : `${show.length} מטפלים מאושרים`}
              </h2>
              {!loading && !q && !area && !type && (
                <p style={{fontSize:13,color:'#aaa',marginTop:3}}>כולם עברו בדיקה ואושרו על ידינו</p>
              )}
            </div>
            {(area||type||q) && (
              <button onClick={()=>{setArea('');setType('');setQ('')}}
                style={{color:'#0F6E56',background:'#E1F5EE',border:'none',cursor:'pointer',fontSize:13,fontFamily:'inherit',fontWeight:700,padding:'7px 14px',borderRadius:20}}>
                נקה סינון ×
              </button>
            )}
          </div>

          {loading ? (
            <div className="cards-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:18}}>
              {[1,2,3,4,5,6].map(i=>(
                <div key={i} style={{background:'#eee',borderRadius:22,height:290,animation:'shimmer 1.4s infinite'}} />
              ))}
            </div>
          ) : show.length === 0 ? (
            <div style={{textAlign:'center',padding:'80px 0',color:'#bbb'}}>
              <div style={{fontSize:56,marginBottom:16}}>🔍</div>
              <p style={{fontSize:18,fontWeight:600,color:'#555',marginBottom:6}}>לא נמצאו מטפלים</p>
              <p style={{fontSize:13,color:'#aaa'}}>נסה לשנות את הסינון</p>
            </div>
          ) : (
            <div className="cards-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:18}}>
              {show.map((t,i)=>(
                <div key={t.id} className="card-hover"
                  style={{background:'#fff',border:t.featured?'2px solid #1D9E75':'1px solid #eee',borderRadius:22,overflow:'hidden'}}>
                  {t.featured && (
                    <div style={{background:'linear-gradient(90deg,#0F6E56,#1D9E75)',color:'#fff',fontSize:11,fontWeight:700,textAlign:'center',padding:'6px 0',letterSpacing:'0.8px'}}>
                      ✦ מטפל מובחר
                    </div>
                  )}
                  <div style={{padding:20}}>
                    <div style={{display:'flex',gap:14,marginBottom:14,alignItems:'flex-start'}}>
                      <div style={{width:56,height:56,borderRadius:18,background:AV_BG[i%6],display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:800,color:AV_FG[i%6],flexShrink:0,overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
                        {t.image_url ? <img src={t.image_url} alt={t.name} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : t.name?.[0]}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:'flex',alignItems:'center',gap:7,flexWrap:'wrap',marginBottom:4}}>
                          <span style={{fontSize:15,fontWeight:700,color:'#111'}}>{t.name}</span>
                          <span style={{background:'#E1F5EE',color:'#065F46',fontSize:10,padding:'2px 8px',borderRadius:10,fontWeight:700}}>מאושר/ת</span>
                        </div>
                        <div style={{fontSize:12,color:'#999',marginBottom:5}}>📍 {t.area} · ניידת</div>
                        {t.rating && (
                          <div style={{fontSize:12}}>
                            <span style={{color:'#F59E0B'}}>{'★'.repeat(Math.round(t.rating))}{'☆'.repeat(5-Math.round(t.rating))}</span>
                            <span style={{color:'#ccc',fontSize:11}}> {t.rating} ({t.reviews_count||0})</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {t.description && (
                      <p style={{fontSize:13,color:'#777',lineHeight:1.65,marginBottom:14,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                        {t.description}
                      </p>
                    )}
                    <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:16}}>
                      {(t.types||[]).map(tag=>(
                        <span key={tag} style={{background:'#f8f8f6',border:'1px solid #efefed',borderRadius:20,fontSize:11,padding:'3px 10px',color:'#666',fontWeight:500}}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',borderTop:'1px solid #f5f5f3',paddingTop:14}}>
                      <div>
                        <div style={{fontSize:18,fontWeight:800,color:'#111',letterSpacing:'-0.3px'}}>מ-{t.price}₪</div>
                        <div style={{fontSize:11,color:'#bbb',marginTop:1}}>לטיפול של 60 דקות</div>
                      </div>
                      <a href={waHref(t)} target="_blank" rel="noopener noreferrer" className="wa-btn"
                        style={{background:'#1D9E75',color:'#fff',borderRadius:14,padding:'10px 18px',fontSize:13,fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',gap:7,boxShadow:'0 4px 14px rgba(29,158,117,0.3)'}}>
                        {WA_ICON} שלח הודעה
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* JOIN */}
      <div style={{background:'linear-gradient(135deg,#0a5c45 0%,#0F6E56 50%,#1a8a6a 100%)',padding:'64px 24px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-60,right:-60,width:200,height:200,background:'rgba(255,255,255,0.04)',borderRadius:'50%'}} />
        <div style={{position:'absolute',bottom:-40,left:-40,width:160,height:160,background:'rgba(255,255,255,0.04)',borderRadius:'50%'}} />
        <div style={{position:'relative',zIndex:1}}>
          <h2 style={{color:'#fff',fontSize:30,fontWeight:800,marginBottom:10,letterSpacing:'-0.5px'}}>אתה מטפל מוסמך?</h2>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:16,marginBottom:30,lineHeight:1.7}}>קבל לקוחות חדשים באזורך.<br/>הרשמה חינמית, אישור תוך 24 שעות.</p>
          <Link href="/join" style={{background:'#fff',color:'#0F6E56',borderRadius:30,padding:'14px 36px',fontSize:15,fontWeight:800,textDecoration:'none',display:'inline-block',boxShadow:'0 4px 20px rgba(0,0,0,0.15)'}}>
            הצטרף עכשיו ←
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{background:'#fff',borderTop:'1px solid #f0f0ee',padding:'24px'}}>
        <div style={{maxWidth:1140,margin:'0 auto',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',gap:14}}>
          <div style={{display:'flex',alignItems:'center',gap:9}}>
            <div style={{width:30,height:30,background:'#0F6E56',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:800,fontSize:14}}>מ</div>
            <span style={{fontWeight:700,color:'#111',fontSize:16}}>מגע</span>
          </div>
          <div style={{display:'flex',gap:24}}>
            <a href="/terms" style={{fontSize:13,color:'#aaa',textDecoration:'none'}}>תקנון</a>
            <a href="/privacy" style={{fontSize:13,color:'#aaa',textDecoration:'none'}}>פרטיות</a>
            <a href="mailto:info@maga.co.il" style={{fontSize:13,color:'#aaa',textDecoration:'none'}}>צור קשר</a>
          </div>
          <p style={{fontSize:12,color:'#ddd'}}>© 2024 מגע. כל הזכויות שמורות.</p>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/972500000000" target="_blank" rel="noopener noreferrer"
        style={{position:'fixed',bottom:24,left:20,zIndex:999,width:54,height:54,background:'#25D366',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 22px rgba(37,211,102,0.5)',textDecoration:'none',transition:'transform 0.2s'}}
        onMouseEnter={e=>e.currentTarget.style.transform='scale(1.12)'}
        onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
        aria-label="וואטסאפ">
        <svg width="27" height="27" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13 13 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.135.562 4.14 1.54 5.873L.057 23.25a.75.75 0 00.916.916l5.377-1.483A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.852-.538-5.462-1.48l-.392-.23-3.35.924.924-3.35-.23-.392A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </>
  )
}