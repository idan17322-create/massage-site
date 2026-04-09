export default function TherapistCard({ therapist: t }) {
  const stars = (r) => {
    if (!r) return null
    return '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r))
  }

  return (
    <div className={`bg-white rounded-3xl border overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col ${t.featured ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-gray-100'}`}>
      {t.featured && (
        <div className="bg-emerald-700 text-white text-xs font-semibold text-center py-1.5 tracking-wide">
          ✦ מטפל מובחר
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl font-bold text-emerald-700 flex-shrink-0 overflow-hidden">
            {t.image_url
              ? <img src={t.image_url} alt={t.name} className="w-full h-full object-cover" />
              : t.name[0]
            }
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h3 className="font-semibold text-gray-900 text-base leading-tight">{t.name}</h3>
              <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium">מאושר/ת</span>
            </div>
            <div className="text-gray-400 text-sm flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t.area} · ניידת
            </div>
            {t.rating && (
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-amber-400 text-xs tracking-tight">{stars(t.rating)}</span>
                <span className="text-gray-400 text-xs">{t.rating} ({t.reviews_count} ביקורות)</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {t.description && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{t.description}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(t.types || []).map(type => (
            <span key={type} className="bg-gray-50 border border-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full">
              {type}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
          <div>
            <div className="text-gray-900 font-bold text-base">מ-{t.price}₪</div>
            <div className="text-gray-400 text-xs">לטיפול של 60 דקות</div>
          </div>
          <a
            href={t.wa_link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2.5 rounded-2xl transition-colors flex items-center gap-2"
            aria-label={`שלח הודעה ל${t.name} בוואטסאפ`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13 13 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.135.562 4.14 1.54 5.873L.057 23.25a.75.75 0 00.916.916l5.377-1.483A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.852-.538-5.462-1.48l-.392-.23-3.35.924.924-3.35-.23-.392A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            שלח הודעה
          </a>
        </div>
      </div>
    </div>
  )
}
