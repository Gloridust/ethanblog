import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from '@/hooks/useTranslation'

const NAV_ITEMS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'friends', href: '/friends' },
] as const

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const { t, locale, setLocale } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    setIsMobileMenuOpen(false);
    setIsLanguageMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/') return router.pathname === '/'
    return router.pathname.startsWith(href)
  }

  return (
    <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-5xl transition-all duration-300 ${isScrolled ? 'top-2' : 'top-4'}`}>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-black/[0.03] dark:shadow-black/[0.15] rounded-full px-4 md:px-5 py-2 md:py-2.5 flex justify-between items-center border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-200">
        <Link href="/" className="flex items-center">
          <span className="font-bold text-base md:text-lg text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
            {t('blogTitle')}
          </span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden relative" ref={mobileMenuRef}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {isMobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 py-2 overflow-hidden">
              {NAV_ITEMS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className={`block px-4 py-2.5 text-sm transition-colors duration-150 ${
                    isActive(href)
                      ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 font-medium'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
              <div className="border-t border-gray-100 dark:border-gray-700 my-1.5 mx-3"></div>
              <button
                onClick={() => handleLanguageChange('cn')}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  locale === 'cn' ? 'text-blue-500 font-medium' : 'text-gray-700 dark:text-gray-200'
                } hover:bg-gray-50 dark:hover:bg-gray-700/50`}
              >
                中文
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  locale === 'en' ? 'text-blue-500 font-medium' : 'text-gray-700 dark:text-gray-200'
                } hover:bg-gray-50 dark:hover:bg-gray-700/50`}
              >
                English
              </button>
            </div>
          )}
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {/* Nav pills container */}
            <li className="flex items-center bg-gray-100/80 dark:bg-gray-700/50 rounded-full p-0.5 gap-0.5">
              {NAV_ITEMS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive(href)
                      ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-600/40'
                  }`}
                >
                  {isActive(href) && (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                  )}
                  <span className={isActive(href) ? 'ml-2' : ''}>{t(key)}</span>
                </Link>
              ))}
            </li>
            <li className="ml-2">
              <div className="relative" ref={languageMenuRef}>
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="bg-gray-100/80 dark:bg-gray-700/50 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 flex items-center gap-1 hover:bg-gray-200/80 dark:hover:bg-gray-600/50"
                >
                  <span>{t('language')}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-2 py-1.5 w-32 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 z-20 overflow-hidden">
                    <button
                      onClick={() => handleLanguageChange('cn')}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        locale === 'cn' ? 'text-blue-500 bg-blue-50/50 dark:bg-blue-900/20 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      中文
                    </button>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        locale === 'en' ? 'text-blue-500 bg-blue-50/50 dark:bg-blue-900/20 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      English
                    </button>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
