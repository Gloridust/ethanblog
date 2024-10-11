import { useRouter } from 'next/router'
import en from '../locales/en.json'
import zh from '../locales/zh.json'

const useTranslation = () => {
  const router = useRouter()
  const { locale, locales, defaultLocale } = router
  const translations = locale === 'en' ? en : zh

  const setLocale = (newLocale: string) => {
    const { pathname, asPath, query } = router
    
    // Check if we're on a blog post page
    if (pathname.startsWith('/blog/')) {
      // Redirect to home page of the new language
      router.push('/', '/', { locale: newLocale })
    } else {
      // For other pages, just change the language
      router.push({ pathname, query }, asPath, { locale: newLocale })
    }
  }

  // 将 t 定义为一个函数
  const t = (key: keyof typeof translations) => {
    return translations[key] || key
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