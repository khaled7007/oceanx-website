import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'الرئيسية', anchor: '#home' },
  { label: 'من نحن', anchor: '#about' },
  { label: 'ممارساتنا', anchor: '#practices' },
  { label: 'القطاعات', anchor: '#sectors' },
  { label: 'إنسايت', route: '/insight' },
  { label: 'الكفاءات', route: '/competencies' },
  { label: 'تواصل معنا', anchor: '#contact' },
]

// Pages with dark hero sections that need a light navbar
const DARK_HERO_ROUTES = ['/competencies', '/insight/read/', '/insight/article/', '/insight/report/']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const isDark = !scrolled && DARK_HERO_ROUTES.some((r) => pathname.startsWith(r))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Build href for anchor links:
  // — on home page  → "#about"  (smooth scroll, no reload)
  // — on other page → "/#about" (navigate to home, browser scrolls)
  const anchorHref = (anchor) => (isHome ? anchor : `/${anchor}`)

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-lg shadow-[0_2px_24px_rgba(0,0,0,0.06)]'
          : isDark
          ? 'bg-brand-dark/30 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center no-underline group">
          <img
            src="/logo.png"
            alt="OceanX — أوشن إكس"
            className="h-16 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = link.route ? pathname === link.route : false
            const cls = `relative text-sm font-medium transition-colors duration-200 no-underline group py-1 ${
              isActive
                ? 'text-brand-blue'
                : isDark
                ? 'text-white/80 hover:text-white'
                : 'text-gray-600 hover:text-brand-blue'
            }`

            return (
              <li key={link.label}>
                {link.route ? (
                  <Link to={link.route} className={cls}>
                    {link.label}
                    <span
                      className={`absolute bottom-0 right-0 h-px bg-brand-blue transition-all duration-250 ease-out ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                ) : (
                  <a href={anchorHref(link.anchor)} className={cls}>
                    {link.label}
                    <span className="absolute bottom-0 right-0 h-px bg-brand-blue w-0 group-hover:w-full transition-all duration-250 ease-out" />
                  </a>
                )}
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href={anchorHref('#contact')}
            className={`text-sm py-2.5 px-5 rounded-lg font-medium transition-all duration-200 ${
              isDark
                ? 'bg-white/15 text-white border border-white/25 hover:bg-white/25'
                : 'btn-primary'
            }`}
          >
            ابدأ الآن
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-[5px] transition-colors ${
            isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="القائمة"
        >
          <span className={`block w-5 h-[1.5px] transition-all duration-300 origin-center ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] transition-all duration-200 ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] transition-all duration-300 origin-center ${isDark ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const cls = 'text-base font-medium text-gray-700 hover:text-brand-blue transition-colors no-underline py-2.5 border-b border-gray-50 last:border-0 block'
                return (
                  <div key={link.label}>
                    {link.route ? (
                      <Link to={link.route} onClick={() => setMenuOpen(false)} className={cls}>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={anchorHref(link.anchor)} onClick={() => setMenuOpen(false)} className={cls}>
                        {link.label}
                      </a>
                    )}
                  </div>
                )
              })}
              <a
                href={anchorHref('#contact')}
                onClick={() => setMenuOpen(false)}
                className="btn-primary mt-3 self-start"
              >
                ابدأ الآن
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
