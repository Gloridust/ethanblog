import { useRouter } from 'next/router'
import en from '../locales/en.json'
import cn from '../locales/cn.json'

const useTranslation = () => {
  const router = useRouter()
  const { locale, locales, defaultLocale } = router
  const translations = locale === 'en' ? en : cn

  const setLocale = (newLocale: string) => {
    const { pathname, asPath, query } = router
    
    // 如果当前在文章页面，切换语言时跳转到主页
    if (pathname === '/blog/[slug]') {
      router.push('/', '/', { locale: newLocale })
    } else {
      // 其他页面正常切换语言
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
