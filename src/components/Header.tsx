import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from '@/hooks/useTranslation'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
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
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-5xl transition-all duration-300 ${isScrolled ? 'top-2' : 'top-4'}`}>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-full px-6 py-3 flex justify-between items-center transition-colors duration-200">
        <Link href="/" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="font-bold text-lg hidden md:inline dark:text-white">{t.blogTitle}</span>
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">{t.home}</Link></li>
            <li><Link href="/about" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">{t.about}</Link></li>
            <li><Link href="/friends" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">{t.friends}</Link></li>
            <li>
              <div className="relative" ref={languageDropdownRef}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                >
                  {t.language}
                </button>
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-xl z-20">
                    <a
                      href="#"
                      onClick={() => handleLanguageChange('zh')}
                      className={`block px-4 py-2 text-sm ${locale === 'zh' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                    >
                      中文
                    </a>
                    <a
                      href="#"
                      onClick={() => handleLanguageChange('en')}
                      className={`block px-4 py-2 text-sm ${locale === 'en' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                    >
                      English
                    </a>
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