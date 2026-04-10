import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations'

const STORAGE_KEY = 'oceanx-locale'

const I18nContext = createContext(null)

function getByPath(obj, path) {
  if (!path) return undefined
  const parts = path.split('.')
  let cur = obj
  for (const p of parts) {
    if (cur == null) return undefined
    cur = cur[p]
  }
  return cur
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === 'undefined') return 'ar'
    const s = window.localStorage.getItem(STORAGE_KEY)
    return s === 'en' || s === 'ar' ? s : 'ar'
  })

  const setLocale = useCallback((next) => {
    const l = next === 'en' ? 'en' : 'ar'
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale === 'en' ? 'en' : 'ar'
    root.dir = locale === 'en' ? 'ltr' : 'rtl'
  }, [locale])

  useEffect(() => {
    const m = translations[locale]?.meta
    if (m?.title) document.title = m.title
    const desc = m?.description
    if (desc) {
      let el = document.querySelector('meta[name="description"]')
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', 'description')
        document.head.appendChild(el)
      }
      el.setAttribute('content', desc)
    }
  }, [locale])

  const messages = translations[locale] || translations.ar

  const t = useCallback(
    (key, fallback) => {
      const v = getByPath(messages, key)
      if (v !== undefined && v !== null) return v
      const fb = getByPath(translations.ar, key)
      if (fb !== undefined && fb !== null) return fb
      return fallback !== undefined ? fallback : key
    },
    [messages]
  )

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      messages,
      isEn: locale === 'en',
    }),
    [locale, setLocale, t, messages]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
