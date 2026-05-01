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
import MessageBoard from '@/components/MessageBoard'

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

/* ── Custom Slider Arrows ── */
const PrevArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute', left: 0, top: '50%',
        transform: 'translate(-50%, -50%)', zIndex: 10,
        width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--r-pill)',
        background: 'var(--glass-strong)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--glass-border)',
        color: 'var(--ink-2)',
        cursor: 'pointer',
        boxShadow: '0 2px 8px oklch(0% 0 0 / 0.08)',
        transition: 'transform 0.2s var(--ease-out)',
      }}
      aria-label="Previous"
    >
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      style={{
        position: 'absolute', right: 0, top: '50%',
        transform: 'translate(50%, -50%)', zIndex: 10,
        width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--r-pill)',
        background: 'var(--glass-strong)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--glass-border)',
        color: 'var(--ink-2)',
        cursor: 'pointer',
        boxShadow: '0 2px 8px oklch(0% 0 0 / 0.08)',
        transition: 'transform 0.2s var(--ease-out)',
      }}
      aria-label="Next"
    >
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}

/* ── Inline SVG icons ── */
const GitHubIcon = () => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--ink)' }}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const TelegramIcon = () => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--ink)' }}>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

/* ── Placeholder gradient cards for gallery fallback ── */
const placeholderColors = ['var(--warm-1)', 'var(--accent)', 'var(--warm-2)', 'var(--warm-3)']

export default function AboutPage({ socialStats }: AboutPageProps) {
  const { t, locale } = useTranslation()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

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
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 1.5 } }
    ]
  }

  const metadata = {
    title: t('aboutTitle'),
    description: t('bio'),
    keywords: 'Ethan Zou, blog, about, profile, developer, entrepreneur',
    image: '/images/avatar.png',
    type: 'profile' as const,
    locale: locale,
    author: 'Ethan Zou'
  }

  return (
    <Layout {...metadata}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 1rem' }}>

        {/* ════════ PROFILE CARD ════════ */}
        <div
          style={{
            background: 'var(--glass-strong)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--r-lg)',
            boxShadow: 'var(--glass-shadow)',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem', maxWidth: 600 }}>
            {/* Avatar with warm gradient ring */}
            <div style={{
              width: 96, height: 96, flexShrink: 0,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--warm-1), var(--warm-2), var(--accent))',
              padding: 3,
            }}>
              <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: 'var(--bg)' }}>
                <Image
                  src="/images/avatar.png"
                  alt="Ethan Zou"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>
                Ethan Zou{' '}
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink-3)', fontSize: 16 }}>
                  (Gloridust)
                </span>
              </h1>
              <p style={{ margin: '0.5rem 0 0', fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)' }}>
                {t('bio')}
              </p>
            </div>
          </div>
        </div>

        {/* ════════ PRESENCE ════════ */}
        <div className="section-label" style={{ marginTop: '3rem', marginBottom: '1.25rem' }}>
          PRESENCE
        </div>

        <style jsx>{`
          .social-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          @media (min-width: 480px) {
            .social-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}</style>

        <div className="social-grid">
          {/* X (Twitter) */}
          <a
            href="https://twitter.com/Gloridust1024"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift"
            style={{
              background: 'var(--glass-strong)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--r-md)',
              padding: '1rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 42, height: 42, flexShrink: 0,
              borderRadius: 'var(--r-sm)',
              overflow: 'hidden',
              background: 'var(--bg-2)',
            }}>
              <Image src="/images/social/X.jpg" alt="X" width={42} height={42} style={{ display: 'block' }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>X (Twitter)</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>@Gloridust1024</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>{socialStats.twitter} {t('followers')}</div>
            </div>
          </a>

          {/* Xiaohongshu */}
          <a
            href="https://xiaohongshu.com/user/profile/5f1d89a6000000000100ba01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift"
            style={{
              background: 'var(--glass-strong)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--r-md)',
              padding: '1rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 42, height: 42, flexShrink: 0,
              borderRadius: 'var(--r-sm)',
              overflow: 'hidden',
              background: 'var(--bg-2)',
            }}>
              <Image src="/images/social/Xiaohongshu.svg" alt="Xiaohongshu" width={42} height={42} style={{ display: 'block' }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>小红书</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>ID: 318730045</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>{socialStats.xiaohongshu} {t('followers')}</div>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Gloridust"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift"
            style={{
              background: 'var(--glass-strong)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--r-md)',
              padding: '1rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 42, height: 42, flexShrink: 0,
              borderRadius: 'var(--r-sm)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--bg-2)',
            }}>
              <GitHubIcon />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>GitHub</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>@Gloridust</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>320 stars</div>
            </div>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/isEthanZou"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift"
            style={{
              background: 'var(--glass-strong)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--r-md)',
              padding: '1rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 42, height: 42, flexShrink: 0,
              borderRadius: 'var(--r-sm)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--bg-2)',
            }}>
              <TelegramIcon />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Telegram</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>@isEthanZou</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>频道更新</div>
            </div>
          </a>
        </div>

        {/* ════════ JOURNEY / 时间线 ════════ */}
        <div className="section-label" style={{ marginTop: '3rem', marginBottom: '1.25rem' }}>
          JOURNEY &middot; 时间线
        </div>

        <div className="timeline">
          {/* 2026 */}
          <div className="tl-item">
            <div className="tl-year">2026</div>
            <div className="tl-title">AI 产品矩阵</div>
            <div className="tl-body">
              独立开发「摇盒AI」「TikMy」「油迹Pro」「<a href="https://www.endpage.net/product/augur/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Augur</a>」等 AI Native 应用。发起 Vibe Coding 实战训练营，带领团队用 AI 重新定义开发流程。
            </div>
            <div className="tl-tags">
              <span className="tl-tag">AI</span>
              <span className="tl-tag">Product</span>
              <span className="tl-tag">Leadership</span>
            </div>
          </div>

          {/* 2025 - AdventureX */}
          <div className="tl-item">
            <div className="tl-year">2025</div>
            <div className="tl-title">AdventureX 2025 · 带队夺冠</div>
            <div className="tl-body">
              作为队长带队参加 AdventureX 2025 黑客松，再次斩获一等奖。连续两年在 AdventureX 获得冠军。
            </div>
            <div className="tl-tags">
              <span className="tl-tag">Hackathon</span>
              <span className="tl-tag">Leader</span>
            </div>
          </div>

          {/* 2025 - Startup */}
          <div className="tl-item">
            <div className="tl-year">2025</div>
            <div className="tl-title">创办 endpage.net</div>
            <div className="tl-body">
              成立公司，定位 AI Native 产品开发与软件技术服务商。一边承接外包业务，一边打磨自研产品线。
            </div>
            <div className="tl-tags">
              <span className="tl-tag">Startup</span>
              <span className="tl-tag">AI</span>
            </div>
          </div>

          {/* 2024 - AdventureX */}
          <div className="tl-item">
            <div className="tl-year">2024</div>
            <div className="tl-title">AdventureX 2024 · 三赛道冠军</div>
            <div className="tl-body">
              做了 AI 产品 Dali &mdash; 一个替代 Apple Intelligence 的 App，在 AdventureX 黑客松拿下三个赛道的一等奖。
            </div>
            <div className="tl-tags">
              <span className="tl-tag">Hackathon</span>
              <span className="tl-tag">AI</span>
              <span className="tl-tag">SwiftUI</span>
            </div>
          </div>

          {/* 2023 */}
          <div className="tl-item">
            <div className="tl-year">2023</div>
            <div className="tl-title">联合创办 YGeeker · 开源之路</div>
            <div className="tl-body">
              高中到大一，联合创办 YGeeker，维护 Geekits 等开源项目。次年初正式成立公司。
            </div>
            <div className="tl-tags">
              <span className="tl-tag">Open Source</span>
              <span className="tl-tag">Startup</span>
              <span className="tl-tag">College</span>
            </div>
          </div>

          {/* High school */}
          <div className="tl-item">
            <div className="tl-year">2021·高中</div>
            <div className="tl-title">前端入门 · 黑苹果 · 手搓代码</div>
            <div className="tl-body">
              开始学习前端开发，手搓 HTML/CSS/JS 写页面。折腾黑苹果 Hackintosh，在 PC 上跑 macOS。从&quot;玩数码&quot;正式转向&quot;写代码&quot;。
            </div>
            <div className="tl-tags">
              <span className="tl-tag">Frontend</span>
              <span className="tl-tag">Hackintosh</span>
            </div>
          </div>

          {/* Junior high */}
          <div className="tl-item warm">
            <div className="tl-year">2018·初中</div>
            <div className="tl-title">Linux 运维 · 折腾装系统</div>
            <div className="tl-body">
              研究 Linux，给各种设备折腾装系统。在不断的 format &amp; reinstall 中理解了操作系统是怎么回事。
            </div>
            <div className="tl-tags">
              <span className="tl-tag">Linux</span>
              <span className="tl-tag">Ops</span>
            </div>
          </div>

          {/* Primary school - robotics */}
          <div className="tl-item">
            <div className="tl-year">2017·小学六年级</div>
            <div className="tl-title">机器人编程 · 四川省第二名</div>
            <div className="tl-body">
              参加机器人编程比赛，做红外寻道小车，拿到四川省第二名。第一次感受到&quot;做出来&quot;的成就感。
            </div>
            <div className="tl-tags">
              <span className="tl-tag">Robotics</span>
              <span className="tl-tag">Competition</span>
            </div>
          </div>

          {/* Primary school - first code */}
          <div className="tl-item">
            <div className="tl-year">2015·小学四年级</div>
            <div className="tl-title">第一次写代码</div>
            <div className="tl-body">
              学习易语言中文编程，虽然后来才知道它本质上是个 C 语言套壳。但那是真正意义上的&quot;第一行代码&quot;。
            </div>
            <div className="tl-tags">
              <span className="tl-tag">EPL</span>
              <span className="tl-tag">First Code</span>
            </div>
          </div>

          {/* Primary school - phone */}
          <div className="tl-item warm">
            <div className="tl-year">2014·小学三年级</div>
            <div className="tl-title">研究坏掉的三星手机</div>
            <div className="tl-body">
              拿到一台开不了机的三星 Galaxy S5660，开始研究刷机。从此走上数码圈不归路。
            </div>
            <div className="tl-tags">
              <span className="tl-tag">Android</span>
              <span className="tl-tag">Flash ROM</span>
            </div>
          </div>

          {/* 2004 */}
          <div className="tl-item muted">
            <div className="tl-year">2004</div>
            <div className="tl-title">出生于中国</div>
            <div className="tl-body">
              一个 04er。INFP。喜欢猫和雨天。
            </div>
          </div>
        </div>

        {/* ════════ ME / 一些瞬间 ════════ */}
        <div className="section-label" style={{ marginTop: '3rem', marginBottom: '1.25rem' }}>
          ME &middot; 一些瞬间
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {galleryData.map((row, rowIdx) => (
            <div key={rowIdx}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: '0.75rem' }}>
                {row.title}
              </h3>
              <div style={{ position: 'relative' }}>
                <Slider {...sliderSettings}>
                  {row.images.map((image, imgIdx) => {
                    const errKey = `${rowIdx}-${imgIdx}`
                    const hasError = imgErrors[errKey]

                    return (
                      <div key={imgIdx} style={{ padding: '0 4px' }}>
                        <div
                          onClick={() => !hasError && setSelectedImage(image)}
                          style={{
                            position: 'relative',
                            aspectRatio: '3/4',
                            borderRadius: 'var(--r-lg)',
                            overflow: 'hidden',
                            cursor: hasError ? 'default' : 'pointer',
                            transition: 'transform 0.3s var(--ease-out)',
                            margin: '0 4px',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                        >
                          {hasError ? (
                            /* Placeholder gradient */
                            <div style={{
                              width: '100%', height: '100%',
                              background: `linear-gradient(135deg, ${placeholderColors[imgIdx % 4]}, var(--bg-2))`,
                              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                              padding: '1rem',
                            }}>
                              <span style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>
                                photo
                              </span>
                            </div>
                          ) : (
                            <>
                              <Image
                                src={image}
                                alt={`${row.title} ${imgIdx + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 66vw, (max-width: 1024px) 33vw, 25vw"
                                onError={() => setImgErrors(prev => ({ ...prev, [errKey]: true }))}
                              />
                              {/* Warm gradient overlay at bottom */}
                              <div style={{
                                position: 'absolute', bottom: 0, left: 0, right: 0,
                                height: '40%',
                                background: 'linear-gradient(to top, oklch(20% 0.02 60 / 0.6), transparent)',
                                display: 'flex', alignItems: 'flex-end',
                                padding: '0.75rem',
                              }}>
                                <span style={{
                                  fontSize: 12, color: 'white', fontWeight: 500,
                                  textShadow: '0 1px 3px oklch(0% 0 0 / 0.4)',
                                }}>
                                  {row.title}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
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

        {/* ════════ MESSAGE BOARD ════════ */}
        <div style={{ marginTop: '3rem' }}>
          <div className="section-label" style={{ marginBottom: '1.25rem' }}>
            {t('leaveMessage')}
          </div>
          <MessageBoard />
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
    revalidate: 30
  }
}
