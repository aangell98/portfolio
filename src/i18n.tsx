import { createContext, useContext, useState, type ReactNode } from 'react'
import { CONTENT, type Lang, type Content } from './data/content'

interface Ctx {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: Content
}

const LangContext = createContext<Ctx | null>(null)

function detect(): Lang {
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es')) return 'es'
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = typeof localStorage !== 'undefined' ? (localStorage.getItem('lang') as Lang | null) : null
    return saved ?? detect()
  })

  const update = (l: Lang) => {
    setLang(l)
    try {
      localStorage.setItem('lang', l)
      document.documentElement.lang = l
    } catch {
      /* ignore */
    }
  }

  const value: Ctx = {
    lang,
    setLang: update,
    toggle: () => update(lang === 'en' ? 'es' : 'en'),
    t: CONTENT[lang],
  }

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useI18n() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}
