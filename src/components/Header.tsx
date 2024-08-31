import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [language, setLanguage] = useState('中文')

  return (
    <header className="bg-white shadow-md rounded-lg mx-4 my-2 px-4 py-2 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Ethan Zou 的博客
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/">主页</Link></li>
          <li><Link href="/about">关于</Link></li>
          <li><Link href="/friends">友链</Link></li>
          <li>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white border rounded px-2 py-1"
            >
              <option value="中文">中文</option>
              <option value="English">English</option>
            </select>
          </li>
        </ul>
      </nav>
    </header>
  )
}