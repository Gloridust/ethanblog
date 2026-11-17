import Head from 'next/head'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Lang } from '@/lib/cv-data'

interface Props {
  page: 'resume' | 'portfolio'
  lang: Lang
  title: string
  description: string
  labels: { resume: string; portfolio: string }
  actions?: ReactNode
  banner?: ReactNode
  children: ReactNode
}

const SITE = 'https://isethan.me'

export default function CvLayout({ page, lang, title, description, labels, actions, banner, children }: Props) {
  const path = `/${page}`
  const locale = lang === 'en' ? 'en' : 'cn'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`${SITE}${lang === 'en' ? '/en' : ''}${path}`} />
        <link rel="alternate" hrefLang="zh" href={`${SITE}/cn${path}`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en${path}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <nav className="cv-nav">
        <div className="cv-nav-inner">
          <Link href="/" locale={locale} className="cv-brand" title={lang === 'en' ? 'Back to blog' : '返回博客'}>
            <span className="cv-brand-mark">E</span>
            <span>Ethan Zou</span>
          </Link>
          <div className="cv-seg" role="tablist">
            <Link href="/resume" locale={locale} className={page === 'resume' ? 'on' : ''} aria-current={page === 'resume' ? 'page' : undefined}>{labels.resume}</Link>
            <Link href="/portfolio" locale={locale} className={page === 'portfolio' ? 'on' : ''} aria-current={page === 'portfolio' ? 'page' : undefined}>{labels.portfolio}</Link>
          </div>
          <div className="cv-nav-right">
            <div className="cv-lang">
              <Link href={path} locale="cn" className={lang === 'zh' ? 'on' : ''}>中</Link>
              <Link href={path} locale="en" className={lang === 'en' ? 'on' : ''}>EN</Link>
            </div>
            {actions}
          </div>
        </div>
      </nav>
      {banner}

      <main className={banner ? 'cv-page has-banner' : 'cv-page'} lang={lang === 'en' ? 'en' : 'zh-CN'}>
        <div className="cv-wrap">{children}</div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        :root{
          --cv-bg:#fbfbfa;--cv-surface:#fff;--cv-sunken:#f3f3f1;
          --cv-line:#e7e6e3;--cv-line-soft:#efeeeb;
          --cv-ink:#111110;--cv-ink-2:#4a4a46;--cv-ink-3:#8a8984;
          --cv-accent:#2b59ff;--cv-accent-soft:rgba(43,89,255,.08);--cv-hot:#ff5b1f;
          --cv-sans:'Inter','Noto Sans SC',-apple-system,BlinkMacSystemFont,system-ui,sans-serif;
          --cv-mono:'JetBrains Mono','SF Mono',ui-monospace,monospace;
        }
        @media (prefers-color-scheme:dark){:root{
          --cv-bg:#0c0c0c;--cv-surface:#141414;--cv-sunken:#1b1b1b;
          --cv-line:#262626;--cv-line-soft:#1f1f1f;
          --cv-ink:#f2f2f0;--cv-ink-2:#b3b3ad;--cv-ink-3:#73736e;
          --cv-accent:#7c9bff;--cv-accent-soft:rgba(124,155,255,.12);
        }}
        body{background:var(--cv-bg)}
        .cv-page,.cv-nav{font-family:var(--cv-sans);color:var(--cv-ink);-webkit-font-smoothing:antialiased}
        .cv-page *,.cv-nav *{box-sizing:border-box}
        .cv-page{background:var(--cv-bg);min-height:100vh;font-size:15px;line-height:1.6}
        .cv-page a{color:inherit;text-decoration:none}
        .cv-page ::selection{background:var(--cv-accent);color:#fff}
        .cv-wrap{max-width:880px;margin:0 auto;padding:96px 24px 64px}
        .has-banner .cv-wrap{padding-top:124px}

        .cv-nav{position:fixed;inset:0 0 auto 0;z-index:100;background:color-mix(in srgb,var(--cv-bg) 82%,transparent);backdrop-filter:saturate(180%) blur(16px);-webkit-backdrop-filter:saturate(180%) blur(16px);border-bottom:1px solid var(--cv-line-soft)}
        .cv-nav-inner{max-width:880px;margin:0 auto;padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between;gap:12px}
        .cv-brand{display:flex;align-items:center;gap:8px;font-weight:600;font-size:14px;color:var(--cv-ink);text-decoration:none;white-space:nowrap}
        .cv-brand-mark{width:22px;height:22px;border-radius:6px;background:var(--cv-ink);color:var(--cv-bg);display:grid;place-items:center;font-size:12px;font-weight:800}
        .cv-seg{display:flex;padding:3px;border-radius:10px;background:var(--cv-sunken);border:1px solid var(--cv-line-soft)}
        .cv-seg a{padding:5px 14px;border-radius:7px;font-size:13px;font-weight:500;color:var(--cv-ink-3);text-decoration:none;transition:color .15s,background .15s}
        .cv-seg a:hover{color:var(--cv-ink)}
        .cv-seg a.on{background:var(--cv-surface);color:var(--cv-ink);box-shadow:0 1px 2px rgba(0,0,0,.06),0 0 0 1px var(--cv-line-soft)}
        .cv-nav-right{display:flex;align-items:center;gap:8px}
        .cv-lang{display:flex;font-family:var(--cv-mono);font-size:12px;border:1px solid var(--cv-line);border-radius:8px;overflow:hidden}
        .cv-lang a{padding:4px 9px;color:var(--cv-ink-3);text-decoration:none}
        .cv-lang a.on{background:var(--cv-ink);color:var(--cv-bg)}
        .cv-btn{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:8px;font:500 13px var(--cv-sans);cursor:pointer;border:1px solid var(--cv-line);background:var(--cv-surface);color:var(--cv-ink);white-space:nowrap}
        .cv-btn:hover{border-color:var(--cv-ink-3)}
        .cv-btn.primary{background:var(--cv-ink);color:var(--cv-bg);border-color:var(--cv-ink)}
        .cv-btn.ghost{border-color:transparent;background:none;color:var(--cv-ink-3);padding:0 8px}
        .cv-banner{position:fixed;top:56px;inset-inline:0;z-index:99;background:var(--cv-accent-soft);color:var(--cv-accent);font:500 12.5px var(--cv-sans);padding:7px 16px;text-align:center;backdrop-filter:blur(12px)}
        .cv-banner button{background:none;border:none;padding:0;color:inherit;font:inherit;font-weight:700;text-decoration:underline;cursor:pointer}

        /* shared type */
        .cv-eyebrow{font:500 12px var(--cv-mono);letter-spacing:.04em;text-transform:uppercase;color:var(--cv-ink-3)}
        .cv-h2{display:flex;align-items:baseline;gap:12px;margin:56px 0 18px;font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--cv-ink-3)}
        .cv-h2::after{content:'';flex:1;height:1px;background:var(--cv-line)}
        .cv-chips{display:flex;flex-wrap:wrap;gap:6px}
        .cv-chip{font:500 11.5px var(--cv-mono);color:var(--cv-ink-2);padding:3px 8px;border-radius:6px;background:var(--cv-sunken);border:1px solid var(--cv-line-soft)}
        .cv-metrics{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--cv-line);border-radius:14px;background:var(--cv-surface);overflow:hidden}
        .cv-metric{padding:16px 18px;border-left:1px solid var(--cv-line-soft)}
        .cv-metric:first-child{border-left:none}
        .cv-metric b{display:block;font-size:26px;font-weight:700;letter-spacing:-.03em;line-height:1.1}
        .cv-metric span{font-size:12.5px;color:var(--cv-ink-3)}

        @media (max-width:720px){
          .cv-wrap{padding:84px 16px 48px}
          .has-banner .cv-wrap{padding-top:112px}
          .cv-nav-inner{padding:0 16px}
          .cv-brand span:last-child{display:none}
          .cv-metrics{grid-template-columns:1fr 1fr}
          .cv-metric:nth-child(3){border-left:none}
          .cv-metric:nth-child(n+3){border-top:1px solid var(--cv-line-soft)}
          .cv-btn .cv-btn-label{display:none}
        }
        @media (max-width:420px){.cv-seg a{padding:5px 9px}}
      `}</style>
    </>
  )
}
