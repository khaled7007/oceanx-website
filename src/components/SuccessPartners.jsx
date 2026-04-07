import { useState } from 'react'
import { motion } from 'framer-motion'
import { SUCCESS_PARTNERS } from '../data/successPartners'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

const LOGO_SIZES_DEFAULT =
  'h-[4.25rem] max-h-[4.25rem] sm:h-[5.75rem] sm:max-h-[5.75rem] lg:h-[7.25rem] lg:max-h-[7.25rem] max-w-[13.5rem] sm:max-w-[17.5rem] lg:max-w-[21rem]'
const LOGO_SIZES_LOCKUP =
  'h-[4.5rem] max-h-[4.5rem] sm:h-[6.25rem] sm:max-h-[6.25rem] lg:h-[8rem] lg:max-h-[8rem] max-w-[18rem] sm:max-w-[26rem] lg:max-w-[32rem]'

function PartnerCard({ name, src, lockup }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  const sizeCls = lockup ? LOGO_SIZES_LOCKUP : LOGO_SIZES_DEFAULT

  return (
    <div className="flex items-center justify-center shrink-0 px-5 sm:px-8 lg:px-10 py-2 sm:py-2.5">
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        className={`block w-auto object-contain object-center opacity-90 hover:opacity-100 transition-opacity duration-300 ${sizeCls}`}
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
        className={`flex w-max gap-2 sm:gap-3 lg:gap-4 motion-safe:animate-partners-marquee motion-reduce:animate-none hover:[animation-play-state:paused] ${
          reverse ? 'motion-safe:[animation-direction:reverse]' : ''
        }`}
      >
        {doubled.map((p, i) => (
          <PartnerCard key={`${p.logo}-${i}`} name={p.name} src={p.logo} lockup={p.lockup} />
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
