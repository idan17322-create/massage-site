export default function SearchBar({ query, setQuery }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="חפש מטפל או סוג עיסוי..."
        className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 outline-none focus:border-emerald-500 text-right"
        dir="rtl"
      />
      <span className="absolute right-3 top-3.5 text-gray-400">🔍</span>
    </div>
  )
}