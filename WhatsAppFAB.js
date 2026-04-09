export default function SearchBar({ query, setQuery }) {
  return (
    <div className="relative">
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input type="search" value={query} onChange={e => setQuery(e.target.value)}
        placeholder="חפש מטפל, אזור, סוג טיפול..."
        className="w-full border border-gray-200 rounded-xl pr-9 pl-4 py-3 text-sm text-gray-700 bg-gray-50 outline-none focus:border-emerald-500 focus:bg-white transition-colors"
        aria-label="חיפוש מטפל" />
    </div>
  )
}
