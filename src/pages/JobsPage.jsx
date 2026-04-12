import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import NewsletterBanner from '../components/NewsletterBanner'
import { useI18n } from '../i18n/I18nContext'

export default function JobsPage() {
  const { t, isEn } = useI18n()
  const [activeForm, setActiveForm] = useState(null)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nameAr: '', nameEn: '', gender: '', dob: '', email: '', phone: '', specialization: '', experience: '', cv: '', links: '' })

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }

  const inputCls = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-brand-blue/60 focus:ring-2 focus:ring-brand-blue/10 transition-all'

  const JOB_PATHS = [
    { id: 'cv', title: t('jobsPage.pathCv'), desc: t('jobsPage.pathCvDesc'), variant: 'solid' },
    { id: 'coop', title: t('jobsPage.pathCoop'), desc: t('jobsPage.pathCoopDesc'), variant: 'solid' },
    { id: 'leadership', title: t('jobsPage.pathLeadership'), desc: t('jobsPage.pathLeadershipDesc'), variant: 'outline' },
    { id: 'open', title: t('jobsPage.pathOpen'), desc: t('jobsPage.pathOpenDesc'), variant: 'outline' },
  ]

  const VALUES = [
    { title: t('jobsPage.val1Title'), desc: t('jobsPage.val1Desc') },
    { title: t('jobsPage.val2Title'), desc: t('jobsPage.val2Desc') },
    { title: t('jobsPage.val3Title'), desc: t('jobsPage.val3Desc') },
  ]

  const GENDERS = [
    { key: 'M', label: t('jobsPage.genderM') },
    { key: 'F', label: t('jobsPage.genderF') },
  ]

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 light-grid opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-white/30 mb-6"
          >
            <Link to="/" className="hover:text-white/60 no-underline transition-colors">{t('breadcrumb.home')}</Link>
            <span>/</span>
            <span className="text-white/60">{t('jobsPage.crumb')}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {t('jobsPage.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/40 text-[15px] font-light max-w-md"
          >
            {t('jobsPage.subtitle')}
          </motion.p>
        </div>
      </div>

      {/* 4 paths */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {JOB_PATHS.map((path, i) => (
              <motion.button
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onClick={() => setActiveForm(path.id)}
                className={`${isEn ? 'text-left' : 'text-right'} p-7 rounded-xl border transition-all duration-200 group ${
                  activeForm === path.id
                    ? path.variant === 'solid'
                      ? 'bg-brand-blue border-brand-blue'
                      : 'bg-white border-brand-blue shadow-md'
                    : path.variant === 'solid'
                      ? 'bg-brand-blue/5 border-brand-blue/20 hover:bg-brand-blue hover:border-brand-blue'
                      : 'bg-white border-gray-200 hover:border-brand-blue/40 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                    activeForm === path.id
                      ? path.variant === 'solid' ? 'border-white/30 text-white' : 'border-brand-blue text-brand-blue'
                      : path.variant === 'solid' ? 'border-brand-blue/40 text-brand-blue group-hover:border-white/30 group-hover:text-white' : 'border-gray-200 text-gray-400 group-hover:border-brand-blue group-hover:text-brand-blue'
                  }`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      {isEn ? <path d="M3 8h10M9 4l4 4-4 4" /> : <path d="M13 8H3M7 4L3 8l4 4" />}
                    </svg>
                  </div>
                  <h3 className={`text-lg font-bold ${
                    activeForm === path.id
                      ? path.variant === 'solid' ? 'text-white' : 'text-brand-blue'
                      : path.variant === 'solid' ? 'text-brand-blue group-hover:text-white' : 'text-gray-900'
                  }`}>
                    {path.title}
                  </h3>
                </div>
                <p className={`text-sm font-light leading-relaxed ${
                  activeForm === path.id
                    ? path.variant === 'solid' ? 'text-white/70' : 'text-gray-500'
                    : path.variant === 'solid' ? 'text-brand-blue/60 group-hover:text-white/70' : 'text-gray-500'
                }`}>
                  {path.desc}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Application form */}
          {activeForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className={`mb-8 border-b border-gray-100 pb-6 ${isEn ? 'text-left' : 'text-right'}`}>
                <h2 className="text-2xl font-bold text-gray-900">
                  {JOB_PATHS.find(p => p.id === activeForm)?.title}
                </h2>
              </div>

              {sent ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 12l5 5L20 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('jobsPage.successTitle')}</h3>
                  <p className="text-gray-500 font-light">{t('jobsPage.successBody')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={`space-y-5 ${isEn ? 'text-left' : 'text-right'}`}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('jobsPage.labelNameAr')} *</label>
                      <input required className={inputCls} placeholder="الاسم الكامل" value={form.nameAr} onChange={set('nameAr')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('jobsPage.labelNameEn')} *</label>
                      <input required className={inputCls} placeholder="Full Name" value={form.nameEn} onChange={set('nameEn')} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('jobsPage.labelGender')} *</label>
                      <div className="flex gap-3">
                        {GENDERS.map((g) => (
                          <button
                            key={g.key}
                            type="button"
                            onClick={() => setForm(f => ({ ...f, gender: g.key }))}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                              form.gender === g.key ? 'bg-brand-blue text-white border-brand-blue' : 'border-gray-200 text-gray-600 hover:border-brand-blue/40'
                            }`}
                          >
                            {g.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('jobsPage.labelDob')} *</label>
                      <input required type="date" className={inputCls} value={form.dob} onChange={set('dob')} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('jobsPage.labelEmail')} *</label>
                      <input required type="email" className={inputCls} placeholder="example@email.com" value={form.email} onChange={set('email')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('jobsPage.labelPhone')} *</label>
                      <input required className={inputCls} placeholder="+966 5X XXX XXXX" value={form.phone} onChange={set('phone')} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('jobsPage.labelSpecialization')} *</label>
                      <input required className={inputCls} placeholder={isEn ? 'e.g. Business Administration' : 'e.g. إدارة أعمال'} value={form.specialization} onChange={set('specialization')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('jobsPage.labelExperience')}</label>
                      <input className={inputCls} placeholder={isEn ? 'e.g. 3 years' : 'e.g. 3 سنوات'} value={form.experience} onChange={set('experience')} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('jobsPage.labelCv')} *</label>
                    <input required className={inputCls} placeholder={t('jobsPage.phCv')} value={form.cv} onChange={set('cv')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('jobsPage.labelLinks')}</label>
                    <input className={inputCls} placeholder="https://" value={form.links} onChange={set('links')} />
                  </div>
                  <div className={`flex ${isEn ? 'justify-end' : 'justify-start'} pt-2`}>
                    <button type="submit" className="btn-primary px-8 py-3.5">{t('jobsPage.submit')}</button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* More than a job */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t('jobsPage.moreThanJobTitle')}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`card p-7 ${isEn ? 'text-left' : 'text-right'}`}
              >
                <div className="w-10 h-10 rounded-full bg-brand-blue mb-5" />
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Talent community banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-gray-50 border border-gray-100 p-8 lg:p-10 ${isEn ? 'text-left' : 'text-right'}`}>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{t('jobsPage.communityTitle')}</h3>
              <p className="text-gray-500 text-sm font-light">{t('jobsPage.communityDesc')}</p>
            </div>
            <button className="btn-primary whitespace-nowrap flex items-center gap-2">
              {t('jobsPage.communityBtn')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {isEn ? <path d="M3 7h8M7 3l4 4-4 4" /> : <path d="M11 7H3M7 3l-4 4 4 4" />}
              </svg>
            </button>
          </div>
        </div>
      </section>

      <NewsletterBanner />
    </>
  )
}
