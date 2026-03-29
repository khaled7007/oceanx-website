import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Competencies from '../components/Competencies'
import NewsletterBanner from '../components/NewsletterBanner'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function AboutPage() {
  return (
    <>
      {/* ── Hero — manifesto quote ────────────────────── */}
      <div
        className="relative overflow-hidden pt-36 pb-0"
        style={{ background: 'linear-gradient(160deg, #07091f 0%, #0c1030 60%, #080618 100%)' }}
      >
        <div className="absolute inset-0 ocean-mesh opacity-25 pointer-events-none" />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(47,72,245,0.1) 0%, transparent 65%)' }}
        />

        {/* Breadcrumb */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 mb-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs text-white/30"
          >
            <Link to="/" className="hover:text-white/60 no-underline transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/50">About</span>
          </motion.div>
        </div>

        {/* Big manifesto quote */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white font-black text-2xl sm:text-3xl lg:text-4xl xl:text-[2.8rem] leading-[1.35] tracking-tight max-w-4xl"
          >
            أعوامنا من المعرفة والخبرة جعلتنا كياناً يمكنك الوثوق به.{' '}
            <span className="text-white/50">لا نكتفي بتبنّي مشروعك فحسب،</span>{' '}
            بل نُشكّله ونُطوّره ونُحسّنه. حتى يتحوّل إلى واقع ملموس.{' '}
            <span className="text-white/50">نحن محيطٌ من الحلول.</span>
          </motion.p>
        </div>

        {/* Team photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10"
        >
          <div className="h-64 lg:h-80 rounded-t-2xl overflow-hidden bg-gradient-to-br from-brand-navy to-[#1a2055] flex items-center justify-center">
            <div className="text-white/10 text-8xl font-black select-none">OCEANX</div>
          </div>
        </motion.div>
      </div>

      {/* ── Our History + Our Mission ─────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24">

            <motion.div {...fadeUp(0)}>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Our History</h2>
              <p className="text-gray-500 font-light leading-[1.9] text-[14px] mb-4">
                أوشن إكس لحلول الأعمال (OCEANX) هي شركة استشارية سعودية تأسست عام ٢٠١٢، تقدم خدماتها للقطاعين الحكومي والخاص. تتميز بفريق متخصص من المستشارين المهنيين والكفاءات المتنوعة.
              </p>
              <p className="text-gray-500 font-light leading-[1.9] text-[14px]">
                أثبتت أوشن إكس حضورها المميز من خلال انتسابها لكبرى المنظمات العالمية وتقديم أكثر من ١٠٠ مشروع ناجح عبر مختلف القطاعات.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)}>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Our Mission</h2>
              <p className="text-gray-500 font-light leading-[1.9] text-[14px] mb-4">
                نُسهم في تطوير قطاع الأعمال في المملكة من خلال تقديم خدمات استشارية متميزة تساعد المنظمات على تحقيق أهدافها الاستراتيجية واستدامة نموها.
              </p>
              <p className="text-gray-500 font-light leading-[1.9] text-[14px]">
                نُقدّم حلولاً متخصصة وعملية تنعكس إيجابًا على أداء مؤسساتنا الشريكة في تحقيق رؤية المملكة ٢٠٣٠.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Learning and Sharing Knowledge ───────────── */}
      <section className="pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            className="rounded-2xl overflow-hidden grid lg:grid-cols-2"
            style={{ minHeight: 320 }}
          >
            {/* Left text */}
            <div className="bg-white border border-gray-100 p-10 lg:p-14 flex flex-col justify-center">
              <motion.div {...fadeUp(0)}>
                <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-snug mb-5">
                  Learning
                  <br />
                  And Sharing
                  <br />
                  Knowledge
                </h3>
                <p className="text-gray-500 font-light text-[14px] leading-[1.85] max-w-sm">
                  نؤمن أن المعرفة المشتركة تُضاعف الأثر، لذلك نُصدر تقاريرنا ومقالاتنا وبودكاستنا لكل من يسعى للتطوير والنمو.
                </p>
              </motion.div>
            </div>

            {/* Right — video/dark card */}
            <div
              className="relative flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2f48f5 0%, #1a2055 100%)', minHeight: 280 }}
            >
              <div className="absolute inset-0 ocean-mesh opacity-20 pointer-events-none" />
              <Link to="/insight" className="relative z-10 flex flex-col items-center gap-4 no-underline group">
                <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 flex items-center justify-center group-hover:bg-white/25 transition-all duration-300">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="white">
                    <path d="M7 4L18 11L7 18V4Z" />
                  </svg>
                </div>
                <span className="text-white/70 text-sm font-medium">اكتشف إنسايت</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Capabilities — team grid ─────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.h2 {...fadeUp(0)} className="text-2xl font-bold text-gray-900 mb-10">
            Our Capabilities
          </motion.h2>
          <Competencies />
        </div>
      </section>

      {/* ── Brandmark Assets ─────────────────────────── */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #06081e 0%, #0c1030 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-brand-blue-light text-xs font-semibold tracking-widest uppercase block mb-4">
                Brand Assets
              </span>
              <h3 className="text-white font-bold text-2xl lg:text-3xl mb-4">
                Brandmark Assets
              </h3>
              <p className="text-white/40 font-light text-[14px] leading-relaxed max-w-md">
                احصل على الدليل الكامل لهوية أوشن إكس البصرية، الشعارات، الألوان، والخطوط الرسمية.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <button className="btn-primary">
                تحميل الدليل البصري
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 2v8M3 6l4 4 4-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <NewsletterBanner />
    </>
  )
}
