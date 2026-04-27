# Personal Portfolio — Design & Development Proposal
## For: Yu Qiuhang | Target Roles: Quant Trader / Strategy / PM / Algorithm

---

## 0. 一句话定位

> 这个网站不是"作品集"，是一张**会动的名片**。
> 打开的第一眼必须让人感觉：这个人活在数据和决策之间。

---

## 1. 整体视觉方向（Vibe）

**关键词：** Dark Terminal · Data Flow · Precision · Signal

想象你打开 Bloomberg Terminal，然后有人把它做成了 2025 年的审美——  
深黑背景、绿色/青色数字流动、数据点在空间里漂浮、每一个点击都有响应感。  
但不是赛博朋克那种廉价霓虹，而是**金融科技公司内部工具的质感**：克制、精准、有深度。

**参考情绪板：**
- Bloomberg Terminal 的信息密度
- Jane Street / Two Sigma 官网的极简感
- 粒子漂浮（Particles.js 风格但更克制）
- 数字雨但只是背景噪声，不抢主体

---

## 2. 技术栈（交给 coder 的规格）

```
Framework:   React 18 + Vite
Routing:     React Router v6
Animation:   Framer Motion（页面切换 + 组件动效）
Particles:   tsParticles（浮动粒子背景）
Styling:     Tailwind CSS + CSS Variables（自定义主题）
Font:        Google Fonts（见 §4）
Deployment:  GitHub Pages via gh-pages npm package
             域名: fisheraaa.github.io（暂时，后续可绑自定义域名）
```

**依赖安装清单（直接复制给 coder）：**
```bash
npm create vite@latest portfolio -- --template react
cd portfolio
npm install framer-motion react-router-dom @tsparticles/react @tsparticles/slim
npm install -D tailwindcss postcss autoprefixer gh-pages
npx tailwindcss init -p
```

---

## 3. 文件结构

```
portfolio/
├── public/
│   └── assets/
│       ├── avatar.jpg          ← 你的照片（可选）
│       └── projects/
│           ├── ai-trader.gif   ← 项目演示截图/gif
│           ├── eth-anomaly.png
│           └── personasphere.png
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ParticleBackground.jsx
│   │   ├── TerminalText.jsx    ← 打字机组件
│   │   ├── ProjectCard.jsx
│   │   └── FloatingTag.jsx     ← 技能浮动标签
│   ├── pages/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Blog.jsx            ← 可后期再加
│   │   └── Contact.jsx
│   ├── data/
│   │   ├── projects.js         ← 项目数据（方便后期只改这一个文件）
│   │   └── skills.js
│   ├── styles/
│   │   └── globals.css         ← CSS Variables 定义在这里
│   └── App.jsx
└── package.json
```

---

## 4. 设计规范（Design Tokens）

### 4.1 颜色系统

```css
/* globals.css — CSS Variables */
:root {
  --bg-primary:    #080b0f;   /* 主背景：几乎纯黑，带极淡蓝调 */
  --bg-secondary:  #0d1117;   /* 卡片背景：GitHub 同款深色 */
  --bg-hover:      #161b22;   /* hover 态背景 */

  --accent-green:  #00d4aa;   /* 主强调色：青绿（Bloomberg 数字感）*/
  --accent-blue:   #3b82f6;   /* 次强调色：亮蓝（链接/按钮） */
  --accent-amber:  #f59e0b;   /* 第三强调色：琥珀（警示/highlight） */

  --text-primary:  #e6edf3;   /* 主文字：带淡蓝调的近白色 */
  --text-secondary:#8b949e;   /* 次级文字：GitHub 灰 */
  --text-muted:    #484f58;   /* 弱化文字：时间、标签 */

  --border:        #21262d;   /* 边框色 */
  --glow-green:    rgba(0, 212, 170, 0.15);  /* 绿色辉光（卡片hover） */
  --glow-blue:     rgba(59, 130, 246, 0.15); /* 蓝色辉光 */
}
```

**用色逻辑：**
- 背景永远深黑，绝不加渐变色背景
- `--accent-green` 用于：正在运行的状态、数字、关键词高亮
- `--accent-blue` 用于：按钮、链接、导航激活态
- `--accent-amber` 用于：重要标签（如 "In Progress"）
- 卡片 hover 时加 `box-shadow: 0 0 20px var(--glow-green)` 辉光效果

### 4.2 字体

```css
/* Google Fonts 引入（在 index.html <head> 里加） */
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">

/* 字体用途 */
--font-display: 'Syne', sans-serif;      /* 大标题、名字、导航：几何感强 */
--font-mono:    'Space Mono', monospace; /* 代码、技术栈、数字：终端感 */
--font-body:    'Inter', sans-serif;     /* 正文、描述：可读性优先 */
```

**字号规范：**
```
名字（Hero）:    5rem / 80px   font-display  font-weight: 800
Section Title:  2.5rem / 40px  font-display  font-weight: 700
Card Title:     1.25rem / 20px font-display  font-weight: 600
Body Text:      1rem / 16px    font-body     font-weight: 400
Mono/Code:      0.875rem / 14px font-mono
Tag/Label:      0.75rem / 12px  font-mono     UPPERCASE + letter-spacing: 0.1em
```

### 4.3 间距与圆角

```
卡片圆角:    8px（不要太圆，保持棱角感）
按钮圆角:    4px
内边距(卡片): 24px
Section间距: 120px（桌面端）/ 80px（移动端）
```

---

## 5. 全局动效规范（交给 coder 的 Framer Motion 配置）

### 5.1 页面切换动效

```jsx
// 所有页面共用这个 variants，在 App.jsx 里统一配置
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.25 } }
};
// 包裹每个页面组件：
<AnimatePresence mode="wait">
  <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
    <Outlet />
  </motion.div>
</AnimatePresence>
```

### 5.2 进场动效（Stagger）

每个 Section 的子元素依次出现，不要同时出现：

```jsx
// 容器
const container = {
  animate: { transition: { staggerChildren: 0.08 } }
};
// 子元素
const item = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
```

### 5.3 浮动粒子背景（全站共用）

```jsx
// ParticleBackground.jsx 核心配置
const particleOptions = {
  background: { color: { value: "transparent" } },
  particles: {
    number:  { value: 60, density: { enable: true, area: 900 } },
    color:   { value: ["#00d4aa", "#3b82f6", "#8b949e"] },
    opacity: { value: 0.25, random: true },       // 很淡，是背景噪声不是主角
    size:    { value: { min: 1, max: 2.5 } },     // 小点，不要大圆
    move: {
      enable: true, speed: 0.4,                   // 极慢漂浮
      direction: "none", random: true, outModes: "out"
    },
    links: {
      enable: true,                               // 粒子间连线
      distance: 140, color: "#21262d",            // 连线用边框色，很淡
      opacity: 0.3, width: 0.5
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },    // 鼠标靠近时吸附粒子
      onClick:  { enable: false }
    },
    modes: { grab: { distance: 140, links: { opacity: 0.6 } } }
  }
};
```

---

## 6. 页面详细规格

---

### 6.1 Navbar（全站固定顶部）

**布局：** 左边 Logo 文字，右边导航链接  
**样式：** `background: rgba(8,11,15,0.85)` + `backdrop-filter: blur(12px)` + 底部 1px border  
**Logo：** `YU` 用 Space Mono 字体，前面加一个闪烁的绿色光标 `_`（CSS animation blink）  

```
导航项：  /  About  Projects  Blog  Contact
激活态：  --accent-blue 颜色 + 底部 2px underline
hover态：  颜色过渡 0.2s
```

**移动端：** 汉堡菜单，点击展开全屏导航覆盖层（Framer Motion `AnimatePresence`）

---

### 6.2 Hero 页（`/`）

**布局：** 全屏，垂直居中，内容在左侧占 60% 宽度

**内容层（从上到下，stagger进场）：**

```
① 小标签（进场最先）
   [ > initializing signal stream..._ ]
   字体: Space Mono  颜色: --accent-green  大小: 14px
   左边加一个 3px × 14px 的绿色竖线

② 名字（主标题）
   Yu Qiuhang
   字体: Syne 800  大小: 80px  颜色: --text-primary
   "Qiuhang" 换行或比 "Yu" 小一号也可以，保留排版空间

③ 打字机动效标语（TerminalText 组件）
   循环显示以下几句（每句打出来停留2秒再删除下一句）：
   · "Building systems that make decisions."
   · "CS student → Quant Strategy."
   · "Data → Signal → Alpha."
   字体: Space Mono  颜色: --accent-green  大小: 22px
   末尾加一个闪烁光标 ▋

④ 简短介绍（一段话）
   Year 1 CS @ HKBU-BNU · GPA 3.83/4.0
   Interested in quant strategy, systematic trading, and decision systems.
   字体: Inter 400  颜色: --text-secondary  大小: 16px

⑤ 两个按钮（横排）
   [ View Projects → ]   样式：--accent-blue 背景，hover 时背景加深 + 轻微上移
   [ About Me ]          样式：透明背景 + border，hover 时背景 --bg-hover
```

**右侧装饰（纯视觉，不放个人信息）：**  
一个模拟终端窗口 `div`，里面显示滚动的伪代码/数据流：

```
$ python ai_trader.py --mode live
> [09:32:01] Fetching MACD signals...
> [09:32:02] LLM debate: BUY signal confirmed (confidence: 0.87)
> [09:32:03] Risk check: drawdown within limit ✓
> [09:32:03] Pushing to Feishu bot...
> [09:32:04] Signal dispatched.
$  _
```

文字用 `--accent-green` 颜色，每行用 JS `setInterval` 依次出现，循环播放。  
终端窗口有3个 macOS 风格小圆点（红/黄/绿）在左上角。

---

### 6.3 About 页（`/about`）

**布局：** 两列，左 55% 右 45%，桌面端并排，移动端堆叠

**左列——文字内容：**

```
Section 标题：
  [ 02 / ABOUT ]   — Space Mono，--text-muted，12px，全大写
  About Me         — Syne 700，40px

正文段落（Inter，16px，行高 1.7）：
  "I'm a first-year CS student who builds before he studies.
   Three projects, hundreds of commits, and one clear direction:
   understanding how markets make decisions — and building systems that do the same."

时间线（垂直，左边绿色竖线）：
  2025.09  HKBU-BNU · Computer Science
           GPA 3.83/4.0 · Math & CS full marks
  2024.11  CMO · Guangdong Province 3rd Prize (cold)
  2025.11  BNBU Programming Contest · Silver
```

**右列——技能浮动标签云（FloatingTag 组件）：**

把技能做成一堆漂浮的 Tag，在容器内缓慢随机移动（Framer Motion `animate` + `useAnimate`）。  
Tag 按类别着色：

```
语言类（--accent-blue）：   Python, C, Java, TypeScript, PHP
数据科学（--accent-green）：AkShare, Pandas, KNIME, Streamlit
量化/建模（--accent-amber）：MACD, ARIMA, Monte Carlo, TOPSIS
工程（--text-secondary）：  Docker, WSL2, Git, LaTeX
Web3（紫色 #8b5cf6）：       Web3.py, Infura, Solidity基础
```

每个 Tag：`border-radius: 4px` + `border: 1px solid` + hover 时辉光

---

### 6.4 Projects 页（`/projects`）

**布局：** 3张卡片，桌面端三列，移动端单列堆叠

**卡片设计规范（ProjectCard 组件）：**

```
背景：   --bg-secondary
边框：   1px solid --border
圆角：   8px
hover：  transform: translateY(-6px) + box-shadow: 0 0 24px var(--glow-green)
过渡：   transition: all 0.3s ease
```

**每张卡片内部结构（从上到下）：**

```
① 项目截图/gif
   宽: 100%  高: 200px  object-fit: cover
   顶部圆角 8px，底部直角（与卡片内容连接）

② 标签行（State + 技术栈）
   [ IN PROGRESS ] 或 [ COMPLETED ]  — Space Mono，--accent-amber 或 --accent-green
   字号12px，全大写，左边加对应颜色小圆点（●）

③ 项目名
   Syne 600，20px，--text-primary

④ 项目描述（2-3行）
   Inter 400，14px，--text-secondary，行高 1.6

⑤ 底部链接行
   [ GitHub → ]   [ Live Demo → ]（如果有的话）
   Space Mono，12px，--accent-blue
   hover: underline
```

**三个项目的数据（放在 src/data/projects.js）：**

```js
export const projects = [
  {
    id: 1,
    name: "AI Semi-Auto Trading System",
    nameZh: "AI 量化交易系统",
    status: "IN PROGRESS",
    statusColor: "amber",
    description:
      "Event-driven signal pipeline: Data → Feature Engineering → Multi-factor Signal → Risk Check → Feishu Push. LLM debate layer filters noise. Backtest engine in progress.",
    tech: ["Python", "Docker", "AkShare", "LLM API", "Feishu API"],
    github: "https://github.com/Fisheraaa",
    demo: null,
    image: "/assets/projects/ai-trader.gif",
    highlight: true,  // 这个卡片稍大或排首位
  },
  {
    id: 2,
    name: "ETH Anomaly Detector",
    nameZh: "区块链异常检测",
    status: "COMPLETED",
    statusColor: "green",
    description:
      "On-chain transaction anomaly detection using IQR + percentile thresholds. Interactive Streamlit dashboard with address tracking and time-slice filtering.",
    tech: ["Python", "Web3.py", "Pandas", "Streamlit", "Plotly"],
    github: "https://github.com/Fisheraaa/ETHanomaly",
    demo: null,
    image: "/assets/projects/eth-anomaly.png",
  },
  {
    id: 3,
    name: "PersonaSphere",
    nameZh: "人脉管理器",
    status: "COMPLETED",
    statusColor: "green",
    description:
      "NLP-powered contact manager with LLM-extracted structured profiles, force-directed relationship graph, and conflict detection with priority resolution.",
    tech: ["FastAPI", "React", "TypeScript", "Cytoscape.js", "LLM API"],
    github: "https://github.com/Fisheraaa/PersonaSphere",
    demo: null,
    image: "/assets/projects/personasphere.png",
  }
];
```

---

### 6.5 Blog 页（`/blog`）— 后期加，先留路由占位

**现阶段：** 显示 "Coming Soon" + 一段话说明会写什么（量化笔记、项目复盘）

**未来结构：** Markdown 文件 → `gray-matter` + `react-markdown` 解析 → 列表页 + 文章详情页  
不需要数据库，文章放在 `src/content/*.md` 里即可

**推荐第一篇文章主题（写给 coder 看的 placeholder）：**  
> "Why my backtest was lying to me — look-ahead bias explained"  
这种技术+思考结合的文章，Strategy/PM 面试官看了会很有好感。

---

### 6.6 Contact 页（`/contact`）

**布局：** 居中，简洁

```
标题：    Let's Talk
副标题：  Open to quant internships, research discussions, and interesting problems.

三个联系方式（图标 + 文字，hover 时辉光）：
  📧  3137933563@qq.com
  💻  github.com/Fisheraaa
  🔗  LinkedIn（如果有就加，没有就只放两个）

小字：
  Based in Zhuhai, China · Available for remote internships
```

**不要加表单** — 邮件表单需要后端或第三方服务（如 FormSpree），对你的场景没必要，直接显示 email 更直接。

---

## 7. 响应式断点

```css
/* 移动优先，但桌面是主要目标 */
sm:  640px   /* 手机横屏 */
md:  768px   /* 平板 */
lg:  1024px  /* 桌面最小（主要设计基准）*/
xl:  1280px  /* 大桌面 */
2xl: 1536px  /* 超宽屏（Hero 字号再大一档）*/
```

**移动端主要调整：**
- Hero 名字字号：80px → 48px
- 两列布局 → 单列
- Navbar → 汉堡菜单
- 粒子数量减半（性能）

---

## 8. GitHub Pages 部署配置

**package.json 添加：**
```json
{
  "homepage": "https://fisheraaa.github.io",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**vite.config.js：**
```js
export default {
  base: '/',   // 如果用子路径改为 '/repo-name/'
}
```

**部署命令：**
```bash
npm run deploy
```

**注意：** React Router 在 GitHub Pages 上需要用 `HashRouter` 而不是 `BrowserRouter`，否则刷新页面会 404。

```jsx
// App.jsx
import { HashRouter } from 'react-router-dom';
// 用 HashRouter 替换 BrowserRouter
```

---

## 9. 给 Coder 的优先级清单

```
P0（必须有才能上线）：
  ✅ Navbar（含移动端汉堡菜单）
  ✅ Hero 页（含打字机效果 + 终端装饰窗口）
  ✅ Projects 页（3张卡片 + 数据从 projects.js 读取）
  ✅ 粒子背景（全站）
  ✅ 页面切换动效
  ✅ GitHub Pages 部署

P1（上线后迭代）：
  ⬜ About 页（技能浮动标签）
  ⬜ Contact 页
  ⬜ 移动端响应式调整

P2（有时间再加）：
  ⬜ Blog 页（先 Coming Soon 占位）
  ⬜ 项目卡片 Modal 详情弹窗
  ⬜ 自定义鼠标（crosshair 或带绿色光晕的圆点）
  ⬜ 页面滚动进度条（顶部绿色细线）
```

---

## 10. 你需要准备的素材（在 coder 开始前准备好）

```
① ai-trader.gif    — 截飞书机器人收到推送的动图，或终端运行的截图，500×300px
② eth-anomaly.png  — Streamlit 仪表板截图，1200×700px
③ personasphere.png — Cytoscape 关系网络图截图，1200×700px
④ 个人照片（可选）— 正方形，至少 400×400px，不需要正式照
⑤ 英文自我介绍段落 — 3-5句，交给 coder 放到 About 页
```

---

*Document Version: 1.0 · Prepared for developer handoff*
