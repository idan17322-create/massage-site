import Link from 'next/link'
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-700 rounded-lg flex items-center justify-center text-white font-bold text-xs">מ</div>
          <span className="font-semibold text-gray-700">מגע</span>
        </div>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/terms" className="hover:text-gray-600">תקנון</Link>
          <Link href="/privacy" className="hover:text-gray-600">פרטיות</Link>
          <a href="mailto:info@maga.co.il" className="hover:text-gray-600">צור קשר</a>
        </div>
        <p className="text-gray-300 text-xs">© 2024 כל הזכויות שמורות למגע</p>
      </div>
    </footer>
  )
}
