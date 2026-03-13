import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ARTICLES, TAG_COLORS } from '../data/insight'

function tagCls(tag) {
  return TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600 border-gray-200'
}

function extractContent(pageHtml) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(pageHtml, 'text/html')

  // Divi renders text in .et_pb_text_inner divs
  const textModules = doc.querySelectorAll('.et_pb_text_inner')
  if (textModules.length > 0) {
    return Array.from(textModules).map(el => el.innerHTML).join('\n')
  }

  // Fallback: standard WordPress entry-content
  const entry = doc.querySelector('.entry-content, article .post-content, main article')
  if (entry) return entry.innerHTML

  return null
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 10.5L9 7L5.5 3.5" />
    </svg>
  )
}

function ExternalArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 11L11 3M6 3h5v5" />
    </svg>
  )
}

/* ─── Skeleton loader ───────────────────────────────────────── */

function Skeleton() {
  return (
    <div className="animate-pulse space-y-5 mt-10">
      <div className="h-5 bg-gray-100 rounded-full w-3/4" />
      <div className="h-4 bg-gray-100 rounded-full w-full" />
      <div className="h-4 bg-gray-100 rounded-full w-5/6" />
      <div className="h-4 bg-gray-100 rounded-full w-full" />
      <div className="h-4 bg-gray-100 rounded-full w-2/3" />
      <div className="h-40 bg-gray-100 rounded-2xl w-full mt-8" />
      <div className="h-4 bg-gray-100 rounded-full w-full" />
      <div className="h-4 bg-gray-100 rounded-full w-4/5" />
      <div className="h-4 bg-gray-100 rounded-full w-full" />
      <div className="h-4 bg-gray-100 rounded-full w-3/4" />
    </div>
  )
}

/* ─── Related articles ──────────────────────────────────────── */

function RelatedArticles({ currentSlug, tag }) {
  const related = ARTICLES
    .filter(a => {
      const m = a.url.match(/insight\.oceanx\.sa\/([^/]+)\/?$/)
      return m && m[1] !== currentSlug && a.tag === tag
    })
    .slice(0, 3)

  if (!related.length) return null

  return (
    <div className="mt-16 pt-10 border-t border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">مقالات ذات صلة</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map(a => {
          const m = a.url.match(/insight\.oceanx\.sa\/([^/]+)\/?$/)
          const slug = m ? m[1] : null
          const href = slug ? `/insight/article/${slug}` : a.url
          const isInternal = !!slug

          const cls = 'group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all duration-300 overflow-hidden no-underline p-5'

          const content = (
            <>
              <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border inline-block mb-3 ${tagCls(a.tag)}`}>
                {a.tag}
              </span>
              <h4 className="text-gray-900 font-bold text-sm leading-snug group-hover:text-brand-blue transition-colors duration-200 line-clamp-3">
                {a.title}
              </h4>
              <p className="text-gray-400 text-xs mt-3">{a.date}</p>
            </>
          )

          return isInternal ? (
            <Link key={a.title} to={href} className={cls}>{content}</Link>
          ) : (
            <a key={a.title} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Main page ─────────────────────────────────────────────── */

export default function ArticleDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const meta = ARTICLES.find(a => {
    const m = a.url.match(/insight\.oceanx\.sa\/([^/]+)\/?$/)
    return m && m[1] === slug
  })

  useEffect(() => {
    setLoading(true)
    setError(null)
    setPost(null)

    fetch(`/wp-proxy/${slug}/`)
      .then(r => {
        if (!r.ok) throw new Error('network')
        return r.text()
      })
      .then(html => {
        const content = extractContent(html)
        if (!content || content.trim().length < 50) {
          setError('not_found')
        } else {
          setPost({ content })
        }
        setLoading(false)
      })
      .catch(() => {
        setError('fetch_error')
        setLoading(false)
      })
  }, [slug])

  const externalUrl = meta?.url ?? `https://insight.oceanx.sa/${slug}/`

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative bg-brand-dark overflow-hidden pt-36 pb-12">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(47,72,245,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(47,72,245,0.08) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        {/* Cover image */}
        {meta?.image && (
          <>
            <img
              src={meta.image}
              alt={meta.title}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 to-brand-dark" />
          </>
        )}

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-6"
          >
            <Link to="/" className="hover:text-gray-300 transition-colors no-underline">الرئيسية</Link>
            <span className="rotate-180 opacity-40"><ChevronIcon /></span>
            <Link to="/insight" className="hover:text-gray-300 transition-colors no-underline">إنسايت</Link>
            <span className="rotate-180 opacity-40"><ChevronIcon /></span>
            <span className="text-gray-400 line-clamp-1">{meta?.title ?? 'مقالة'}</span>
          </motion.div>

          {/* Tag */}
          {meta?.tag && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06 }}
              className={`text-xs font-medium px-3 py-1 rounded-full border inline-block mb-4 ${tagCls(meta.tag)}`}
            >
              {meta.tag}
            </motion.span>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4"
          >
            {meta?.title ?? (post ? post.title.rendered : '...')}
          </motion.h1>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="text-gray-500 text-sm"
          >
            أوشن إكس إنسايت · {meta?.date ?? ''}
          </motion.p>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-14">

          {loading && <Skeleton />}

          {!loading && error === 'fetch_error' && (
            <div className="text-center py-20">
              <div className="text-5xl mb-5">⚠️</div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">تعذّر تحميل المقالة</h2>
              <p className="text-gray-500 mb-8 font-light">
                لم نتمكن من الوصول إلى المحتوى. يمكنك قراءة المقالة مباشرة على موقع إنسايت.
              </p>
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                اقرأ على إنسايت <ExternalArrow />
              </a>
            </div>
          )}

          {!loading && error === 'not_found' && (
            <div className="text-center py-20">
              <div className="text-5xl mb-5">🔍</div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">المقالة غير موجودة</h2>
              <p className="text-gray-500 mb-8 font-light">لم يتم العثور على هذه المقالة.</p>
              <div className="flex items-center justify-center gap-4">
                <button onClick={() => navigate(-1)} className="btn-light text-sm">
                  رجوع
                </button>
                <Link to="/insight" className="btn-primary text-sm">
                  تصفح الإنسايت
                </Link>
              </div>
            </div>
          )}

          {!loading && post && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Article body */}
              <div
                className="prose prose-lg prose-gray max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:font-light
                  prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-2xl prose-img:shadow-md
                  prose-strong:text-gray-900
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-li:text-gray-700 prose-li:font-light
                  [&>*:first-child]:mt-0"
                dir="rtl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* External link */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                <p className="text-gray-400 text-sm font-light">
                  نُشر على منصة أوشن إكس إنسايت
                </p>
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium hover:underline"
                >
                  عرض المقالة الأصلية <ExternalArrow />
                </a>
              </div>

              {/* Related articles */}
              {meta?.tag && <RelatedArticles currentSlug={slug} tag={meta.tag} />}
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
