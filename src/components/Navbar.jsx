import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n/I18nContext'

function LanguageToggle() {
  const { locale, setLocale } = useI18n()
  return (
    <div
      className="flex items-center gap-1 rounded-lg border px-1 py-0.5 text-[11px] font-bold shrink-0"
      style={{
        borderColor: 'rgba(255,255,255,0.2)',
        background: 'rgba(255,255,255,0.06)',
      }}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale('ar')}
        className={`px-2 py-1 rounded-md transition-colors ${
          locale === 'ar' ? 'bg-white/20 text-white' : 'text-white/55 hover:text-white/90'
        }`}
      >
        العربية
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`px-2 py-1 rounded-md transition-colors ${
          locale === 'en' ? 'bg-white/20 text-white' : 'text-white/55 hover:text-white/90'
        }`}
      >
        English
      </button>
    </div>
  )
}

function LanguageToggleLight() {
  const { locale, setLocale } = useI18n()
  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50/80 px-0.5 py-0.5 text-[11px] font-bold shrink-0"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale('ar')}
        className={`px-2 py-1 rounded-md transition-colors ${
          locale === 'ar' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        عربي
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`px-2 py-1 rounded-md transition-colors ${
          locale === 'en' ? 'bg-white text-brand-blue shadow-sm' : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        EN
      </button>
    </div>
  )
}

/** صفحات تبدأ بهيرو داكن — الشريط الشفاف القديم كان يخلّي الروابط رمادية فوق أزرق ويختفي الوضوح */
function hasDarkHeroRoute(pathname) {
  if (pathname === '/') return true
  const exact = ['/about', '/services', '/news', '/jobs', '/contact', '/competencies']
  if (exact.includes(pathname)) return true
  if (pathname.startsWith('/insight')) return true
  if (pathname.startsWith('/practices')) return true
  return false
}

export default function Navbar() {
  const { t } = useI18n()
  const NAV_LINKS = useMemo(
    () => [
      { label: t('nav.about'), to: '/about' },
      { label: t('nav.services'), to: '/services' },
      { label: t('nav.insight'), to: '/insight' },
      { label: t('nav.news'), to: '/news' },
      { label: t('nav.jobs'), to: '/jobs' },
      { label: t('nav.contact'), to: '/contact' },
    ],
    [t]
  )
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuTop, setMenuTop] = useState(72)
  const headerRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [menuOpen])

  useLayoutEffect(() => {
    if (!menuOpen || !headerRef.current) return
    const el = headerRef.current
    const sync = () => setMenuTop(el.getBoundingClientRect().bottom)
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [menuOpen, scrolled])

  const immersiveDark = hasDarkHeroRoute(pathname) && !scrolled && !menuOpen
  const solidLightBar = !immersiveDark

  const logoFilter = solidLightBar ? '' : 'brightness-0 invert'
  const linkColor = solidLightBar
    ? 'text-gray-800 hover:text-brand-blue'
    : 'text-white hover:text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.65)]'
  const activeLinkColor = solidLightBar ? 'text-brand-blue' : 'text-brand-blue-light'

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${
        menuOpen ? 'z-[80]' : 'z-50'
      } ${
        solidLightBar
          ? 'bg-white border-b border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
          : 'bg-[#050816]/92 backdrop-blur-xl border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]'
      }`}
    >
      <nav ref={headerRef} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 min-h-[4.5rem] sm:min-h-[5rem] py-2 sm:py-0 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link to="/" className="flex items-center no-underline">
          <img
            src="/logo.png"
            alt="OceanX"
            className={`h-11 sm:h-12 md:h-14 w-auto object-contain transition-all duration-300 ${logoFilter}`}
          />
        </Link>

        {/* Language + desktop links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {solidLightBar ? <LanguageToggleLight /> : <LanguageToggle />}
          <ul className="flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.to
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`text-sm font-medium transition-colors duration-200 no-underline py-1 relative group ${
                      isActive ? activeLinkColor : linkColor
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 start-0 h-0.5 rounded-full bg-brand-blue transition-all duration-250 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`md:hidden min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-[5px] rounded-xl transition-colors touch-manipulation ${
            solidLightBar ? 'hover:bg-gray-100 active:bg-gray-100/80' : 'hover:bg-white/15 active:bg-white/20'
          }`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={t('nav.menu')}
          aria-expanded={menuOpen}
        >
          {['top', 'mid', 'bot'].map((pos) => (
            <span
              key={pos}
              className={`block w-5 h-px transition-all duration-300 ${
                solidLightBar ? 'bg-gray-800' : 'bg-white shadow-[0_0_1px_rgba(0,0,0,0.5)]'
              } ${
                pos === 'top' && menuOpen ? 'rotate-45 translate-y-[6px]' :
                pos === 'mid' && menuOpen ? 'opacity-0 scale-x-0' :
                pos === 'bot' && menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu — خلفية + لوحة؛ قياس ارتفاع الشريط لعدم تداخل المحتوى */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-nav-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 bottom-0 z-10 pointer-events-none"
            style={{ top: menuTop }}
          >
            <button
              type="button"
              aria-label={t('nav.closeMenu')}
              className="absolute inset-0 z-0 bg-black/35 backdrop-blur-[1px] pointer-events-auto"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto w-full max-w-lg bg-white border-t border-gray-100 shadow-[0_16px_48px_rgba(0,0,0,0.14)] overflow-y-auto overscroll-contain rounded-b-2xl pointer-events-auto"
              style={{
                maxHeight: `calc(100dvh - ${menuTop}px)`,
                paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
              }}
            >
              <div className="px-3 sm:px-5 py-3 flex flex-col gap-2">
                <div className="px-3 pb-2 md:hidden">
                  <LanguageToggleLight />
                </div>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`text-[17px] font-semibold min-h-[54px] px-3 flex items-center rounded-xl no-underline transition-colors duration-150 touch-manipulation active:scale-[0.99] active:bg-brand-blue/[0.08] ${
                      pathname === link.to
                        ? 'text-brand-blue bg-brand-blue/[0.06]'
                        : 'text-gray-800 active:text-brand-blue'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
