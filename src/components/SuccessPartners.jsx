import { useState } from 'react'
import { motion } from 'framer-motion'
import { SUCCESS_PARTNERS } from '../data/successPartners'
import { useI18n } from '../i18n/I18nContext'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

const LOGO_SIZES_DEFAULT =
  'h-[5rem] max-h-[5rem] sm:h-[6.75rem] sm:max-h-[6.75rem] lg:h-[8.5rem] lg:max-h-[8.5rem] max-w-[16rem] sm:max-w-[20.5rem] lg:max-w-[25rem]'
const LOGO_SIZES_LOCKUP =
  'h-[5.25rem] max-h-[5.25rem] sm:h-[7.25rem] sm:max-h-[7.25rem] lg:h-[9.5rem] lg:max-h-[9.5rem] max-w-[21rem] sm:max-w-[30rem] lg:max-w-[38rem]'
/** برنامج تجربة الحجاج (ضيوف الرحمن) — ارتفاع ثابت ١٦٨px */
const LOGO_SIZES_LARGE =
  'h-[168px] max-h-[168px] w-auto max-w-[19rem] sm:max-w-[26rem] lg:max-w-[34rem]'

function PartnerCard({ name, src, lockup, large }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  const sizeCls = lockup ? LOGO_SIZES_LOCKUP : large ? LOGO_SIZES_LARGE : LOGO_SIZES_DEFAULT

  return (
    <div className="flex items-center justify-center shrink-0 px-1 sm:px-1.5 lg:px-2 py-2 sm:py-3">
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

function MarqueeRow({ items }) {
  const doubled = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden py-1
        [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]
        [-webkit-mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
    >
      <div className="flex w-max gap-0 motion-safe:animate-partners-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
        {doubled.map((p, i) => (
          <PartnerCard key={`${p.logo}-${i}`} name={p.name} src={p.logo} lockup={p.lockup} large={p.large} />
        ))}
      </div>
    </div>
  )
}

export default function SuccessPartners() {
  const { t } = useI18n()
  return (
    <section id="partners" className="py-14 sm:py-20 lg:py-24 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.span {...fadeUp(0)} className="section-label block mb-3">
            {t('partners.label')}
          </motion.span>
          <motion.h2
            {...fadeUp(0.06)}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
          >
            {t('partners.title')}
            <span className="text-brand-blue">{t('partners.titleAccent')}</span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.12)}
            className="mt-4 text-gray-600 text-[15px] sm:text-base font-normal leading-relaxed"
          >
            {t('partners.body')}
          </motion.p>
        </div>
      </div>

      <MarqueeRow items={SUCCESS_PARTNERS} />
    </section>
  )
}
