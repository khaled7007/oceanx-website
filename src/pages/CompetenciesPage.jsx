import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Competencies from '../components/Competencies'

export default function CompetenciesPage() {
  return (
    <>
      {/* ── Page Hero ──────────────────────────────────── */}
      <div className="relative bg-brand-navy overflow-hidden pt-40 pb-20">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(47,72,245,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(47,72,245,0.07) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
          <div
            className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(47,72,245,0.1) 0%, transparent 65%)',
            }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-[360px] h-[360px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(47,72,245,0.07) 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-6"
          >
            <Link
              to="/"
              className="hover:text-brand-blue-light transition-colors no-underline"
            >
              الرئيسية
            </Link>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="rotate-180 opacity-40">
              <path d="M4.5 9L7.5 6L4.5 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-white">الكفاءات</span>
          </motion.div>

          {/* Page title */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          >
            الكفاءات و
            <span className="text-brand-blue">الخبرات</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="text-gray-400 text-lg font-light max-w-xl leading-relaxed"
          >
            كفاءات متنوعة بخبرات محلية ودولية تقود رحلة التحول نحو نتائج ملموسة — مجلس
            الإدارة والفريق الاستشاري الذي يُشكّل قلب أوشن إكس.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/8"
          >
            {[
              { value: '5', label: 'أعضاء مجلس إدارة' },
              { value: '6', label: 'خبراء استشاريون' },
              { value: '+18', label: 'سنة أقدم خبرة' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-brand-blue">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5 font-light">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Competencies content ───────────────────────── */}
      <Competencies standalone />
    </>
  )
}
