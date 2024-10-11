import React from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Layout from '../components/Layout'
import useTranslation from '../hooks/useTranslation'

interface Friend {
  name: string
  avatar: string
  description: {
    zh: string
    en: string
  }
  link: string
}

interface FriendsProps {
  friends: Friend[]
}

const Friends: React.FC<FriendsProps> = ({ friends }) => {
  const { t, locale } = useTranslation()

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">{t('friendsTitle')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {friends.map((friend) => (
          <a href={friend.link} key={friend.name} target="_blank" rel="noopener noreferrer" className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center h-32">
              <div className="w-20 h-20 relative flex-shrink-0 mr-4">
                <Image 
                  src={friend.avatar} 
                  alt={friend.name} 
                  layout="fill" 
                  className="rounded-full"
                  objectFit="cover"
                />
              </div>
              <div className="overflow-hidden">
                <h2 className="text-xl font-semibold mb-1 truncate">{friend.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {friend.description[locale as 'zh' | 'en']}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const friends = 
  [
    {
      "name": "Rene Wang",
      "avatar": "/images/friends/ReneWang.png",
      "description": {
        "zh": "全栈开发大佬，天才少年，...",
        "en": "Full-stack developer, genius, ..."
      },
      "link": "https://rene.wang"
    },
    {
      "name": "Charles Su",
      "avatar": "/images/friends/CharlesSu.jpg",
      "description": {
        "zh": "乐于折腾，擅长刷机、黑苹果...",
        "en": "Tech enthusiast, expert in custom ROMs, Hackintosh..."
      },
      "link": "https://charles.su"
    },
    {
      "name": "YGeeker",
      "avatar": "/images/friends/YGeeker.png",
      "description": {
        "zh": "创业公司，我在此担任联合创始人",
        "en": "Start-up company. I serve as a co-founder here."
      },
      "link": "https://ygeeker.com"
    },
    {
      "name": "Apply links",
      "avatar": "/images/friends/github.ico",
      "description": {
        "zh": "点击此处申请友链",
        "en": "Click here to apply friend-links"
      },
      "link": "https://github.com/Gloridust/ethanblog/issues/1"
    }
  ]

  return {
    props: {
      friends,
    },
  }
}

export default Friends