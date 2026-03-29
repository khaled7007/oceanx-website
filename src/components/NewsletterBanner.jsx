import { useState } from 'react'
import { motion } from 'framer-motion'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) { setSent(true) }
  }

  return (
    <section
      className="relative overflow-hidden py-16 lg:py-20"
      style={{ background: 'linear-gradient(135deg, #06081e 0%, #0a0e2a 100%)' }}
    >
      {/* Mesh */}
      <div className="absolute inset-0 ocean-mesh opacity-30 pointer-events-none" />
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(47,72,245,0.4), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text — right in RTL */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:max-w-md"
          >
            <p className="text-white/40 text-xs font-semibold tracking-[0.22em] uppercase mb-3">
              النشرة الشهرية
            </p>
            <h3 className="text-white text-xl lg:text-2xl font-bold leading-snug">
              مرة في الشهر — اكتشف أهم{' '}
              <span className="text-brand-blue">إنسايت الأعمال</span>
            </h3>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="w-full lg:w-auto lg:min-w-[400px]"
          >
            {sent ? (
              <div className="flex items-center gap-3 bg-white/8 border border-white/15 rounded-lg px-5 py-3.5">
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                <span className="text-white/70 text-sm">شكرًا! ستصلك نشرتنا قريبًا.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/8 border border-white/15 text-white placeholder-white/35 text-sm rounded-lg px-4 py-3 outline-none focus:border-brand-blue/60 focus:bg-white/12 transition-all duration-200"
                />
                <button type="submit" className="btn-primary text-sm px-5 py-3 whitespace-nowrap">
                  اشترك
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M11 7H3M7 3l-4 4 4 4" />
                  </svg>
                </button>
              </form>
            )}
            <p className="text-white/25 text-xs mt-2.5">بلا رسائل مزعجة — يمكنك إلغاء الاشتراك في أي وقت.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
