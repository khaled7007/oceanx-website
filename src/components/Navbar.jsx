import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'من نحن', to: '/about' },
  { label: 'خدماتنا', to: '/services' },
  { label: 'إنسايت', to: '/insight' },
  { label: 'أخبار', to: '/news' },
  { label: 'وظائف', to: '/jobs' },
  { label: 'تواصل معنا', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isDark = pathname === '/' || pathname === '/services'
  const isScrolledOrLight = scrolled || !isDark

  const logoFilter = isScrolledOrLight ? '' : 'brightness-0 invert'
  const linkColor = isScrolledOrLight ? 'text-gray-700 hover:text-brand-blue' : 'text-white/80 hover:text-white'
  const activeLinkColor = isScrolledOrLight ? 'text-brand-blue' : 'text-white'

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${
        isScrolledOrLight
          ? 'bg-white/97 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.07)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 min-h-[4.5rem] sm:min-h-[5rem] py-2 sm:py-0 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link to="/" className="flex items-center no-underline">
          <img
            src="/logo.png"
            alt="OceanX"
            className={`h-11 sm:h-12 md:h-14 w-auto object-contain transition-all duration-300 ${logoFilter}`}
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.to
            return (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`text-sm font-medium transition-colors duration-200 no-underline py-1 relative group ${
                    isActive ? activeLinkColor : linkColor
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 right-0 h-px bg-brand-blue transition-all duration-250 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`md:hidden min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-[5px] rounded-xl transition-colors touch-manipulation ${
            isScrolledOrLight ? 'hover:bg-gray-100 active:bg-gray-100/80' : 'hover:bg-white/10 active:bg-white/15'
          }`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="القائمة"
          aria-expanded={menuOpen}
        >
          {['top', 'mid', 'bot'].map((pos) => (
            <span
              key={pos}
              className={`block w-5 h-px transition-all duration-300 ${
                isScrolledOrLight ? 'bg-gray-800' : 'bg-white'
              } ${
                pos === 'top' && menuOpen ? 'rotate-45 translate-y-[6px]' :
                pos === 'mid' && menuOpen ? 'opacity-0 scale-x-0' :
                pos === 'bot' && menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
          >
            <div className="px-4 sm:px-6 py-2 flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-base font-medium min-h-[48px] flex items-center border-b border-gray-50 last:border-0 no-underline transition-colors touch-manipulation ${
                    pathname === link.to ? 'text-brand-blue' : 'text-gray-700 active:text-brand-blue'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
