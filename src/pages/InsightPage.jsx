import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  REPORTS, ARTICLES, TAG_COLORS,
  REPORT_YEARS, ARTICLE_TOPICS,
} from '../data/insight'

function ExternalArrow() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 10L10 3M6.5 3h3.5v3.5" />
    </svg>
  )
}

function tagCls(tag) {
  return TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600 border-gray-200'
}

/* ── Featured strip ──────────────────────────────────── */
function FeaturedStrip() {
  const featured = REPORTS.find(r => r.featured)
  const report2 = REPORTS.filter(r => !r.featured && r.image)[0]
  const report3 = REPORTS.filter(r => !r.featured && r.image)[1]

  return (
    <div className="bg-[#0a0c25] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Blue CTA */}
          <Link to="/insight#reports" className="bg-brand-blue rounded-xl p-8 flex flex-col justify-between min-h-[220px] no-underline group">
            <span className="text-white/60 text-[11px] font-semibold tracking-widest uppercase">إنسايت</span>
            <div>
              <p className="text-white font-bold text-xl leading-snug mb-5">
                اكتشف<br />أحدث<br />الإنسايت
              </p>
              <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 7H3M5 3L1 7l4 4" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Report 2 */}
          {report2 && (
            <a href={report2.url} target="_blank" rel="noopener noreferrer" className="relative rounded-xl overflow-hidden no-underline group min-h-[220px]">
              <img src={report2.image} alt={report2.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-5 z-10">
                <span className="text-white/50 text-[10px] font-semibold tracking-widest uppercase block mb-1">تقرير</span>
                <p className="text-white font-bold text-sm leading-snug">{report2.title}</p>
              </div>
            </a>
          )}

          {/* Report 3 */}
          {report3 && (
            <a href={report3.url} target="_blank" rel="noopener noreferrer" className="relative rounded-xl overflow-hidden no-underline group min-h-[220px]">
              <img src={report3.image} alt={report3.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-5 z-10">
                <span className="text-white/50 text-[10px] font-semibold tracking-widest uppercase block mb-1">تقرير</span>
                <p className="text-white font-bold text-sm leading-snug">{report3.title}</p>
              </div>
            </a>
          )}
        </div>

        {/* Separator */}
        <div className="border-t border-white/8 pt-4">
          <div className="grid grid-cols-4 gap-3">
            {/* 3 small articles */}
            {ARTICLES.slice(0, 3).map((a, i) => (
              <a
                key={a.title}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-start no-underline group"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-brand-navy">
                  {a.image && <img src={a.image} alt={a.title} className="w-full h-full object-cover" />}
                </div>
                <p className="text-white/60 text-[12px] font-medium leading-snug group-hover:text-white transition-colors line-clamp-3">
                  {a.title}
                </p>
              </a>
            ))}

            {/* Watch / Listen / Inspired */}
            <div className="bg-white rounded-xl p-4 flex flex-col justify-between">
              <p className="text-gray-900 font-bold text-[13px] leading-snug">
                Watch,<br />Listen &<br />get inspired
              </p>
              <Link to="/insight#podcast" className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-brand-blue hover:text-brand-blue transition-colors no-underline text-gray-400 self-start mt-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 6H3M5 4L3 6l2 2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Trending Topics ──────────────────────────────────── */
function TrendingTopics() {
  const [activeTopic, setActiveTopic] = useState('الكل')
  const topics = ['الكل', ...ARTICLE_TOPICS.filter(t => t !== 'الكل').slice(0, 4)]

  const filtered = activeTopic === 'الكل'
    ? ARTICLES
    : ARTICLES.filter(a => a.tag === activeTopic)

  const featuredArticle = filtered[0]
  const gridArticles = filtered.slice(1, 4)

  return (
    <div className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header + filter */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900">Trending Topics</h2>
          <div className="flex items-center gap-3">
            {topics.map(t => (
              <button
                key={t}
                onClick={() => setActiveTopic(t)}
                className={`text-[12px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 ${
                  activeTopic === t
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'text-gray-500 border-gray-200 hover:border-brand-blue/40'
                }`}
              >
                {t}
              </button>
            ))}
            <div className="flex gap-2 mr-2">
              <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-brand-blue hover:text-brand-blue transition-colors">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 6h8M6 2l4 4-4 4" /></svg>
              </button>
              <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-brand-blue hover:text-brand-blue transition-colors">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 6H2M6 2L2 6l4 4" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Featured dark article card */}
        {featuredArticle && (
          <a
            href={featuredArticle.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl overflow-hidden mb-6 no-underline group"
            style={{ background: 'linear-gradient(135deg, #06081e 0%, #0f1235 100%)' }}
          >
            <div className="grid lg:grid-cols-[1fr_auto] items-center gap-6 p-8 lg:p-10">
              <div>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${tagCls(featuredArticle.tag)} inline-block mb-3`}>
                  {featuredArticle.tag}
                </span>
                <h3 className="text-white font-bold text-xl lg:text-2xl leading-snug mb-2 group-hover:text-brand-blue-light transition-colors">
                  {featuredArticle.title}
                </h3>
                <span className="text-white/40 text-xs">{featuredArticle.date}</span>
              </div>
              {featuredArticle.image && (
                <div className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 hidden lg:block">
                  <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </a>
        )}

        {/* 3-col article grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gridArticles.map((a, i) => (
            <motion.a
              key={a.title}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-brand-blue/15 transition-all duration-300 no-underline"
            >
              <div className="h-36 overflow-hidden bg-gray-100">
                {a.image
                  ? <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  : <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-blue" />
                }
              </div>
              <div className="p-5">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tagCls(a.tag)} inline-block mb-2`}>{a.tag}</span>
                <h4 className="text-gray-900 font-bold text-[13px] leading-snug mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">{a.title}</h4>
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-gray-400 text-[11px]">{a.date}</span>
                  <span className="text-brand-blue/60 group-hover:text-brand-blue transition-colors">
                    <ExternalArrow />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Reports section ──────────────────────────────────── */
function ReportsSection() {
  const [activeYear, setActiveYear] = useState(2025)
  const filtered = REPORTS.filter(r => r.year === activeYear)

  return (
    <div id="reports" className="py-14 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">أحدث التقارير البحثية</h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Year filter */}
            <div className="flex gap-2">
              {REPORT_YEARS.map(yr => (
                <button
                  key={yr}
                  onClick={() => setActiveYear(yr)}
                  className={`text-[12px] font-semibold px-3 py-1.5 rounded-full border transition-all ${
                    activeYear === yr
                      ? 'bg-brand-blue text-white border-brand-blue'
                      : 'text-gray-500 border-gray-200 hover:border-brand-blue/40'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-brand-blue hover:text-brand-blue transition-colors">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 6h8M6 2l4 4-4 4" /></svg>
              </button>
              <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-brand-blue hover:text-brand-blue transition-colors">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 6H2M6 2L2 6l4 4" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* 4-col grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((r, i) => (
            <a
              key={r.title}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-blue/15 transition-all duration-300 no-underline"
            >
              <div className="h-36 overflow-hidden bg-gray-100">
                {r.image
                  ? <img src={r.image} alt={r.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  : <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-blue" />
                }
              </div>
              <div className="p-4">
                <p className="text-gray-800 font-bold text-[13px] leading-snug mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">{r.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-[11px]">{r.date}</span>
                  <span className="text-brand-blue text-[11px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    اقرأ المزيد <ExternalArrow />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="https://insight.oceanx.sa/reports/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-blue no-underline transition-colors font-medium border border-gray-200 hover:border-brand-blue/30 px-5 py-2.5 rounded-lg">
            عرض جميع التقارير <ExternalArrow />
          </a>
        </div>
      </div>
    </div>
  )
}

/* ── Podcast section ──────────────────────────────────── */
function PodcastSection() {
  return (
    <div id="podcast" className="py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
          {/* Popular & Trending */}
          <div className="bg-brand-blue rounded-2xl p-8 text-white flex flex-col justify-between min-h-[220px]">
            <div>
              <span className="text-white/60 text-[11px] font-semibold tracking-widest uppercase block mb-3">Popular & Trending</span>
              <h3 className="text-xl font-bold leading-snug">بودكاست أوشن إكس إنسايت</h3>
            </div>
            <a
              href="https://insight.oceanx.sa/بودكاست-2/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-[13px] self-start mt-6 no-underline"
            >
              استمع الآن
            </a>
          </div>

          {/* Platform cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'بودكاست أوشن إكس', sub: 'الإدارة والأعمال', href: 'https://insight.oceanx.sa/بودكاست-2/' },
              { name: 'أوشن إكس تتحدث', sub: 'الاستشارات والتطوير', href: 'https://insight.oceanx.sa/بودكاست-2/' },
            ].map(p => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-brand-blue/20 transition-all no-underline group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-3">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#2f48f5" strokeWidth="1.5">
                    <path d="M9 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
                    <path d="M3 9v1a6 6 0 0 0 12 0V9M9 16v2M6 18h6" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-gray-900 font-bold text-[13px] leading-snug mb-0.5 group-hover:text-brand-blue transition-colors">{p.name}</p>
                <p className="text-gray-400 text-[11px]">{p.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Membership CTA ───────────────────────────────────── */
function MembershipCTA() {
  return (
    <div
      className="py-16"
      style={{ background: 'linear-gradient(135deg, #06081e 0%, #0c1030 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">عضوية إنسايت</p>
          <h3 className="text-white font-bold text-lg lg:text-xl">
            للمحتوى الحصري والمحدّث — احصل على عضوية{' '}
            <span className="italic text-brand-blue-light">OCEANX INSIGHTS</span>
          </h3>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <input
            type="email"
            placeholder="بريدك الإلكتروني"
            className="bg-white/8 border border-white/15 text-white placeholder-white/30 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-brand-blue/60 w-52"
          />
          <button className="btn-primary text-sm px-5">اشترك</button>
        </div>
      </div>
    </div>
  )
}

/* ── Main page ────────────────────────────────────────── */
export default function InsightPage() {
  return (
    <>
      {/* ── Dark Hero ──────────────────────────────── */}
      <div
        className="relative overflow-hidden pt-40 pb-14"
        style={{ background: 'linear-gradient(160deg, #07091f 0%, #0a0c28 60%, #080618 100%)' }}
      >
        <div className="absolute inset-0 ocean-mesh opacity-25 pointer-events-none" />
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(47,72,245,0.1) 0%, transparent 65%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs text-white/30 mb-10"
          >
            <Link to="/" className="hover:text-white/50 no-underline transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/50">Insights</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl lg:text-8xl font-black text-white italic leading-none mb-5"
              >
                Insights
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="text-white/50 text-[13px] font-light leading-relaxed max-w-sm mb-8"
              >
                استكشف محيطًا من الأفكار والرؤى. تقارير متخصصة تُرصد أبرز توجهات الأعمال والثقافة والمجتمع، داخل اشتراك خاص أو عام.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                <a
                  href="https://insight.oceanx.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-[13px] no-underline"
                >
                  SUBSCRIBE NOW
                </a>
              </motion.div>
            </div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:flex justify-end gap-10"
            >
              {[
                { v: '+41', l: 'تقرير بحثي' },
                { v: '+73', l: 'مقالة تحليلية' },
                { v: '٢٠١٨', l: 'منذ عام' },
              ].map(s => (
                <div key={s.l} className="text-center">
                  <div className="text-3xl font-bold text-brand-blue">{s.v}</div>
                  <div className="text-white/30 text-[11px] mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Featured Strip ──────────────────────────── */}
      <FeaturedStrip />

      {/* ── Trending Topics ─────────────────────────── */}
      <TrendingTopics />

      {/* ── Reports ────────────────────────────────── */}
      <ReportsSection />

      {/* ── Podcast ────────────────────────────────── */}
      <PodcastSection />

      {/* ── Membership CTA ──────────────────────────── */}
      <MembershipCTA />
    </>
  )
}
