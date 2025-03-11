import { useEffect, useState, useCallback } from 'react'
import Giscus from '@giscus/react'
import useTranslation from '@/hooks/useTranslation'
import { lightTheme, darkTheme } from '@/styles/giscus-theme'

const Comments: React.FC = () => {
  const { t, locale } = useTranslation()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  
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

  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      const isDark = e.matches
      setTheme(isDark ? 'dark' : 'light')
      updateGiscusTheme(isDark)
    }
    
    setTheme(mediaQuery.matches ? 'dark' : 'light')
    updateGiscusTheme(mediaQuery.matches)
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [updateGiscusTheme])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return
      if (!(event.data?.giscus?.discussion)) return
      
      updateGiscusTheme(theme === 'dark')
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [theme, updateGiscusTheme])

  if (!mounted) return null

  return (
    <div className="mt-16 pt-8">
      <div className="prose dark:prose-dark max-w-none mb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">💬</span>
          <h2 className="text-xl font-semibold m-0">
            {t('comments')}
          </h2>
        </div>
      </div>
      <div className="giscus-wrapper rounded-lg overflow-hidden">
        <Giscus
          id="comments"
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
          lang={locale === 'cn' ? 'zh-CN' : 'en'}
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default Comments 