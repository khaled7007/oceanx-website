import { motion } from 'framer-motion'

const STATS = [
  {
    value: '2012',
    label: 'سنة التأسيس',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="18" height="17" rx="2" />
        <path d="M15 1V5M7 1V5M2 9H20" strokeLinecap="round" />
        <circle cx="11" cy="15" r="1.5" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    value: '+12',
    label: 'سنة خبرة',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11 2L13.8 7.8L20 8.7L15.5 13L16.6 19.2L11 16.2L5.4 19.2L6.5 13L2 8.7L8.2 7.8L11 2Z" />
      </svg>
    ),
  },
  {
    value: '+30',
    label: 'عميل موثوق',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="9" />
        <path d="M7 11L10 14L15 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: '2',
    label: 'قطاع رئيسي',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 20H20M4 20V10L8 7V20M14 20V4L20 2V20" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 12H12M8 15H12" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function About() {
  return (
    <section id="about" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* ── Text column (right in RTL) ─────────── */}
          <div>
            <motion.span {...fadeUp(0)} className="section-label block mb-4">
              من نحن
            </motion.span>

            <motion.h2
              {...fadeUp(0.08)}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
            >
              عن{' '}
              <span className="text-brand-blue">أوشن إكس</span>
            </motion.h2>

            <motion.p {...fadeUp(0.16)} className="text-gray-500 text-lg font-light leading-relaxed mb-5">
              أوشن إكس لحلول الأعمال شركة استشارية سعودية تأسست عام ٢٠١٢، تقدم خدماتها
              للقطاعين الحكومي والخاص انطلاقًا من خبرة محلية ودولية راسخة في الابتكار
              والاستشارات الإدارية وأبحاث السوق.
            </motion.p>

            <motion.p {...fadeUp(0.22)} className="text-gray-500 text-lg font-light leading-relaxed mb-8">
              لن نتبنى مشروعك فحسب، بل سنُعيد تشكيله وتطويره حتى يصبح واقعًا ملموسًا.
              نؤمن بالشراكة الحقيقية مع عملائنا ونعمل معهم من الفكرة حتى التنفيذ
              بأعلى معايير الجودة والاحترافية.
            </motion.p>

            <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-3 mb-10">
              {['القطاع الحكومي', 'القطاع الخاص'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-blue" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Vision 2030 callout */}
            <motion.div
              {...fadeUp(0.34)}
              className="flex items-start gap-4 bg-brand-blue/4 border border-brand-blue/12 rounded-2xl p-5"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-blue/12 flex items-center justify-center text-brand-blue flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10 2L18 6.5V13.5L10 18L2 13.5V6.5L10 2Z" />
                  <circle cx="10" cy="10" r="2.5" fill="currentColor" opacity="0.5" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-0.5">رؤية ٢٠٣٠</div>
                <div className="text-sm text-gray-500 font-light leading-relaxed">
                  نُسهم بفاعلية في تحقيق أهداف رؤية المملكة ٢٠٣٠ من خلال تمكين
                  المؤسسات وتطوير قدراتها.
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Stats / visual column (left in RTL) ── */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -5 }}
              >
                <div className="card p-6 h-full">
                  <div className="text-brand-blue mb-4 w-fit bg-brand-blue/8 p-2.5 rounded-xl">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-brand-blue mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
