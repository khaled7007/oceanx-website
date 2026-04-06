import { useState } from 'react'
import { motion } from 'framer-motion'
import { SUCCESS_PARTNERS } from '../data/successPartners'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

function PartnerLogo({ name, src, index }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <motion.div
      {...fadeUp(0.04 * (index % 8))}
      className="flex items-center justify-center min-h-[6rem] sm:min-h-[7rem] px-3 py-4 sm:px-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white border border-gray-100 hover:border-brand-blue/20 hover:shadow-md transition-all duration-300"
    >
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        className="max-h-12 sm:max-h-16 w-full max-w-[min(100%,11rem)] sm:max-w-[13rem] object-contain object-center opacity-95 hover:opacity-100 transition-opacity"
        onError={() => setFailed(true)}
      />
    </motion.div>
  )
}

export default function SuccessPartners() {
  return (
    <section id="partners" className="py-14 sm:py-20 lg:py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.span {...fadeUp(0)} className="section-label block mb-3">
            نثق بالشراكة
          </motion.span>
          <motion.h2
            {...fadeUp(0.06)}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
          >
            شركاء <span className="text-brand-blue">النجاح</span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.12)}
            className="mt-4 text-gray-600 text-[15px] sm:text-base font-normal leading-relaxed"
          >
            نفتخر بثقة جهات حكومية ومؤسسات وطنية نعمل معها لتحقيق أثر ملموس.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {SUCCESS_PARTNERS.map((p, i) => (
            <PartnerLogo key={`${p.logo}-${i}`} name={p.name} src={p.logo} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
