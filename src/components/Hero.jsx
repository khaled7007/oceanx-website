import { motion } from 'framer-motion'

/* ── Orbital visualization ──────────────────────────────── */
function OrbitalVisual() {
  return (
    <div className="relative w-full max-w-[540px] aspect-square mx-auto select-none pointer-events-none">
      {/* Ambient glow */}
      <div
        className="absolute inset-[20%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(47,72,245,0.18) 0%, transparent 70%)',
          filter: 'blur(52px)',
        }}
      />

      {/* Outer ring — slow clockwise, 2 orbit dots */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[4%] rounded-full"
        style={{ border: '1px solid rgba(47,72,245,0.1)', borderTopColor: 'rgba(47,72,245,0.44)' }}
      >
        <div
          className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-blue"
          style={{ boxShadow: '0 0 0 3px white, 0 0 0 5px rgba(47,72,245,0.22)' }}
        />
        <div
          className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brand-blue-light"
          style={{ boxShadow: '0 0 0 3px white, 0 0 0 5px rgba(129,141,229,0.22)' }}
        />
      </motion.div>

      {/* Middle ring — dashed, counter-clockwise */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 62, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[22%] rounded-full"
        style={{ border: '1.5px dashed rgba(47,72,245,0.18)' }}
      >
        <div
          className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brand-blue-light"
          style={{ boxShadow: '0 0 0 2.5px white, 0 0 0 4px rgba(129,141,229,0.2)' }}
        />
      </motion.div>

      {/* Inner static ring */}
      <div
        className="absolute inset-[38%] rounded-full border border-brand-blue/12"
        style={{ background: 'rgba(47,72,245,0.04)' }}
      />

      {/* Centre logo */}
      <div className="absolute inset-[44%] rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center">
        <img src="/logo.png" alt="OceanX" className="w-[80%] h-auto object-contain" />
      </div>

      {/* Floating stat cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[3%] right-[5%] bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3"
      >
        <div className="text-[22px] font-bold text-brand-blue leading-none">+100</div>
        <div className="text-gray-500 text-[11px] mt-1 font-medium">مشروع منجز</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.65, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[7%] left-[5%] bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3"
      >
        <div className="text-[22px] font-bold text-brand-blue leading-none">+30</div>
        <div className="text-gray-500 text-[11px] mt-1 font-medium">عميل موثوق</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.0, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[44%] left-[3%] -translate-y-1/2 bg-brand-blue rounded-2xl shadow-xl px-4 py-3"
      >
        <div className="text-[22px] font-bold text-white leading-none">+12</div>
        <div className="text-white/70 text-[11px] mt-1 font-medium">سنة خبرة</div>
      </motion.div>
    </div>
  )
}

/* ── Stats strip data ───────────────────────────────────── */
const STRIP_STATS = [
  { value: '+12', label: 'سنة خبرة' },
  { value: '+30', label: 'عميل موثوق' },
  { value: '+100', label: 'مشروع منجز' },
  { value: '٢٠١٢', label: 'تأسست عام' },
]

/* ── Hero ───────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-white overflow-hidden flex flex-col">
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(47,72,245,0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.45,
        }}
      />

      {/* Gradient tint on text side */}
      <div
        className="absolute inset-y-0 right-0 w-[55%] pointer-events-none hidden lg:block"
        style={{ background: 'linear-gradient(to left, rgba(235,239,255,0.5) 0%, transparent 100%)' }}
      />

      {/* Main content */}
      <div className="flex-1 max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-2 items-center gap-10 lg:gap-6 pt-36 pb-12 lg:py-0">

        {/* Text column — right in RTL */}
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-medium tracking-[0.24em] text-gray-400 uppercase mb-8"
          >
            محيطٌ من الحلول — منذ ٢٠١٢
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 42 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.9rem] sm:text-[3.5rem] lg:text-[4.2rem] xl:text-[5rem] font-bold text-gray-900 leading-[1.1] tracking-tight mb-5"
          >
            شركاء نجاحكم
            <br />
            في{' '}
            <span className="text-brand-blue">عالم التحوّل</span>
            <br />
            الاستراتيجي
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.52, ease: 'easeOut' }}
            className="w-14 h-[3px] bg-brand-blue rounded-full mb-8 origin-right"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.46 }}
            className="text-[16px] text-gray-500 font-light leading-[1.85] mb-11 max-w-md"
          >
            شركة استشارية سعودية تأسست ٢٠١٢ — تُعيد تشكيل المؤسسات عبر الابتكار،
            الاستشارات الإدارية، وأبحاث السوق.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.64 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#contact" className="btn-primary text-[15px] px-8 py-4">
              ابدأ المحادثة
            </a>
            <a href="#about" className="btn-light text-[15px] px-8 py-4">
              اعرف أكثر
            </a>
          </motion.div>
        </div>

        {/* Visual column — left in RTL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <OrbitalVisual />
        </motion.div>
      </div>

      {/* Dark stats strip */}
      <div className="bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex">
            {STRIP_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.08, duration: 0.45 }}
                className={`flex-1 py-5 px-3 lg:px-6 text-center ${i > 0 ? 'border-r border-white/8' : ''}`}
              >
                <div className="text-xl lg:text-2xl font-bold text-brand-blue">{s.value}</div>
                <div className="text-gray-500 text-[11px] mt-0.5 font-light tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
