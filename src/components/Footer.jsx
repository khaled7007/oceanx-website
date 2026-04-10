import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useI18n } from '../i18n/I18nContext'

const SOCIALS = [
  {
    name: 'LinkedIn',
    href: 'https://sa.linkedin.com/company/oceanx',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://twitter.com/OceanXksa',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-white/90 font-semibold text-sm mb-5">{title}</h4>
      <ul className="space-y-1 sm:space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[40px] sm:min-h-0 py-1.5 sm:py-0 text-white/40 hover:text-white/70 text-sm transition-colors duration-200 no-underline touch-manipulation"
              >
                {link.label}
              </a>
            ) : (
              <Link
                to={link.to}
                className="inline-flex items-center min-h-[40px] sm:min-h-0 py-1.5 sm:py-0 text-white/40 hover:text-white/70 text-sm transition-colors duration-200 no-underline touch-manipulation"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const { t } = useI18n()
  const COL_ABOUT = useMemo(
    () => [
      { label: t('footer.about'), to: '/about' },
      { label: t('footer.jobs'), to: '/jobs' },
      { label: t('footer.contact'), to: '/contact' },
    ],
    [t]
  )
  const COL_PRACTICES = useMemo(
    () => [
      { label: t('footer.practiceInnovation'), to: '/practices/innovation' },
      { label: t('footer.practiceOrg'), to: '/practices/organization' },
      { label: t('footer.practiceMr'), to: '/practices/market-research' },
    ],
    [t]
  )
  const COL_INSIGHT = useMemo(
    () => [
      { label: t('footer.insightReports'), href: 'https://insight.oceanx.sa/reports/', external: true },
      { label: t('footer.insightArticles'), href: 'https://insight.oceanx.sa/articles/', external: true },
      { label: t('footer.insightPodcast'), href: 'https://insight.oceanx.sa/بودكاست-2/', external: true },
      { label: t('footer.insightHome'), to: '/insight' },
    ],
    [t]
  )

  return (
    <footer className="bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 sm:pt-16 pb-8 pb-[max(2rem,env(safe-area-inset-bottom,0px))]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-8 sm:gap-10 mb-12 sm:mb-14">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex mb-5 no-underline">
              <img
                src="/logo.png"
                alt={t('meta.logoAlt')}
                className="h-16 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-200"
              />
            </Link>
            <p className="text-white/35 text-sm font-light leading-relaxed max-w-xs mb-6">
              {t('footer.tagline')}
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="min-w-[40px] min-h-[40px] w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white/6 hover:bg-brand-blue/30 text-white/40 hover:text-white flex items-center justify-center transition-all duration-200 no-underline touch-manipulation"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title={t('footer.company')} links={COL_ABOUT} />
          <FooterCol title={t('footer.practices')} links={COL_PRACTICES} />
          <FooterCol title={t('footer.insightCol')} links={COL_INSIGHT} />
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            {t('footer.rights')}
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors no-underline">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors no-underline">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
