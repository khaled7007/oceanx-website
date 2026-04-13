import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import NewsletterBanner from '../components/NewsletterBanner'
import { useI18n } from '../i18n/I18nContext'
import { NEWS, NEWS_TAGS as TAGS, NEWS_TAG_COLORS as TAG_COLORS } from '../data/news'
import { translateDate } from '../data/insight'

const TAG_MAP_EN = { 'الكل': 'All', 'شراكة': 'Partnership', 'حدث': 'Event', 'إنجاز': 'Achievement' }
const TAG_MAP_AR = { 'All': 'الكل', 'Partnership': 'شراكة', 'Event': 'حدث', 'Achievement': 'إنجاز' }

export default function NewsPage() {
  const { t, isEn } = useI18n()
  const navigate = useNavigate()
  const featured = NEWS.find(n => n.featured)
  const rest = NEWS.filter(n => !n.featured)

  const newsTitle = (item) => isEn && item.titleEn ? item.titleEn : item.title
  const newsExcerpt = (item) => isEn && item.excerptEn ? item.excerptEn : item.excerpt
  const tagLabel = (arTag) => isEn ? (TAG_MAP_EN[arTag] ?? arTag) : arTag

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 light-grid opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-white/30 mb-6"
          >
            <Link to="/" className="hover:text-white/60 no-underline transition-colors">{t('breadcrumb.home')}</Link>
            <span>/</span>
            <span className="text-white/60">{t('newsPage.crumb')}</span>
          </motion.div>
          <div className="flex items-end justify-between gap-6">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl lg:text-6xl font-bold text-white mb-3"
              >
                {t('newsPage.title')}
              </motion.h1>
            </div>
          </div>
        </div>
      </div>

      {/* Featured article */}
      {featured && (
        <section className="pt-16 pb-0 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 grid lg:grid-cols-2"
              onClick={() => navigate(`/news/${NEWS.indexOf(featured)}`)}
            >
              {/* Image side */}
              <div className={`relative h-64 lg:h-auto min-h-[280px] bg-gradient-to-br from-brand-navy via-[#1a2055] to-brand-blue overflow-hidden ${isEn ? 'lg:order-2' : ''}`}>
                {featured.image && (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={e => { e.currentTarget.style.display = 'none' }}
                  />
                )}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-10">
                  <span className="text-white/50 text-xs font-mono uppercase tracking-widest mb-3">Featured</span>
                  <div className="w-12 h-0.5 bg-brand-blue mb-4" />
                </div>
              </div>
              {/* Content side */}
              <div className={`p-10 flex flex-col justify-between bg-gray-50 ${isEn ? 'lg:order-1 text-left' : 'text-right'}`}>
                <div>
                  <div className="mb-5">
                    <span className="text-gray-400 text-xs">{translateDate(featured.date, isEn ? 'en' : 'ar')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-4 group-hover:text-brand-blue transition-colors duration-200">
                    {newsTitle(featured)}
                  </h2>
                  <p className="text-gray-500 font-light leading-relaxed text-[15px]">
                    {newsExcerpt(featured)}
                  </p>
                </div>
                <div className="mt-8">
                  <Link to={`/news/${NEWS.indexOf(featured)}`} className="inline-flex items-center gap-2 text-brand-blue text-sm font-semibold hover:gap-3 transition-all duration-200 no-underline">
                    {t('newsPage.readMore')}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      {isEn
                        ? <path d="M4 8h8M8 4l4 4-4 4" />
                        : <path d="M12 8H4M8 4l-4 4 4 4" />
                      }
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      {/* Filter + grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Count */}
          <div className={`flex mb-10 ${isEn ? 'justify-end' : 'justify-start'}`}>
            <span className="text-gray-400 text-sm">{rest.length + 1} {t('newsPage.count')}</span>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card overflow-hidden group cursor-pointer"
              onClick={() => navigate(`/news/${NEWS.indexOf(item)}`)}
              >
                {/* Thumbnail */}
                <div className="relative h-44 bg-gradient-to-br from-brand-navy via-[#1a2055] to-brand-blue overflow-hidden">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={e => { e.currentTarget.style.display = 'none' }}
                    />
                  )}
                </div>

                <div className={`p-6 ${isEn ? 'text-left' : 'text-right'}`}>
                  <div className="mb-3">
                    <span className="text-gray-400 text-xs">{translateDate(item.date, isEn ? 'en' : 'ar')}</span>
                  </div>
                  <h3 className="text-gray-900 font-bold text-[15px] leading-snug mb-2 group-hover:text-brand-blue transition-colors duration-200 line-clamp-2">
                    {newsTitle(item)}
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-3 mb-5">
                    {newsExcerpt(item)}
                  </p>
                  <div className="border-t border-gray-100 pt-4">
                    <Link to={`/news/${NEWS.indexOf(item)}`} className="text-brand-blue text-xs font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200 no-underline">
                      {t('newsPage.readMore')}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        {isEn
                          ? <path d="M3 6h6M7 4l2 2-2 2" />
                          : <path d="M9 6H3M5 4L3 6l2 2" />
                        }
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterBanner />
    </>
  )
}
