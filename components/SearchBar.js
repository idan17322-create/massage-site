// SearchBar.js
export function SearchBar({ query, setQuery }) {
  return (
    <div className="relative">
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="חפש מטפל, אזור, סוג טיפול..."
        className="w-full border border-gray-200 rounded-xl pr-9 pl-4 py-3 text-sm text-gray-700 bg-gray-50 outline-none focus:border-emerald-500 focus:bg-white transition-colors"
        aria-label="חיפוש מטפל"
      />
    </div>
  )
}

// WhatsAppFAB.js
export function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/972500000000?text=היי%2C+הגעתי+דרך+אתר+מגע+ואשמח+לעזרה"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="צור קשר בוואטסאפ"
      className="fixed bottom-6 left-5 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
    >
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13 13 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.135.562 4.14 1.54 5.873L.057 23.25a.75.75 0 00.916.916l5.377-1.483A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.852-.538-5.462-1.48l-.392-.23-3.35.924.924-3.35-.23-.392A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    </a>
  )
}

// AccessibilityWidget.js
import { useState } from 'react'
export function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)

  function changeFontSize(delta) {
    const next = Math.min(130, Math.max(80, fontSize + delta))
    setFontSize(next)
    document.documentElement.style.fontSize = next + '%'
  }

  function toggleContrast() {
    setHighContrast(!highContrast)
    document.documentElement.classList.toggle('high-contrast')
  }

  return (
    <div className="fixed top-20 left-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        aria-label="פתח תפריט נגישות"
        className="w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm font-bold"
      >
        ♿
      </button>
      {open && (
        <div className="absolute left-0 top-12 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-48" role="dialog" aria-label="תפריט נגישות">
          <p className="text-xs font-semibold text-gray-700 mb-3">נגישות</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">גודל טקסט</span>
              <div className="flex items-center gap-1">
                <button onClick={() => changeFontSize(-10)} className="w-6 h-6 border border-gray-200 rounded text-xs hover:bg-gray-50" aria-label="הקטן טקסט">−</button>
                <span className="text-xs w-8 text-center">{fontSize}%</span>
                <button onClick={() => changeFontSize(10)} className="w-6 h-6 border border-gray-200 rounded text-xs hover:bg-gray-50" aria-label="הגדל טקסט">+</button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">ניגודיות גבוהה</span>
              <button
                onClick={toggleContrast}
                className={`w-10 h-5 rounded-full transition-colors ${highContrast ? 'bg-emerald-600' : 'bg-gray-200'}`}
                aria-pressed={highContrast}
                aria-label="הפעל ניגודיות גבוהה"
              >
                <span className={`block w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${highContrast ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            <button
              onClick={() => { setFontSize(100); document.documentElement.style.fontSize = '100%'; setHighContrast(false); document.documentElement.classList.remove('high-contrast') }}
              className="w-full text-xs text-gray-500 border border-gray-200 rounded-lg py-1 hover:bg-gray-50 mt-1"
            >
              איפוס
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Footer.js
import Link from 'next/link'
export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">מ</div>
            <span className="font-semibold text-gray-700">מגע</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-gray-600 transition-colors">תקנון</Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">פרטיות</Link>
            <a href="mailto:info@maga.co.il" className="hover:text-gray-600 transition-colors">צור קשר</a>
          </div>
          <p className="text-gray-300 text-xs">© 2024 מגע. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  )
}
