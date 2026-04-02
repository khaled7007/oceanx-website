import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const kickPlay = () => {
      v.defaultMuted = true
      v.muted = true
      v.setAttribute('muted', '')
      v.volume = 0
      const p = v.play()
      if (p !== undefined) p.catch(() => {})
    }

    kickPlay()
    v.addEventListener('loadeddata', kickPlay)
    v.addEventListener('canplay', kickPlay)

    const onVis = () => {
      if (document.visibilityState === 'visible') kickPlay()
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      v.removeEventListener('loadeddata', kickPlay)
      v.removeEventListener('canplay', kickPlay)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] min-h-[100svh] flex flex-col items-center justify-end sm:justify-center overflow-hidden"
    >
      {/* ── Video background — تشغيل صريح لسياسات autoplay على الديسكتوب ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        className="absolute inset-0 z-0 w-full h-full min-h-full min-w-full object-cover pointer-events-none"
        aria-hidden={true}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Subtle blue glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 600,
          background: 'radial-gradient(ellipse, rgba(47,72,245,0.07) 0%, transparent 65%)',
        }}
      />

      {/* ── Center content — مساحة تحت الشريط + قراءة أوضح على الجوال */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pt-28 pb-36 sm:pt-32 sm:pb-28 md:pb-32 lg:pt-40 lg:pb-40">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55 }}
          className="text-white/55 text-[15px] sm:text-base font-light leading-[1.75] sm:leading-relaxed max-w-md sm:max-w-lg mx-auto mb-8 sm:mb-10 px-1"
        >
          شركة استشارية سعوديـة تقدم خدماتها الاستشارية للقطاعين الحكومي والخاص.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.72 }}
        >
          <Link to="/about" className="btn-primary px-8 py-3.5 text-[14px] min-h-[48px] inline-flex items-center justify-center touch-manipulation">
            اكتشف أوشن إكس
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/20 text-[9px] font-semibold tracking-[0.3em] uppercase">
          scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-brand-blue/50 to-transparent" />
      </motion.div>
    </section>
  )
}
