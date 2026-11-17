import type { GetStaticProps } from 'next'
import CvLayout from '@/components/cv/CvLayout'
import { PORTFOLIO, localeToLang, type Lang, type Project } from '@/lib/cv-data'

type RepoStats = Record<string, { stars: number; forks: number }>

interface Props {
  lang: Lang
  stats: RepoStats
}

// Live star counts, refreshed at most once a day. Falls back to the static
// numbers in cv-data when GitHub is unreachable or rate-limited.
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const lang = localeToLang(locale)
  const repos = Array.from(new Set([...PORTFOLIO.zh.featured, ...PORTFOLIO.zh.more].map((p) => p.repo).filter(Boolean))) as string[]
  const stats: RepoStats = {}
  await Promise.all(
    repos.map(async (repo) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'isethan.me' },
          signal: AbortSignal.timeout(5000),
        })
        if (!res.ok) return
        const j = await res.json()
        stats[repo] = { stars: j.stargazers_count ?? 0, forks: j.forks_count ?? 0 }
      } catch {
        /* keep static fallback */
      }
    }),
  )
  return { props: { lang, stats }, revalidate: 86400 }
}

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : `${n}`)

function starLabel(p: Project, stats: RepoStats): string | null {
  const s = p.repo ? stats[p.repo] : undefined
  if (s && s.stars >= 20) return `★ ${fmt(s.stars)}`
  return p.stat ? `★ ${p.stat.replace(/\s*★$/, '')}` : null
}

export default function PortfolioPage({ lang, stats }: Props) {
  const c = PORTFOLIO[lang]
  const totalStars = Object.values(stats).reduce((a, s) => a + s.stars, 0)

  return (
    <CvLayout
      page="portfolio" lang={lang} labels={c.ui}
      title={`Ethan Zou · ${c.title}`}
      description={c.intro}
    >
      <header className="pf-head">
        <div className="cv-eyebrow">{c.title} · 2024 — 2026</div>
        <h1>{lang === 'en' ? <>I build AI products<br />people actually use.</> : <>做真正有人用的<br />AI 产品。</>}</h1>
        <p>{c.intro}</p>
        <div className="pf-stats">
          <span><b>{totalStars > 4000 ? fmt(totalStars) : '5k'}+</b>{lang === 'en' ? ' GitHub stars' : ' GitHub Stars'}</span>
          <span><b>760+</b>{lang === 'en' ? ' PRs merged at Hubitos' : ' Hubitos 已合并 PR'}</span>
          <span><b>2×</b>{lang === 'en' ? ' AdventureX 1st prize' : ' AdventureX 一等奖'}</span>
        </div>
      </header>

      <h2 className="cv-h2">{c.sections.featured}</h2>
      <div className="pf-featured">
        {c.featured.map((p) => {
          const s = p.repo ? stats[p.repo] : undefined
          return (
            <article className="pf-feat" key={p.id}>
              <a className="pf-shot" href={p.href} target="_blank" rel="noopener noreferrer">
                {p.image && <img src={p.image} alt={p.name} loading="lazy" />}
              </a>
              <div className="pf-feat-body">
                <div className="pf-meta">
                  <span>{p.kind}</span><span>{p.year}</span>
                </div>
                <h3><a href={p.href} target="_blank" rel="noopener noreferrer">{p.name}</a></h3>
                <div className="pf-numbers">
                  {starLabel(p, stats) && <span className="pf-star">{starLabel(p, stats)} <i>{c.ui.stars}</i></span>}
                  {s && s.forks >= 20 && <span className="pf-fork">{fmt(s.forks)} <i>{c.ui.forks}</i></span>}
                </div>
                <p className="pf-pitch">{p.pitch}</p>
                <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="cv-chips">{p.stack.map((x) => <span className="cv-chip" key={x}>{x}</span>)}</div>
              </div>
            </article>
          )
        })}
      </div>

      <h2 className="cv-h2">{c.sections.work}</h2>
      <div className="pf-work">
        {c.work.map((w) => (
          <a className="pf-work-card" key={w.org} href={w.href} target="_blank" rel="noopener noreferrer">
            <div className="pf-work-top"><b>{w.org}</b><span>{w.date}</span></div>
            <div className="pf-work-role">{w.role}</div>
            <p>{w.line}</p>
            <span className="pf-arrow">{w.href.replace(/^https?:\/\//, '')} ↗</span>
          </a>
        ))}
      </div>

      <h2 className="cv-h2">{c.sections.ai}</h2>
      <div className="pf-grid">
        {c.more.map((p) => (
          <a className="pf-card" key={p.id} href={p.href} target="_blank" rel="noopener noreferrer">
            {p.image
              ? <div className="pf-thumb"><img src={p.image} alt="" loading="lazy" /></div>
              : <div className="pf-thumb pf-thumb-empty"><span>{p.name}</span></div>}
            <div className="pf-card-body">
              <div className="pf-meta"><span>{p.kind}</span><span>{p.year}</span></div>
              <h3>{p.name}{starLabel(p, stats) && <span className="pf-star sm">{starLabel(p, stats)}</span>}</h3>
              <p>{p.pitch}</p>
              <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className="cv-chips">{p.stack.map((x) => <span className="cv-chip" key={x}>{x}</span>)}</div>
            </div>
          </a>
        ))}
      </div>

      <h2 className="cv-h2">{c.sections.apps}</h2>
      <div className="pf-apps">
        {c.apps.map((a) => (
          <div className="pf-app" key={a.name}>
            <img src={a.icon} alt="" />
            <div><b>{a.name}</b><span className="cv-chip">{a.platform}</span><p>{a.line}</p></div>
          </div>
        ))}
      </div>
      <p className="pf-note">{c.appsNote} <a href="https://www.endpage.net" target="_blank" rel="noopener noreferrer">endpage.net ↗</a></p>

      <h2 className="cv-h2">{c.sections.research}</h2>
      <div className="pf-papers">
        {c.research.map((p) => <div key={p.title}><b>{p.title}</b><span>{p.venue} · {p.note}</span></div>)}
      </div>

      <footer className="pf-foot">
        <a href="https://github.com/Gloridust" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://x.com/gloridust1024" target="_blank" rel="noopener noreferrer">X</a>
        <a href="https://isethan.me">Blog</a>
        <span>© 2026 Ethan Zou</span>
      </footer>

      <style jsx global>{`
        .pf-head{padding:24px 0 8px}
        .pf-head h1{margin:14px 0 16px;font-size:clamp(34px,6vw,56px);line-height:1.05;letter-spacing:-.045em;font-weight:750}
        .pf-head p{margin:0;max-width:620px;font-size:16px;color:var(--cv-ink-2);line-height:1.7}
        .pf-stats{display:flex;flex-wrap:wrap;gap:8px 24px;margin-top:22px;font-size:14px;color:var(--cv-ink-2)}
        .pf-stats b{color:var(--cv-ink);font-weight:700}

        .pf-featured{display:grid;gap:20px}
        .pf-feat{display:grid;grid-template-columns:1.15fr 1fr;border:1px solid var(--cv-line);border-radius:18px;overflow:hidden;background:var(--cv-surface)}
        .pf-shot{display:block;background:var(--cv-sunken);border-right:1px solid var(--cv-line-soft);min-height:260px;overflow:hidden}
        .pf-shot img{width:100%;height:100%;object-fit:cover;object-position:top left;display:block;transition:transform .4s}
        .pf-feat:hover .pf-shot img{transform:scale(1.02)}
        .pf-feat-body{padding:24px 24px 22px;display:flex;flex-direction:column;gap:10px}
        .pf-meta{display:flex;gap:10px;font:500 11.5px var(--cv-mono);color:var(--cv-ink-3);text-transform:uppercase;letter-spacing:.03em}
        .pf-meta span+span::before{content:'·';margin-right:10px}
        .pf-feat h3{margin:0;font-size:24px;letter-spacing:-.03em;font-weight:700}
        .pf-feat h3 a:hover{color:var(--cv-accent)}
        .pf-numbers{display:flex;gap:14px;font:600 14px var(--cv-mono)}
        .pf-numbers i{font-style:normal;font-weight:400;color:var(--cv-ink-3);font-size:12px}
        .pf-star{color:var(--cv-hot)}
        .pf-star.sm{font:600 12px var(--cv-mono);margin-left:8px}
        .pf-fork{color:var(--cv-ink-2)}
        .pf-pitch{margin:0;font-size:15px;line-height:1.65;color:var(--cv-ink)}
        .pf-feat ul,.pf-card ul{margin:0;padding-left:16px;display:grid;gap:5px}
        .pf-feat li{font-size:13.5px;color:var(--cv-ink-2);line-height:1.6}
        .pf-feat .cv-chips{margin-top:auto;padding-top:6px}

        .pf-work{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .pf-work-card{display:flex;flex-direction:column;gap:6px;padding:20px;border-radius:16px;border:1px solid var(--cv-line);background:var(--cv-surface);transition:border-color .15s,transform .15s}
        .pf-work-card:hover{border-color:var(--cv-ink-3);transform:translateY(-1px)}
        .pf-work-top{display:flex;justify-content:space-between;gap:12px;align-items:baseline}
        .pf-work-top b{font-size:18px;letter-spacing:-.02em}
        .pf-work-top span{font:12px var(--cv-mono);color:var(--cv-ink-3);white-space:nowrap}
        .pf-work-role{font-size:13px;font-weight:500;color:var(--cv-accent)}
        .pf-work-card p{margin:2px 0 0;font-size:13.5px;line-height:1.65;color:var(--cv-ink-2);flex:1}
        .pf-arrow{font:12px var(--cv-mono);color:var(--cv-ink-3)}

        .pf-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
        .pf-card{display:flex;flex-direction:column;border:1px solid var(--cv-line);border-radius:16px;overflow:hidden;background:var(--cv-surface);transition:border-color .15s,transform .15s}
        .pf-card:hover{border-color:var(--cv-ink-3);transform:translateY(-1px)}
        .pf-thumb{aspect-ratio:16/8;background:var(--cv-sunken);overflow:hidden;border-bottom:1px solid var(--cv-line-soft)}
        .pf-thumb img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
        .pf-thumb-empty{display:grid;place-items:center;background:
          radial-gradient(circle at 1px 1px,var(--cv-line) 1px,transparent 0) 0 0/14px 14px,var(--cv-sunken)}
        .pf-thumb-empty span{font:600 15px var(--cv-mono);color:var(--cv-ink-3);letter-spacing:-.01em}
        .pf-card-body{padding:16px 18px 18px;display:flex;flex-direction:column;gap:8px;flex:1}
        .pf-card h3{margin:0;font-size:17px;font-weight:650;letter-spacing:-.02em}
        .pf-card p{margin:0;font-size:13.5px;line-height:1.6;color:var(--cv-ink-2)}
        .pf-card li{font-size:12.5px;color:var(--cv-ink-3)}
        .pf-card .cv-chips{margin-top:auto;padding-top:4px}

        .pf-apps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        .pf-app{display:flex;gap:12px;padding:14px;border:1px solid var(--cv-line);border-radius:14px;background:var(--cv-surface)}
        .pf-app img{width:44px;height:44px;border-radius:11px;object-fit:cover;flex-shrink:0}
        .pf-app b{font-size:14.5px;margin-right:6px}
        .pf-app .cv-chip{font-size:10.5px;padding:1px 6px}
        .pf-app p{margin:4px 0 0;font-size:12.5px;color:var(--cv-ink-2);line-height:1.5}
        .pf-note{margin:10px 0 0;font-size:12.5px;color:var(--cv-ink-3)}
        .pf-note a:hover{color:var(--cv-accent)}

        .pf-papers{display:grid;gap:12px}
        .pf-papers div{display:grid;gap:3px}
        .pf-papers b{font-size:14px;font-weight:600}
        .pf-papers span{font-size:12.5px;color:var(--cv-ink-3)}

        .pf-foot{margin-top:64px;padding-top:20px;border-top:1px solid var(--cv-line);display:flex;flex-wrap:wrap;gap:18px;font-size:13px;color:var(--cv-ink-3)}
        .pf-foot a:hover{color:var(--cv-ink)}
        .pf-foot span{margin-left:auto}

        @media (max-width:760px){
          .pf-feat{grid-template-columns:1fr}
          .pf-shot{border-right:none;border-bottom:1px solid var(--cv-line-soft);min-height:0;aspect-ratio:16/10}
          .pf-work,.pf-grid,.pf-apps{grid-template-columns:1fr}
          .pf-foot span{margin-left:0}
        }
      `}</style>
    </CvLayout>
  )
}
