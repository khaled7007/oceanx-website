import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import NewsletterBanner from '../components/NewsletterBanner'
import { useI18n } from '../i18n/I18nContext'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

const VALUE_ICONS = ['/values/value-1.png', '/values/value-4.png', '/values/value-3.png', '/values/value-2.png']

/* ─── Why points — icons only (titles/descriptions from i18n) ── */
const WHY_ICONS = [
  <svg key="w0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key="w1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="w2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  <svg key="w3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H3m6 0h12m0 0V5M3 7h18M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/></svg>,
  <svg key="w4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
]

/* ─── People data (aligned with Competencies.jsx) ───────── */
const BOARD = [
  { name: 'م. إبراهيم الزهيميل', nameEn: 'Eng. Ibrahim Alzuhaimeel', title: 'رئيس مجلس الإدارة', titleEn: 'Chairman of the Board', subtitle: 'شريك مؤسس', subtitleEn: 'Founding partner', photo: 'https://oceanx.sa/wp-content/uploads/2022/03/Ibraheem-Alzuhaimeel-500x500.jpg', initials: 'إز', linkedin: 'https://www.linkedin.com/in/ibraheem-alzuhimeel-a61a8416/' },
  { name: 'عبدالله العساف', nameEn: 'Abdullah Alassaf', title: 'نائب رئيس مجلس الإدارة', titleEn: 'Vice Chairman', subtitle: 'شريك مؤسس', subtitleEn: 'Founding partner', photo: 'https://oceanx.sa/wp-content/uploads/2022/03/Abdullah-Alassaf-500x500.jpg', initials: 'عع', linkedin: 'https://www.linkedin.com/in/abdullah-alassaf-080a0422/' },
  { name: 'طارق القرعاوي', nameEn: 'Tareq Al-Garawy', title: 'عضو مجلس إدارة', titleEn: 'Board member', photo: 'https://oceanx.sa/wp-content/uploads/2024/08/Tareq-Al-Garawy.jpg', initials: 'طق', linkedin: 'https://www.linkedin.com/in/tareq-al-garawy-cma-cfm-a491614/' },
  { name: 'عبدالإله الصعب', nameEn: 'Abdulelah Alsaab', title: 'عضو مجلس إدارة', titleEn: 'Board member', photo: 'https://oceanx.sa/wp-content/uploads/2024/08/1517627911488.png', initials: 'عص', linkedin: 'https://www.linkedin.com/in/abdulelah-alsaab-7720b62b/' },
  { name: 'أحمد الزهيميل', nameEn: 'Ahmed Alzohimeel', title: 'عضو مجلس إدارة', titleEn: 'Board member', photo: 'https://oceanx.sa/wp-content/uploads/2024/08/1609695295564-500x500.png', initials: 'أز', linkedin: 'https://www.linkedin.com/in/ahmed-alzohimeel-9aa63a84/' },
]

const TEAM = [
  { name: 'ديفيد كابيتانيو', nameEn: 'Davide Capitanio', title: 'الرئيس التنفيذي', titleEn: 'Chief Executive Officer', photo: 'https://oceanx.sa/wp-content/uploads/2023/01/Davide-pic500_500-12.jpg', initials: 'DC', experience: '+16', bio: 'مستشار استراتيجي بخبرة تزيد عن 16 عامًا في التقنية واستراتيجية الأعمال والابتكار في أوروبا والولايات المتحدة والشرق الأوسط. قاد استراتيجيات ابتكار كبرى وبرامج تنظيم وقيادة.', bioEn: 'Strategic advisor with 16+ years in technology, business strategy, and innovation across Europe, the US, and the Middle East—leading major innovation strategies and leadership programs.', linkedin: 'https://www.linkedin.com/in/davide-capitanio-2b39432a/' },
  { name: 'سارة الزهيميل', nameEn: 'Sara Alzuhimeel', title: 'شريك — إدارة الابتكار', titleEn: 'Partner — Innovation', photo: 'https://oceanx.sa/wp-content/uploads/2022/03/Sara-Alzuhaimeel-500x500.jpg', initials: 'سز', experience: '+11', bio: 'مستشار في الابتكار وريادة الأعمال بخبرة تتجاوز 11 عامًا، ساهمت في تأسيس أكثر من 35 مشروعًا بما فيها حاضنات ومسرعات الأعمال، وقدّمت أكثر من 50 ورشة عمل في الابتكار.', bioEn: 'Innovation and entrepreneurship advisor with 11+ years of experience—helped launch 35+ projects including incubators and accelerators, and delivered 50+ innovation workshops.', linkedin: 'https://www.linkedin.com/in/sara-alzuhimeel-a80a9ab6/' },
  { name: 'أسماء المطيري', nameEn: 'Asma Almutairi', title: 'مدير عام — الاستشارات الإدارية', titleEn: 'General Manager — Management Consulting', photo: 'https://oceanx.sa/wp-content/uploads/2022/03/Asma-Almutairi-500x500.jpg', initials: 'أم', experience: '+9', bio: 'مستشار إداري بخبرة تتجاوز 9 سنوات في تطوير الاستراتيجيات وتحول المنظمات، متخصصة في حلول إدارية مبتكرة تلبّي احتياجات مختلف القطاعات وتدعم رؤية 2030.', bioEn: 'Management consultant with 9+ years in strategy and organizational transformation—innovative solutions across sectors aligned with Vision 2030.', linkedin: 'https://www.linkedin.com/in/asma-almutairi-470743141/' },
  { name: 'فينتشنزو ميركوريو', nameEn: 'Vincenzo Mercurio', title: 'مدير عام — الاستشارات الإدارية', titleEn: 'General Manager — Management Consulting', photo: 'https://oceanx.sa/wp-content/uploads/2024/11/Vincenzo-Mercurio-4-500x500.jpg', initials: 'VM', experience: '+9', bio: 'مستشار إداري بخبرة تزيد عن 9 سنوات في الاستشارات الاستراتيجية. خبرة في لندن وليماسول وميلانو، يتخصص في صياغة الاستراتيجيات ودفع النمو والابتكار في القطاعين العام والخاص.', bioEn: 'Management consultant with 9+ years in strategic advisory—experience across London, Limassol, and Milan—focused on strategy, growth, and innovation in public and private sectors.', linkedin: 'https://www.linkedin.com/in/vincenzo-mercurio-6893b2a5/' },
]

/* ─── Helpers ───────────────────────────────────────────── */
function Avatar({ photo, initials, size = 'md' }) {
  const [failed, setFailed] = useState(false)
  const cls = { sm: 'w-16 h-16 text-base', md: 'w-20 h-20 text-lg', lg: 'w-24 h-24 text-xl' }
  return (
    <div className={`${cls[size]} rounded-full overflow-hidden border-2 border-brand-blue/20 flex-shrink-0 bg-brand-blue/10 flex items-center justify-center`}>
      {!failed && photo
        ? <img src={photo} alt={initials} className="w-full h-full object-cover" onError={() => setFailed(true)} />
        : <span className="font-bold text-brand-blue">{initials}</span>}
    </div>
  )
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3.6 5.4H1V15H3.6V5.4ZM2.3 4.3C3.1 4.3 3.8 3.6 3.8 2.8 3.8 2 3.1 1.3 2.3 1.3 1.5 1.3 0.8 2 0.8 2.8 0.8 3.6 1.5 4.3 2.3 4.3ZM15 15H12.4V10.3C12.4 9.3 12.4 8 10.9 8 9.4 8 9.2 9.1 9.2 10.2V15H6.6V5.4H9.1V6.5H9.1C9.5 5.7 10.5 4.9 11.9 4.9 14.5 4.9 15 6.6 15 8.9V15Z" />
    </svg>
  )
}

function BoardCard({ m, i }) {
  const { isEn } = useI18n()
  const name = isEn ? m.nameEn : m.name
  const altName = isEn ? m.name : m.nameEn
  const title = isEn ? m.titleEn || m.title : m.title
  const subtitle = m.subtitle ? (isEn ? m.subtitleEn || m.subtitle : m.subtitle) : null
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.06 * i }}
      whileHover={{ y: -5 }}
      className="w-full min-w-0"
    >
      <div className="card p-6 sm:p-8 flex flex-col items-center text-center gap-4 sm:gap-5 h-full">
        <Avatar photo={m.photo} initials={m.initials} size="lg" />
        <div className="flex-1 min-w-0 w-full">
          <p className="font-bold text-gray-900 text-base leading-snug">{name}</p>
          <p className="text-[12px] text-gray-400 font-light mt-0.5">{altName}</p>
          <p className="text-brand-blue text-sm font-semibold mt-2 leading-snug">{title}</p>
          {subtitle && <p className="text-gray-400 text-[12px] mt-1 font-light">{subtitle}</p>}
        </div>
        <a
          href={m.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl text-brand-blue-light hover:text-brand-blue active:bg-brand-blue/10 transition-colors no-underline touch-manipulation"
          aria-label={`LinkedIn — ${m.name}`}
        >
          <LinkedInIcon />
        </a>
      </div>
    </motion.div>
  )
}

function TeamCard({ m, i }) {
  const { isEn, t } = useI18n()
  const name = isEn ? m.nameEn : m.name
  const altName = isEn ? m.name : m.nameEn
  const title = isEn ? m.titleEn || m.title : m.title
  const bio = isEn ? m.bioEn || m.bio : m.bio
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.07 * i }}
      whileHover={{ y: -5 }} className="flex w-full min-w-0"
    >
      <div className="card p-5 sm:p-7 flex flex-col gap-5 w-full min-w-0">
        <div className="flex items-start gap-4">
          <Avatar photo={m.photo} initials={m.initials} size="lg" />
          <div className="flex-1 min-w-0 pt-1">
            <p className="font-bold text-gray-900 leading-snug text-base">{name}</p>
            <p className="text-[12px] text-gray-400 font-light mt-0.5">{altName}</p>
            <p className="text-brand-blue text-xs font-semibold mt-2 leading-snug">{title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-brand-blue/8 border border-brand-blue/18 text-brand-blue text-sm font-bold px-3 py-1 rounded-full">{m.experience}</span>
          <span className="text-gray-500 text-sm font-light">{t('competencies.yearsExp')}</span>
        </div>
        <p className="text-gray-600 text-[14px] font-light leading-relaxed flex-1">{bio}</p>
        <div className="pt-4 border-t border-gray-100">
          <a
            href={m.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] px-1 -mx-1 rounded-lg text-brand-blue-light hover:text-brand-blue text-xs font-medium transition-colors no-underline touch-manipulation active:bg-brand-blue/8"
          >
            <LinkedInIcon /> {t('competencies.viewProfile')}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function SectionDivider({ label }) {
  return (
    <motion.div {...fadeUp(0)} className="flex items-center gap-4 mb-12">
      <div className="h-px flex-1 bg-gray-100" />
      <span className="text-gray-800 font-bold text-base whitespace-nowrap tracking-wide">{label}</span>
      <div className="h-px flex-1 bg-gray-100" />
    </motion.div>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function AboutPage() {
  const { t, messages } = useI18n()
  const values = useMemo(
    () => messages.aboutPage.values.map((v, i) => ({ ...v, icon: VALUE_ICONS[i] })),
    [messages]
  )
  const whyPoints = useMemo(
    () => messages.aboutPage.why.map((w, i) => ({ ...w, icon: WHY_ICONS[i] })),
    [messages]
  )

  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden lg:min-h-[560px]"
        style={{ background: 'linear-gradient(160deg, #07091f 0%, #0c1030 60%, #080618 100%)' }}
      >
        <div className="absolute inset-0 ocean-mesh opacity-25 pointer-events-none" />

        {/* Image — card عائمة على اليسار */}
        <motion.div
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="absolute hidden lg:block"
          style={{ top: '10%', bottom: '10%', left: 0, width: '46%' }}
        >
          <div className="w-full h-full overflow-hidden shadow-2xl"
            style={{ borderRadius: '0 2rem 2rem 0' }}
          >
            <img src="/about-hero-anniversary.png" alt={t('aboutPage.heroImgAlt')} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-y-0 right-0 w-24 pointer-events-none"
              style={{ background: 'linear-gradient(to left, rgba(12,16,48,0.6), transparent)' }} />
          </div>
        </motion.div>

        {/* Text content — مثبت على يمين الشاشة (هامش يسار تلقائي) حتى لا يغطي صورة المكتب */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28">
          <div className="w-full max-w-none sm:max-w-lg lg:max-w-xl xl:max-w-2xl sm:ml-auto flex flex-col justify-center py-8 sm:py-10 lg:py-20 text-right">

            {/* Mobile image */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="block lg:hidden w-full aspect-[5/3] max-h-[220px] sm:max-h-none sm:h-56 rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-lg"
            >
              <img src="/about-hero-anniversary.png" alt={t('aboutPage.heroImgAlt')} className="w-full h-full object-cover object-center" />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-white/30 mb-6">
              <Link to="/" className="hover:text-white/60 no-underline transition-colors">{t('breadcrumb.home')}</Link>
              <span>/</span>
              <span className="text-white/50">{t('aboutPage.crumb')}</span>
            </motion.div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="section-label block mb-4">{t('aboutPage.label')}</motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-[1.65rem] sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-[1.25] sm:leading-[1.2] mb-5 sm:mb-6"
            >
              {t('aboutPage.heroTitle')}
              <span className="text-brand-blue">{t('aboutPage.heroTitleAccent')}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-white/60 text-[15px] sm:text-[15px] font-light leading-[1.85]"
            >
              {t('aboutPage.heroBody')}
            </motion.p>
          </div>
        </div>
      </div>

      {/* ══ رؤيتنا + رسالتنا (تحريري — صفان بعرض كامل) ═════════ */}

      <section className="bg-white">
        <motion.div
          {...fadeUp(0)}
          className="relative py-14 sm:py-20 lg:py-24 overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_100%_20%,rgba(47,72,245,0.11),transparent_58%)]"
            aria-hidden
          />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16 xl:gap-20">
            <h3 className="text-brand-blue text-2xl sm:text-3xl lg:text-[2rem] font-black leading-[1.15] shrink-0 border-s-[4px] border-brand-blue ps-5 sm:ps-6 lg:max-w-[11rem]">
              {t('aboutPage.vision')}
            </h3>
            <p className="text-gray-800 font-normal text-[17px] sm:text-[19px] lg:text-[21px] leading-[1.9] lg:pt-1 flex-1 min-w-0">
              {t('aboutPage.visionBody')}
            </p>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.08)}
          className="border-t border-gray-200/90 py-14 sm:py-20 lg:py-24 bg-white"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16 xl:gap-20">
            <h3 className="text-brand-blue text-2xl sm:text-3xl lg:text-[2rem] font-black leading-[1.15] shrink-0 border-s-[4px] border-brand-blue ps-5 sm:ps-6 lg:max-w-[11rem]">
              {t('aboutPage.mission')}
            </h3>
            <p className="text-gray-800 font-normal text-[17px] sm:text-[19px] lg:text-[21px] leading-[1.9] lg:pt-1 flex-1 min-w-0">
              {t('aboutPage.missionBody')}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ══ قيمنا (نفس عرض/تخطيط رؤيتنا ورسالتنا لمحاذاة العناوين) ══ */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white border-t border-gray-200/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div {...fadeUp(0)} className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16 xl:gap-20">
            <h3 className="text-brand-blue text-2xl sm:text-3xl lg:text-[2rem] font-black leading-[1.15] shrink-0 border-s-[4px] border-brand-blue ps-5 sm:ps-6 lg:max-w-[11rem]">
              {t('aboutPage.valuesTitle')}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 flex-1 min-w-0 w-full">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="p-7 sm:p-8 flex flex-col gap-4 sm:gap-5 text-center items-center"
                >
                  <div className="w-14 h-14 sm:w-[3.75rem] sm:h-[3.75rem] flex-shrink-0">
                    <img src={v.icon} alt="" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-[17px] sm:text-lg leading-snug">{v.title}</h3>
                  <p className="text-gray-700 font-normal text-[15px] sm:text-[16px] leading-[1.85]">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ تميّزنا ══════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <div className="lg:sticky lg:top-28">
              <motion.span {...fadeUp(0)} className="section-label block mb-4 text-base">{t('aboutPage.diffLabel')}</motion.span>
              <motion.h2 {...fadeUp(0.08)} className="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight">
                {t('aboutPage.diffTitle1')}
                <br />
                <span className="text-brand-blue">{t('aboutPage.diffTitle2')}</span>
              </motion.h2>
            </div>
            <div className="space-y-0 divide-y divide-gray-100">
              {whyPoints.map((pt, i) => (
                <motion.div key={pt.title} {...fadeUp(i * 0.08)} className="py-7 flex gap-5 items-start group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mt-0.5 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    {pt.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[17px] mb-1.5 group-hover:text-brand-blue transition-colors duration-200">{pt.title}</h3>
                    <p className="text-gray-500 font-light text-[18px] leading-relaxed">{pt.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ مجلس الإدارة ═══════════════════════════════════ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <SectionDivider label={t('competencies.board')} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 w-full max-w-7xl mx-auto">
            {BOARD.map((m, i) => <BoardCard key={m.nameEn} m={m} i={i} />)}
          </div>
        </div>
      </section>

      {/* ══ الكفاءات ═════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <SectionDivider label={t('competencies.team')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((m, i) => <TeamCard key={m.nameEn} m={m} i={i} />)}
          </div>
        </div>
      </section>

      {/* ══ دورنا في رؤية 2030 ══════════════════════════════ */}
      <section className="border-t border-gray-200/90 bg-white">
        <motion.div
          {...fadeUp(0)}
          className="relative py-14 sm:py-20 lg:py-24 overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_100%_30%,rgba(47,72,245,0.08),transparent_55%)]"
            aria-hidden
          />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16 xl:gap-20">
            <h3 className="text-brand-blue text-2xl sm:text-3xl lg:text-[2rem] font-black leading-[1.2] shrink-0 border-s-[4px] border-brand-blue ps-5 sm:ps-6 lg:max-w-[14rem] xl:max-w-[16rem]">
              {t('aboutPage.vision2030')}
            </h3>
            <p className="text-gray-800 font-normal text-[17px] sm:text-[19px] lg:text-[21px] leading-[1.9] lg:pt-1 flex-1 min-w-0">
              {t('aboutPage.vision2030Body')}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ══ NEWSLETTER ══════════════════════════════════════ */}
      <NewsletterBanner />
    </>
  )
}
