import { useEffect, useState } from 'react'
import Giscus from '@giscus/react'
import useTranslation from '@/hooks/useTranslation'

const MessageBoard: React.FC = () => {
  const { t, locale } = useTranslation()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <div className="prose dark:prose-dark max-w-none mb-8">
        <p className="text-gray-600 dark:text-gray-300">
          {t('messageBoardWelcome')} 👋
        </p>
      </div>
      <Giscus
        id="message-board"
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

export default MessageBoard 