# 个人主页设计规范文档
> 给 Coder 的完整设计 & 交互 Spec

---

## 一、项目概览

| 项目 | 说明 |
|------|------|
| 类型 | 个人作品集网站（Portfolio） |
| 框架 | React + Vite |
| 动效 | Framer Motion |
| 路由 | React Router v6 |
| 样式 | CSS Modules 或 Tailwind（coder 自选） |
| 国际化 | react-i18next（中/英切换，默认中文） |
| 部署 | GitHub Pages（`fisheraaa.github.io`） |
| 适配优先级 | 桌面端优先，移动端次之 |

---

## 二、设计系统

### 2.1 色彩

```
背景色      --bg-primary:     #0a0a0a
次级背景    --bg-secondary:   #111111
卡片背景    --bg-card:        #161616
边框色      --border:         #222222
强调色      --accent:         #4fffb0        /* 冷绿，主要高亮 */
强调色暗    --accent-dim:     rgba(79,255,176,0.12)
正文色      --text-primary:   #f0f0f0
次级文字    --text-secondary: #888888
弱化文字    --text-muted:     #444444
```

> 整体风格：**纯黑底 + 冷绿强调**。不用蓝色，冷绿在深色背景上更有辨识度，同时带一点 terminal / quant 的气质，契合目标方向。

### 2.2 字体

```
Display（大标题）: "Syne"          — Google Fonts，几何感强，有压迫力
Body（正文）:      "DM Sans"       — Google Fonts，现代干净
Mono（代码/数据）: "JetBrains Mono"— Google Fonts，细节点缀用
```

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 2.3 间距

使用 8px 基础栅格。常用值：8 / 16 / 24 / 32 / 48 / 64 / 96px。

### 2.4 圆角

```
卡片:    border-radius: 12px
按钮:    border-radius: 6px
标签:    border-radius: 4px
```

### 2.5 动效基准

```
过渡时长:  200ms（hover），400ms（页面进入）
缓动函数:  cubic-bezier(0.16, 1, 0.3, 1)   /* easeOutExpo */
页面切换:  淡入 + 向上位移 24px，duration: 0.4s
```

---

## 三、页面结构

```
/          → Hero
/about     → 关于
/projects  → 项目
/blog      → 思考（内容少时可先隐藏入口）
/contact   → 联系
```

---

## 四、全局导航栏

**位置**：顶部固定，`position: fixed; top: 0; z-index: 100`

**布局**：左边 Logo（名字首字母 `YQ`），右边导航链接 + 语言切换

```
[YQ]                    关于  项目  思考  联系  [EN]
```

**细节**：
- 背景：`rgba(10,10,10,0.85)` + `backdrop-filter: blur(12px)`
- 底部：`border-bottom: 1px solid var(--border)`
- 当前页对应的导航项用 `--accent` 色下划线标记（2px，`border-bottom`）
- hover 时导航文字变 `--accent` 色，过渡 200ms
- `[EN]` / `[中]` 是语言切换按钮，点击切换整站语言，状态存 `localStorage`
- 导航栏高度：64px

**移动端（<768px）**：导航链接折叠为汉堡菜单，点击展开全屏遮罩菜单，背景纯黑，链接居中大字显示。

---

## 五、页面详细设计

### 5.1 Hero 页（`/`）

**整体感**：全屏，左右两列，左边文字，右边装饰性视觉元素。

**左列（55% 宽）**：

```
[小标签] AVAILABLE FOR INTERNSHIP 2026

[超大标题 Syne 800]
俞秋行

[副标题 DM Sans 300]
CS @ BNU-HKBU UIC
Quant Trader · Strategy Research · PM

[一行分隔线，--accent 色，宽 40px，height 1px，margin: 24px 0]

[介绍文字 DM Sans 400，--text-secondary]
喜欢把模糊的东西搞清楚
不管是一个市场信号，还是一个系统为什么会挂

[两个按钮，margin-top: 40px]
[主按钮] 查看项目 →         [次按钮] 关于我
```

主按钮样式：`background: var(--accent); color: #000; font-weight: 500; padding: 12px 28px`
次按钮样式：`border: 1px solid var(--border); color: var(--text-primary); padding: 12px 28px`，hover 时 border 变 `--accent`

**右列（45% 宽）**：

不放照片。放一个**抽象数据可视化装饰**——用 Canvas 或 SVG 绘制一个模拟价格曲线（折线图风格），线条用 `--accent` 色，透明度 0.6，带轻微的噪声抖动动画（requestAnimationFrame），营造"量化/数据"的氛围感。背景有网格线（`#1a1a1a`，极淡）。

这个元素不需要真实数据，纯装饰，假数据 hardcode 即可。

**入场动画（Framer Motion）**：
- 小标签：`opacity: 0→1, y: 16→0, delay: 0.1s`
- 大标题：`opacity: 0→1, y: 24→0, delay: 0.2s`
- 副标题：`opacity: 0→1, y: 16→0, delay: 0.35s`
- 介绍文字：`opacity: 0→1, delay: 0.45s`
- 按钮组：`opacity: 0→1, delay: 0.55s`
- 右侧图形：`opacity: 0→1, delay: 0.3s`，canvas 动画开始

---

### 5.2 关于页（`/about`）

**布局**：单栏居中，最大宽度 720px，`margin: 0 auto`

**内容区块，从上到下：**

---

**① 页面标题**

```
[Syne 800, 48px]
关于我 / About

[--text-muted, JetBrains Mono, 14px，标题下方]
> whoami
```

---

**② 自我介绍**（用之前写好的文字，中英切换）

```
香港浸会大学（珠海）计算机科学的小大一

想去 Quant Trader / Strategy Research / PM

喜欢把模糊的东西搞清楚——
不管是一个市场信号，还是一段关系，还是一个系统为什么会挂

现在在把 AI Trader 从「看行情」改成「能回测、有风控」

还在迭代中
```

文字风格：`DM Sans 400`，行高 1.8，`--text-secondary`，段落间距 `1em`。

---

**③ 教育 & 竞赛时间线**

用自定义时间线组件，不要用第三方库，手写 CSS 即可。

```
竖线（--border，2px）
  │
  ●  2025.09 至今
     香港浸会大学（珠海）计算机科学与技术
     CGPA 3.83 / 4.0
  │
  ●  2025.11
     BNBU 程序设计大赛 银奖
  │
  ●  2024.11
     全国中学生数学联赛 广东省三等奖
```

竖线颜色 `--border`，圆点颜色 `--accent`，日期用 `JetBrains Mono --text-muted`。

---

**④ 技能矩阵**

不用列表，用标签云（Tag）形式。每个标签 `background: var(--accent-dim); border: 1px solid var(--accent); color: var(--accent); border-radius: 4px; padding: 4px 10px; font-size: 13px`

分两行排列（flex wrap）：

```
Python   AkShare   Docker   Web3.py   React   TypeScript
FastAPI   Streamlit   Pandas   MACD分析   蒙特卡洛   AHP/TOPSIS
```

---

### 5.3 项目页（`/projects`）

**布局**：三栏卡片网格（桌面端），移动端变单栏。

每张卡片宽度均等，`gap: 24px`，卡片 `background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 28px`

**卡片结构（以 AI Trader 为例）**：

```
[顶部]
[状态标签]  进行中                    [GitHub 图标 →]
            ^用--accent色小标签

[项目编号，--text-muted，JetBrains Mono]
01

[项目名，Syne 700，24px]
AI 量化交易系统

[标签行，flex，gap:8px]
Python  Docker  LLM API  AkShare

[分隔线 --border]

[描述，DM Sans，--text-secondary，14px，3行左右]
设计事件驱动型信号流水线，MACD 多因子体系
接入 LLM 多角色辩论框架进行信号过滤
正在迭代加入回测引擎与风控模块

[底部]
[查看详情]                        [→ GitHub]
```

**hover 效果**：
- `border-color` 渐变到 `var(--accent)`，过渡 200ms
- 卡片整体轻微上浮：`transform: translateY(-4px)`，`box-shadow: 0 16px 48px rgba(79,255,176,0.08)`

**点击"查看详情"**：弹出 Modal（全屏遮罩），内容包括：
- 项目背景（1段）
- 核心亮点（3-4条）
- 技术栈标签
- GitHub 链接
- 占位图区域（暂时留空，后续放截图）

遮罩：`rgba(0,0,0,0.85) + backdrop-filter: blur(8px)`，Modal 本身 `max-width: 680px，border-radius: 16px`，点击遮罩或 ESC 关闭。

---

**三个项目数据**：

| 字段 | AI 量化交易系统 | ETH 异常检测 | PersonaSphere |
|------|----------------|-------------|---------------|
| 编号 | 01 | 02 | 03 |
| 状态 | 进行中 | 已完成 | 已完成 |
| GitHub | /ETHanomaly（暂用） | /ETHanomaly | /PersonaSphere |
| 核心词 | 信号系统, 回测, 风控 | 链上分析, 统计异常检测 | 图结构, LLM抽取 |

---

### 5.4 思考页（`/blog`）

**暂时只放 1 篇占位文章**，不需要 CMS，用本地 Markdown 文件 + `react-markdown` 渲染即可。

**列表页**：卡片式，每张卡片：

```
[日期，JetBrains Mono，--text-muted]
2025.12

[标题，Syne 700，20px]
做回测时踩过的第一个坑：look-ahead bias

[摘要，DM Sans，--text-secondary，2行]
以为策略有 alpha，结果发现用了未来数据...

[阅读 →]
```

**文章详情页**：`max-width: 680px，margin: 0 auto`，`line-height: 1.9`，代码块用 `JetBrains Mono` + `background: #161616`，h1/h2 用 Syne。

---

### 5.5 联系页（`/contact`）

**布局**：居中，`max-width: 560px`

```
[大标题]
打个招呼 / Say Hi

[副标题，--text-secondary]
找实习 / 合作 / 随便聊都行

[联系方式，大按钮行式排列]

[Email 按钮]    → 3137933563@qq.com
[GitHub 按钮]   → github.com/Fisheraaa
```

按钮样式：`display: flex; align-items: center; gap: 12px; border: 1px solid var(--border); padding: 16px 24px; border-radius: 8px; width: 100%; margin-bottom: 12px`，hover 时 border 变 `--accent`，左侧 icon 变 `--accent`。

点击 Email 按钮：`mailto:` 链接。
点击 GitHub：新标签页打开。

---

## 六、国际化（i18n）实现方式

使用 `react-i18next`。

```
/src/i18n/
  zh.json     ← 中文（默认）
  en.json     ← 英文
```

切换逻辑：
- 默认读 `localStorage.getItem('lang') || 'zh'`
- 切换时写入 `localStorage`，整站同步更新
- 导航栏右上角 `[EN]` / `[中]` 按钮触发

需要翻译的内容：导航标签、Hero 文字、关于页文字、项目描述、联系页文字。
**不需要翻译的**：项目名、技术栈标签、GitHub 链接、日期。

---

## 七、页面切换动效

使用 Framer Motion `AnimatePresence`，包裹 `<Routes>`。

每个页面组件的进入动画：

```js
// 统一的页面动画 variant
const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.2 } }
}
```

每个页面 wrap 一个 `<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">`。

---

## 八、文件结构建议

```
/src
  /components
    Navbar.jsx
    Footer.jsx
    ProjectCard.jsx
    ProjectModal.jsx
    Timeline.jsx
    Tag.jsx
    LanguageToggle.jsx
    PageWrapper.jsx      ← 统一页面动画容器
  /pages
    Hero.jsx
    About.jsx
    Projects.jsx
    Blog.jsx
    BlogPost.jsx
    Contact.jsx
  /i18n
    index.js
    zh.json
    en.json
  /data
    projects.js          ← 项目数据，统一管理
    blogPosts.js
  /styles
    globals.css          ← CSS 变量、reset
    fonts.css
  App.jsx
  main.jsx
```

---

## 九、GitHub Pages 部署配置

```js
// vite.config.js
export default {
  base: '/',   // 用了自定义域名 fisheraaa.github.io 时 base 为 '/'
  build: { outDir: 'dist' }
}
```

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: 18 }
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

React Router 需要在 `public/` 下加一个 `404.html`（内容与 `index.html` 相同），处理 GitHub Pages 的 SPA 路由刷新 404 问题。

---

## 十、补充说明

- **无障碍**：所有交互元素加 `aria-label`，颜色对比度满足 WCAG AA
- **性能**：图片懒加载，字体用 `font-display: swap`，代码分包（React.lazy + Suspense）
- **SEO**：每个页面用 `react-helmet` 设置独立 `<title>` 和 `<meta description>`
- **暗色专属**：不需要亮色模式，整站纯暗色

---

*设计规范 v1.0 — 如有疑问找设计方确认*
