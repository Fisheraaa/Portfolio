# Portfolio — Yu Qiuxing

个人主页。React + Vite 构建，双语（中/英），部署在 GitHub Pages。

Live: **https://fisheraaa.github.io/Portfolio/**

---

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 19 + Vite 8 |
| 路由 | React Router v7（HashRouter） |
| 动画 | Framer Motion |
| 国际化 | i18next + react-i18next |
| 数学渲染 | KaTeX |
| 部署 | GitHub Actions → GitHub Pages |
| 备用部署 | Cloudflare Workers（wrangler） |

---

## 文件结构

```
/
├── .github/
│   └── workflows/deploy.yml       # CI/CD：push main 自动 build → GitHub Pages
│
├── public/
│   ├── 404.html                   # GitHub Pages SPA fallback：把直接访问路由的404重定向到 index.html#path
│   ├── favicon.svg                # 网站图标
│   └── icons.svg                  # SVG sprite（当前未被任何源码引用，可清理）
│
├── src/
│   ├── main.jsx                   # 入口：挂载 HashRouter + HelmetProvider，初始化 i18n，导入全局样式
│   ├── App.jsx                    # 路由表 + 全局布局（Starfield / Navbar / main / Footer），所有页面懒加载
│   │
│   ├── assets/images/             # 项目截图（AI_Trader / ETHanomaly / PersonaSphere），由 projects.js 引用
│   │
│   ├── components/
│   │   ├── Navbar.jsx + .css      # 顶部导航栏：路由链接、中/英切换按钮、移动端汉堡菜单，滚动后加背景模糊
│   │   ├── Footer.jsx             # 固定在底部的极简状态栏（BNU-HKBU · SYS_OK · © 2026）
│   │   ├── Starfield.jsx          # 全局背景层：Canvas 星空 + 流星 + 鼠标跟随光晕 + 网格 + 浮动 quant 标注文字
│   │   ├── ProjectModal.jsx + .css # 项目详情全屏 Modal：背景/高亮/Tech Stack/GitHub 链接，支持报告链接或截图占位
│   │   │
│   │   │   ── 以下五个组件当前未被实际页面引用，属于遗留/草稿文件 ──
│   │   ├── ProjectCard.jsx        # ⚠️ 未使用：旧版项目卡片组件，Projects.jsx 已将卡片 JSX 内联实现
│   │   ├── Tag.jsx                # ⚠️ 未使用：仅被 ProjectCard.jsx 引用（ProjectCard 本身也未使用）
│   │   ├── Timeline.jsx           # ⚠️ 未使用：硬编码时间线，About.jsx 已改为数据驱动实现
│   │   ├── LanguageToggle.jsx     # ⚠️ 未使用：独立语言切换按钮，功能已内置于 Navbar.jsx
│   │   └── PageWrapper.jsx        # ⚠️ 未使用：Framer Motion 页面包装器，仅被 BlogPost.jsx（stub）引用
│   │
│   ├── data/
│   │   ├── projects.js            # 5个项目的完整数据：标题/标签/状态/GitHub/截图/双语描述+亮点
│   │   └── blogPosts.js           # 博客文章数据：结构化 section + block（支持 text/math/quote/bullets 类型）
│   │
│   ├── i18n/
│   │   ├── index.js               # i18next 初始化：读 localStorage['lang']，默认 'zh'
│   │   ├── zh.json                # 中文字符串（导航/Hero/About/Projects/Blog/Contact）
│   │   └── en.json                # 英文字符串（同上）
│   │
│   ├── pages/
│   │   ├── Hero.jsx + .css        # 首页：左列（badge/标题/角色标签/CTA按钮）+ 右列（Canvas 价格图 + 星座 SVG）
│   │   ├── About.jsx + .css       # 关于页：whoami 文本块 + 双语时间线（教育/竞赛）+ 4列技能矩阵
│   │   ├── Projects.jsx + .css    # 项目页：卡片网格，点击卡片弹出 ProjectModal 详情
│   │   ├── Blog.jsx + .css        # 思考页：博客卡片列表，点击弹出内联 Modal（支持 KaTeX 数学公式）
│   │   ├── Contact.jsx + .css     # 联系页：一键复制邮件 + GitHub 跳转链接
│   │   └── BlogPost.jsx           # ⚠️ stub：路由 /blog/:slug 存在但只渲染硬编码 md 字符串，非真实博客系统
│   │
│   ├── content/
│   │   └── look-ahead-bias.md     # ⚠️ 未使用：本意是 BlogPost 的 md 源文件，但从未被任何组件 import
│   │
│   └── styles/
│       ├── globals.css            # 设计令牌（CSS 变量：颜色/字体/间距）、全局 reset、公共工具类（.btn-primary/.card-corner 等）
│       └── fonts.css              # ⚠️ 冗余：仅一行 Google Fonts @import，与 globals.css 第一行和 index.html <link> 三重重复
│
├── index.html                     # HTML 入口：页面标题、Google Fonts preconnect、挂载 #root
├── vite.config.js                 # base: '/Portfolio/'（production），outDir: dist
├── wrangler.jsonc                 # Cloudflare Workers 配置（npm run preview/deploy 用）
├── eslint.config.js               # ESLint 规则
├── package.json
├── package-lock.json
│
│   ── 以下为规划文档，不参与构建 ──
├── portfolio_design_spec.md       # 设计规格文档（色彩/字体/组件设计意图）
└── portfolio_proposal.md          # 项目初期提案文档
```

---

## 路由结构

| 路由 | 组件 | 说明 |
|------|------|------|
| `#/` | `Hero` | 首页 |
| `#/about` | `About` | 关于我 |
| `#/projects` | `Projects` | 项目展示 |
| `#/blog` | `Blog` | 博客/思考 |
| `#/blog/:slug` | `BlogPost` | ⚠️ stub，当前未接真实内容 |
| `#/contact` | `Contact` | 联系方式 |

使用 **HashRouter**（`/#/about` 风格），GitHub Pages 无需服务端配置即可支持客户端路由。`public/404.html` 提供额外兜底（直接访问子路径时 GitHub 返回 404，由此重定向回 `index.html#path`）。

---

## 博客内容系统

博客文章存储在 `src/data/blogPosts.js`，以结构化 JS 对象组织，每篇文章包含：

```js
{
  id, date, tags,
  titleZh, titleEn,
  summaryZh, summaryEn,
  sections: [
    {
      titleZh, titleEn,
      contentZh: [ { type: 'text'|'math'|'quote'|'bullets', text/items } ],
      contentEn: [ ... ]
    }
  ]
}
```

`Blog.jsx` 直接消费此数据，点击卡片弹出内联 Modal，`math` 类型 block 由 KaTeX 渲染。

`BlogPost.jsx`（路由 `/blog/:slug`）是早期遗留的 markdown 方案 stub，**目前没有接入真实数据**，可按需重构或删除。

---

## 部署

### GitHub Pages（当前主部署）

push 到 `main` 自动触发 `.github/workflows/deploy.yml`：

```
npm ci → npm run build → upload dist/ → deploy to GitHub Pages
```

`vite.config.js` 中 `base: '/Portfolio/'` 确保资源路径正确。

### Cloudflare Workers（备用）

```bash
npm run preview   # 本地用 wrangler 预览
npm run deploy    # build + wrangler deploy 到 CF Workers
```

> 注意：切换到 CF 部署时需把 `vite.config.js` 的 `base` 改为 `'/'`。

---

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 输出到 dist/
npm run lint
```

---

## 可清理项

以下文件可以安全删除，不影响任何实际功能：

| 文件 | 原因 |
|------|------|
| `src/components/ProjectCard.jsx` | Projects.jsx 已内联实现卡片，此文件未被引用 |
| `src/components/Tag.jsx` | 仅 ProjectCard.jsx 引用，ProjectCard 本身已废弃 |
| `src/components/Timeline.jsx` | About.jsx 已用数据驱动实现替代 |
| `src/components/LanguageToggle.jsx` | 功能已内置于 Navbar.jsx |
| `src/components/PageWrapper.jsx` | 仅 BlogPost.jsx（stub）引用 |
| `src/content/look-ahead-bias.md` | 从未被 import，BlogPost.jsx 有自己的 hardcoded 内容 |
| `src/styles/fonts.css` | 单行 @import，与 globals.css 和 index.html 三重重复 |
| `public/icons.svg` | 未被任何源码引用 |
| `dist/`（git tracked） | CI/CD 每次 push 重新构建，无需提交到仓库；建议加入 `.gitignore` |
