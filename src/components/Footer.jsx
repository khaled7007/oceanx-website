const QUICK_LINKS = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'من نحن', href: '#about' },
  { label: 'ممارساتنا', href: '#practices' },
  { label: 'القطاعات', href: '#sectors' },
  { label: 'إنسايت', href: '/insight' },
  { label: 'الكفاءات', href: '/competencies' },
  { label: 'تواصل معنا', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="inline-flex mb-4 no-underline group">
              <img
                src="/logo.png"
                alt="OceanX — أوشن إكس"
                className="h-24 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              />
            </a>
            <p className="text-gray-500 text-sm font-light leading-relaxed max-w-xs">
              محيطٌ من الحلول — شركة استشارية سعودية تأسست ٢٠١٢، تخدم القطاعين
              الحكومي والخاص بخبرة محلية ودولية.
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2 mt-5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-gray-500 text-xs">متاحون لمشاريع جديدة</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">روابط سريعة</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-brand-blue text-sm transition-colors duration-200 no-underline inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-brand-blue transition-colors duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">تواصل معنا</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#818DE5" strokeWidth="1.4">
                    <rect x="1" y="3" width="13" height="9" rx="1.5" />
                    <path d="M1 5L7.5 8.5L14 5" strokeLinecap="round" />
                  </svg>
                </div>
                <a href="mailto:info@oceanx.sa" className="text-gray-500 text-sm hover:text-brand-blue-light transition-colors no-underline">
                  info@oceanx.sa
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#818DE5" strokeWidth="1.4">
                    <path d="M7.5 2C5.3 2 3.5 3.8 3.5 6C3.5 9 7.5 13 7.5 13C7.5 13 11.5 9 11.5 6C11.5 3.8 9.7 2 7.5 2Z" />
                    <circle cx="7.5" cy="6" r="1.5" fill="#818DE5" opacity="0.5" />
                  </svg>
                </div>
                <span className="text-gray-500 text-sm">المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © ٢٠٢٥ أوشن إكس لحلول الأعمال. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-gray-600 hover:text-brand-blue-light text-xs transition-colors no-underline">
              سياسة الخصوصية
            </a>
            <a href="#" className="text-gray-600 hover:text-brand-blue-light text-xs transition-colors no-underline">
              الشروط والأحكام
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
