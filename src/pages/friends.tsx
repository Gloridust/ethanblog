import React from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Layout from '../components/Layout'
import useTranslation from '../hooks/useTranslation'

interface Friend {
  name: string
  avatar: string
  description: {
    cn: string
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
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 1rem' }}>

        <h1 style={{
          fontSize: 24,
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: '0.5rem',
        }}>
          {t('friendsTitle')}
        </h1>

        <div className="section-label" style={{ marginBottom: '1.5rem' }}>
          LINKS
        </div>

        <style jsx>{`
          .friends-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          @media (min-width: 640px) {
            .friends-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .friends-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}</style>

        <div className="friends-grid">
          {friends.map((friend) => (
            <a
              href={friend.link}
              key={friend.name}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift"
              style={{
                background: 'var(--glass-strong)',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--r-md)',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                flexShrink: 0,
                borderRadius: 'var(--r-sm)',
                overflow: 'hidden',
                position: 'relative',
                background: 'var(--bg-2)',
              }}>
                <Image
                  src={friend.avatar}
                  alt={friend.name}
                  fill
                  className="object-cover rounded-full"
                  sizes="48px"
                />
              </div>
              <div style={{ overflow: 'hidden', minWidth: 0 }}>
                <div style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {friend.name}
                </div>
                <div style={{
                  fontSize: 13,
                  color: 'var(--ink-3)',
                  lineHeight: 1.5,
                  marginTop: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {friend.description[locale as 'cn' | 'en']}
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const friends = [
    {
      "name": "Rene Wang",
      "avatar": "/images/friends/ReneWang.png",
      "description": {
        "cn": "全栈开发大佬，天才少年，...",
        "en": "Full-stack developer, genius, ..."
      },
      "link": "https://rene.wang"
    },
    {
      "name": "Charles Su",
      "avatar": "/images/friends/CharlesSu.jpg",
      "description": {
        "cn": "乐于折腾，擅长刷机、黑苹果...",
        "en": "Tech enthusiast, expert in custom ROMs, Hackintosh..."
      },
      "link": "https://charles.su"
    },
    {
      "name": "YGeeker",
      "avatar": "/images/friends/YGeeker.png",
      "description": {
        "cn": "创业公司，我在此担任联合创始人",
        "en": "Start-up company. I serve as a co-founder here."
      },
      "link": "https://ygeeker.com"
    },
    {
      "name": "endpage.net",
      "avatar": "https://www.endpage.net/logo.png",
      "description": {
        "cn": "AI Native 产品开发与软件技术服务商，我创办的公司",
        "en": "AI Native product development & software services, my company"
      },
      "link": "https://www.endpage.net"
    },
    {
      "name": "Apply links",
      "avatar": "/images/friends/github.ico",
      "description": {
        "cn": "点击此处申请友链",
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
