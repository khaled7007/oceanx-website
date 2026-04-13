import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { NEWS, NEWS_TAG_COLORS as TAG_COLORS } from '../data/news'
import { useI18n } from '../i18n/I18nContext'
import { translateDate } from '../data/insight'

function tagCls(tag) {
  return TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600 border-gray-200'
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="h-6 bg-gray-100 rounded-full w-3/4" />
      <div className="h-4 bg-gray-100 rounded-full w-full" />
      <div className="h-4 bg-gray-100 rounded-full w-5/6" />
      <div className="h-4 bg-gray-100 rounded-full w-full" />
      <div className="h-56 bg-gray-100 rounded-2xl w-full mt-6" />
      <div className="h-4 bg-gray-100 rounded-full w-4/5" />
      <div className="h-4 bg-gray-100 rounded-full w-full" />
      <div className="h-4 bg-gray-100 rounded-full w-2/3" />
    </div>
  )
}

export default function NewsDetailPage() {
  const { newsId } = useParams()
  const navigate = useNavigate()
  const { isEn } = useI18n()

  const parsedId = Number(newsId)
  const item = Number.isInteger(parsedId) && parsedId >= 0 ? NEWS[parsedId] ?? null : null

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const title = item ? (isEn && item.titleEn ? item.titleEn : item.title) : ''
  const excerpt = item ? (isEn && item.excerptEn ? item.excerptEn : item.excerpt) : ''
  const body = item?.body ?? null

  useEffect(() => {
    // If item has a local body, use it directly
    if (body) { setPost({ content: null }); setLoading(false); return }
    if (!item?.link) { setLoading(false); return }

    setLoading(true)
    setPost(null)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6000)

    fetch(`/api/article?url=${encodeURIComponent(item.link)}`, { signal: controller.signal })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok || data.error || !data.content || data.content.trim().length < 80) return
        setPost({ content: data.content })
      })
      .catch(() => {})
      .finally(() => { clearTimeout(timeout); setLoading(false) })
  }, [item])

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">الخبر غير موجود</h2>
          <button onClick={() => navigate(-1)} className="text-brand-blue text-sm hover:underline">رجوع</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #06081e 0%, #0f1540 60%, #1a2055 100%)' }}>
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: 'linear-gradient(rgba(47,72,245,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(47,72,245,0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {item.image && (
          <>
            <img src={item.image} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm scale-105 pointer-events-none" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(6,8,30,0.75), #06081e)' }} />
          </>
        )}

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 pt-32 sm:pt-40 pb-14">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-gray-500 mb-8" dir="rtl"
          >
            <Link to="/" className="hover:text-gray-300 transition-colors no-underline">الرئيسية</Link>
            <span className="opacity-30">›</span>
            <Link to="/news" className="hover:text-gray-300 transition-colors no-underline">الأخبار</Link>
            <span className="opacity-30">›</span>
            <span className="text-gray-400 line-clamp-1 max-w-[200px]">{title}</span>
          </motion.div>

          {/* Tag + date */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
            className="flex flex-wrap items-center gap-3 mb-5" dir="rtl"
          >
            {item.tag && (
              <span className={`text-[11px] font-bold tracking-widest px-3 py-1.5 rounded-full border ${tagCls(item.tag)}`}>
                {item.tag}
              </span>
            )}
            <span className="text-gray-500 text-sm">{translateDate(item.date, isEn ? 'en' : 'ar')}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight"
            dir="rtl"
          >
            {title}
          </motion.h1>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-12 pb-20">

        {/* Main image */}
        {item.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-lg mb-10 bg-gradient-to-br from-brand-navy via-[#1a2055] to-brand-blue"
          >
            <img
              src={item.image}
              alt={title}
              className="w-full object-cover"
              style={{ maxHeight: '480px' }}
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          </motion.div>
        )}

        {loading && <Skeleton />}

        {/* Local body content */}
        {!loading && body && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
            dir="rtl"
          >
            {body.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-700 text-lg leading-relaxed">{para}</p>
            ))}
            <div className="pt-8 border-t border-gray-100">
              <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 12L6 8l4-4"/></svg>
                رجوع إلى الأخبار
              </button>
            </div>
          </motion.div>
        )}

        {/* Full fetched content */}
        {!loading && !body && post && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="prose prose-lg prose-gray max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full
                prose-strong:text-gray-900
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:text-gray-700
                [&>*:first-child]:mt-0"
              dir="rtl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>
        )}

        {/* Fallback — excerpt only */}
        {!loading && !body && !post && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-700 text-lg leading-relaxed" dir="rtl">{excerpt}</p>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 12L6 8l4-4" />
                </svg>
                رجوع
              </button>
            </div>
          </motion.div>
        )}

        {/* Footer actions (when fetched content loaded) */}
        {!loading && !body && post && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 12L6 8l4-4" />
              </svg>
              رجوع إلى الأخبار
            </button>
          </div>
        )}

        {/* Related news */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-right" dir="rtl">أخبار أخرى</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NEWS.filter((_, i) => i !== parsedId).slice(0, 3).map((n, i) => (
              <Link
                key={n.id}
                to={`/news/${NEWS.indexOf(n)}`}
                className="group block bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-brand-blue/20 transition-all duration-300 overflow-hidden no-underline"
              >
                <div className="h-36 overflow-hidden bg-gradient-to-br from-brand-navy via-[#1a2055] to-brand-blue">
                  {n.image && (
                    <img
                      src={n.image}
                      alt={n.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={e => { e.currentTarget.style.display = 'none' }}
                    />
                  )}
                </div>
                <div className="p-4" dir="rtl">
                  {n.tag && <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium mb-2 inline-block ${tagCls(n.tag)}`}>{n.tag}</span>}
                  <h4 className="text-gray-900 font-bold text-[13px] leading-snug group-hover:text-brand-blue transition-colors line-clamp-2 mt-1">{n.title}</h4>
                  <p className="text-gray-400 text-[11px] mt-2">{translateDate(n.date, isEn ? 'en' : 'ar')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
