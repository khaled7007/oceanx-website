import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  REPORTS, ARTICLES, TAG_COLORS,
  REPORT_YEARS, ARTICLE_TOPICS,
} from '../data/insight'

/* ─── Helpers ──────────────────────────────────────────────────── */

function tagCls(tag) {
  return TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600 border-gray-200'
}

function ExternalArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 11L11 3M6 3h5v5" />
    </svg>
  )
}

/* ─── Featured report card (large) ────────────────────────────── */

function FeaturedReport({ report }) {
  return (
    <motion.a
      href={report.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      className="group relative block rounded-2xl overflow-hidden no-underline"
      style={{ minHeight: 380 }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-[#1a2055] to-brand-blue" />

      {/* Real photo — covers top half, fades into gradient */}
      {report.image && (
        <>
          <img
            src={report.image}
            alt={report.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          {/* strong gradient overlay so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-[#0d0d1acc] to-[#0d0d1a55]" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/70 to-transparent" />
        </>
      )}

      {/* fallback mesh when no image */}
      {!report.image && (
        <>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />
          <div className="absolute top-8 left-8 w-32 h-32 rounded-full border border-white/10" />
          <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full border border-white/8 translate-x-16 translate-y-16" />
        </>
      )}

      <div className="relative z-10 flex flex-col justify-end h-full p-8 lg:p-10" style={{ minHeight: 380 }}>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-brand-blue-light font-semibold tracking-widest uppercase">
            تقرير مميز
          </span>
          {report.tags.slice(0, 2).map(t => (
            <span key={t} className="text-xs bg-white/10 text-white/70 px-2.5 py-0.5 rounded-full border border-white/15">
              {t}
            </span>
          ))}
        </div>

        <h3 className="text-xl lg:text-2xl font-bold text-white leading-snug mb-3 group-hover:text-brand-blue-light transition-colors duration-200">
          {report.title}
        </h3>

        <p className="text-white/60 text-sm font-light leading-relaxed mb-5 line-clamp-2">
          {report.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-white/40 text-xs">{report.date}</span>
          <span className="inline-flex items-center gap-1.5 text-brand-blue-light text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
            اقرأ التقرير <ExternalArrow />
          </span>
        </div>
      </div>
    </motion.a>
  )
}

/* ─── Report card (grid) ───────────────────────────────────────── */

function ReportCard({ report, index }) {
  return (
    <motion.a
      href={report.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-blue/20 transition-all duration-300 overflow-hidden no-underline"
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        {report.image ? (
          <>
            <img
              src={report.image}
              alt={report.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-navy via-[#1a2055] to-brand-blue flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
                <path d="M4 4h12v12H4zM4 8h12M8 8v8" />
              </svg>
            </div>
          </div>
        )}
        {/* Year badge */}
        <span className="absolute top-3 right-3 text-[10px] font-bold bg-brand-blue text-white px-2 py-0.5 rounded-full">
          {report.year}
        </span>
      </div>

      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {report.tags.slice(0, 2).map(t => (
            <span key={t} className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${tagCls(t)}`}>
              {t}
            </span>
          ))}
        </div>

        <h3 className="text-gray-900 font-bold text-[15px] leading-snug mb-2 group-hover:text-brand-blue transition-colors duration-200 line-clamp-2">
          {report.title}
        </h3>

        <p className="text-gray-500 text-[13px] font-light leading-relaxed line-clamp-2 mb-4">
          {report.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-gray-400 text-xs">{report.date}</span>
          <span className="text-brand-blue text-xs font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            اقرأ التقرير <ExternalArrow />
          </span>
        </div>
      </div>
    </motion.a>
  )
}

/* ─── Article card ─────────────────────────────────────────────── */

function ArticleCard({ article, index }) {
  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-blue/20 transition-all duration-300 no-underline overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative h-36 overflow-hidden flex-shrink-0">
        {article.image ? (
          <>
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-blue via-brand-blue-light to-[#818DE5] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
              <path d="M6 6h16v16H6zM6 11h16M10 11v11" />
            </svg>
          </div>
        )}
        {/* Tag pill overlay */}
        <span className={`absolute bottom-2.5 right-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-sm ${tagCls(article.tag)}`}>
          {article.tag}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-gray-900 font-bold text-[15px] leading-snug flex-1 mb-4 group-hover:text-brand-blue transition-colors duration-200 line-clamp-3">
          {article.title}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="text-gray-400 text-xs">أوشن إكس · {article.date}</span>
          <span className="text-brand-blue/70 group-hover:text-brand-blue transition-colors">
            <ExternalArrow />
          </span>
        </div>
      </div>
    </motion.a>
  )
}

/* ─── Podcast section ──────────────────────────────────────────── */

function PodcastSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      {/* Main card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a0533] via-[#2d1060] to-[#1a1a3e] p-10 lg:p-14 text-center mb-8">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(129,141,229,0.4) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(47,72,245,0.3) 0%, transparent 50%)',
          }}
        />
        {/* Podcast image */}
        <div className="relative z-10">
          <div className="w-28 h-28 rounded-2xl mx-auto mb-6 overflow-hidden border-2 border-white/20 shadow-2xl">
            <img
              src="https://insight.oceanx.sa/wp-content/uploads/2022/10/72-1-scaled.jpg"
              alt="بودكاست أوشن إكس إنسايت"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            بودكاست
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            بودكاست أوشن إكس إنسايت
          </h3>
          <p className="text-white/60 font-light leading-relaxed max-w-lg mx-auto mb-8">
            نقاشات متخصصة في الشأن الإداري والاستشاري والمالي وعالم الأعمال، يستضيف فيها خبراء
            ومتخصصين من مختلف القطاعات بهدف تعميق الحوار المهني.
          </p>
          <a
            href="https://insight.oceanx.sa/بودكاست-2/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 3.5L12 8L6 12.5V3.5Z" />
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            استمع إلى البودكاست
          </a>
        </div>
      </div>

      {/* Platform links */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { name: 'Spotify', icon: '🎵' },
          { name: 'Apple Podcasts', icon: '🎙️' },
          { name: 'Google Podcasts', icon: '📻' },
        ].map((p) => (
          <a
            key={p.name}
            href="https://insight.oceanx.sa/بودكاست-2/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-sm font-medium text-gray-700 hover:border-brand-blue/30 hover:text-brand-blue hover:shadow-md transition-all duration-200 no-underline"
          >
            <span>{p.icon}</span>
            {p.name}
          </a>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Main Page ─────────────────────────────────────────────────── */

const TABS = [
  { id: 'reports', label: 'التقارير', count: REPORTS.length },
  { id: 'articles', label: 'المقالات', count: ARTICLES.length },
  { id: 'podcast', label: 'البودكاست', count: null },
]

export default function InsightPage() {
  const [activeTab, setActiveTab] = useState('reports')
  const [activeYear, setActiveYear] = useState(2025)
  const [activeTopic, setActiveTopic] = useState('الكل')

  const featuredReport = REPORTS.find(r => r.featured)
  const latestArticles = ARTICLES.filter(a => a.featured || true).slice(0, 2)

  const filteredReports = useMemo(
    () => REPORTS.filter(r => r.year === activeYear && !r.featured),
    [activeYear],
  )

  const filteredArticles = useMemo(
    () => activeTopic === 'الكل'
      ? ARTICLES
      : ARTICLES.filter(a => a.tag === activeTopic),
    [activeTopic],
  )

  return (
    <>
      {/* ── Page Hero ─────────────────────────────────── */}
      <div className="relative bg-brand-dark overflow-hidden pt-40 pb-16">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              'linear-gradient(rgba(47,72,245,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(47,72,245,0.08) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(47,72,245,0.4), transparent)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <img src="/logo.png" alt="OceanX" className="h-8 w-auto brightness-0 invert opacity-80" />
              <span className="text-white/40 text-sm">×</span>
              <span className="text-brand-blue-light text-sm font-semibold tracking-widest uppercase">
                Insight
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            >
              معرفة تُحدث{' '}
              <span className="text-brand-blue">فارقًا</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-gray-400 text-lg font-light leading-relaxed mb-8"
            >
              تقارير بحثية، مقالات تحليلية، وحوارات متخصصة تُلقي الضوء على أعمق التحولات
              في الاقتصاد السعودي وبيئة الأعمال الإقليمية.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { value: '+41', label: 'تقرير بحثي' },
                { value: '+73', label: 'مقالة تحليلية' },
                { value: '٢٠١٨', label: 'منذ عام' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-brand-blue">{s.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5 font-light">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Featured strip ────────────────────────────── */}
      <div className="bg-gray-50/70 py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="section-label">أحدث المحتوى</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Featured report takes 2 columns */}
            <div className="lg:col-span-2">
              {featuredReport && <FeaturedReport report={featuredReport} />}
            </div>
            {/* 2 latest articles */}
            <div className="flex flex-col gap-5">
              {latestArticles.map((a, i) => (
                <motion.a
                  key={a.title}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  whileHover={{ x: -4 }}
                  className="group flex-1 flex bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-blue/20 transition-all duration-300 no-underline overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 flex-shrink-0 overflow-hidden">
                    {a.image ? (
                      <>
                        <img
                          src={a.image}
                          alt={a.title}
                          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/80 to-brand-blue-light/60" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border w-fit mb-2.5 ${tagCls(a.tag)}`}>
                      {a.tag}
                    </span>
                    <h4 className="text-gray-900 font-bold text-sm leading-snug flex-1 group-hover:text-brand-blue transition-colors duration-200 mb-3 line-clamp-3">
                      {a.title}
                    </h4>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <span className="text-gray-400 text-xs">{a.date}</span>
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
      </div>

      {/* ── Main content tabs ─────────────────────────── */}
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">

          {/* Tab nav */}
          <div className="flex items-center gap-1 mb-10 border-b border-gray-100 pb-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-3 text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-brand-blue'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
                {tab.count && (
                  <span className={`mr-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-brand-blue/10 text-brand-blue' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-blue rounded-full"
                  />
                )}
              </button>
            ))}
            {/* Link to full site */}
            <div className="mr-auto">
              <a
                href="https://insight.oceanx.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-blue transition-colors no-underline font-medium"
              >
                الموقع الكامل <ExternalArrow />
              </a>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ── REPORTS TAB ──────────────────────────── */}
            {activeTab === 'reports' && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Year filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {REPORT_YEARS.map(yr => (
                    <button
                      key={yr}
                      onClick={() => setActiveYear(yr)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                        activeYear === yr
                          ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/25'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-brand-blue/40 hover:text-brand-blue'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>

                {filteredReports.length === 0 ? (
                  <p className="text-gray-400 text-center py-16 font-light">
                    لا توجد تقارير لهذا العام بعد.
                  </p>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeYear}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                      {filteredReports.map((r, i) => (
                        <ReportCard key={r.title} report={r} index={i} />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}

                <div className="mt-10 text-center">
                  <a
                    href="https://insight.oceanx.sa/reports/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-light text-sm inline-flex items-center gap-2"
                  >
                    عرض جميع التقارير
                    <ExternalArrow />
                  </a>
                </div>
              </motion.div>
            )}

            {/* ── ARTICLES TAB ─────────────────────────── */}
            {activeTab === 'articles' && (
              <motion.div
                key="articles"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Topic filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {ARTICLE_TOPICS.map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveTopic(t)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                        activeTopic === t
                          ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/25'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-brand-blue/40 hover:text-brand-blue'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTopic}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  >
                    {filteredArticles.map((a, i) => (
                      <ArticleCard key={a.title} article={a} index={i} />
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-10 text-center">
                  <a
                    href="https://insight.oceanx.sa/articles/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-light text-sm inline-flex items-center gap-2"
                  >
                    عرض جميع المقالات
                    <ExternalArrow />
                  </a>
                </div>
              </motion.div>
            )}

            {/* ── PODCAST TAB ──────────────────────────── */}
            {activeTab === 'podcast' && (
              <motion.div
                key="podcast"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <PodcastSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
