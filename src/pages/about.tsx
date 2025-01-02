import { GetStaticProps } from 'next'
import Image from 'next/image'
import Layout from '@/components/Layout'
import useTranslation from '@/hooks/useTranslation'
import { getSocialStats } from '@/lib/social'

interface SocialPlatform {
  name: string
  username: string
  followers: string
  icon: string
  link: string
}

interface AboutPageProps {
  socialStats: {
    twitter: string
    xiaohongshu: string
  }
}

export default function AboutPage({ socialStats }: AboutPageProps) {
  const { t } = useTranslation()

  const socialPlatforms: SocialPlatform[] = [
    {
      name: 'X (Twitter)',
      username: '@Gloridust1024',
      followers: socialStats.twitter,
      icon: '/images/social/X.jpg',
      link: 'https://twitter.com/Gloridust1024'
    },
    {
      name: '小红书',
      username: 'ID: 318730045',
      followers: socialStats.xiaohongshu,
      icon: '/images/social/Xiaohongshu.svg',
      link: 'https://xiaohongshu.com/user/profile/5f1d89a6000000000100ba01'
    }
  ]

  return (
    <Layout title={t('aboutTitle')}>
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src="/images/avatar.png"
                alt={t('name')}
                layout="fill"
                className="rounded-full"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {t('name')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-center md:text-left">
                {t('bio')}
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {socialPlatforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={platform.icon}
                    alt={platform.name}
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {platform.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {platform.username}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {platform.followers} {t('followers')}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const socialStats = await getSocialStats()
  
  return {
    props: {
      socialStats
    },
    // 新生成页面以更新粉丝数
    revalidate: 30
  }
}