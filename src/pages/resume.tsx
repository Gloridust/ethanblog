import { useState } from 'react'
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'
import CvLayout from '@/components/cv/CvLayout'
import { verifyToken, COOKIE_NAME } from '@/lib/resume-auth'
import { RESUME, getResumeContact, localeToLang, type Contact, type Lang } from '@/lib/cv-data'

interface Props {
  authenticated: boolean
  contact: Contact
  lang: Lang
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const secret = process.env.RESUME_PASSWORD || ''
  const token = ctx.req.cookies[COOKIE_NAME] || ''
  const authenticated = !!secret && !!token && verifyToken(token, secret)
  return { props: { authenticated, contact: getResumeContact(authenticated), lang: localeToLang(ctx.locale) } }
}

export default function ResumePage({ authenticated, contact, lang }: Props) {
  const c = RESUME[lang]
  const router = useRouter()
  const [dialog, setDialog] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const unlock = async () => {
    setErr(''); setBusy(true)
    try {
      const res = await fetch('/api/resume-auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) })
      if (res.ok) router.replace(router.asPath)
      else setErr(c.ui.pwWrong)
      if (res.ok) setDialog(false)
    } catch { setErr(c.ui.pwNet) } finally { setBusy(false) }
  }
  const lock = async () => { await fetch('/api/resume-auth', { method: 'DELETE' }); router.replace(router.asPath) }

  const name = contact.name[lang]
  const otherName = lang === 'zh' ? contact.name.en : null

  const actions = authenticated ? (
    <>
      <button className="cv-btn ghost" onClick={lock} title={c.ui.lock} aria-label={c.ui.lock}><LockIcon /></button>
      <button className="cv-btn primary" onClick={() => window.print()}><DownloadIcon /><span className="cv-btn-label">{c.ui.pdf}</span></button>
    </>
  ) : (
    <button className="cv-btn" onClick={() => setDialog(true)}><LockIcon /><span className="cv-btn-label">{c.ui.unlock}</span></button>
  )

  const banner = !authenticated ? (
    <div className="cv-banner">{c.ui.locked}<button onClick={() => setDialog(true)}>{c.ui.enterPw}</button></div>
  ) : null

  return (
    <CvLayout
      page="resume" lang={lang} labels={c.ui}
      title={`${authenticated ? `${contact.name.zh} ${contact.name.en}` : 'Ethan Zou'} · ${lang === 'en' ? 'Resume' : '简历'}`}
      description={c.tagline}
      actions={actions} banner={banner}
    >
      <header className="rs-head">
        <div className="rs-id">
          <img src="https://www.endpage.net/ethan.png" alt="" className="rs-avatar" />
          <div>
            <h1 className="rs-name">{name}{otherName && <span>{otherName}</span>}</h1>
            <p className="rs-title">{c.title}</p>
          </div>
        </div>
        <ul className="rs-contact">
          <li><Ico d="phone" />{contact.phone}</li>
          <li><Ico d="mail" /><a href={contact.emailHref}>{contact.email}</a></li>
          <li><Ico d="gh" /><a href={contact.githubHref} target="_blank" rel="noopener noreferrer">{contact.github}</a></li>
          {contact.links.map((l) => <li key={l.href}><Ico d="web" /><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a></li>)}
        </ul>
      </header>

      <p className="rs-summary">{c.summary}</p>

      <div className="cv-metrics rs-metrics">
        {c.metrics.map((m) => <div className="cv-metric" key={m.label}><b>{m.value}</b><span>{m.label}</span></div>)}
      </div>

      <h2 className="cv-h2">{c.sections.experience}</h2>
      {c.jobs.map((j) => {
        const legal = j.orgKey === 'endpage' ? contact.endpageLegal[lang] : null
        return (
          <article className="rs-job" key={j.org}>
            <div className="rs-job-head">
              <div>
                <h3>{j.href ? <a href={j.href} target="_blank" rel="noopener noreferrer">{j.org}</a> : j.org}<span className="rs-role">{j.role}</span></h3>
                {legal && <div className="rs-legal">{legal}</div>}
              </div>
              <div className="rs-when">{j.date}<span>{j.place}</span></div>
            </div>
            <p className="rs-job-sum">{j.summary}</p>
            {j.bullets.length > 0 && <ul className="rs-bullets">{j.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            {j.stack.length > 0 && <div className="cv-chips">{j.stack.map((s) => <span className="cv-chip" key={s}>{s}</span>)}</div>}
          </article>
        )
      })}

      <h2 className="cv-h2">{c.sections.opensource}</h2>
      <ul className="rs-os">
        {c.openSource.map((o) => (
          <li key={o.name}>
            <a href={o.href} target="_blank" rel="noopener noreferrer" className="rs-os-name">{o.name}</a>
            {o.stars && <span className="rs-star">★ {o.stars}</span>}
            <span className="rs-os-line">{o.line}</span>
          </li>
        ))}
      </ul>
      <p className="rs-note">{c.contributions}</p>

      <h2 className="cv-h2">{c.sections.skills}</h2>
      <dl className="rs-skills">
        {c.skills.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.items}</dd></div>)}
      </dl>

      <div className="rs-two">
        <section>
          <h2 className="cv-h2">{c.sections.education}</h2>
          <div className="rs-edu">
            <b>{contact.school[lang]}</b>
            <span>{c.education.degree}</span>
            <span className="rs-mono">{c.education.date}</span>
          </div>
          <h2 className="cv-h2">{c.sections.research}</h2>
          {c.papers.map((p) => (
            <div className="rs-paper" key={p.title}><b>{p.title}</b><span>{p.venue} · {p.note}</span></div>
          ))}
          <p className="rs-note">{c.ipNote}</p>
        </section>
        <section>
          <h2 className="cv-h2">{c.sections.awards}</h2>
          <ul className="rs-awards">
            {c.awards.map((a) => <li key={a.year + a.name}><span className="rs-mono">{a.year}</span><span>{a.name}</span><em>{a.badge}</em></li>)}
          </ul>
          <p className="rs-note">{c.awardsMore}</p>
        </section>
      </div>

      {dialog && (
        <div className="rs-overlay" onClick={() => setDialog(false)}>
          <form className="rs-dialog" onClick={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); unlock() }}>
            <h3>{c.ui.pwTitle}</h3>
            <p>{c.ui.pwDesc}</p>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder={c.ui.pwPlaceholder} autoFocus />
            {err && <div className="rs-err">{err}</div>}
            <button type="submit" className="cv-btn primary" disabled={busy}>{busy ? c.ui.pwChecking : c.ui.unlock}</button>
          </form>
        </div>
      )}

      <style jsx global>{`
        .rs-head{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap;align-items:flex-start}
        .rs-id{display:flex;gap:16px;align-items:center}
        .rs-avatar{width:64px;height:64px;border-radius:16px;object-fit:cover;border:1px solid var(--cv-line)}
        .rs-name{margin:0;font-size:34px;font-weight:700;letter-spacing:-.035em;line-height:1.1}
        .rs-name span{margin-left:10px;font-size:18px;font-weight:500;color:var(--cv-ink-3);letter-spacing:-.01em}
        .rs-title{margin:6px 0 0;font-size:15px;color:var(--cv-ink-2);font-weight:500}
        .rs-contact{list-style:none;margin:0;padding:0;display:grid;gap:4px;font-size:13px;color:var(--cv-ink-2)}
        .rs-contact li{display:flex;align-items:center;gap:8px}
        .rs-contact a:hover{color:var(--cv-accent)}
        .rs-ico{width:14px;height:14px;flex-shrink:0;color:var(--cv-ink-3)}
        .rs-summary{margin:28px 0 20px;font-size:15.5px;line-height:1.75;color:var(--cv-ink-2);max-width:760px}
        .rs-metrics{margin-bottom:8px}

        .rs-job{padding:20px 0;border-bottom:1px solid var(--cv-line-soft)}
        .rs-job:last-of-type{border-bottom:none}
        .rs-job-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}
        .rs-job h3{margin:0;font-size:17px;font-weight:650;letter-spacing:-.015em;display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px}
        .rs-job h3 a:hover{color:var(--cv-accent)}
        .rs-role{font-size:14px;font-weight:500;color:var(--cv-accent)}
        .rs-legal{font-size:12px;color:var(--cv-ink-3);margin-top:2px}
        .rs-when{font:500 12.5px var(--cv-mono);color:var(--cv-ink-2);text-align:right;white-space:nowrap}
        .rs-when span{display:block;color:var(--cv-ink-3);font-size:12px}
        .rs-job-sum{margin:8px 0 0;color:var(--cv-ink-2);font-size:14px}
        .rs-bullets{margin:10px 0 12px;padding-left:18px;display:grid;gap:6px}
        .rs-bullets li{font-size:14px;line-height:1.7;color:var(--cv-ink)}
        .rs-bullets li::marker{color:var(--cv-ink-3)}
        .rs-job .cv-chips{margin-top:12px}

        .rs-os{list-style:none;margin:0;padding:0;display:grid;gap:12px}
        .rs-os li{display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:baseline}
        .rs-os-name{font-weight:650;font-size:15px}
        .rs-os-name:hover{color:var(--cv-accent)}
        .rs-star{font:600 12px var(--cv-mono);color:var(--cv-hot)}
        .rs-os-line{grid-column:1/-1;font-size:13.5px;color:var(--cv-ink-2)}
        .rs-note{margin:12px 0 0;font-size:13px;color:var(--cv-ink-3)}

        .rs-skills{margin:0;display:grid;gap:10px}
        .rs-skills div{display:grid;grid-template-columns:140px 1fr;gap:16px}
        .rs-skills dt{font-weight:600;font-size:13.5px}
        .rs-skills dd{margin:0;font-size:13.5px;color:var(--cv-ink-2)}

        .rs-two{display:grid;grid-template-columns:1fr 1fr;gap:40px}
        .rs-edu{display:grid;gap:2px;font-size:14px}
        .rs-edu span{color:var(--cv-ink-2)}
        .rs-mono{font-family:var(--cv-mono);font-size:12px;color:var(--cv-ink-3)}
        .rs-paper{display:grid;gap:3px;margin-bottom:12px}
        .rs-paper b{font-size:13.5px;font-weight:600;line-height:1.45}
        .rs-paper span{font-size:12.5px;color:var(--cv-ink-3)}
        .rs-awards{list-style:none;margin:0;padding:0}
        .rs-awards li{display:grid;grid-template-columns:40px 1fr auto;gap:10px;padding:7px 0;border-bottom:1px solid var(--cv-line-soft);font-size:13.5px;align-items:baseline}
        .rs-awards em{font-style:normal;font-size:12px;font-weight:600;color:var(--cv-accent);white-space:nowrap}

        .rs-overlay{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.35);backdrop-filter:blur(4px);display:grid;place-items:center;padding:16px}
        .rs-dialog{width:100%;max-width:360px;background:var(--cv-surface);border:1px solid var(--cv-line);border-radius:16px;padding:24px;display:grid;gap:10px;box-shadow:0 24px 60px rgba(0,0,0,.18)}
        .rs-dialog h3{margin:0;font-size:17px}
        .rs-dialog p{margin:0;font-size:13px;color:var(--cv-ink-2)}
        .rs-dialog input{height:38px;padding:0 12px;border-radius:9px;border:1px solid var(--cv-line);background:var(--cv-sunken);color:var(--cv-ink);font:14px var(--cv-sans);outline:none}
        .rs-dialog input:focus{border-color:var(--cv-accent)}
        .rs-dialog .cv-btn{height:38px;justify-content:center}
        .rs-err{color:#e5484d;font-size:12.5px}

        @media (max-width:720px){
          .rs-name{font-size:28px}
          .rs-name span{display:block;margin:2px 0 0;font-size:15px}
          .rs-job-head{flex-direction:column;gap:4px}
          .rs-when{text-align:left}.rs-when span{display:inline;margin-left:8px}
          .rs-skills div{grid-template-columns:1fr;gap:2px}
          .rs-two{grid-template-columns:1fr;gap:0}
        }

        @media print{
          @page{size:A4;margin:12mm 13mm}
          :root{--cv-bg:#fff!important;--cv-surface:#fff!important;--cv-sunken:#f4f4f2!important;--cv-line:#e2e1de!important;--cv-line-soft:#ecebe8!important;--cv-ink:#111!important;--cv-ink-2:#3d3d3a!important;--cv-ink-3:#7a7974!important;--cv-accent:#2b59ff!important;color-scheme:light}
          html{font-size:10px}
          body,.cv-page{background:#fff!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
          .cv-nav,.cv-banner,.rs-overlay{display:none!important}
          .cv-page{font-size:10.5px;min-height:0}
          .cv-wrap{max-width:none;padding:0}
          .rs-avatar{width:48px;height:48px;border-radius:12px}
          .rs-name{font-size:24px}.rs-name span{font-size:14px}
          .rs-title{font-size:12px;margin-top:3px}
          .rs-contact{font-size:10px;gap:2px}
          .rs-summary{margin:12px 0 10px;font-size:11px;line-height:1.6}
          .cv-metric{padding:8px 12px}.cv-metric b{font-size:17px}.cv-metric span{font-size:9.5px}
          .cv-h2{margin:16px 0 6px;font-size:10px}
          .rs-job{padding:8px 0;break-inside:avoid}
          .rs-job h3{font-size:13px}.rs-role{font-size:11px}.rs-legal{font-size:9.5px}
          .rs-when{font-size:9.5px}.rs-when span{font-size:9.5px}
          .rs-job-sum{font-size:10.5px;margin-top:3px}
          .rs-bullets{margin:5px 0 6px;gap:2px}.rs-bullets li{font-size:10.5px;line-height:1.55}
          .rs-job .cv-chips{margin-top:5px}.cv-chip{font-size:8.5px;padding:1px 5px}
          .rs-os{gap:5px}.rs-os-name{font-size:11.5px}.rs-star{font-size:9.5px}.rs-os-line{font-size:10.5px}
          .rs-note{font-size:9.5px;margin-top:5px}
          .rs-skills{gap:4px}.rs-skills div{grid-template-columns:96px 1fr}.rs-skills dt,.rs-skills dd{font-size:10.5px}
          .rs-two{gap:24px;break-inside:avoid}
          .rs-edu{font-size:10.5px}.rs-paper{margin-bottom:5px}.rs-paper b{font-size:10.5px}.rs-paper span{font-size:9.5px}
          .rs-awards li{font-size:10.5px;padding:3px 0;grid-template-columns:30px 1fr auto}.rs-awards em{font-size:9.5px}
          a{color:inherit!important}
        }
      `}</style>
    </CvLayout>
  )
}

function Ico({ d }: { d: 'phone' | 'mail' | 'gh' | 'web' }) {
  const p = {
    phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 16.92z" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></>,
    gh: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.4 3.4 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.4 13.4 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.4 3.4 0 009 18.13V22" />,
    web: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></>,
  }[d]
  return <svg className="rs-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{p}</svg>
}
function LockIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
}
function DownloadIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" /></svg>
}
