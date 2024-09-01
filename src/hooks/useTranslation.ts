import { useRouter } from 'next/router'
import en from '../locales/en.json'
import zh from '../locales/zh.json'

const useTranslation = () => {
  const router = useRouter()
  const { locale, locales, defaultLocale } = router
  const translations = locale === 'en' ? en : zh

  return {
    t: translations,
    locale,
    locales,
    defaultLocale,
    setLocale: (newLocale: string) => {
      router.push(router.pathname, router.asPath, { locale: newLocale })
    }
  }
}

export default useTranslation