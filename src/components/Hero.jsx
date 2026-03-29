import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { REPORTS, ARTICLES } from '../data/insight'

/* ── Content grid cards ─────────────────────────────────── */
function GridCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`rounded-xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const featuredReport = REPORTS.find(r => r.featured) || REPORTS[0]
  const latestReport = REPORTS.filter(r => !r.featured)[0]
  const latestArticle = ARTICLES[0]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #06081e 0%, #090c2a 55%, #07051a 100%)',
      }}
    >
      {/* Mesh grid */}
      <div className="absolute inset-0 ocean-mesh opacity-40 pointer-events-none" />

      {/* Radial glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', right: '10%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(47,72,245,0.12) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '5%', left: '5%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(47,72,245,0.08) 0%, transparent 65%)',
        }}
      />

      {/* Main grid */}
      <div className="flex-1 max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-2 gap-12 items-center pt-36 pb-16 lg:py-0">

        {/* Text — right in RTL */}
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="block text-xs font-medium tracking-[0.25em] text-white/40 uppercase mb-7"
          >
            Ocean of Solutions — Since 2012
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[3rem] sm:text-[3.8rem] lg:text-[4.6rem] xl:text-[5.2rem] font-bold text-white leading-[1.1] tracking-tight mb-8"
          >
            محيطٌ من
            <br />
            <span className="text-brand-blue">الحلول</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.36 }}
            className="text-white/50 text-[16px] font-light leading-[1.9] mb-10 max-w-md"
          >
            شركة استشارية سعودية تأسست ٢٠١٢ — تُعيد تشكيل المؤسسات عبر الابتكار،
            الاستشارات الإدارية، وأبحاث السوق.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/about" className="btn-primary text-[15px] px-7 py-3.5">
              اكتشف أوشن إكس
            </Link>
            <Link to="/contact" className="btn-outline text-[15px] px-7 py-3.5">
              تواصل معنا
            </Link>
          </motion.div>
        </div>

        {/* 2×2 content grid — left in RTL */}
        <div className="hidden lg:grid grid-cols-2 gap-3 h-[460px]">

          {/* Card 1 — blue insight CTA */}
          <GridCard delay={0.45} className="bg-brand-blue p-7 flex flex-col justify-between group cursor-pointer hover:bg-[#2338e0] transition-colors duration-300">
            <Link to="/insight" className="flex flex-col h-full no-underline">
              <span className="text-white/60 text-xs font-medium tracking-widest uppercase mb-3">
                أوشن إكس إنسايت
              </span>
              <p className="text-white font-bold text-xl leading-snug flex-1">
                اكتشف
                <br />
                أحدث
                <br />
                الإنسايت
              </p>
              <div className="mt-6 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M13 8H3M7 4l-4 4 4 4" />
                </svg>
              </div>
            </Link>
          </GridCard>

          {/* Card 2 — featured report image */}
          <GridCard delay={0.52} className="relative bg-brand-navy">
            {featuredReport?.image ? (
              <>
                <img
                  src={featuredReport.image}
                  alt={featuredReport.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-navy to-[#1a2055]" />
            )}
            <div className="absolute bottom-0 right-0 left-0 p-5 z-10">
              <span className="text-[10px] text-white/60 font-medium tracking-widest uppercase">تقرير</span>
              <p className="text-white text-sm font-bold leading-snug mt-1 line-clamp-2">
                {featuredReport?.title}
              </p>
            </div>
          </GridCard>

          {/* Card 3 — article/dark card */}
          <GridCard delay={0.59} className="relative bg-[#0a0c22]">
            {latestReport?.image ? (
              <>
                <img
                  src={latestReport.image}
                  alt={latestReport.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c22] to-[#1a1060]" />
            )}
            {/* Play icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                  <path d="M5 3.5L13 8L5 12.5V3.5Z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 left-0 p-5 z-10">
              <span className="text-[10px] text-white/50 tracking-widest uppercase">شاهد · استمع · استلهم</span>
            </div>
          </GridCard>

          {/* Card 4 — latest article */}
          <GridCard delay={0.66} className="bg-white p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-brand-blue font-semibold tracking-widest uppercase">
                {latestArticle?.tag || 'مقالة'}
              </span>
              <p className="text-gray-900 font-bold text-sm leading-snug mt-2 line-clamp-3">
                {latestArticle?.title || 'آخر المقالات التحليلية من أوشن إكس إنسايت'}
              </p>
            </div>
            <Link
              to="/insight"
              className="mt-4 text-brand-blue text-xs font-semibold flex items-center gap-1.5 no-underline hover:gap-2.5 transition-all duration-200"
            >
              اقرأ المزيد
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 6H3M5 4L3 6l2 2" />
              </svg>
            </Link>
          </GridCard>
        </div>
      </div>

      {/* Bottom stats strip */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex">
            {[
              { v: '+12', l: 'سنة خبرة' },
              { v: '+30', l: 'عميل موثوق' },
              { v: '+100', l: 'مشروع منجز' },
              { v: '٢٠١٢', l: 'تأسست عام' },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.07 }}
                className={`flex-1 py-5 text-center ${i > 0 ? 'border-r border-white/6' : ''}`}
              >
                <div className="text-xl lg:text-2xl font-bold text-brand-blue">{s.v}</div>
                <div className="text-white/30 text-[11px] mt-0.5 font-light">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
