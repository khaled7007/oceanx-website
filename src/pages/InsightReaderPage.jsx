import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ARTICLES, REPORTS, TAG_COLORS } from '../data/insight'
import { articleRoute, isInsightDirectEntry, reportRoute } from '../utils/insightLinks'

function tagCls(tag) {
  return TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600 border-gray-200'
}

function ExternalArrow() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 11L11 3M6 3h5v5" />
    </svg>
  )
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-5 mt-10">
      <div className="h-5 bg-gray-100 rounded-full w-3/4" />
      <div className="h-4 bg-gray-100 rounded-full w-full" />
      <div className="h-4 bg-gray-100 rounded-full w-5/6" />
      <div className="h-40 bg-gray-100 rounded-2xl w-full mt-8" />
      <div className="h-4 bg-gray-100 rounded-full w-2/3" />
    </div>
  )
}

/* ── Report page — fully independent, no API ─────────────────── */
function ReportPage({ meta, parsedId, navigate }) {
  const related = useMemo(() =>
    REPORTS
      .map((r, i) => ({ ...r, i }))
      .filter((r) => r.i !== parsedId && r.image && (
        r.year === meta.year || r.tags?.some(t => meta.tags?.includes(t))
      ))
      .slice(0, 3)
  , [meta, parsedId])

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #06081e 0%, #0f1540 60%, #1a2055 100%)' }}>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: 'linear-gradient(rgba(47,72,245,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(47,72,245,0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #2f48f5, transparent 70%)', transform: 'translate(-50%, -50%)' }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-8 pointer-events-none" style={{ background: 'radial-gradient(circle, #0ea5a0, transparent 70%)', transform: 'translate(50%, 50%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 pt-32 sm:pt-40 pb-16 sm:pb-20">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-gray-500 mb-10" dir="rtl"
          >
            <Link to="/" className="hover:text-gray-300 transition-colors no-underline">الرئيسية</Link>
            <span className="opacity-30">›</span>
            <Link to="/insight" className="hover:text-gray-300 transition-colors no-underline">إنسايت</Link>
            <span className="opacity-30">›</span>
            <Link to="/insight" className="hover:text-gray-300 transition-colors no-underline">التقارير</Link>
            <span className="opacity-30">›</span>
            <span className="text-gray-400 line-clamp-1 max-w-[180px]">{meta.title}</span>
          </motion.div>

          {/* Two-col layout */}
          <div className="grid lg:grid-cols-[1fr_600px] gap-10 lg:gap-12 items-center">

            {/* Left — info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} dir="rtl">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border" style={{ color: '#818DE5', background: 'rgba(47,72,245,0.12)', borderColor: 'rgba(47,72,245,0.25)' }}>
                  تقرير بحثي
                </span>
                {meta.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className={`text-[11px] px-3 py-1.5 rounded-full border font-medium ${tagCls(tag)}`}>{tag}</span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white leading-tight mb-5">
                {meta.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
                <span className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="2" width="10" height="11" rx="1.5"/><path d="M5 1v2M9 1v2M2 6h10"/></svg>
                  {meta.date}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span>أوشن إكس إنسايت</span>
                {meta.year && <><span className="w-1 h-1 rounded-full bg-gray-600" /><span>{meta.year}</span></>}
              </div>

              {/* Excerpt */}
              {meta.excerpt && (
                <p className="text-gray-300 text-base leading-relaxed mb-10 max-w-lg">
                  {meta.excerpt}
                </p>
              )}

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={meta.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 no-underline text-sm"
                  style={{ background: '#2f48f5', boxShadow: '0 6px 20px rgba(47,72,245,0.35)' }}
                >
                  مشاهدة التقرير كاملاً
                  <ExternalArrow />
                </a>
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-5 py-3.5 rounded-xl border border-white/10 hover:border-white/25"
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 12L6 8l4-4"/></svg>
                  رجوع
                </button>
              </div>
            </motion.div>

            {/* Right — cover image */}
            {meta.image && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative hidden lg:flex items-center justify-center p-10"
              >
                <div className="absolute inset-0 rounded-3xl opacity-25 blur-3xl" style={{ background: 'radial-gradient(ellipse, #2f48f5, transparent 70%)' }} />
                <img
                  src={meta.image}
                  alt={meta.title}
                  className="relative object-contain w-full"
                  style={{ filter: 'drop-shadow(0 32px 56px rgba(0,0,0,0.55))' }}
                />
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
      </div>

      {/* ── Mobile image ── */}
      {meta.image && (
        <div className="lg:hidden px-6 -mt-6 mb-10">
          <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-100">
            <img src={meta.image} alt={meta.title} className="w-full object-contain" style={{ maxHeight: '300px' }} />
          </div>
        </div>
      )}

      {/* ── Stats / highlights strip ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8">
          <div className="grid grid-cols-3 gap-6 max-w-lg" dir="rtl">
            {[
              { label: 'السنة', value: meta.year ?? '2025' },
              { label: 'اللغة', value: 'العربية' },
              { label: 'المصدر', value: 'أوشن إكس' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[11px] text-gray-400 font-semibold tracking-widest uppercase mb-1">{label}</p>
                <p className="text-gray-900 font-bold text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Summary section ── */}
      {meta.excerpt && (
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-14">
          <div className="grid lg:grid-cols-[200px_1fr] gap-10 items-start" dir="rtl">
            <div className="hidden lg:block">
              <div className="w-1 h-16 rounded-full mb-4" style={{ background: 'linear-gradient(to bottom, #2f48f5, #0ea5a0)' }} />
              <p className="text-[11px] text-gray-400 font-bold tracking-widest uppercase leading-loose">
                ملخص<br />التقرير
              </p>
            </div>
            <div>
              <p className="text-gray-800 text-xl sm:text-2xl leading-relaxed font-light">
                {meta.excerpt}
              </p>
              <div className="mt-10">
                <a
                  href={meta.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 no-underline text-base"
                  style={{ background: 'linear-gradient(135deg, #2f48f5, #1a2fc4)', boxShadow: '0 8px 24px rgba(47,72,245,0.25)' }}
                >
                  اقرأ التقرير كاملاً
                  <ExternalArrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Related reports ── */}
      {related.length > 0 && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-14">
            <h3 className="text-xl font-bold text-gray-900 mb-8 text-right" dir="rtl">تقارير ذات صلة</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(r => (
                <Link
                  key={r.i} to={reportRoute(r.i)}
                  className="group block bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-brand-blue/20 transition-all duration-300 overflow-hidden no-underline"
                >
                  <div className="h-40 overflow-hidden bg-gray-100">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5" dir="rtl">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {r.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${tagCls(tag)}`}>{tag}</span>
                      ))}
                    </div>
                    <h4 className="text-gray-900 font-bold text-sm leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">{r.title}</h4>
                    <p className="text-gray-400 text-[11px] mt-3">{r.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

/* ── Article page — keeps API fetch ─────────────────────────── */
function ArticlePage({ meta, kind, parsedId, navigate, externalUrl, tags, relatedItems }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!meta || !isInsightDirectEntry(meta.url)) {
      setLoading(false)
      return
    }
    setLoading(true)
    setPost(null)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6000)
    fetch(`/api/article?url=${encodeURIComponent(meta.url)}`, { signal: controller.signal })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok || data.error || !data.content || data.content.trim().length < 50) return
        setPost({ content: data.content })
      })
      .catch(() => {})
      .finally(() => { clearTimeout(timeout); setLoading(false) })
  }, [meta])

  if (!meta) {
    return (
      <div className="text-center py-24">
        <h2 className="text-xl font-bold text-gray-800 mb-3">المقالة غير موجودة</h2>
        <button onClick={() => navigate(-1)} className="text-brand-blue text-sm hover:underline mt-4">رجوع</button>
      </div>
    )
  }

  return (
    <>
      <div className="relative bg-brand-dark overflow-hidden pt-28 sm:pt-36 pb-10">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'linear-gradient(rgba(47,72,245,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(47,72,245,0.08) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />
        {meta.image && (
          <>
            <img src={meta.image} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 to-brand-dark" />
          </>
        )}
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-gray-300 transition-colors no-underline">الرئيسية</Link>
            <span className="opacity-40">›</span>
            <Link to="/insight" className="hover:text-gray-300 transition-colors no-underline">إنسايت</Link>
            <span className="opacity-40">›</span>
            <span className="text-gray-400 line-clamp-1">{meta.title}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs text-brand-blue-light font-semibold tracking-widest uppercase">مقالة</span>
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className={`text-xs px-2.5 py-0.5 rounded-full border ${tagCls(tag)}`}>{tag}</span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">{meta.title}</h1>
          <p className="text-gray-500 text-sm">أوشن إكس إنسايت · {meta.date ?? ''}</p>
        </div>
      </div>

      <div className="bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-14">
          {loading && <Skeleton />}

          {!loading && !post && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-10">
              {meta.image && (
                <div className="rounded-2xl overflow-hidden shadow-md aspect-video">
                  <img src={meta.image} alt={meta.title} className="w-full h-full object-cover" />
                </div>
              )}
              {meta.excerpt && (
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100" dir="rtl">
                  <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-4">ملخص المقالة</p>
                  <p className="text-gray-700 text-lg leading-relaxed font-light">{meta.excerpt}</p>
                </div>
              )}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-gray-100">
                <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 12L6 8l4-4" /></svg>
                  رجوع
                </button>
                <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium hover:underline no-underline">
                  قراءة المقالة كاملةً <ExternalArrow />
                </a>
              </div>
            </motion.div>
          )}

          {!loading && post && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div
                className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:font-light prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-md prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700 [&>*:first-child]:mt-0"
                dir="rtl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                <p className="text-gray-400 text-sm font-light">نُشر على منصة أوشن إكس إنسايت</p>
                <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium hover:underline no-underline">
                  عرض المصدر الأصلي <ExternalArrow />
                </a>
              </div>
              {relatedItems.length > 0 && (
                <div className="mt-16 pt-10 border-t border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">مقالات ذات صلة</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedItems.map(item => (
                      <Link key={item.index} to={articleRoute(item.index)}
                        className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all duration-300 overflow-hidden no-underline p-5"
                      >
                        <h4 className="text-gray-900 font-bold text-sm leading-snug group-hover:text-brand-blue transition-colors line-clamp-3">{item.title}</h4>
                        <p className="text-gray-400 text-xs mt-3">{item.date}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

/* ── Main export ─────────────────────────────────────────────── */
export default function InsightReaderPage({ forcedKind }) {
  const { kind: routeKind, itemId } = useParams()
  const navigate = useNavigate()

  const kind = forcedKind ?? routeKind
  const parsedId = Number(itemId)
  const list = kind === 'report' ? REPORTS : ARTICLES
  const meta = Number.isInteger(parsedId) && parsedId >= 0 ? list[parsedId] ?? null : null

  const tags = useMemo(() => {
    if (!meta) return []
    if (kind === 'report') return meta.tags ?? []
    return meta.tag ? [meta.tag] : []
  }, [kind, meta])

  const relatedItems = useMemo(() => {
    if (!meta || kind !== 'article') return []
    return ARTICLES
      .map((item, index) => ({ ...item, index }))
      .filter(item => item.index !== parsedId && isInsightDirectEntry(item.url) && item.tag && tags.includes(item.tag))
      .slice(0, 3)
  }, [kind, meta, parsedId, tags])

  const externalUrl = meta?.url ?? 'https://insight.oceanx.sa/articles/'

  if (kind === 'report') {
    if (!meta) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">التقرير غير موجود</h2>
            <button onClick={() => navigate(-1)} className="text-brand-blue text-sm hover:underline">رجوع</button>
          </div>
        </div>
      )
    }
    return <ReportPage meta={meta} parsedId={parsedId} navigate={navigate} />
  }

  return (
    <ArticlePage
      meta={meta}
      kind={kind}
      parsedId={parsedId}
      navigate={navigate}
      externalUrl={externalUrl}
      tags={tags}
      relatedItems={relatedItems}
    />
  )
}
