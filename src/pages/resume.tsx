import { useEffect, useState, useCallback, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SECTIONS = [
  { id: 'experience', label: '经历' },
  { id: 'skills', label: '技术' },
  { id: 'awards', label: '荣誉' },
  { id: 'projects', label: '项目' },
  { id: 'academic', label: '学术' },
  { id: 'ip', label: '知识产权' },
]

const ResumePage = () => {
  const [activeSection, setActiveSection] = useState('')
  const router = useRouter()
  const ticking = useRef(false)
  const cachedOffsets = useRef<{ id: string; top: number }[]>([])

  // Cache section offsets, recalculate on resize
  useEffect(() => {
    const cacheOffsets = () => {
      cachedOffsets.current = SECTIONS.map(({ id }) => {
        const el = document.getElementById(id)
        return { id, top: el ? el.offsetTop : 0 }
      })
    }
    cacheOffsets()
    window.addEventListener('resize', cacheOffsets)
    return () => window.removeEventListener('resize', cacheOffsets)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY + 100
        let current = ''
        for (const { id, top } of cachedOffsets.current) {
          if (top <= y) current = id
        }
        setActiveSection(current)
        ticking.current = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDownloadPDF = useCallback(() => { window.print() }, [])

  const siteUrl = 'https://isethan.me'
  const canonicalUrl = `${siteUrl}${router.asPath}`

  return (
    <>
      <Head>
        <title>邹怡翔 Ethan Zou - Resume</title>
        <meta name="description" content="邹怡翔 Ethan Zou 的个人简历 - AI Native 全栈开发者，独立创业者" />
        <meta name="keywords" content="Ethan Zou, 邹怡翔, resume, 简历, developer, AI Native" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="邹怡翔 Ethan Zou - Resume" />
        <meta property="og:description" content="AI Native 全栈开发者，独立创业者" />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* Sticky Nav */}
      <nav className="rv-nav">
        <div className="rv-nav-inner">
          <div className="rv-nav-left">
            <Link href="/" className="rv-back-btn" title="返回主站">
              <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="rv-nav-brand">
              <img src="https://www.endpage.net/logo.png" alt="" style={{ width: 20, height: 20, borderRadius: 4 }} />
              Ethan<span style={{ color: 'var(--rv-accent)' }}>.</span>
            </div>
          </div>
          <div className="rv-nav-pills">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`rv-pill ${activeSection === id ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                {activeSection === id && <span className="rv-pill-dot" />}
                {label}
              </a>
            ))}
          </div>
          <button onClick={handleDownloadPDF} className="rv-download-btn">
            <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            PDF
          </button>
        </div>
      </nav>

      <div className="rv-page">
        <div className="rv-container">
          {/* Hero */}
          <header className="rv-hero" id="top">
            <div className="rv-hero-row">
              <div className="rv-hero-main">
                <img src="https://www.endpage.net/ethan.png" alt="Ethan Zou" style={{ width: 68, height: 68, borderRadius: 12, objectFit: 'cover', border: '2px solid var(--rv-border)', flexShrink: 0 }} />
                <div className="rv-hero-info">
                  <div className="rv-hero-label"><span className="rv-dot" />Open to Opportunities</div>
                  <h1 className="rv-h1">邹怡翔 <span className="rv-en">Ethan Zou</span></h1>
                  <p className="rv-hero-desc">AI Native 全栈开发者，独立创业者。2004 年生，宜宾学院数据科学与大数据技术专业 2023 级在读。2025 年创办 endpage.net，专注于将 AI 能力深度融入产品设计与工程实践，学术研究和竞赛领域持续输出。</p>
                </div>
              </div>
              <div className="rv-contact-card">
                <CItem icon="phone">18428389622</CItem>
                <CItem icon="mail"><a href="mailto:ethan@endpage.net">ethan@endpage.net</a></CItem>
                <CItem icon="github"><a href="https://github.com/Gloridust" target="_blank" rel="noopener noreferrer">github.com/Gloridust</a></CItem>
                <CItem icon="web"><a href="https://isethan.me" target="_blank" rel="noopener noreferrer">isethan.me</a>&nbsp;·&nbsp;<a href="https://www.endpage.net" target="_blank" rel="noopener noreferrer">endpage.net</a></CItem>
              </div>
            </div>
          </header>

          {/* Experience */}
          <Sec id="experience" icon="🚀" title="创业与工作经历">
            <div className="rv-exp-card">
              <div className="rv-exp-head">
                <div><div className="rv-exp-title"><a href="https://www.endpage.net" target="_blank" rel="noopener noreferrer">宜宾熵析云枢网络科技有限责任公司（endpage.net）</a></div><div className="rv-exp-role">联合创始人 &amp; CTO</div></div>
                <span className="rv-exp-date">2025.06 — 至今</span>
              </div>
              <p>2025 年 6 月创办 endpage.net，定位 AI Native 产品开发与软件技术服务商。7 月起承接外包业务，先后交付糕三家连锁店无人售货系统、某企业股东投票系统、某高校校园跑管理平台等商业项目。2026 年初布局自研产品线，上线「摇盒AI」「TikMy」「油迹Pro」三款 AI Native 应用及校企共创项目「宜乐生活」。</p>
              <p>2026 年 3 月发起面向宜宾学院的 Vibe Coding 实战训练营，招募并培训校园实习生，以 AI 辅助编程为核心进行岗前培训，学员结业后直接加入公司参与企业级开发，实现产教融合闭环。</p>
              <div className="rv-exp-tags"><span className="rv-tag accent">AI Native</span><span className="rv-tag accent">产品研发</span><span className="rv-tag accent">软件外包</span><span className="rv-tag accent">产教融合</span><span className="rv-tag">团队管理</span></div>
            </div>
            <div className="rv-exp-card">
              <div className="rv-exp-head">
                <div><div className="rv-exp-title">极云客（成都）科技有限公司（YGeeker）</div><div className="rv-exp-role">联合创始人 / 股东</div></div>
                <span className="rv-exp-date">早期经历</span>
              </div>
              <p>参与创办 YGeeker，在开源领域有一定影响力，开源并运营了在线跨平台工具箱「Geekits」等产品。曾负责官网建设、产品测试、AI 功能开发与数据分析。现已不参与日常运营。</p>
            </div>
          </Sec>

          {/* Skills */}
          <Sec id="skills" icon="⚡" title="技术能力">
            <div className="rv-skills-grid">
              <SBox color="var(--rv-accent)" title="AI Native 全栈开发" desc="以 AI 为核心的全栈开发流程，覆盖移动端、Web 端与后端，深度使用 AI 编程工具。" tags={['Flutter','SwiftUI','Vite','React','Next.js','FastAPI','Supabase','Claude Code','Cursor','Trae','Codex']} />
              <SBox color="#8b5cf6" title="AI 创意工具应用" desc="熟悉主流 AI 生成工具，能将创意工具融入产品设计与内容生产流程。" tags={['即梦','可灵','Suno','Nano Banana','NotebookLM','Capcut']} />
              <SBox color="#3b82f6" title="编程语言与框架" desc="多语言多框架实战，前端到后端到移动端均有完整项目交付。" tags={['Python','TypeScript','Dart','Swift','C','LangChain','Tailwind']} />
              <SBox color="#22c55e" title="运维、AI/ML 与工具链" desc="独立部署运维，深度学习研究与工程并行，熟练使用设计工具。" tags={['Linux','Nginx','Docker','YOLO','Ollama','RAG','Figma']} />
            </div>
          </Sec>

          {/* Awards */}
          <Sec id="awards" icon="🏆" title="竞赛与荣誉">
            <div className="rv-awards-list">
              <ARow year="2025" name="AdventureX 黑客松 · 光速光合赛道" badge="一等奖" level="gold" />
              <ARow year="2025" name="大学生创新创业训练计划" badge="国家级立项" level="national" />
              <ARow year="2024" name="AdventureX 黑客松 · 3 个赛道（奖金价值 10w+）" badge="一等奖" level="gold" />
              <ARow year="2024" name="大学生创新创业训练计划" badge="国家级高水平" level="national" />
              <ARow year="2024" name="全国大学生电工数学建模竞赛" badge="国家三等奖" level="national" />
              <ARow year="2024" name="全国大学生数学建模竞赛" badge="国家三等奖" level="national" />
              <ARow year="2024" name="全国大学生电子商务「创新、创意及创业」挑战赛" badge="省级二等奖" level="provincial" />
              <ARow year="2024" name="全球校园人工智能算法精英大赛" badge="四川省三等奖" level="provincial" />
              <ARow year="2024" name="计算机设计大赛" badge="四川省三等奖" level="provincial" />
              <ARow year="2024" name="中国国际创新大赛（互联网+）" badge="校铜奖" level="school" />
            </div>
          </Sec>

          {/* Projects */}
          <Sec id="projects" icon="📦" title="代表项目">
            <div className="rv-projects-grid">
              <PCard title="摇盒AI" sub="自研产品 · 已上线" icon="https://www.endpage.net/products/yaohe-ai.webp" desc="AI 对话 + 实时概率计算，门店科学选盒，支持拍照分析与语音输入。" stack={['Flutter','AI Chat','CV']} />
              <PCard title="TikMy" sub="自研产品 · SwiftUI" icon="https://www.endpage.net/products/tikmy.webp" desc="本地导入、智能分类、沉浸式刷片，完全私密离线的短视频管理。" stack={['SwiftUI','推荐算法','本地化']} />
              <PCard title="油迹Pro" sub="自研产品 · SwiftUI" icon="https://www.endpage.net/products/youji-pro.webp" desc="快速录入、智能油耗计算、可视化趋势，无广告的汽车油耗管理。" stack={['SwiftUI','可视化','云同步']} />
              <PCard title="宜乐生活" sub="校企共创" icon="https://www.endpage.net/products/unischool.png" desc="为宜宾学院校园跑与日常跑量提供服务的运动管理平台。" stack={['校企合作','双端','运动管理']} />
              <PCard title="MemoirAI · 声命体" sub="AdventureX 2025 一等奖" emoji="🎙️" gradient="linear-gradient(135deg,#667eea,#764ba2)" desc="AI 引导对话式日记，自然语言交互记录生活，数据上链永久存证。" stack={['Flutter','FastAPI','Blockchain']} />
              <PCard title="UnischoolAI · 小智" sub="校园智能问答" emoji="🤖" gradient="linear-gradient(135deg,#f093fb,#f5576c)" desc="基于 RAG 架构的校园信息智能检索系统，部署于校内网。" stack={['Qdrant','BGE-M3','RAG']} />
            </div>
          </Sec>

          {/* Academic */}
          <Sec id="academic" icon="📄" title="学术论文">
            <Paper title="TCGBNet: Tri-branch Conservative Gated Bridge Network for Medical Image Segmentation" meta="Zou Y, Zhou X, Yu M, Li C* · EAI IoTaaS 国际会议 · 第一作者" desc="提出基于 U-Net 的创新分割网络，融合保守三分支增强、动态跨门控桥和多尺度深度卷积，在 ISIC2017/2018 数据集上超越多种主流方法。" />
            <Paper title="Urban Housing Price Prediction Based on Spatio-Temporal Attention Mixture of Experts System" meta="Zou Y, Zhu Q, Zhu W, Wang Y · EAI IoTaaS 国际会议 · 第一作者" desc="提出 STAMoE 模型，融合状态空间模型、图注意力网络和自适应混合专家框架，R² 达 0.9936，MAE 较最优基线降低 48%。" />
            <Paper title="Improved ResNet-50 for Face Authenticity Detection Based on Attention Mechanism and Feature Pyramid" meta="Zhou K, Zou Y, Wang Y, Xue Y · 投稿中 · 第二作者" desc="改进 ResNet-50 融合 FPN 与通道注意力机制，在自建多源人脸数据集上达 91.9% 准确率，较原模型提升 3.4%。" />
          </Sec>

          {/* IP */}
          <Sec id="ip" icon="🔐" title="知识产权（软件著作权 18 项）">
            <div className="rv-ip-grid">
              {['TCGBNet 医学图像分割系统','基于时空注意力混合专家的城市房价预测系统','基于 DeiT 视觉注意力的面部情感识别系统','基于 Langchain 的大模型代码处理软件','基于传统数据库的大模型检索增强生成系统','基于机器视觉的电脑标签质量智能检测系统','汽车零件缺陷检测系统','溴化镧探测器能谱自动刻度修正系统','DataViz 数据可视化系统','基于数据可视化的个人财务监管系统','电商数据分析与个性化营销推荐系统','CE-DF-Scanner','BestPet 宠物推荐系统','MailMyNews 新闻邮件系统','ShareScreenNearby','tcctool-plus','熵析云枢订单管理系统','结合 AR/VR 的旅游文创产品体验平台'].map((n) => (
                <div key={n} className="rv-ip-item"><span className="rv-ip-copy">©</span>{n}</div>
              ))}
            </div>
          </Sec>

          <footer className="rv-footer">
            <div className="rv-footer-links">
              <a href="https://github.com/Gloridust" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://isethan.me" target="_blank" rel="noopener noreferrer">Blog</a>
              <a href="https://www.endpage.net" target="_blank" rel="noopener noreferrer">endpage.net</a>
              <a href="mailto:ethan@endpage.net">Email</a>
            </div>
            <p>小红书/抖音：Ethan的开发日记 · © 2026 Ethan Zou</p>
          </footer>
        </div>
      </div>

      <style jsx global>{`
        .rv-page *,.rv-page *::before,.rv-page *::after,.rv-nav *{box-sizing:border-box;margin:0;padding:0}
        :root{
          --rv-bg:#fff;--rv-bg-subtle:#fafafa;--rv-bg-card:#fff;--rv-bg-pill:#f4f4f5;
          --rv-border:#e8e8eb;--rv-border-light:#f0f0f3;
          --rv-text-primary:#18181b;--rv-text-secondary:#52525b;--rv-text-muted:#a1a1aa;
          --rv-accent:#ff6b2c;--rv-accent-light:#fff1eb;--rv-accent-dim:rgba(255,107,44,.08);
          --rv-blue:#3b82f6;--rv-blue-light:#eff6ff;--rv-purple:#8b5cf6;--rv-purple-light:#f5f3ff;
          --rv-font-sans:'Plus Jakarta Sans','Noto Sans SC',-apple-system,BlinkMacSystemFont,system-ui,sans-serif;
          --rv-font-mono:'JetBrains Mono','SF Mono',monospace;
          --rv-radius-md:12px;--rv-radius-sm:8px;--rv-radius-pill:100px;
          --rv-shadow-md:0 4px 12px rgba(0,0,0,.06);--rv-tr:.2s cubic-bezier(.4,0,.2,1);
        }
        @media(prefers-color-scheme:dark){:root{
          --rv-bg:#0f0f0f;--rv-bg-subtle:#1a1a1a;--rv-bg-card:#161616;--rv-bg-pill:#262626;
          --rv-border:#2a2a2e;--rv-border-light:#222225;
          --rv-text-primary:#fafafa;--rv-text-secondary:#a1a1aa;--rv-text-muted:#71717a;
          --rv-accent-light:rgba(255,107,44,.12);--rv-accent-dim:rgba(255,107,44,.08);
          --rv-blue-light:rgba(59,130,246,.1);--rv-purple-light:rgba(139,92,246,.1);
        }}

        /* NAV */
        .rv-nav{position:fixed;top:0;left:0;right:0;z-index:1000;backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);background:rgba(255,255,255,.82);border-bottom:1px solid var(--rv-border-light)}
        @media(prefers-color-scheme:dark){.rv-nav{background:rgba(15,15,15,.82)}}
        .rv-nav-inner{max-width:900px;margin:0 auto;padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:52px;gap:1rem}
        .rv-nav-left{display:flex;align-items:center;gap:.5rem;flex-shrink:0}
        .rv-back-btn{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;color:var(--rv-text-muted);transition:all var(--rv-tr);text-decoration:none}
        .rv-back-btn:hover{background:var(--rv-bg-pill);color:var(--rv-text-primary);opacity:1}
        .rv-nav-brand{font-family:var(--rv-font-sans);font-weight:700;font-size:.9rem;color:var(--rv-text-primary);display:flex;align-items:center;gap:.4rem;flex-shrink:0}
        .rv-nav-pills{display:flex;gap:.3rem;background:var(--rv-bg-pill);padding:3px;border-radius:var(--rv-radius-pill)}
        .rv-pill{padding:.28rem .75rem;border-radius:var(--rv-radius-pill);font-size:.73rem;font-weight:500;font-family:var(--rv-font-sans);color:var(--rv-text-secondary);transition:all var(--rv-tr);white-space:nowrap;text-decoration:none;cursor:pointer;display:inline-flex;align-items:center;gap:.35rem}
        .rv-pill:hover{color:var(--rv-text-primary);background:rgba(0,0,0,.04);opacity:1}
        @media(prefers-color-scheme:dark){.rv-pill:hover{background:rgba(255,255,255,.06)}}
        .rv-pill.active{background:var(--rv-accent);color:#fff;box-shadow:0 1px 4px rgba(255,107,44,.3)}
        .rv-pill-dot{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.7);animation:rv-pulse 2s ease-in-out infinite;flex-shrink:0}
        .rv-download-btn{display:inline-flex;align-items:center;gap:.3rem;padding:.35rem .85rem;border-radius:var(--rv-radius-pill);font-size:.72rem;font-weight:600;font-family:var(--rv-font-sans);color:#fff;background:var(--rv-accent);border:none;cursor:pointer;transition:all var(--rv-tr);flex-shrink:0}
        .rv-download-btn:hover{background:#e55a1f;box-shadow:0 2px 8px rgba(255,107,44,.3)}

        /* PAGE */
        .rv-page{font-family:var(--rv-font-sans);background:var(--rv-bg);color:var(--rv-text-primary);line-height:1.65;-webkit-font-smoothing:antialiased;min-height:100vh;font-size:15px}
        .rv-page ::selection{background:var(--rv-accent);color:#fff}
        .rv-page a{color:var(--rv-accent);text-decoration:none;transition:opacity var(--rv-tr)}
        .rv-page a:hover{opacity:.8}
        .rv-container{max-width:900px;margin:0 auto;padding:0 2rem}

        /* HERO */
        .rv-hero{padding:6rem 0 2rem}
        .rv-hero-row{display:flex;align-items:flex-start;justify-content:space-between;gap:1.5rem;flex-wrap:wrap}
        .rv-hero-main{display:flex;gap:1.25rem;align-items:flex-start;flex:1;min-width:0}
        .rv-hero-info{min-width:0}
        .rv-hero-label{display:inline-flex;align-items:center;gap:.4rem;padding:.25rem .75rem;border-radius:var(--rv-radius-pill);background:var(--rv-accent-light);color:var(--rv-accent);font-size:.7rem;font-weight:600;margin-bottom:.6rem}
        .rv-dot{width:5px;height:5px;border-radius:50%;background:var(--rv-accent);animation:rv-pulse 2s ease-in-out infinite}
        @keyframes rv-pulse{0%,100%{opacity:1}50%{opacity:.3}}
        .rv-h1{font-size:2.2rem;font-weight:800;letter-spacing:-.04em;line-height:1.15;margin:0 0 .3rem;color:var(--rv-text-primary)}
        .rv-en{color:var(--rv-text-muted);font-weight:400;font-size:1.2rem;margin-left:.3rem}
        .rv-hero-desc{font-size:.88rem;color:var(--rv-text-secondary);line-height:1.8;max-width:480px;margin-top:.35rem}
        .rv-contact-card{display:flex;flex-direction:column;gap:.35rem;padding:1rem 1.25rem;background:var(--rv-bg-subtle);border:1px solid var(--rv-border);border-radius:var(--rv-radius-md);min-width:220px;flex-shrink:0}
        .rv-contact-item{display:flex;align-items:center;gap:.5rem;font-size:.75rem;color:var(--rv-text-secondary)}
        .rv-contact-item a{color:var(--rv-text-secondary)}.rv-contact-item a:hover{color:var(--rv-accent);opacity:1}

        /* SECTIONS */
        .rv-section{padding:1.75rem 0}
        .rv-section+.rv-section{border-top:1px solid var(--rv-border-light)}
        .rv-section-head{display:flex;align-items:center;gap:.55rem;margin-bottom:1.25rem}
        .rv-section-icon{width:26px;height:26px;border-radius:var(--rv-radius-sm);display:flex;align-items:center;justify-content:center;font-size:.8rem;background:var(--rv-accent-dim)}
        .rv-section-head h2{font-size:1.05rem;font-weight:700;letter-spacing:-.02em;margin:0;color:var(--rv-text-primary)}

        /* EXP */
        .rv-exp-card{padding:1.25rem 1.4rem;background:var(--rv-bg-card);border:1px solid var(--rv-border);border-radius:var(--rv-radius-md);margin-bottom:.6rem;transition:box-shadow var(--rv-tr)}
        .rv-exp-card:hover{box-shadow:var(--rv-shadow-md)}
        .rv-exp-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:.6rem;flex-wrap:wrap;gap:.35rem}
        .rv-exp-title{font-size:.95rem;font-weight:700;color:var(--rv-text-primary)}
        .rv-exp-title a{color:var(--rv-text-primary)}.rv-exp-title a:hover{color:var(--rv-accent);opacity:1}
        .rv-exp-role{font-size:.75rem;color:var(--rv-accent);font-weight:600;margin-top:.08rem}
        .rv-exp-date{font-size:.7rem;color:var(--rv-text-muted);font-family:var(--rv-font-mono);white-space:nowrap;background:var(--rv-bg-pill);padding:.18rem .55rem;border-radius:var(--rv-radius-pill)}
        .rv-exp-card p{font-size:.82rem;color:var(--rv-text-secondary);line-height:1.8;margin:0}
        .rv-exp-card p+p{margin-top:.45rem}
        .rv-exp-tags{display:flex;flex-wrap:wrap;gap:.25rem;margin-top:.75rem}
        .rv-tag{display:inline-block;padding:.18rem .55rem;border-radius:var(--rv-radius-pill);font-size:.68rem;font-weight:500;background:var(--rv-bg-pill);color:var(--rv-text-secondary)}
        .rv-tag.accent{background:var(--rv-accent-light);color:var(--rv-accent)}
        .rv-tag.mono{font-family:var(--rv-font-mono);font-size:.66rem}

        /* SKILLS */
        .rv-skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:.6rem}
        .rv-skill-box{padding:1.1rem 1.25rem;background:var(--rv-bg-subtle);border:1px solid var(--rv-border);border-radius:var(--rv-radius-md)}
        .rv-skill-box h3{font-size:.82rem;font-weight:700;margin:0 0 .35rem;display:flex;align-items:center;gap:.4rem;color:var(--rv-text-primary)}
        .rv-skill-dot{width:7px;height:7px;border-radius:50%;display:inline-block;flex-shrink:0}
        .rv-skill-box p{font-size:.76rem;color:var(--rv-text-secondary);line-height:1.7;margin:0}
        .rv-skill-tags{margin-top:.55rem;display:flex;flex-wrap:wrap;gap:.25rem}

        /* AWARDS */
        .rv-award-row{display:flex;align-items:baseline;gap:.6rem;padding:.45rem 0;border-bottom:1px solid var(--rv-border-light)}
        .rv-award-row:last-child{border-bottom:none}
        .rv-award-year{font-family:var(--rv-font-mono);font-size:.68rem;color:var(--rv-text-muted);flex-shrink:0;width:34px}
        .rv-award-name{font-size:.8rem;color:var(--rv-text-secondary);flex:1}
        .rv-award-badge{font-size:.68rem;font-weight:700;flex-shrink:0;padding:.15rem .5rem;border-radius:var(--rv-radius-pill);white-space:nowrap}
        .rv-award-badge.gold{background:var(--rv-accent-light);color:var(--rv-accent)}
        .rv-award-badge.national{background:var(--rv-blue-light);color:var(--rv-blue)}
        .rv-award-badge.provincial{background:var(--rv-purple-light);color:var(--rv-purple)}
        .rv-award-badge.school{background:var(--rv-bg-pill);color:var(--rv-text-secondary)}

        /* PROJECTS */
        .rv-projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem}
        .rv-proj-card{padding:1.1rem;background:var(--rv-bg-card);border:1px solid var(--rv-border);border-radius:var(--rv-radius-md);transition:all var(--rv-tr);display:flex;flex-direction:column}
        .rv-proj-card:hover{box-shadow:var(--rv-shadow-md);transform:translateY(-1px)}
        .rv-proj-card h3{font-size:.85rem;font-weight:700;margin:0 0 .1rem;color:var(--rv-text-primary)}
        .rv-proj-sub{font-size:.7rem;color:var(--rv-text-muted);margin-bottom:.4rem;font-weight:500}
        .rv-proj-card p{font-size:.74rem;color:var(--rv-text-secondary);line-height:1.65;flex:1;margin:0}
        .rv-proj-stack{margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.2rem}
        .rv-proj-stack span{font-size:.64rem;font-family:var(--rv-font-mono);color:var(--rv-text-muted);padding:.1rem .35rem;border:1px solid var(--rv-border);border-radius:4px;background:var(--rv-bg-subtle)}

        /* PAPERS */
        .rv-paper-card{padding:1rem 1.25rem;background:var(--rv-bg-subtle);border:1px solid var(--rv-border);border-radius:var(--rv-radius-md);margin-bottom:.5rem}
        .rv-paper-card h4{font-size:.82rem;font-weight:700;margin:0 0 .2rem;line-height:1.5;color:var(--rv-text-primary)}
        .rv-paper-meta{font-size:.72rem;color:var(--rv-text-muted);margin-bottom:.3rem}
        .rv-paper-card p{font-size:.76rem;color:var(--rv-text-secondary);line-height:1.7;margin:0}

        /* IP */
        .rv-ip-grid{display:grid;grid-template-columns:1fr 1fr;gap:.3rem .75rem}
        .rv-ip-item{font-size:.73rem;color:var(--rv-text-secondary);padding:.22rem 0;display:flex;align-items:baseline;gap:.35rem}
        .rv-ip-copy{color:var(--rv-text-muted);font-size:.63rem;flex-shrink:0}

        /* FOOTER */
        .rv-footer{padding:2rem 0 3rem;text-align:center}
        .rv-footer-links{display:flex;justify-content:center;gap:1.25rem;margin-bottom:.6rem}
        .rv-footer-links a{font-size:.78rem;color:var(--rv-text-secondary);font-weight:500}
        .rv-footer p{font-size:.7rem;color:var(--rv-text-muted);margin:0}

        /* MOBILE */
        @media(max-width:768px){
          .rv-container{padding:0 1.25rem}.rv-hero{padding-top:5rem}
          .rv-hero-row{flex-direction:column}.rv-hero-main{flex-direction:column;align-items:flex-start}
          .rv-h1{font-size:1.8rem}.rv-en{display:block;margin-left:0;margin-top:.15rem;font-size:1rem}
          .rv-contact-card{min-width:unset}.rv-skills-grid{grid-template-columns:1fr}
          .rv-projects-grid{grid-template-columns:1fr 1fr}.rv-ip-grid{grid-template-columns:1fr}
          .rv-nav-pills{display:none}
        }
        @media(max-width:480px){.rv-h1{font-size:1.5rem}.rv-projects-grid{grid-template-columns:1fr}}

        /* PRINT - forced light mode */
        @media print{
          @page{size:A4;margin:0}
          :root{
            --rv-bg:#fff!important;--rv-bg-subtle:#fafafa!important;--rv-bg-card:#fff!important;
            --rv-bg-pill:#f4f4f5!important;--rv-border:#e8e8eb!important;--rv-border-light:#f0f0f3!important;
            --rv-text-primary:#18181b!important;--rv-text-secondary:#52525b!important;--rv-text-muted:#a1a1aa!important;
            --rv-accent-light:#fff1eb!important;--rv-accent-dim:rgba(255,107,44,.08)!important;
            --rv-blue-light:#eff6ff!important;--rv-purple-light:#f5f3ff!important;
            color-scheme:light;
          }
          html{font-size:11px}
          body{background:#fff!important;color:#18181b!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;padding:14mm 16mm}
          .rv-page{background:#fff!important;color:#18181b!important}
          .rv-nav{display:none!important}
          .rv-hero{padding-top:0!important;padding-bottom:1rem}
          .rv-hero-row{display:table;width:100%}
          .rv-hero-main{display:table-cell;vertical-align:top}
          .rv-hero-main img{float:left;margin-right:12px;margin-bottom:4px}
          .rv-contact-card{display:table-cell;vertical-align:top;width:200px;padding-left:12px}
          .rv-section{padding:.85rem 0}
          .rv-section+.rv-section{border-top:1px solid #e5e5e5}
          .rv-exp-card,.rv-skill-box,.rv-proj-card,.rv-paper-card,.rv-contact-card,.rv-award-row,.rv-section-head{break-inside:avoid;page-break-inside:avoid}
          .rv-exp-card:hover,.rv-proj-card:hover{transform:none;box-shadow:none}
          .rv-exp-card,.rv-skill-box,.rv-proj-card,.rv-paper-card{box-shadow:none!important}
          .rv-page a{color:var(--rv-text-primary)!important}
          .rv-container{max-width:100%;padding:0}
          .rv-hero-label .rv-dot{animation:none}
          .rv-pill-dot{animation:none}
          .rv-projects-grid{grid-template-columns:repeat(3,1fr)}.rv-skills-grid{grid-template-columns:1fr 1fr}
          .rv-ip-grid{grid-template-columns:1fr 1fr}.rv-footer{padding:.75rem 0}
          .rv-proj-card img,.rv-proj-card div:first-child{box-shadow:none!important}
          .rv-section-head{margin-bottom:.85rem}
          .rv-exp-card{padding:1rem 1.15rem;margin-bottom:.45rem}.rv-skill-box{padding:.85rem 1rem}
          .rv-proj-card{padding:.85rem}.rv-paper-card{padding:.85rem 1rem;margin-bottom:.35rem}
          .rv-exp-tags{margin-top:.5rem}.rv-hero-desc{margin-top:.25rem}
        }
      `}</style>
    </>
  )
}

// --- Components ---
function CItem({ icon, children }: { icon: string; children: React.ReactNode }) {
  const d: Record<string, React.ReactNode> = {
    phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.64.35 1.26.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c1.55.35 2.17.58 2.81.7A2 2 0 0122 16.92z" />,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />,
    web: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></>,
  }
  return (
    <div className="rv-contact-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13, opacity: 0.4, flexShrink: 0 }}>{d[icon]}</svg>
      <span>{children}</span>
    </div>
  )
}

function Sec({ id, icon, title, children }: { id: string; icon: string; title: string; children: React.ReactNode }) {
  return <section className="rv-section" id={id}><div className="rv-section-head"><div className="rv-section-icon">{icon}</div><h2>{title}</h2></div>{children}</section>
}

function SBox({ color, title, desc, tags }: { color: string; title: string; desc: string; tags: string[] }) {
  return (
    <div className="rv-skill-box">
      <h3><span className="rv-skill-dot" style={{ background: color }} />{title}</h3>
      <p>{desc}</p>
      <div className="rv-skill-tags">{tags.map((t) => <span key={t} className="rv-tag mono">{t}</span>)}</div>
    </div>
  )
}

function ARow({ year, name, badge, level }: { year: string; name: string; badge: string; level: string }) {
  return <div className="rv-award-row"><span className="rv-award-year">{year}</span><span className="rv-award-name">{name}</span><span className={`rv-award-badge ${level}`}>{badge}</span></div>
}

function PCard({ title, sub, icon, emoji, gradient, desc, stack }: { title: string; sub: string; icon?: string; emoji?: string; gradient?: string; desc: string; stack: string[] }) {
  return (
    <div className="rv-proj-card">
      {icon
        ? <img src={icon} alt={title} style={{ width: 42, height: 42, borderRadius: 10, objectFit: 'cover', flexShrink: 0, marginBottom: '0.65rem', boxShadow: '0 2px 8px rgba(0,0,0,.08)' }} />
        : <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, marginBottom: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(0,0,0,.06)', background: gradient }}>{emoji}</div>
      }
      <h3>{title}</h3>
      <div className="rv-proj-sub">{sub}</div>
      <p>{desc}</p>
      <div className="rv-proj-stack">{stack.map((s) => <span key={s}>{s}</span>)}</div>
    </div>
  )
}

function Paper({ title, meta, desc }: { title: string; meta: string; desc: string }) {
  return <div className="rv-paper-card"><h4>{title}</h4><div className="rv-paper-meta">{meta}</div><p>{desc}</p></div>
}

export default ResumePage
