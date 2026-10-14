import { createContext, useContext } from 'react'
import type { Lang, Localized } from '../api/api'
import type { UIKey } from './ui'

export interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Texto fixo da interface */
  t: (key: UIKey) => string
  /** Escolhe o idioma atual de um campo bilíngue do serve.json */
  l: (value: string | Localized) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage deve ser usado dentro de <LanguageProvider>')
  return ctx
}
