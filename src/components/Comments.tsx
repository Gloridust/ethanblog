import { useEffect, useState } from 'react'
import Giscus from '@giscus/react'
import useTranslation from '@/hooks/useTranslation'

const Comments: React.FC = () => {
  const { locale } = useTranslation()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }
    
    setTheme(mediaQuery.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <Giscus
        id="comments"
        repo="Gloridust/ethanblog"
        repoId="R_kgDOMq1xtQ"
        category="Announcements"
        categoryId="DIC_kwDOMq1xtc4Cl-Tk"
        mapping="title"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang={locale === 'zh' ? 'zh-CN' : 'en'}
        loading="lazy"
      />
    </div>
  )
}

export default Comments 