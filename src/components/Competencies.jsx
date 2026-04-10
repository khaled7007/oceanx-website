import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/I18nContext'

/* ─── Data ──────────────────────────────────────────────── */

const BOARD = [
  {
    name: 'م. إبراهيم الزهيميل',
    nameEn: 'Eng. Ibrahim Alzuhaimeel',
    title: 'رئيس مجلس الإدارة',
    titleEn: 'Chairman of the Board',
    subtitle: 'شريك مؤسس',
    subtitleEn: 'Founding partner',
    photo: 'https://oceanx.sa/wp-content/uploads/2022/03/Ibraheem-Alzuhaimeel-500x500.jpg',
    initials: 'إز',
    linkedin: 'https://www.linkedin.com/in/ibraheem-alzuhimeel-a61a8416/',
  },
  {
    name: 'عبدالله العساف',
    nameEn: 'Abdullah Alassaf',
    title: 'نائب رئيس مجلس الإدارة',
    titleEn: 'Vice Chairman',
    subtitle: 'شريك مؤسس',
    subtitleEn: 'Founding partner',
    photo: 'https://oceanx.sa/wp-content/uploads/2022/03/Abdullah-Alassaf-500x500.jpg',
    initials: 'عع',
    linkedin: 'https://www.linkedin.com/in/abdullah-alassaf-080a0422/',
  },
  {
    name: 'طارق القرعاوي',
    nameEn: 'Tareq Al-Garawy',
    title: 'عضو مجلس إدارة',
    titleEn: 'Board member',
    photo: 'https://oceanx.sa/wp-content/uploads/2024/08/Tareq-Al-Garawy.jpg',
    initials: 'طق',
    linkedin: 'https://www.linkedin.com/in/tareq-al-garawy-cma-cfm-a491614/',
  },
  {
    name: 'عبدالإله الصعب',
    nameEn: 'Abdulelah Alsaab',
    title: 'عضو مجلس إدارة',
    titleEn: 'Board member',
    photo: 'https://oceanx.sa/wp-content/uploads/2024/08/1517627911488.png',
    initials: 'عص',
    linkedin: 'https://www.linkedin.com/in/abdulelah-alsaab-7720b62b/',
  },
  {
    name: 'أحمد الزهيميل',
    nameEn: 'Ahmed Alzohimeel',
    title: 'عضو مجلس إدارة',
    titleEn: 'Board member',
    photo: 'https://oceanx.sa/wp-content/uploads/2024/08/1609695295564-500x500.png',
    initials: 'أز',
    linkedin: 'https://www.linkedin.com/in/ahmed-alzohimeel-9aa63a84/',
  },
]

/* الكفاءات — الفريق الاستشاري */
const TEAM = [
  {
    name: 'ديفيد كابيتانيو',
    nameEn: 'Davide Capitanio',
    title: 'الرئيس التنفيذي',
    titleEn: 'Chief Executive Officer',
    photo: 'https://oceanx.sa/wp-content/uploads/2023/01/Davide-pic500_500-12.jpg',
    initials: 'DC',
    experience: '+16',
    expLabel: 'سنة خبرة',
    bio: 'مستشار استراتيجي بخبرة تزيد عن 16 عامًا في التقنية واستراتيجية الأعمال والابتكار في أوروبا والولايات المتحدة والشرق الأوسط. قاد استراتيجيات ابتكار كبرى وبرامج تنظيم وقيادة.',
    bioEn:
      'Strategic advisor with 16+ years in technology, business strategy, and innovation across Europe, the US, and the Middle East—leading major innovation strategies and leadership programs.',
    linkedin: 'https://www.linkedin.com/in/davide-capitanio-2b39432a/',
  },
  {
    name: 'سارة الزهيميل',
    nameEn: 'Sara Alzuhimeel',
    title: 'شريك — إدارة الابتكار',
    titleEn: 'Partner — Innovation',
    photo: 'https://oceanx.sa/wp-content/uploads/2022/03/Sara-Alzuhaimeel-500x500.jpg',
    initials: 'سز',
    experience: '+11',
    expLabel: 'سنة خبرة',
    bio: 'مستشار في الابتكار وريادة الأعمال بخبرة تتجاوز 11 عامًا، ساهمت في تأسيس أكثر من 35 مشروعًا بما فيها حاضنات ومسرعات الأعمال، وقدّمت أكثر من 50 ورشة عمل في الابتكار.',
    bioEn:
      'Innovation and entrepreneurship advisor with 11+ years of experience—helped launch 35+ projects including incubators and accelerators, and delivered 50+ innovation workshops.',
    linkedin: 'https://www.linkedin.com/in/sara-alzuhimeel-a80a9ab6/',
  },
  {
    name: 'أسماء المطيري',
    nameEn: 'Asma Almutairi',
    title: 'مدير عام — الاستشارات الإدارية',
    titleEn: 'General Manager — Management Consulting',
    photo: 'https://oceanx.sa/wp-content/uploads/2022/03/Asma-Almutairi-500x500.jpg',
    initials: 'أم',
    experience: '+9',
    expLabel: 'سنة خبرة',
    bio: 'مستشار إداري بخبرة تتجاوز 9 سنوات في تطوير الاستراتيجيات وتحول المنظمات، متخصصة في حلول إدارية مبتكرة تلبّي احتياجات مختلف القطاعات وتدعم رؤية 2030.',
    bioEn:
      'Management consultant with 9+ years in strategy and organizational transformation—innovative solutions across sectors aligned with Vision 2030.',
    linkedin: 'https://www.linkedin.com/in/asma-almutairi-470743141/',
  },
  {
    name: 'فينتشنزو ميركوريو',
    nameEn: 'Vincenzo Mercurio',
    title: 'مدير عام — الاستشارات الإدارية',
    titleEn: 'General Manager — Management Consulting',
    photo: 'https://oceanx.sa/wp-content/uploads/2024/11/Vincenzo-Mercurio-4-500x500.jpg',
    initials: 'VM',
    experience: '+9',
    expLabel: 'سنة خبرة',
    bio: 'مستشار إداري بخبرة تزيد عن 9 سنوات في الاستشارات الاستراتيجية. خبرة في لندن وليماسول وميلانو، يتخصص في صياغة الاستراتيجيات ودفع النمو والابتكار في القطاعين العام والخاص.',
    bioEn:
      'Management consultant with 9+ years in strategic advisory—experience across London, Limassol, and Milan—focused on strategy, growth, and innovation in public and private sectors.',
    linkedin: 'https://www.linkedin.com/in/vincenzo-mercurio-6893b2a5/',
  },
]

/* ─── Shared helpers ────────────────────────────────────── */

function Avatar({ photo, initials, size = 'md' }) {
  const [failed, setFailed] = useState(false)
  const sizeClasses = {
    sm: 'w-16 h-16 text-base',
    md: 'w-20 h-20 text-lg',
    lg: 'w-24 h-24 text-xl',
  }
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-brand-blue/20 flex-shrink-0 bg-brand-blue/10 flex items-center justify-center`}>
      {!failed && photo ? (
        <img src={photo} alt={initials} className="w-full h-full object-cover" onError={() => setFailed(true)} />
      ) : (
        <span className="font-bold text-brand-blue">{initials}</span>
      )}
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

function SectionDivider({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-10"
    >
      <div className="h-px flex-1 bg-gray-100" />
      <span className="text-gray-800 font-bold text-base whitespace-nowrap tracking-wide">{label}</span>
      <div className="h-px flex-1 bg-gray-100" />
    </motion.div>
  )
}

/* ─── Board card (compact) ──────────────────────────────── */

function BoardCard({ m, i }) {
  const { isEn } = useI18n()
  const name = isEn ? m.nameEn : m.name
  const title = isEn ? m.titleEn || m.title : m.title
  const subtitle = m.subtitle
    ? isEn
      ? m.subtitleEn || m.subtitle
      : m.subtitle
    : null
  const altName = isEn ? m.name : m.nameEn
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: 0.06 * i }}
      whileHover={{ y: -5 }}
      className="w-full min-w-0"
    >
      <div className="card p-5 flex flex-col items-center text-center gap-4 h-full">
        <Avatar photo={m.photo} initials={m.initials} size="md" />
        <div className="flex-1">
          <p className="font-bold text-gray-900 text-sm leading-snug">{name}</p>
          <p className="text-[11px] text-gray-400 font-light mt-0.5">{altName}</p>
          <p className="text-brand-blue text-xs font-semibold mt-2 leading-snug">{title}</p>
          {subtitle && <p className="text-gray-400 text-[11px] mt-0.5 font-light">{subtitle}</p>}
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

/* ─── Full team card (expanded with bio) ───────────────── */

function TeamCard({ m, i }) {
  const { isEn, t } = useI18n()
  const name = isEn ? m.nameEn : m.name
  const altName = isEn ? m.name : m.nameEn
  const title = isEn ? m.titleEn || m.title : m.title
  const bio = isEn ? m.bioEn || m.bio : m.bio
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: 0.07 * i }}
      whileHover={{ y: -5 }}
      className="flex"
    >
      <div className="card p-5 sm:p-7 flex flex-col gap-4 sm:gap-5 w-full">
        <div className="flex items-start gap-4">
          <Avatar photo={m.photo} initials={m.initials} size="lg" />
          <div className="flex-1 min-w-0 pt-1">
            <p className="font-bold text-gray-900 leading-snug text-base">{name}</p>
            <p className="text-[12px] text-gray-400 font-light mt-0.5">{altName}</p>
            <p className="text-brand-blue text-xs font-semibold mt-2 leading-snug">{title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-brand-blue/8 border border-brand-blue/18 text-brand-blue text-sm font-bold px-3 py-1 rounded-full">
            {m.experience}
          </span>
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
            <LinkedInIcon />
            {t('competencies.viewProfile')}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main export ───────────────────────────────────────── */

export default function Competencies() {
  const { t } = useI18n()
  return (
    <section id="competencies" className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-20 px-1">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="section-label block mb-3"
          >
            {t('competencies.label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-[1.75rem] sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
          >
            {t('competencies.title')}
            <span className="text-brand-blue">{t('competencies.titleAccent')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-gray-500 font-light leading-relaxed"
          >
            {t('competencies.subtitle')}
          </motion.p>
        </div>

        {/* ══ 1. مجلس الإدارة ══ */}
        <div className="mb-14 sm:mb-20">
          <SectionDivider label={t('competencies.board')} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 w-full max-w-7xl mx-auto">
            {BOARD.map((m, i) => <BoardCard key={m.nameEn} m={m} i={i} />)}
          </div>
        </div>

        {/* ══ 2. الكفاءات ══ */}
        <div>
          <SectionDivider label={t('competencies.team')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {TEAM.map((m, i) => <TeamCard key={m.nameEn} m={m} i={i} />)}
          </div>
        </div>

      </div>
    </section>
  )
}
