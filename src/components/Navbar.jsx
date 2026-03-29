import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const PRACTICES_LINKS = [
  { label: 'الابتكار', to: '/practices/innovation' },
  { label: 'الاستشارات الإدارية', to: '/practices/organization' },
  { label: 'المالية', to: '/practices/finance' },
  { label: 'أبحاث السوق', to: '/practices/market-research' },
]

const NAV_LINKS = [
  { label: 'من نحن', to: '/about' },
  { label: 'ممارساتنا', dropdown: true },
  { label: 'إنسايت', to: '/insight' },
  { label: 'أخبار', to: '/news' },
  { label: 'وظائف', to: '/jobs' },
  { label: 'تواصل معنا', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [practicesOpen, setPracticesOpen] = useState(false)
  const [mobilePracticesOpen, setMobilePracticesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setPracticesOpen(false)
    setMobilePracticesOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setPracticesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isDark = pathname === '/' || pathname.startsWith('/practices/')
  const isScrolledOrLight = scrolled || !isDark

  const logoFilter = isScrolledOrLight ? '' : 'brightness-0 invert'
  const linkColor = isScrolledOrLight ? 'text-gray-700 hover:text-brand-blue' : 'text-white/80 hover:text-white'
  const activeLinkColor = isScrolledOrLight ? 'text-brand-blue' : 'text-white'

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolledOrLight
          ? 'bg-white/97 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.07)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center no-underline">
          <img
            src="/logo.png"
            alt="OceanX"
            className={`h-14 w-auto object-contain transition-all duration-300 ${logoFilter}`}
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => {
            if (link.dropdown) {
              const isActive = pathname.startsWith('/practices')
              return (
                <li key="practices" className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setPracticesOpen(v => !v)}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 py-1 ${
                      isActive ? activeLinkColor : linkColor
                    }`}
                  >
                    {link.label}
                    <svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                      className={`transition-transform duration-200 ${practicesOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M2 4l4 4 4-4" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {practicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[200px] z-50"
                      >
                        {PRACTICES_LINKS.map((p) => (
                          <Link
                            key={p.to}
                            to={p.to}
                            className={`block px-4 py-2.5 text-sm text-gray-700 hover:text-brand-blue hover:bg-blue-50/60 no-underline transition-colors duration-150 ${
                              pathname === p.to ? 'text-brand-blue font-semibold' : ''
                            }`}
                          >
                            {p.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            }

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
          className={`md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg transition-colors ${
            isScrolledOrLight ? 'hover:bg-gray-100' : 'hover:bg-white/10'
          }`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="القائمة"
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
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 py-4 flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key="practices-mobile">
                      <button
                        onClick={() => setMobilePracticesOpen(v => !v)}
                        className="w-full flex items-center justify-between text-base font-medium text-gray-700 py-3 border-b border-gray-50"
                      >
                        {link.label}
                        <svg
                          width="12" height="12" viewBox="0 0 12 12" fill="none"
                          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                          className={`transition-transform duration-200 ${mobilePracticesOpen ? 'rotate-180' : ''}`}
                        >
                          <path d="M2 4l4 4 4-4" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {mobilePracticesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            {PRACTICES_LINKS.map((p) => (
                              <Link
                                key={p.to}
                                to={p.to}
                                className="block pr-4 py-2.5 text-sm text-gray-500 hover:text-brand-blue no-underline border-b border-gray-50"
                              >
                                {p.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`text-base font-medium py-3 border-b border-gray-50 last:border-0 no-underline transition-colors ${
                      pathname === link.to ? 'text-brand-blue' : 'text-gray-700 hover:text-brand-blue'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
