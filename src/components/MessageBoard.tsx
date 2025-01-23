import { useEffect, useState, useCallback } from 'react'
import Giscus from '@giscus/react'
import useTranslation from '@/hooks/useTranslation'
import { lightTheme, darkTheme } from '@/styles/giscus-theme'

const MessageBoard: React.FC = () => {
  const { t, locale } = useTranslation()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  
  // 更新 Giscus 主题的函数
  const updateGiscusTheme = useCallback((isDark: boolean) => {
    const theme = isDark ? darkTheme : lightTheme
    const message = {
      setConfig: {
        theme: JSON.stringify(theme),
        themeURL: ''
      }
    }
    
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    if (!iframe) return
    
    iframe.contentWindow?.postMessage({ giscus: message }, 'https://giscus.app')
  }, [])

  // 监听系统主题变化
  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      const isDark = e.matches
      setTheme(isDark ? 'dark' : 'light')
      updateGiscusTheme(isDark)
    }
    
    // 初始化主题
    setTheme(mediaQuery.matches ? 'dark' : 'light')
    updateGiscusTheme(mediaQuery.matches)
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [updateGiscusTheme])

  // 监听 iframe 加载完成
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return
      if (!(event.data?.giscus?.discussion)) return
      
      // iframe 加载完成后更新主题
      updateGiscusTheme(theme === 'dark')
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [theme, updateGiscusTheme])

  if (!mounted) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="prose dark:prose-dark max-w-none mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💭</span>
          <p className="text-gray-600 dark:text-gray-300 text-lg m-0">
            {t('messageBoardWelcome')}
          </p>
        </div>
      </div>
      <div className="giscus-wrapper rounded-lg overflow-hidden">
        <Giscus
          id="message-board"
          repo="Gloridust/ethanblog"
          repoId="R_kgDOMq1xtQ"
          category="Announcements"
          categoryId="DIC_kwDOMq1xtc4Cl-Tk"
          mapping="title"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="1"
          inputPosition="top"
          theme={JSON.stringify(theme === 'dark' ? darkTheme : lightTheme)}
          lang={locale === 'cn' ? 'cn-CN' : 'en'}
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default MessageBoard 