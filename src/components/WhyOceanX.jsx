import { motion } from 'framer-motion'

const PRACTICES = [
  {
    id: 'innovation',
    label: 'Innovation',
    title: 'الابتكار',
    description:
      'نقدم استشارات متخصصة في مجال الابتكار وتمكين الأعمال عبر خبراء متخصصين وشراكات متنوعة، من تصميم مبادرات الابتكار حتى التنفيذ الكامل للبرامج.',
    services: ['استشارات الابتكار', 'تمكين الأعمال', 'تنفيذ البرامج', 'إدارة البرامج'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="14" cy="12" r="6" />
        <path d="M11 18V22H17V18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22H16" strokeLinecap="round" />
        <path d="M14 6V3M6.5 8.5L4.5 6.5M21.5 8.5L23.5 6.5M4 14H2M26 14H24" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'consulting',
    label: 'Management Consulting',
    title: 'الاستشارات الإدارية',
    description:
      'نطوّر المنظمات وندعم نموها باستخدام أحدث المنهجيات العلمية وأفضل الممارسات الدولية، عبر خدمات متكاملة تشمل التطوير الاستراتيجي وإدارة المشاريع.',
    services: ['التطوير التنظيمي', 'التطوير الاستراتيجي', 'إدارة المشاريع', 'الاستعانة بمصادر خارجية'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 22V10L14 4L24 10V22H4Z" strokeLinejoin="round" />
        <path d="M10 22V15H18V22" strokeLinejoin="round" />
        <path d="M4 14H24" />
        <circle cx="14" cy="10" r="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'research',
    label: 'Market Research',
    title: 'أبحاث السوق',
    description:
      'نُجري دراسات وتحليلات السوق بمنهجيات علمية متقدمة. نفخر بعضوية ESOMAR الأوروبية وشهادة Insights Association الأمريكية، ضمانًا لأعلى معايير الجودة.',
    services: ['أبحاث وتحليلات السوق', 'البحث الأولي', 'البحث المكتبي', 'تحليل البيانات'],
    badge: ['ESOMAR Member', 'Insights Association'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="8" />
        <path d="M18 18L24 24" strokeLinecap="round" />
        <path d="M9 12H15M12 9V15" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function WhyOceanX() {
  return (
    <section id="practices" className="py-28 lg:py-36 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* ── Section header ─────────────────── */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="section-label block mb-3"
          >
            ممارساتنا
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
          >
            خدماتنا{' '}
            <span className="text-brand-blue">الأساسية</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-gray-500 text-base font-light leading-relaxed"
          >
            ثلاث ممارسات متكاملة تُغطي احتياجاتكم من الابتكار حتى البحث والتطوير
          </motion.p>
        </div>

        {/* ── Practice cards ─────────────────── */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
          {PRACTICES.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -7 }}
              className="flex"
            >
              <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden group transition-shadow duration-300 w-full p-8 flex flex-col">
                {/* Static thin top bar */}
                <div className="absolute top-0 inset-x-0 h-[3px] bg-brand-blue/18 rounded-t-2xl" />
                {/* Animated fill on hover */}
                <div className="absolute top-0 inset-x-0 h-[3px] bg-brand-blue rounded-t-2xl scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300" />

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/8 text-brand-blue flex items-center justify-center mb-5 group-hover:bg-brand-blue/14 transition-colors duration-300">
                  {p.icon}
                </div>

                {/* Titles */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                  <span className="text-xs text-brand-blue-light font-medium">{p.label}</span>
                </div>

                <p className="text-gray-500 font-light leading-relaxed text-[15px] mb-6 flex-1">
                  {p.description}
                </p>

                {/* Service tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.services.map((s) => (
                    <span
                      key={s}
                      className="text-xs text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Credentials badge (market research only) */}
                {p.badge && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {p.badge.map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center gap-1.5 text-xs text-brand-blue font-medium bg-brand-blue/7 border border-brand-blue/18 px-3 py-1.5 rounded-full"
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                          <path d="M5 0L6.2 3.5H10L7 5.7L8.1 9.2L5 7L1.9 9.2L3 5.7L0 3.5H3.8L5 0Z" />
                        </svg>
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
