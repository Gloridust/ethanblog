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
      <div
        className="px-4 md:px-5 py-2 md:py-2.5 flex justify-between items-center transition-colors duration-200"
        style={{
          background: 'var(--glass-strong)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
          borderRadius: 'var(--r-pill)',
        }}
      >
        <Link href="/" className="flex items-center">
          <span
            className="font-bold text-base md:text-lg transition-colors duration-200"
            style={{ color: 'var(--ink)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink)')}
          >
            {t('blogTitle')}
          </span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden relative" ref={mobileMenuRef}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg transition-colors duration-200"
            aria-label="Toggle menu"
            style={{ color: 'var(--ink-2)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {isMobileMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 py-2 overflow-hidden"
              style={{
                background: 'var(--glass-strong)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--glass-shadow)',
                borderRadius: 'var(--r-lg)',
              }}
            >
              {NAV_ITEMS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="block px-4 py-2.5 text-sm transition-colors duration-150"
                  style={{
                    color: isActive(href) ? '#fff' : 'var(--ink-2)',
                    background: isActive(href) ? 'var(--accent)' : 'transparent',
                    fontWeight: isActive(href) ? 500 : 400,
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {isActive(href) && (
                    <span
                      className="inline-block animate-pulse rounded-full mr-2"
                      style={{ width: 5, height: 5, background: '#fff', verticalAlign: 'middle' }}
                    />
                  )}
                  {t(key)}
                </Link>
              ))}
              <div style={{ borderTop: '1px solid var(--glass-border)', margin: '6px 12px' }} />
              <button
                onClick={() => handleLanguageChange('cn')}
                className="block w-full text-left px-4 py-2 text-sm"
                style={{
                  color: locale === 'cn' ? 'var(--accent)' : 'var(--ink-2)',
                  fontWeight: locale === 'cn' ? 500 : 400,
                }}
              >
                中文
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className="block w-full text-left px-4 py-2 text-sm"
                style={{
                  color: locale === 'en' ? 'var(--accent)' : 'var(--ink-2)',
                  fontWeight: locale === 'en' ? 500 : 400,
                }}
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
            <li
              className="flex items-center p-1 gap-0.5"
              style={{
                background: 'var(--bg-2)',
                borderRadius: 'var(--r-pill)',
                padding: 4,
                gap: 2,
              }}
            >
              {NAV_ITEMS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center"
                  style={{
                    background: isActive(href) ? 'var(--accent)' : 'transparent',
                    color: isActive(href) ? '#fff' : 'var(--ink-2)',
                    borderRadius: 'var(--r-pill)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(href)) e.currentTarget.style.color = 'var(--ink)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(href)) e.currentTarget.style.color = 'var(--ink-2)';
                  }}
                >
                  {isActive(href) && (
                    <span
                      className="animate-pulse rounded-full mr-1.5"
                      style={{ width: 5, height: 5, background: 'rgba(255,255,255,0.8)', flexShrink: 0 }}
                    />
                  )}
                  {t(key)}
                </Link>
              ))}
            </li>

            {/* Language dropdown */}
            <li className="ml-1">
              <div className="relative" ref={languageMenuRef}>
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="rounded-full px-3 py-1.5 text-sm focus:outline-none transition-all duration-200 flex items-center gap-1"
                  style={{ background: 'var(--bg-2)', color: 'var(--ink-2)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-2)')}
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
                  <div
                    className="absolute right-0 mt-2 py-1.5 w-32 z-20 overflow-hidden"
                    style={{
                      background: 'var(--glass-strong)',
                      backdropFilter: 'blur(24px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                      border: '1px solid var(--glass-border)',
                      boxShadow: 'var(--glass-shadow)',
                      borderRadius: 'var(--r-lg)',
                    }}
                  >
                    <button
                      onClick={() => handleLanguageChange('cn')}
                      className="block w-full text-left px-4 py-2 text-sm transition-colors"
                      style={{
                        color: locale === 'cn' ? 'var(--accent)' : 'var(--ink-2)',
                        fontWeight: locale === 'cn' ? 500 : 400,
                      }}
                    >
                      中文
                    </button>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className="block w-full text-left px-4 py-2 text-sm transition-colors"
                      style={{
                        color: locale === 'en' ? 'var(--accent)' : 'var(--ink-2)',
                        fontWeight: locale === 'en' ? 500 : 400,
                      }}
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
