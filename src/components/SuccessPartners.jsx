import { useState } from 'react'
import { motion } from 'framer-motion'
import { SUCCESS_PARTNERS } from '../data/successPartners'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

function PartnerCard({ name, src }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <div className="flex items-center justify-center shrink-0 w-[9.5rem] sm:w-[11.5rem] lg:w-[12.5rem] min-h-[6.5rem] sm:min-h-[8rem] lg:min-h-[9rem] px-3 sm:px-4 py-3 rounded-xl sm:rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-brand-blue/20 hover:shadow-md transition-all duration-300">
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        className="w-full max-h-[3.5rem] sm:max-h-[5.25rem] lg:max-h-[6rem] max-w-full object-contain object-center opacity-95"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden py-1
        [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]
        [-webkit-mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
    >
      <div
        className={`flex w-max gap-3 sm:gap-4 motion-safe:animate-partners-marquee motion-reduce:animate-none hover:[animation-play-state:paused] ${
          reverse ? 'motion-safe:[animation-direction:reverse]' : ''
        }`}
      >
        {doubled.map((p, i) => (
          <PartnerCard key={`${p.logo}-${i}`} name={p.name} src={p.logo} />
        ))}
      </div>
    </div>
  )
}

export default function SuccessPartners() {
  const mid = Math.ceil(SUCCESS_PARTNERS.length / 2)
  const rowA = SUCCESS_PARTNERS.slice(0, mid)
  const rowB = SUCCESS_PARTNERS.slice(mid)

  return (
    <section id="partners" className="py-14 sm:py-20 lg:py-24 bg-gray-50 border-y border-gray-100 overflow-hidden">
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
      </div>

      <div className="flex flex-col gap-4 sm:gap-5">
        <MarqueeRow items={rowA} reverse={false} />
        <MarqueeRow items={rowB} reverse />
      </div>
    </section>
  )
}
