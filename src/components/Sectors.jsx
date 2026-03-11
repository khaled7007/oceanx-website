import { motion } from 'framer-motion'

const GovIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="white" strokeWidth="1.4">
    <path d="M6 38H38M6 38V22M38 38V22" strokeLinecap="round" />
    <path d="M2 22H42" strokeLinecap="round" />
    <path d="M22 6L2 22H42L22 6Z" strokeLinejoin="round" />
    <rect x="12" y="26" width="6" height="12" rx="1" />
    <rect x="26" y="26" width="6" height="12" rx="1" />
    <circle cx="22" cy="17" r="2" fill="white" opacity="0.55" />
    <path d="M18 32H20M24 32H26" stroke="white" strokeLinecap="round" opacity="0.45" />
  </svg>
)

const PrivateIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="white" strokeWidth="1.4">
    <rect x="6" y="20" width="32" height="18" rx="2" />
    <path d="M14 20V16C14 12.134 17.134 9 21 9H23C26.866 9 30 12.134 30 16V20" strokeLinecap="round" />
    <path d="M6 29H38" strokeLinecap="round" />
    <circle cx="22" cy="29" r="3" fill="white" opacity="0.55" />
    <path d="M17 14H27" strokeLinecap="round" opacity="0.45" />
    <path d="M2 38H42" strokeLinecap="round" opacity="0.3" />
  </svg>
)

const SECTORS = [
  {
    id: 'gov',
    Icon: GovIcon,
    title: 'القطاع الحكومي',
    subtitle: 'Government Sector',
    description:
      'نقدم حلولاً استراتيجية متكاملة للجهات الحكومية تشمل التحول الرقمي، تطوير الكوادر البشرية، وتحسين كفاءة الأداء المؤسسي بما يتوافق مع أهداف رؤية ٢٠٣٠.',
    features: ['التحول الرقمي', 'تطوير الكوادر', 'تحسين الأداء', 'الإصلاح المؤسسي'],
    accent: 'rgba(47,72,245,0.12)',
  },
  {
    id: 'private',
    Icon: PrivateIcon,
    title: 'القطاع الخاص',
    subtitle: 'Private Sector',
    description:
      'نساعد الشركات الخاصة على النمو المستدام والتوسع من خلال الاستشارات الاستراتيجية، تطوير نماذج الأعمال، وبناء الميزة التنافسية في السوق السعودي.',
    features: ['الاستشارات الاستراتيجية', 'نماذج الأعمال', 'التوسع والنمو', 'الميزة التنافسية'],
    accent: 'rgba(129,141,229,0.12)',
  },
]

export default function Sectors() {
  return (
    <section id="sectors" className="py-28 lg:py-36 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* ── Section header ─────────────────────── */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="text-brand-blue-light text-xs font-medium tracking-[0.18em] uppercase block mb-3"
          >
            نطاق عملنا
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          >
            القطاعات التي{' '}
            <span className="text-brand-blue">نخدمها</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-gray-400 text-base font-light leading-relaxed"
          >
            خبرتنا تمتد عبر القطاعين الحكومي والخاص في المملكة العربية السعودية
          </motion.p>
        </div>

        {/* ── Sector cards ──────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SECTORS.map((sector, i) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.12 + i * 0.12 }}
              whileHover={{ scale: 1.015 }}
            >
              <div className="relative rounded-2xl border border-white/8 bg-white/4 p-8 lg:p-10 overflow-hidden group hover:border-brand-blue/35 transition-colors duration-350 h-full">
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 30%, ${sector.accent} 0%, transparent 65%)` }}
                />

                {/* Corner accent */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-blue/4 rounded-tr-[40px] pointer-events-none" />

                <div className="relative z-10">
                  {/* Icon badge */}
                  <div className="w-16 h-16 rounded-2xl border border-brand-blue/25 bg-brand-blue/12 flex items-center justify-center mb-6 group-hover:bg-brand-blue/22 transition-colors duration-300">
                    <sector.Icon />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    {sector.title}
                  </h3>
                  <p className="text-brand-blue-light text-sm mb-5">{sector.subtitle}</p>

                  {/* Description */}
                  <p className="text-gray-400 font-light leading-relaxed mb-7 text-[15px]">
                    {sector.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {sector.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs text-brand-blue-light border border-brand-blue/25 px-3 py-1.5 rounded-full bg-brand-blue/8 hover:bg-brand-blue/16 transition-colors duration-200"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
