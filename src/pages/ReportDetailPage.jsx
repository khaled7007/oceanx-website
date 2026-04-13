import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { REPORTS, TAG_COLORS } from '../data/insight'
import { reportRoute } from '../utils/insightLinks'

function tagCls(tag) {
  return TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600 border-gray-200'
}

function RelatedReports({ currentId, report }) {
  const related = REPORTS
    .map((entry, i) => ({ ...entry, i }))
    .filter((entry) => {
      if (entry.i === currentId) return false
      if (!entry.image) return false
      if (entry.year === report.year) return true
      return entry.tags?.some((tag) => report.tags?.includes(tag))
    })
    .slice(0, 3)

  if (!related.length) return null

  return (
    <div className="mt-14 pt-10 border-t border-gray-100">
      <h3 className="text-base font-bold text-gray-800 mb-6 text-right" dir="rtl">تقارير ذات صلة</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {related.map((entry) => (
          <Link
            key={entry.i}
            to={reportRoute(entry.i)}
            className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all duration-300 overflow-hidden no-underline"
          >
            <div className="h-32 overflow-hidden bg-gray-100">
              <img src={entry.image} alt={entry.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-1 mb-2">
                {entry.tags?.slice(0, 1).map((tag) => (
                  <span key={tag} className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${tagCls(tag)}`}>{tag}</span>
                ))}
              </div>
              <h4 className="text-gray-900 font-bold text-[13px] leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">{entry.title}</h4>
              <p className="text-gray-400 text-[11px] mt-2">{entry.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function ReportDetailPage() {
  const { reportId } = useParams()
  const navigate = useNavigate()

  const parsedId = Number(reportId)
  const meta = Number.isInteger(parsedId) && parsedId >= 0 ? REPORTS[parsedId] ?? null : null

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">التقرير غير موجود</h2>
          <button onClick={() => navigate(-1)} className="text-brand-blue text-sm hover:underline">رجوع</button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f8f8fb] min-h-screen pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1.5 text-xs text-gray-400 mb-8 justify-end"
          dir="rtl"
        >
          <Link to="/" className="hover:text-brand-blue transition-colors no-underline">الرئيسية</Link>
          <span>›</span>
          <Link to="/insight" className="hover:text-brand-blue transition-colors no-underline">إنسايت</Link>
          <span>›</span>
          <span className="text-gray-500 line-clamp-1 max-w-[160px]">{meta.title}</span>
        </motion.div>

        {/* Report image */}
        {meta.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden bg-[#e8e8f0] shadow-sm mb-6"
            style={{ padding: '32px 24px' }}
          >
            <img
              src={meta.image}
              alt={meta.title}
              className="w-full object-contain rounded-xl drop-shadow-2xl"
              style={{ maxHeight: '340px' }}
            />
          </motion.div>
        )}

        {/* Tags row */}
        {meta.tags?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="flex flex-wrap gap-2 mb-5 justify-end"
            dir="rtl"
          >
            <span className="text-[11px] text-brand-blue font-bold tracking-widest uppercase bg-brand-blue/8 border border-brand-blue/15 px-3 py-1 rounded-full">
              تقرير
            </span>
            {meta.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={`text-[11px] px-3 py-1 rounded-full border font-medium ${tagCls(tag)}`}>{tag}</span>
            ))}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="text-2xl font-bold text-gray-900 leading-snug mb-2 text-right"
          dir="rtl"
        >
          {meta.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-gray-400 text-xs mb-8 text-right"
          dir="rtl"
        >
          أوشن إكس إنسايت · {meta.date}
        </motion.p>

        {/* Excerpt */}
        {meta.excerpt && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm mb-8"
            dir="rtl"
          >
            <p className="text-gray-400 text-[11px] font-bold tracking-widest uppercase mb-3">ملخص تقرير</p>
            <p className="text-gray-700 text-base leading-relaxed">{meta.excerpt}</p>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="flex items-center justify-between"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12L6 8l4-4" />
            </svg>
            رجوع
          </button>
          <a
            href={meta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-brand-blue font-semibold hover:underline no-underline"
          >
            قراءة تقرير كاملاً
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3 11L11 3M6 3h5v5" />
            </svg>
          </a>
        </motion.div>

        {/* Related */}
        {Number.isInteger(parsedId) && <RelatedReports currentId={parsedId} report={meta} />}

      </div>
    </div>
  )
}
