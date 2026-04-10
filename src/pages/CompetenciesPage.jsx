import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Competencies from '../components/Competencies'
import NewsletterBanner from '../components/NewsletterBanner'
import { useI18n } from '../i18n/I18nContext'

export default function CompetenciesPage() {
  const { t } = useI18n()
  return (
    <>
      <div className="page-hero">
        <div className="absolute inset-0 light-grid opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-white/30 mb-6"
          >
            <Link to="/" className="hover:text-white/60 no-underline transition-colors">
              {t('breadcrumb.home')}
            </Link>
            <span>/</span>
            <span className="text-white/60">{t('competenciesPage.crumb')}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {t('competenciesPage.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/40 text-[15px] font-light max-w-md"
          >
            {t('competenciesPage.sub')}
          </motion.p>
        </div>
      </div>
      <Competencies />
      <NewsletterBanner />
    </>
  )
}
