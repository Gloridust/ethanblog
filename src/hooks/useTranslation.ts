import { useRouter } from 'next/router'
import en from '../locales/en.json'
import zh from '../locales/zh.json'

const useTranslation = () => {
  const router = useRouter()
  const { locale, locales, defaultLocale } = router
  const translations = locale === 'en' ? en : zh

  const setLocale = (newLocale: string) => {
    const { pathname, asPath, query } = router
    
    if (pathname.startsWith('/blog/')) {
      router.push('/', '/', { locale: newLocale })
    } else {
      router.push({ pathname, query }, asPath, { locale: newLocale })
    }
  }

  // 修改 t 函数以支持参数
  const t = (key: keyof typeof translations, params?: Record<string, string | number>) => {
    let translation = translations[key] || key

    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{{${param}}}`, String(params[param]))
      })
    }

    return translation
  }

  return {
    t,
    locale,
    locales,
    defaultLocale,
    setLocale
  }
}

export default useTranslation
