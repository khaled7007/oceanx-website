import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/I18nContext'
import Hero from '../components/Hero'
import PracticesAccordion from '../components/PracticesAccordion'
import SuccessPartners from '../components/SuccessPartners'
import NewsletterBanner from '../components/NewsletterBanner'
import { ARTICLES, REPORTS, PODCASTS, TAG_COLORS, TAGS_EN, translateDate } from '../data/insight'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

/* ─────────────────────────────────────────────────────────────
   1. Identity — محيط من الحلول + الأرقام الكبيرة
───────────────────────────────────────────────────────────── */
const STAT_DEFS = [
  { value: '+763', labelKey: 'statProjects' },
  { value: '+440', labelKey: 'statClients' },
  { value: '+40', labelKey: 'statPartners' },
  { value: '+20', labelKey: 'statSectors' },
  { value: '+13', labelKey: 'statYears' },
]

function IdentitySection() {
  const { t } = useI18n()
  return (
    <>
      {/* ── Text block ── */}
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.span {...fadeUp(0)} className="section-label block mb-4 sm:mb-5">
            {t('home.identityLabel')}
          </motion.span>
          <motion.h2
            {...fadeUp(0.08)}
            className="text-[2rem] sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-[1.12] sm:leading-tight mb-6 sm:mb-8"
          >
            {t('home.identityTitle1')}
            <br />
            <span className="text-brand-blue">{t('home.identityTitle2')}</span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.18)}
            className="text-gray-500 text-[17px] sm:text-xl lg:text-2xl font-light leading-[1.8] sm:leading-[1.85] max-w-full"
          >
            {t('home.identityBody')}
          </motion.p>
        </div>
      </section>

      {/* ── Stats cards ── */}
      <section className="pb-20 sm:pb-24 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {STAT_DEFS.map((s, i) => (
              <motion.div
                key={s.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl px-4 py-6 sm:px-6 sm:py-8 flex flex-col gap-2 sm:gap-3 hover:shadow-md hover:border-brand-blue/20 transition-all duration-300 min-h-[7.5rem] sm:min-h-0"
              >
                <span className="text-[1.65rem] sm:text-4xl lg:text-5xl font-black text-brand-blue leading-none tracking-tight tabular-nums">
                  {s.value}
                </span>
                <span className="text-gray-500 text-[12px] sm:text-[14px] font-light leading-snug">
                  {t(`home.${s.labelKey}`)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   2. Latest Releases — تقارير + مقالات + بودكاست
───────────────────────────────────────────────────────────── */
function LatestReleases() {
  const { t, isEn } = useI18n()
  const [tab, setTab] = useState('reports')

  const reportItems = useMemo(
    () =>
      REPORTS.filter((r) => r.image)
        .slice(0, 3)
        .map((r) => ({
          kind: t('home.kindReport'),
          typeCls: 'bg-indigo-50 text-indigo-700 border-indigo-100',
          title: isEn && r.titleEn ? r.titleEn : r.title,
          date: translateDate(r.date, isEn ? 'en' : 'ar'),
          image: r.image,
          tag: r.tags?.[0] ?? t('home.kindReport'),
          tagDisplay: isEn ? (TAGS_EN[r.tags?.[0]] ?? r.tags?.[0]) : (r.tags?.[0] ?? t('home.kindReport')),
          href: r.url,
          external: true,
        })),
    [t, isEn]
  )

  const articleItems = useMemo(
    () =>
      ARTICLES.filter((a) => a.image)
        .slice(0, 3)
        .map((a) => ({
          kind: t('home.kindArticle'),
          typeCls: 'bg-blue-50 text-blue-700 border-blue-100',
          title: a.title,
          date: a.date,
          image: a.image,
          tag: a.tag,
          href: a.url,
          external: true,
        })),
    [t]
  )

  const podcastItems = useMemo(
    () =>
      PODCASTS.slice(0, 3).map((p) => ({
        kind: t('home.kindPodcast'),
        typeCls: 'bg-violet-50 text-violet-700 border-violet-100',
        title: p.title,
        date: p.date,
        image: null,
        tag: p.guest
          ? isEn
            ? `with ${p.guest}`
            : `مع ${p.guest}`
          : isEn
            ? `Season ${p.season}`
            : `الموسم ${p.season}`,
        href: p.url,
        external: true,
        excerpt: isEn ? `${p.duration} — Season ${p.season}` : `${p.duration} — الموسم ${p.season}`,
      })),
    [t, isEn]
  )

  const TABS = useMemo(
    () => [
      { id: 'reports', label: t('home.tabReports') },
      { id: 'articles', label: t('home.tabArticles') },
      { id: 'podcast', label: t('home.tabPodcast') },
    ],
    [t]
  )

  const items = tab === 'reports' ? reportItems : tab === 'articles' ? articleItems : podcastItems

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:justify-between gap-4 sm:gap-5 mb-8 sm:mb-12">
          <div>
            <motion.h2 {...fadeUp(0.08)} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {t('home.latestTitle')}
              <span className="text-brand-blue">{t('home.latestHighlight')}</span>
            </motion.h2>
          </div>

          {/* Tabs — تمرير أفقي على الشاشات الضيقة */}
          <motion.div
            {...fadeUp(0.12)}
            className="flex items-center gap-2 overflow-x-auto overscroll-x-contain pb-1 -mx-1 px-1 sm:mx-0 sm:px-0 sm:overflow-visible snap-x snap-mandatory sm:snap-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((tabDef) => (
              <button
                key={tabDef.id}
                type="button"
                onClick={() => setTab(tabDef.id)}
                className={`shrink-0 snap-start min-h-[44px] px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-150 touch-manipulation ${
                  tab === tabDef.id
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-brand-blue/40'
                }`}
              >
                {tabDef.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((item, i) => {
            const tagCls = TAG_COLORS[item.tag] ?? item.typeCls
            const Wrapper = item.external ? 'a' : Link
            const linkProps = item.external
              ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
              : { to: item.href }

            return (
              <motion.div
                key={item.title + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Wrapper
                  {...linkProps}
                  className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-blue/15 transition-all duration-300 no-underline h-full"
                >
                  {/* Image */}
                  <div className="h-52 overflow-hidden bg-gray-100 relative">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-navy via-[#1a2055] to-brand-blue">
                        <div className="absolute inset-0 ocean-mesh opacity-20" />
                      </div>
                    )}
                    {/* Type badge on image */}
                    <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm ${item.typeCls}`}>
                      {item.kind}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${tagCls}`}>
                        {item.tagDisplay ?? item.tag}
                      </span>
                      <span className="text-gray-400 text-xs">{item.date}</span>
                    </div>
                    <h3 className="text-gray-900 font-bold text-[14px] leading-snug line-clamp-2 mb-3 group-hover:text-brand-blue transition-colors duration-200">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-gray-400 text-xs font-light leading-relaxed line-clamp-2 mb-3">
                        {item.excerpt}
                      </p>
                    )}
                    <span className="text-brand-blue text-xs font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                      {t('home.readMore')}
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M9 5.5H2M6 2.5L9 5.5 6 8.5" />
                      </svg>
                    </span>
                  </div>
                </Wrapper>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <Link to="/insight" className="inline-flex items-center justify-center gap-2 min-h-[48px] text-sm text-gray-500 hover:text-brand-blue no-underline transition-colors font-medium border border-gray-200 hover:border-brand-blue/30 px-5 py-2.5 rounded-lg bg-white touch-manipulation w-full sm:w-auto max-w-xs sm:max-w-none">
            {t('home.viewAll')}
          </Link>
        </div>

      </div>
    </section>
  )
}


/* ─────────────────────────────────────────────────────────────
   Home page — compose all sections
───────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* 1. Video hero */}
      <Hero />

      {/* 2. محيط من الحلول + الأرقام الكبيرة */}
      <IdentitySection />

      {/* 3. الخدمات */}
      <PracticesAccordion />

      {/* 3b. شركاء النجاح */}
      <SuccessPartners />

      {/* 4. أحدث الإصدارات — إنسايت + أخبار */}
      <LatestReleases />

      {/* 6. Newsletter */}
      <NewsletterBanner />
    </>
  )
}
