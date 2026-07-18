import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';

/* ── 竞赛时间线 — 按 CV 精确核对 ── */
const TL_ZH = [
  { date:'2026.02', title:'MCM 美国大学生数学建模竞赛', sub:'Meritorious（Top ~7%）' },
  { date:'2025.11', title:'BNBU 程序设计大赛',          sub:'银奖' },
  { date:'2024.11', title:'广东省中学生数学奥林匹克竞赛（GDMO）', sub:'三等奖（裸考）' },
];
const TL_EN = [
  { date:'2026.02', title:'MCM Mathematical Contest in Modeling', sub:'Meritorious (Top ~7%)' },
  { date:'2025.11', title:'BNBU Programming Contest', sub:'Silver Award' },
  { date:'2024.11', title:'Guangdong Provincial Math Olympiad (GDMO)', sub:'3rd Prize (no prep)' },
];

/* ── Tech Chips — 按 CV 技能栏精确核对 ── */
const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

/* 有 devicon 图标的语言/工具（CV 明确列出 or 项目清晰使用）*/
const ICON_CHIPS = [
  { name:'Python',     src:`${DEV}/python/python-original.svg`      },
  { name:'Java',       src:`${DEV}/java/java-original.svg`           },
  { name:'C',          src:`${DEV}/c/c-original.svg`                 },
  { name:'JavaScript', src:`${DEV}/javascript/javascript-original.svg`},
  { name:'HTML',       src:`${DEV}/html5/html5-original.svg`         },
  { name:'CSS',        src:`${DEV}/css3/css3-original.svg`           },
  { name:'PHP',        src:`${DEV}/php/php-original.svg`             },
  { name:'MySQL',      src:`${DEV}/mysql/mysql-original.svg`         },
  { name:'Docker',     src:`${DEV}/docker/docker-original.svg`       },
  { name:'Git',        src:`${DEV}/git/git-original.svg`             },
  { name:'Linux',      src:`${DEV}/linux/linux-original.svg`         },
  /* 项目清晰使用但 CV 未单独列 */
  { name:'PyTorch',    src:`${DEV}/pytorch/pytorch-original.svg`     },
];

/* 无 devicon 的工具 — CV 技能栏或项目中明确出现 */
const TEXT_CHIPS = [
  'KNIME',      // CV: 数据科学
  'LaTeX',      // CV: 工程/通识
  'WSL2',       // CV: 工程/通识
  'Optuna',     // DayAlpha 项目（含在 CV）
  'VeighNa',    // DayAlpha 项目（含在 CV）
  'Tushare Pro',// SystematicAlpha 项目（含在 CV）
  'Streamlit',  // ETHanomaly 项目（含在 CV）
  'Plotly',     // ETHanomaly 项目（含在 CV）
  'Web3.py',    // CV: Web3基础 + ETHanomaly
];

/* ── 方法论 — 严格按 CV「个人技能」栏 ── */
const METHODS_ZH = [
  {
    label: '量化 / 建模',
    items: [
      'TOPSIS、层次分析法（AHP）',
      '蒙特卡洛模拟、马尔可夫链',
      '回测基础原理与风控指标',
    ],
  },
  {
    label: '数据科学',
    items: [
      '数据清洗、特征工程',
      '可视化、ML 建模',
      'Python + KNIME 全流程',
    ],
  },
  {
    label: 'AI 工作流',
    items: [
      'LLM 辅助开发（Claude 分析 + Codex 编码）',
      'claude code CLI vibe coding',
    ],
  },
  {
    label: '工程 / 通识',
    items: [
      'Docker + WSL2 容器化部署',
      'Git 版本控制',
      '行研流程（PC 端游产业）',
      'Web3 基础知识',
    ],
  },
];
const METHODS_EN = [
  {
    label: 'Quant / Modeling',
    items: [
      'TOPSIS, Analytic Hierarchy Process (AHP)',
      'Monte Carlo simulation, Markov chain',
      'Backtesting principles & risk metrics',
    ],
  },
  {
    label: 'Data Science',
    items: [
      'Data cleaning & feature engineering',
      'Visualisation & ML modelling',
      'Python + KNIME end-to-end',
    ],
  },
  {
    label: 'AI Workflow',
    items: [
      'LLM-assisted development (Claude + Codex)',
      'claude code CLI vibe coding',
    ],
  },
  {
    label: 'Engineering / General',
    items: [
      'Docker + WSL2 containerised deployment',
      'Git version control',
      'Industry research (PC gaming sector)',
      'Web3 fundamentals',
    ],
  },
];

const fade = (d=0) => ({
  initial:{opacity:0,y:18}, animate:{opacity:1,y:0},
  transition:{duration:0.5, ease:[0.16,1,0.3,1], delay:d},
});

export default function About({ embedded=false }) {
  const { i18n }  = useTranslation();
  const isZh      = i18n.language === 'zh';
  const tl        = isZh ? TL_ZH     : TL_EN;
  const methods   = isZh ? METHODS_ZH : METHODS_EN;
  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <motion.section
      className={`about-section${embedded?' about-embedded':''}`}
      initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
      transition={{duration:0.45,ease:[0.16,1,0.3,1]}}
    >
      <div className="about-inner">

        {!embedded && (
          <motion.h1 className="about-page-title" {...fade(0)}>
            {isZh?'关于我':'About'}
          </motion.h1>
        )}

        {/* ── whoami ── */}
        <motion.div className="about-intro" {...fade(embedded?0:0.06)}>
          {!embedded && <div className="about-whoami">&gt; whoami</div>}
          <div className="about-intro-grid">
            <div className="about-lead-block">
              <p className="about-lead">
                {isZh ? (
                  <>
                    对 AI-related 的东西都感兴趣；喜欢弄清模糊背后的东西是什么。<br/><br/>
                    虽是 CS，但主要在学 AI-related / 量化 / 数学统计的深刻理解 / 行为经济 / Web3<br/><br/>
                    做过 技术线 + LLM 的交易推送系统，A 股多因子框架完整链路，四模型集成的日内预测，Binance Perp 跨市场的特质均值回归，关于 YouTube 全球市场和成功创作者的数据科学研究…<br/><br/>
                    大多为个人项目，对全链有些感觉<br/><br/>
                    倒不是局限于这几个 tag，持续挖掘兴趣点 ing
                  </>
                ) : (
                  <>
                    Interested in everything AI-related; enjoy figuring out what's behind the fuzzy.<br/><br/>
                    Though a CS major, mainly studying AI / quant / mathematical statistics / behavioural economics / Web3<br/><br/>
                    Built: a LLM-powered trading signal system, a complete A-share multi-factor pipeline, a four-model intraday ensemble, Binance Perp cross-market idiosyncratic mean reversion, and a data science study on YouTube global markets and successful creators…<br/><br/>
                    Mostly solo projects — I have a sense of how the full stack fits together<br/><br/>
                    Not limited to these tags — continuously exploring
                  </>
                )}
              </p>
            </div>

            <div className="about-meta-kv">
              <p>
                <span className="mk">{isZh?'教育':'Education'}</span>
                <b>{isZh
                  ? '香港浸会大学（珠海）— 计算机科学与技术 — 29 届'
                  : 'HKBU (Zhuhai) — Computer Science — Class of 2029'}</b>
              </p>
              <p>
                <span className="mk">GPA</span>
                <b>{isZh
                  ? 'CGPA 3.85 / 4.0（专业前 2% | 数学及 CS 专业课满绩）'
                  : 'CGPA 3.85 / 4.0 (Top 2% | Full marks in Math & CS core)'}</b>
              </p>
              <p>
                <span className="mk">{isZh?'方向':'Target'}</span>
                <b>Quant Strategy · PM · AI</b>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 竞赛 ── */}
        <motion.div className="about-block" {...fade(embedded?0.06:0.1)}>
          <h2 className="about-sub-title">{isZh?'竞赛':'Competitions'}</h2>
          <div className="timeline">
            {tl.map((item,i) => (
              <motion.div key={i} className="tl-item"
                initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}}
                transition={{delay:0.18+i*0.08,duration:0.4,ease:[0.16,1,0.3,1]}}>
                <div className="tl-date">{item.date}</div>
                <div className="tl-title">{item.title}</div>
                <div className="tl-sub">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── 技能（图标 chips + 方法论合并）── */}
        <motion.div className="about-block" {...fade(embedded?0.1:0.14)}>
          <h2 className="about-sub-title">{isZh?'技能':'Skills'}</h2>

          <div className="chips-grid">
            {ICON_CHIPS.map(c => (
              <div className="skill-chip" key={c.name}>
                <img src={c.src} alt={c.name} width="15" height="15" loading="lazy"/>
                <span>{c.name}</span>
              </div>
            ))}
            {TEXT_CHIPS.map(t => (
              <div className="skill-chip skill-chip--text" key={t}>
                <span>{t}</span>
              </div>
            ))}
          </div>

          <div className="methods-grid">
            {methods.map((g,i) => (
              <div className="method-card" key={i}>
                <div className="method-label">{g.label}</div>
                <ul className="skill-list">
                  {g.items.map((item,j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CV 底部下载 ── */}
        <motion.div className="about-cv-footer" {...fade(embedded?0.14:0.18)}>
          <div>
            <div className="cv-footer-label">Résumé</div>
            <div className="cv-footer-sub">
              {isZh?'点击下载完整简历 PDF':'Download the full résumé as PDF'}
            </div>
          </div>
          <a id="resume-foot" href={resumeHref} target="_blank" rel="noopener"
            className="cv-download-btn">
            <svg viewBox="0 0 30 24" width="24" height="19" fill="none" aria-hidden="true">
              <rect x="1.2" y="1.2" width="27.6" height="21.6" rx="3.4"
                stroke="currentColor" strokeWidth="1.6"/>
              <text x="15" y="15.7" textAnchor="middle" fontSize="10.5"
                fontWeight="700" fill="currentColor">CV</text>
            </svg>
            <span>{isZh?'下载 PDF':'Download PDF'}</span>
            <span className="cv-btn-arr">↗</span>
          </a>
        </motion.div>

      </div>
    </motion.section>
  );
}
