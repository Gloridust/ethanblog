# EthanBlog Design System Spec

> 一套用于个人博客的设计规范。Apple 液态玻璃 + 温暖手作感。
> 喂给 Claude Code 时，可以直接说："请按照 DESIGN_SPEC.md 重构整个博客的样式系统"。

---

## 1. 设计原则

1. **液态玻璃优先 (Liquid Glass first)** — 所有浮层（导航、卡片、面板、弹出菜单）都使用半透明 + backdrop-blur，配合极薄的高光描边和柔和投影。
2. **温暖、有人味 (Warm & personal)** — 背景不是纯白，而是带 60–90° 色相的米色；环境光晕用暖色辐射而非冷色。
3. **保留蓝色作为唯一品牌强调色** — 不滥用色相；蓝色出现的地方必须是"主行动 / 当前态"。
4. **大圆角 + 两端 pill** — 导航条、过滤器、按钮使用 `border-radius: 999px`；卡片用 22–28px 圆角。
5. **极少装饰，多留白** — 不画 SVG 插画；用 oklch 渐变 + 单色占位 + monospace 字幕代替。
6. **明暗双模式必须等比优雅** — 暗色不是简单反相，是 warm-dark（背景 `oklch(18% 0.012 60)`）。

---

## 2. 颜色系统 (Tokens)

全部使用 `oklch()`，便于明暗模式互换、调色。

### 2.1 Light mode

```css
:root {
  /* Surfaces — warm off-white */
  --bg:        oklch(98.5% 0.008 75);   /* 主背景，米白 */
  --bg-2:      oklch(96%   0.012 75);   /* 次级背景 */
  --bg-noise:  oklch(94%   0.014 75);

  /* Glass — 浮层 */
  --glass:         oklch(100% 0 0 / 0.55);
  --glass-strong:  oklch(100% 0 0 / 0.78);
  --glass-border:  oklch(100% 0 0 / 0.7);
  --glass-shadow:
    0 1px 0 oklch(100% 0 0 / 0.8) inset,             /* 顶部高光 */
    0 0 0 0.5px oklch(20% 0.02 70 / 0.08),           /* 描边 */
    0 8px 24px -8px oklch(20% 0.02 70 / 0.12),       /* 近距投影 */
    0 24px 48px -16px oklch(20% 0.02 70 / 0.08);     /* 远距投影 */

  /* Ink — 文字色阶 */
  --ink:    oklch(22% 0.015 70);  /* 标题、正文 */
  --ink-2:  oklch(40% 0.012 70);  /* 次级文字 */
  --ink-3:  oklch(58% 0.01  70);  /* 元数据 */
  --ink-4:  oklch(72% 0.008 70);  /* 占位、disabled */

  /* Accent — 蓝色（唯一品牌色） */
  --accent:       oklch(62% 0.18 250);
  --accent-soft:  oklch(62% 0.18 250 / 0.12);  /* tag/badge 底色 */
  --accent-ink:   oklch(38% 0.14 250);          /* 蓝色上的文字 */

  /* Warm — 暖色辅助（用于头像、渐变占位、时间线节点） */
  --warm-1: oklch(88% 0.06 60);
  --warm-2: oklch(82% 0.08 30);
  --warm-3: oklch(85% 0.05 90);
}
```

### 2.2 Dark mode (`[data-theme="dark"]`)

```css
[data-theme="dark"] {
  --bg:        oklch(18% 0.012 60);
  --bg-2:      oklch(22% 0.014 60);
  --bg-noise:  oklch(26% 0.016 60);

  --glass:         oklch(100% 0 0 / 0.06);
  --glass-strong:  oklch(100% 0 0 / 0.10);
  --glass-border:  oklch(100% 0 0 / 0.12);
  --glass-shadow:
    0 1px 0 oklch(100% 0 0 / 0.08) inset,
    0 0 0 0.5px oklch(100% 0 0 / 0.06),
    0 8px 24px -8px oklch(0% 0 0 / 0.4),
    0 24px 48px -16px oklch(0% 0 0 / 0.5);

  --ink:    oklch(96% 0.005 70);
  --ink-2:  oklch(80% 0.008 70);
  --ink-3:  oklch(62% 0.01  70);
  --ink-4:  oklch(48% 0.012 70);

  --accent:       oklch(72% 0.16 250);
  --accent-soft:  oklch(72% 0.16 250 / 0.18);
  --accent-ink:   oklch(82% 0.14 250);

  --warm-1: oklch(40% 0.08 60);
  --warm-2: oklch(38% 0.10 30);
  --warm-3: oklch(42% 0.06 90);
}
```

### 2.3 切换协议

- 持久化：`localStorage.setItem('eb-theme', 'light' | 'dark')`
- DOM：`document.documentElement.setAttribute('data-theme', ...)`
- 全部使用 CSS 变量过渡：`transition: background 0.4s ease, color 0.4s ease`

---

## 3. 字体系统

```css
--font-sans:  "Inter Tight", "PingFang SC", "Hiragino Sans GB", system-ui, -apple-system, sans-serif;
--font-serif: "Source Serif 4", "Noto Serif SC", "Songti SC", Georgia, serif;
--font-mono:  "JetBrains Mono", "SF Mono", ui-monospace, monospace;
```

**用法**
- `--font-sans` — 99% 的 UI、正文、标题
- `--font-serif` **斜体** — 用作姓名后缀的 `(Gloridust)`、章节副标题、`em` 强调（编辑感 / 个人感的来源）
- `--font-mono` — 日期、计数、tag 内字符、section label（如 `JOURNEY · 时间线`）

**字号梯度**
| 用途 | size | weight | letter-spacing |
|---|---|---|---|
| Hero 名字 | 40px | 700 | -0.025em |
| 页面 H1 | 32px | 700 | -0.025em |
| 章节标题 | 24px | 700 | -0.02em |
| 卡片标题 | 16px | 600 | -0.012em |
| 正文 | 14–15px | 400 | -0.005em |
| 次级文字 | 13px | 400 | 0 |
| 元数据 (mono) | 11px | 500 | 0.02–0.06em |
| Section label (mono) | 11px | 500 | 0.12em uppercase |

**字体特性**
```css
font-feature-settings: "ss01", "cv11";
-webkit-font-smoothing: antialiased;
line-height: 1.5; /* 正文 1.6–1.7 */
```

---

## 4. 形状与间距

```css
--r-sm:   12px;   /* 小圆角，input、tag */
--r-md:   18px;   /* 中型卡片 */
--r-lg:   26px;   /* 大卡片，文章 */
--r-xl:   36px;   /* 主容器 */
--r-pill: 999px;  /* nav、按钮、过滤器 */
```

**间距尺度** — 用 4 的倍数：4 / 8 / 12 / 14 / 18 / 22 / 24 / 32 / 48 / 64 / 80

**容器宽度**
- 文章列表 / 友链：`max-width: 1100px`
- 普通页面：`max-width: 980px`
- 关于页：`max-width: 760px`（更窄，更"个人"）

---

## 5. 核心组件

### 5.1 Nav（液态玻璃 pill）

- 容器：`position: sticky; top: 16px;` 始终悬浮
- 形状：`max-width: 980px`，`border-radius: 999px`，`padding: 8px 12px 8px 22px`
- 背景：`var(--glass)` + `backdrop-filter: blur(24px) saturate(180%)`
- 投影：`var(--glass-shadow)`
- 三段结构：`.nav-brand | .nav-links (居中) | .nav-tools (主题切换 + 语言)`
- 当前页 link：蓝色实心 pill，左侧带白点
- 语言下拉：同样 glass 弹出，`transform-origin: top right`，开启时 `scale(1)`，关闭时 `scale(0.96) + translateY(-4px)`

### 5.2 Card（文章卡片）

```css
.card {
  background: var(--glass-strong);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--r-lg);
  /* 顶部高光 + 柔和投影 */
  box-shadow:
    0 1px 0 oklch(100% 0 0 / 0.6) inset,
    0 4px 16px -4px oklch(20% 0.02 70 / 0.06);
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: ..., 0 24px 48px -12px oklch(20% 0.02 70 / 0.18);
}
```

**3D Tilt 交互（可选但推荐）**
```js
onMouseMove: (e) => {
  const r = el.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width  - 0.5) * 8;   // ±8°
  const y = ((e.clientY - r.top)  / r.height - 0.5) * -8;
  el.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
}
// 父容器需要 transform-style: preserve-3d
```

**封面图**
- `aspect-ratio: 16 / 10`
- 没有图时用 `linear-gradient(135deg, oklch(...), oklch(...))` + monospace 大写 label 占位
- 图片 hover 时 `transform: scale(1.06)`，过渡 0.6s

**卡片底部 meta**
- 上方加 `border-top: 1px solid oklch(50% 0 0 / 0.08)`
- 左侧 tag 用 `--accent-soft` 背景 + `--accent-ink` 文字，pill 形
- 右侧 date 用 `--font-mono`，`--ink-4`

### 5.3 Filter Pills（过滤器）

- 外壳是同样的 glass pill 容器，`padding: 5px`
- 内部 pill：`padding: 7px 18px; font-size: 13px;`
- 当前态：蓝色实心 + 白字
- 下方一行 `--font-mono` 11px 显示 `查询到 N 篇文章`

### 5.4 Pagination

- 复用 filter-pill 的容器形态
- 数字按钮 `min-width: 34px; height: 34px;`
- `<` `>` 用 stroke icon

### 5.5 Hero Avatar

- 圆形，外圈双层描边：`box-shadow: 0 0 0 6px var(--bg), 0 0 0 7px var(--glass-border), 0 24px 48px -16px ...`
- 内部用 `linear-gradient(135deg, var(--warm-1), var(--warm-2))` + emoji 占位（之后可换真照片）
- 顶部加白色 45° 高光：`::after { background: linear-gradient(135deg, oklch(100% 0 0 / 0.4), transparent 50%) }`

### 5.6 Timeline（关于页核心组件）

```
┌─ 主轴：渐变线 (accent → warm-2 → transparent)，宽 2px
│
●  YEAR · MONO · accent-ink
│  Title (16px, 600)
│  Body (13px, ink-2, line-height 1.7) — 可含 <em> 斜体
│  [tag] [tag] (mono 10px)
│
●  ...
```

**节点三种状态**
- `default` — 蓝色描边圆点 + 蓝色光晕
- `.warm` — 暖色描边 + 暖色光晕
- `.muted` — 实心灰点（过去 / 不重要）

**关键 CSS**
```css
.timeline { padding-left: 32px; position: relative; }
.timeline::before {
  content: ""; position: absolute; left: 8px; top: 8px; bottom: 8px;
  width: 2px; border-radius: 2px;
  background: linear-gradient(to bottom, var(--accent), var(--warm-2) 50%, transparent);
  opacity: 0.6;
}
.tl-item::before {
  content: ""; position: absolute; left: -32px; top: 6px;
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--accent);
  box-shadow: 0 0 0 4px var(--bg), 0 0 12px var(--accent-soft);
}
```

### 5.7 Section Label

```css
.section-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-3);
  display: flex; align-items: center; gap: 10px;
}
.section-label::before {
  content: ""; width: 18px; height: 1px; background: var(--ink-4);
}
```
形如：`──── PRESENCE`、`──── JOURNEY · 时间线`

### 5.8 Friend / Social Card

- 横向布局：左 icon (42×42, 12px 圆角) + 右 meta
- 同样的 glass-strong 背景 + 14–18px padding
- hover：`translateY(-3px)` + 加深投影

---

## 6. 全局背景层

每个页面都有两层覆盖：

### 6.1 `.ambient` — 暖色/蓝色光晕

```css
.ambient { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.ambient::before {  /* 暖光晕 */
  content: ""; position: absolute; top: -20vw; right: -10vw;
  width: 60vw; height: 60vw; border-radius: 50%;
  background: radial-gradient(circle, var(--warm-2), transparent 60%);
  filter: blur(120px); opacity: 0.55;
}
.ambient::after {   /* 蓝光晕 */
  ...bottom-left...
  background: radial-gradient(circle, var(--accent), transparent 60%);
  opacity: 0.18;
}
```

### 6.2 `.grain` — 噪点

SVG `feTurbulence` 噪点，`mix-blend-mode: overlay`，opacity 0.4。给页面整体上一层胶片质感。

### 6.3 内容层

`main { position: relative; z-index: 2; }`

---

## 7. 动效原则

- **缓动**：`cubic-bezier(0.2, 0.8, 0.2, 1)`（"Apple ease-out"）
- **时长**：状态变化 0.2s；hover 浮起 0.3–0.4s；图片缩放 0.6s
- **不要弹跳** — 不用 `cubic-bezier` 带回弹的曲线
- **hover lift** — 始终 `translateY(-3px ~ -6px)` + 投影加深
- **layout transition** — 页面切换不做任何 motion；点开链接就是直接跳转

---

## 8. 响应式

- 主断点：`768px`（手机）、`1024px`（平板）
- 文章网格：3 列 → 2 列 → 1 列
- Nav：在窄屏下保留 pill 形，链接折叠成下拉

---

## 9. 不做什么 (Anti-patterns)

- ❌ 不用纯白 `#fff`，背景永远带温度
- ❌ 不画 SVG 插画 / 表情；用 emoji + 渐变占位
- ❌ 不用紫色渐变、霓虹色、AI slop 渐变
- ❌ 不在卡片上用左侧色条（emoji + 圆角左条 = AI slop）
- ❌ 不用 Inter（用 Inter **Tight**）；不用 Roboto
- ❌ 不在中文里用斜体 `font-style: italic`（中文不该斜）；只在英文 + 衬线字体上用斜
- ❌ 不要花哨的鼠标跟随、粒子、滚动视差

---

## 10. 文件组织建议

```
styles.css            # 所有 CSS tokens + 组件类
shared.jsx            # Nav / Footer / Avatar / Ambient / Icon / useTheme
home.jsx              # 首页（hero + 过滤器 + 卡片网格 + 分页）
about.jsx             # 关于页（卡片 + 社交矩阵 + timeline + 照片）
friends.jsx           # 友链网格
tweaks.jsx            # （可选）调试面板：色相、暖度、圆角、字体、密度
index.html / about.html / friends.html
```

---

## 11. 复用片段（直接复制）

### 玻璃容器
```css
background: var(--glass-strong);
backdrop-filter: blur(20px) saturate(180%);
-webkit-backdrop-filter: blur(20px) saturate(180%);
border: 1px solid var(--glass-border);
border-radius: var(--r-md);
box-shadow:
  0 1px 0 oklch(100% 0 0 / 0.6) inset,
  0 4px 16px -4px oklch(20% 0.02 70 / 0.06);
```

### 暖色头像渐变
```css
background: linear-gradient(135deg, var(--warm-1), var(--warm-2));
```

### 蓝色实心 pill 按钮
```css
background: var(--accent);
color: white;
border-radius: var(--r-pill);
box-shadow:
  0 0 0 0.5px oklch(0% 0 0 / 0.1),
  0 4px 12px -2px oklch(62% 0.18 250 / 0.4);
```

### Hover 浮起
```css
transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
&:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 32px -8px oklch(20% 0.02 70 / 0.14);
}
```
