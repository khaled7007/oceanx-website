import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ARTICLES, TAG_COLORS } from '../data/insight'
import { articleRoute } from '../utils/insightLinks'

function tagCls(tag) {
  return TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600 border-gray-200'
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 10.5L9 7L5.5 3.5" />
    </svg>
  )
}


function RelatedArticles({ currentId, tag }) {
  const related = ARTICLES
    .map((article, articleIndex) => ({ ...article, articleIndex }))
    .filter((article) => article.articleIndex !== currentId && article.tag === tag && isInsightDirectEntry(article.url))
    .slice(0, 3)

  if (!related.length) return null

  return (
    <div className="mt-16 pt-10 border-t border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">مقالات ذات صلة</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((article) => (
          <Link
            key={article.articleIndex}
            to={articleRoute(article.articleIndex)}
            className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all duration-300 overflow-hidden no-underline p-5"
          >
            <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border inline-block mb-3 ${tagCls(article.tag)}`}>
              {article.tag}
            </span>
            <h4 className="text-gray-900 font-bold text-sm leading-snug group-hover:text-brand-blue transition-colors duration-200 line-clamp-3">
              {article.title}
            </h4>
            <p className="text-gray-400 text-xs mt-3">{article.date}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function ArticleDetailPage() {
  const { articleId } = useParams()
  const navigate = useNavigate()

  const parsedId = Number(articleId)
  const meta = Number.isInteger(parsedId) && parsedId >= 0 ? ARTICLES[parsedId] ?? null : null
  const post = meta?.body ? { content: meta.body } : null

  return (
    <>
      <div className="relative bg-brand-dark overflow-hidden pt-36 pb-12">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(47,72,245,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(47,72,245,0.08) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

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

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4"
          >
            {meta?.title ?? 'مقالة'}
          </motion.h1>

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

      <div className="bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-14">

          {!meta && (
            <div className="text-center py-20">
              <h2 className="text-xl font-bold text-gray-800 mb-3">المقالة غير موجودة</h2>
              <button onClick={() => navigate(-1)} className="btn-light text-sm mt-4">رجوع</button>
            </div>
          )}

          {meta && !post && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              {meta.image && (
                <div className="rounded-2xl overflow-hidden shadow-md aspect-video">
                  <img src={meta.image} alt={meta.title} className="w-full h-full object-cover" />
                </div>
              )}
              {meta.excerpt && (
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-4">ملخص المقالة</p>
                  <p className="text-gray-700 text-lg leading-relaxed font-light" dir="rtl">{meta.excerpt}</p>
                </div>
              )}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 12L6 8l4-4" />
                  </svg>
                  رجوع
                </button>
              </div>
            </motion.div>
          )}

          {meta && post && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {meta.image && (
                <div className="rounded-2xl overflow-hidden shadow-md aspect-video mb-10">
                  <img src={meta.image} alt={meta.title} className="w-full h-full object-cover" />
                </div>
              )}

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

              <div className="mt-12 pt-8 border-t border-gray-100">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 12L6 8l4-4" />
                  </svg>
                  رجوع
                </button>
              </div>

              {meta?.tag && Number.isInteger(parsedId) && <RelatedArticles currentId={parsedId} tag={meta.tag} />}
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
