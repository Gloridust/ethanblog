import React from 'react'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-6xl flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="font-bold text-lg">Ethan Zou 的博客</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-gray-600">主页</Link></li>
            <li><Link href="/about" className="hover:text-gray-600">关于</Link></li>
            <li><Link href="/friends" className="hover:text-gray-600">友链</Link></li>
            <li>
              <select className="bg-white border rounded px-2 py-1">
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