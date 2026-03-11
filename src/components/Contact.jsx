import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <section id="contact" className="relative py-28 lg:py-40 bg-brand-navy overflow-hidden">
      {/* ── Decorative rings ─────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full border border-brand-blue/10" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full border border-brand-blue/8" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(47,72,245,0.06) 0%, transparent 70%)',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(47,72,245,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(47,72,245,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="text-brand-blue-light text-xs font-medium tracking-[0.18em] uppercase block mb-4"
        >
          تواصل معنا
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
        >
          هل أنت مستعد{' '}
          <span className="text-brand-blue">للخطوة التالية؟</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-gray-400 text-lg font-light leading-relaxed mb-10"
        >
          دعنا نكون شريك نجاحك. تواصل معنا اليوم ونتشاور حول مشروعك.
        </motion.p>

        {/* Email form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="بريدك الإلكتروني"
            required
            className="flex-1 bg-white/8 border border-white/15 text-white placeholder-gray-500 px-5 py-3.5 rounded-xl focus:outline-none focus:border-brand-blue/50 focus:bg-white/12 transition-all duration-200 text-right min-w-0"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="btn-primary whitespace-nowrap py-3.5 px-7"
          >
            {sent ? (
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8L6.5 11.5L13 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                تم الإرسال
              </span>
            ) : (
              'أرسل'
            )}
          </motion.button>
        </motion.form>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="flex items-center gap-4 justify-center mb-6"
        >
          <div className="h-px flex-1 bg-white/10 max-w-20" />
          <span className="text-gray-600 text-sm">أو</span>
          <div className="h-px flex-1 bg-white/10 max-w-20" />
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.38 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a
            href="mailto:info@oceanx.sa"
            className="btn-dark text-sm py-3 px-6"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="3" width="14" height="10" rx="1.5" />
              <path d="M1 5.5L8 9.5L15 5.5" strokeLinecap="round" />
            </svg>
            info@oceanx.sa
          </a>
          <a
            href="tel:+966500000000"
            className="btn-dark text-sm py-3 px-6"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 2H6L7.5 5.5L5.5 7.5C6.5 9.5 6.5 9.5 8.5 10.5L10.5 8.5L14 10V13C14 13.5 12 15.5 9 13.5C6 11.5 1 6 3 2Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            اتصل بنا
          </a>
        </motion.div>
      </div>
    </section>
  )
}
