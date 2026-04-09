import { useState } from 'react'

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [contrast, setContrast] = useState(false)

  function changeSize(d) {
    const n = Math.min(130, Math.max(80, fontSize + d))
    setFontSize(n)
    document.documentElement.style.fontSize = n + '%'
  }

  function toggleContrast() {
    setContrast(!contrast)
    document.documentElement.classList.toggle('high-contrast')
  }

  return (
    <div className="fixed top-20 left-4 z-50">
      <button onClick={() => setOpen(!open)} aria-label="נגישות"
        className="w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-base hover:bg-gray-50">♿</button>
      {open && (
        <div className="absolute left-0 top-12 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-48" role="dialog" aria-label="תפריט נגישות">
          <p className="text-xs font-semibold text-gray-700 mb-3 font-sans">נגישות</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">גודל טקסט</span>
              <div className="flex items-center gap-1">
                <button onClick={() => changeSize(-10)} className="w-6 h-6 border rounded text-xs" aria-label="הקטן">−</button>
                <span className="text-xs w-8 text-center">{fontSize}%</span>
                <button onClick={() => changeSize(10)} className="w-6 h-6 border rounded text-xs" aria-label="הגדל">+</button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">ניגודיות</span>
              <button onClick={toggleContrast} aria-pressed={contrast}
                className={`w-10 h-5 rounded-full transition-colors ${contrast ? 'bg-emerald-600' : 'bg-gray-200'}`}>
                <span className={`block w-4 h-4 bg-white rounded-full mx-0.5 transition-transform ${contrast ? 'translate-x-5' : ''}`} />
              </button>
            </div>
            <button onClick={() => { setFontSize(100); document.documentElement.style.fontSize='100%'; setContrast(false); document.documentElement.classList.remove('high-contrast') }}
              className="w-full text-xs text-gray-500 border rounded-lg py-1 hover:bg-gray-50">איפוס</button>
          </div>
        </div>
      )}
    </div>
  )
}
