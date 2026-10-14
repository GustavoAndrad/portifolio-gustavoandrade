import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Lang, Localized } from '../api/api'
import { LanguageContext } from './context'
import ui from './ui'
import type { UIKey } from './ui'

const STORAGE_KEY = 'lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch { /* storage indisponível */ }
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* storage indisponível */ }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = ui[lang]['meta.title']
  }, [lang])

  const value = useMemo(() => ({
    lang,
    setLang,
    t: (key: UIKey) => ui[lang][key],
    l: (v: string | Localized) => (typeof v === 'string' ? v : v[lang]),
  }), [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
