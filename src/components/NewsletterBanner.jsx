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
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
      style={{ background: 'linear-gradient(135deg, #06081e 0%, #0a0e2a 100%)' }}
    >
      <div className="absolute inset-0 ocean-mesh opacity-30 pointer-events-none" />
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(47,72,245,0.4), transparent)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 text-center">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-8"
        >
          <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mb-3">
            نشرة <span className="text-brand-blue italic">أوشن إكس إنسايت</span> البريدية
          </h3>
          <p className="text-white/50 text-[15px] font-light leading-relaxed">
            اشترك في النشرة البريدية وتعرف على أحدث إصدارات أوشن إكس إنسايت
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="max-w-md mx-auto"
        >
          {sent ? (
            <div className="flex items-center justify-center gap-3 bg-white/8 border border-white/15 rounded-xl px-5 py-4">
              <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
              <span className="text-white/70 text-sm">شكرًا! ستصلك نشرتنا قريبًا.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 min-h-[48px] bg-white text-gray-900 placeholder:text-gray-500 border border-white/25 text-base sm:text-sm rounded-lg px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/25 transition-all duration-200 [color-scheme:light]"
              />
              <button type="submit" className="btn-primary text-sm px-6 py-3 min-h-[48px] whitespace-nowrap w-full sm:w-auto touch-manipulation">
                اشترك
              </button>
            </form>
          )}
          <p className="text-white/25 text-xs mt-3">بلا رسائل مزعجة — يمكنك إلغاء الاشتراك في أي وقت.</p>
        </motion.div>

      </div>
    </section>
  )
}
