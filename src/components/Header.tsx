import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import useTranslation from '../hooks/useTranslation'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, locale, setLocale } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <select 
                className="bg-gray-100 dark:bg-gray-700 border-none rounded-full px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
              >
                <option value="zh">中文</option>
                <option value="en">English</option>
              </select>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header