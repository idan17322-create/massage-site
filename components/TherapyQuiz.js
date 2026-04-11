import { useState } from 'react'

const QUESTIONS = [
  {
    id: 'goal',
    text: 'מה המטרה העיקרית שלך?',
    emoji: '🎯',
    options: [
      { value: 'pain',  label: 'שחרור כאב ממוקד',     emoji: '⚡' },
      { value: 'relax', label: 'הפגת מתחים ורוגע',    emoji: '🌿' },
      { value: 'sport', label: 'שיקום פציעת ספורט',   emoji: '🏃' },
    ]
  },
  {
    id: 'pressure',
    text: 'איזו עוצמת מגע אתה מעדיף?',
    emoji: '🤲',
    options: [
      { value: 'light',  label: 'עדינה ומלטפת',        emoji: '🪶' },
      { value: 'medium', label: 'בינונית ומשולבת',     emoji: '👐' },
      { value: 'deep',   label: 'חזקה ועמוקה',         emoji: '💪' },
    ]
  },
  {
    id: 'area',
    text: 'איפה הכי "תפוס" לך?',
    emoji: '📍',
    options: [
      { value: 'lower', label: 'גב תחתון ורגליים',    emoji: '🦵' },
      { value: 'upper', label: 'צוואר וכתפיים',        emoji: '🙆' },
      { value: 'full',  label: 'כל הגוף',              emoji: '✨' },
    ]
  }
]

function getRecommendation(answers) {
  const { goal, pressure, area } = answers

  if (goal === 'sport')
    return { types: ['ספורט','כוסות רוח','פיזיותרפיה'], title: 'עיסוי ספורט ושיקום', desc: 'מתאים לשיקום פציעות, שחרור שרירים תפוסים ושיפור ביצועים.' }

  if (goal === 'pain' && pressure === 'deep')
    return { types: ['רקמות עמוקות','שיאצו','רפואה סינית / דיקור'], title: 'עיסוי רקמות עמוקות', desc: 'פועל על שכבות עמוקות של שריר לשחרור כאב כרוני וצמתים תפוסים.' }

  if (goal === 'pain' && pressure === 'medium')
    return { types: ['שיאצו','רפלקסולוגיה','לימפה'], title: 'שיאצו ורפלקסולוגיה', desc: 'עבודה על נקודות לחץ ספציפיות לשחרור כאב ממוקד.' }

  if (goal === 'pain' && pressure === 'light')
    return { types: ['לימפה','ארומתרפיה','עיסוי הוליסטי'], title: 'עיסוי לימפתי עדין', desc: 'עיסוי עדין המסייע לשחרור כאבים קלים וניקוי רעלים.' }

  if (goal === 'relax' && pressure === 'light')
    return { types: ['שוודי','ארומתרפיה','עיסוי הוליסטי'], title: 'עיסוי שוודי וארומתרפיה', desc: 'עיסוי מרגיע עם שמנים אתריים לשחרור מתחים ורוגע מלא.' }

  if (goal === 'relax' && pressure === 'medium')
    return { types: ['שוודי','עיסוי הוליסטי','לימפה'], title: 'עיסוי שוודי משולב', desc: 'שילוב מושלם בין הרפיה לעיסוי יסודי לכל הגוף.' }

  if (goal === 'relax' && pressure === 'deep')
    return { types: ['רקמות עמוקות','שיאצו','טיפול רגשי-גוף'], title: 'עיסוי עמוק מרגיע', desc: 'שחרור מתחים עמוקים בשריר לצד רוגע מנטלי.' }

  if (area === 'upper')
    return { types: ['שוודי','שיאצו','רקמות עמוקות'], title: 'עיסוי צוואר וכתפיים', desc: 'ממוקד באזורי הצוואר, הכתפיים והגב העליון.' }

  if (area === 'lower')
    return { types: ['רפלקסולוגיה','שוודי','ספורט'], title: 'עיסוי גב ורגליים', desc: 'שחרור לחץ מגב תחתון ורגליים עייפות.' }

  return { types: ['שוודי','עיסוי הוליסטי','ארומתרפיה'], title: 'עיסוי שוודי קלאסי', desc: 'הטיפול המושלם לכל מי שרוצה לנוח ולהתחדש.' }
}

export default function TherapyQuiz({ onResult }) {
  const [open, setOpen]       = useState(false)
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult]   = useState(null)
  const [anim, setAnim]       = useState('in')

  function handleOption(value) {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: value }
    setAnswers(newAnswers)
    setAnim('out')
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1)
      } else {
        setResult(getRecommendation(newAnswers))
      }
      setAnim('in')
    }, 180)
  }

  function reset() {
    setAnim('out')
    setTimeout(() => {
      setStep(0)
      setAnswers({})
      setResult(null)
      setAnim('in')
    }, 180)
  }

  function applyResult() {
    if (result && onResult) onResult(result.types)
    setOpen(false)
    setTimeout(() => {
      const el = document.getElementById('main-content')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  function openQuiz() {
    reset()
    setTimeout(() => setOpen(true), 10)
  }

  const progress = result ? 100 : Math.round((step / QUESTIONS.length) * 100)
  const q = QUESTIONS[step]

  return (
    <>
      <style>{`
        @keyframes quizIn  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes quizOut { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-10px)} }
        .qin  { animation: quizIn  0.2s ease both; }
        .qout { animation: quizOut 0.18s ease both; }
        .qopt { transition: all 0.15s ease; border: 1.5px solid #efefef; background: #fafafa; }
        .qopt:hover { border-color: #1D9E75 !important; background: #f0fdf8 !important; transform: translateX(-2px); }
        .qfab { transition: all 0.2s ease; }
        .qfab:hover { transform: scale(1.1); box-shadow: 0 8px 28px rgba(15,110,86,0.5) !important; }
        .qapply:hover { background: #0a5c45 !important; }
        .qapply { transition: background 0.15s; }
      `}</style>

      {/* FAB */}
      {!open && (
        <button className="qfab" onClick={openQuiz}
          aria-label="מחשבון התאמת טיפול אישי"
          style={{ position: 'fixed', bottom: 88, left: 20, zIndex: 998, width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg,#0F6E56,#1D9E75)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(15,110,86,0.4)', fontFamily: 'inherit' }}>
          🎯
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div onClick={e => e.target === e.currentTarget && setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 12px 24px' }}>

          <div style={{ background: '#fff', borderRadius: 28, padding: 26, width: '100%', maxWidth: 420, boxShadow: '0 -8px 60px rgba(0,0,0,0.2)', fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', direction: 'rtl' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#111', margin: 0, letterSpacing: '-0.3px' }}>מחשבון התאמת טיפול</h2>
                {!result && <p style={{ fontSize: 11, color: '#aaa', margin: '2px 0 0' }}>שאלה {step + 1} מתוך {QUESTIONS.length}</p>}
              </div>
              <button onClick={() => setOpen(false)}
                style={{ background: '#f5f5f5', border: 'none', borderRadius: '50%', width: 32, height: 32, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                ✕
              </button>
            </div>

            {/* Progress */}
            <div style={{ height: 4, background: '#f0f0f0', borderRadius: 4, marginBottom: 22, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg,#0F6E56,#1D9E75)', width: progress + '%', transition: 'width 0.35s ease' }} />
            </div>

            {/* Content */}
            <div className={anim === 'in' ? 'qin' : 'qout'}>
              {!result ? (
                <>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 38, marginBottom: 8 }}>{q.emoji}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111', margin: 0, lineHeight: 1.4 }}>{q.text}</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {q.options.map(opt => (
                      <button key={opt.value} className="qopt" onClick={() => handleOption(opt.value)}
                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'right', width: '100%' }}>
                        <span style={{ fontSize: 22, flexShrink: 0 }}>{opt.emoji}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button onClick={() => { setAnim('out'); setTimeout(() => { setStep(step - 1); setAnim('in') }, 180) }}
                      style={{ background: 'none', border: 'none', color: '#aaa', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', marginTop: 14, display: 'block', width: '100%', textAlign: 'center' }}>
                      ← חזרה
                    </button>
                  )}
                </>
              ) : (
                <>
                  <div style={{ textAlign: 'center', marginBottom: 18 }}>
                    <div style={{ fontSize: 46, marginBottom: 10 }}>✨</div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111', marginBottom: 10 }}>מומלץ עבורך:</h3>
                    <div style={{ background: 'linear-gradient(135deg,#0F6E56,#1D9E75)', borderRadius: 16, padding: '14px 18px', marginBottom: 12 }}>
                      <p style={{ color: '#fff', fontSize: 16, fontWeight: 800, margin: 0, marginBottom: 5 }}>{result.title}</p>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{result.desc}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                      {result.types.map(t => (
                        <span key={t} style={{ background: '#E1F5EE', color: '#065F46', fontSize: 12, padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <button className="qapply" onClick={applyResult}
                    style={{ width: '100%', background: '#0F6E56', color: '#fff', border: 'none', borderRadius: 16, padding: '14px', fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(15,110,86,0.3)', marginBottom: 10 }}>
                    הצג מטפלים מתאימים ←
                  </button>
                  <button onClick={reset}
                    style={{ width: '100%', background: 'none', border: '1.5px solid #efefef', borderRadius: 16, padding: '11px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: '#888' }}>
                    נסה שוב
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}