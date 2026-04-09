export default function TherapistCard({ therapist: t }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5 text-right" dir="rtl">
        <div className="flex justify-between items-start mb-3">
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-lg">מאושר</span>
          <h3 className="text-xl font-bold text-gray-900">{t.name}</h3>
        </div>
        <p className="text-emerald-600 text-sm font-medium mb-2">{t.area}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {t.types?.map(type => (
            <span key={type} className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-md border border-gray-100">{type}</span>
          ))}
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">{t.description}</p>
        <a href={t.wa_link} target="_blank" rel="noopener noreferrer" 
           className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold py-3 rounded-xl transition-colors">
          שלח הודעה בוואטסאפ
        </a>
      </div>
    </div>
  )
}