import { motion } from 'framer-motion'

const STATS = [
  { value: '+12', label: 'سنة خبرة' },
  { value: '+100', label: 'مشروع منجز' },
  { value: '2', label: 'قطاع رئيسي' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* ── Animated mesh grid ─────────────────────── */}
      <div className="absolute inset-0 hero-mesh animate-mesh-pulse pointer-events-none" />

      {/* ── Floating geometric elements ────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Large orb — upper-left */}
        <div
          className="animate-float-slow absolute -top-56 -left-56 w-[620px] h-[620px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, rgba(47,72,245,0.07) 0%, transparent 65%)',
          }}
        />

        {/* Large orb — lower-right */}
        <div
          className="animate-float-alt absolute -bottom-64 -right-64 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 60% 60%, rgba(47,72,245,0.06) 0%, transparent 65%)',
          }}
        />

        {/* Ring shapes */}
        <div className="animate-float-slow absolute top-16 left-1/3 w-40 h-40 rounded-full border border-brand-blue/10" />
        <div className="animate-float-alt absolute bottom-20 right-1/4 w-24 h-24 rounded-full border border-brand-blue/12" />

        {/* Rotated squares */}
        <div className="animate-float-slow absolute top-1/3 left-20 w-14 h-14 border border-brand-blue/12 rotate-45" />
        <div className="animate-float-alt absolute top-2/3 left-1/3 w-7 h-7 bg-brand-blue/8 rotate-12 rounded-sm" />
        <div className="animate-float-slow absolute top-1/4 left-1/2 w-4 h-4 bg-brand-blue/10 rotate-45" />

        {/* Dot cluster */}
        <div className="absolute top-1/2 left-16 grid grid-cols-4 gap-3 opacity-25">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
          ))}
        </div>
      </div>

      {/* ── Content ────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-40 lg:py-0">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
            className="mb-7"
          >
            <span className="inline-flex items-center gap-2.5 bg-brand-blue/7 text-brand-blue text-sm font-medium px-4 py-2 rounded-full border border-brand-blue/15">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              محيطٌ من الحلول — منذ ٢٠١٢
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-[3.6rem] font-bold text-gray-900 leading-[1.22] mb-6 tracking-tight"
          >
            نُعيد تشكيل{' '}
            <span className="text-brand-blue relative">
              مشروعك
              <svg
                className="absolute -bottom-1 right-0 w-full"
                viewBox="0 0 220 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 5.5C50 2 120 1.5 218 5.5"
                  stroke="#2f48f5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            </span>
            <br />
            حتى يصبح واقعًا ملموسًا
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
            className="text-lg text-gray-500 font-light leading-relaxed mb-10 max-w-xl"
          >
            أوشن إكس لحلول الأعمال شركة استشارية سعودية تأسست عام ٢٠١٢، تخدم القطاعين
            الحكومي والخاص بخبرة محلية ودولية متعمقة في الابتكار، الاستشارات الإدارية،
            وأبحاث السوق.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap gap-3 mb-16"
          >
            <a href="#contact" className="btn-primary text-base px-7 py-3.5">
              تواصل معنا
            </a>
            <a href="#about" className="btn-light text-base px-7 py-3.5">
              اعرف أكثر
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: 'easeOut' }}
            className="flex flex-wrap gap-10 pt-8 border-t border-gray-100"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-brand-blue">{s.value}</div>
                <div className="text-sm text-gray-500 mt-0.5 font-light">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] text-gray-400 tracking-widest uppercase">scroll</span>
        <div className="w-5 h-8 border-2 border-gray-200 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2.5 bg-gray-300 rounded-full animate-bounce-soft" />
        </div>
      </motion.div>
    </section>
  )
}
