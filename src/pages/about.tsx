import { GetStaticProps } from 'next'
import Image from 'next/image'
import Slider from 'react-slick'
import Layout from '@/components/Layout'
import useTranslation from '@/hooks/useTranslation'
import { getSocialStats } from '@/lib/social'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ImagePreview from '@/components/ImagePreview'
import { useState } from 'react'

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

interface GalleryRow {
  title: string
  images: string[]
}

const galleryData: GalleryRow[] = [
  {
    title: "Me",
    images: [
      "/images/gallery/me/1.jpg",
      "/images/gallery/me/2.jpg",
      "/images/gallery/me/3.jpg",
      "/images/gallery/me/4.jpg"
    ]
  },
  {
    title: "AdventureX 2024",
    images: [
      "/images/gallery/advx2024/advx.jpg",
      "/images/gallery/advx2024/advx-0.jpg",
      "/images/gallery/advx2024/advx-1.jpg",
      "/images/gallery/advx2024/advx-2.jpg"
    ]
  }
]

// 添加自定义箭头组件
const PrevArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none"
      aria-label="Previous"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  )
}

const NextArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none"
      aria-label="Next"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}

export default function AboutPage({ socialStats }: AboutPageProps) {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    useCSS: true,
    useTransform: true,
    waitForAnimate: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
        }
      }
    ]
  }

  return (
    <Layout title={t('aboutTitle')}>
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-center min-h-[200px]">
          <div className="flex flex-col md:flex-row items-center gap-6 max-w-2xl">
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

        {/* Photo Gallery */}
        <div className="space-y-8">
          {galleryData.map((row, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {row.title}
              </h2>
              <div className="relative" 
                  onWheel={(e) => {
                    e.preventDefault()
                    const slider = e.currentTarget.querySelector('.slick-slider');
                    if (slider) {
                      if (e.deltaX > 0 || e.deltaY > 0) {
                        (slider as any).slick?.slickNext();
                      } else {
                        (slider as any).slick?.slickPrev();
                      }
                    }
                  }}
              >
                <Slider {...sliderSettings}>
                  {row.images.map((image, imageIndex) => (
                    <div key={imageIndex} className="px-1">
                      <div 
                        className="aspect-w-1 aspect-h-1 cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => setSelectedImage(image)}
                      >
                        <Image
                          src={image}
                          alt={`Gallery image ${imageIndex + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          ))}
        </div>

        {/* Image Preview Modal */}
        {selectedImage && (
          <ImagePreview
            src={selectedImage}
            alt="Preview"
            onClose={() => setSelectedImage(null)}
          />
        )}
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