import { useState } from 'react';
import { motion } from 'framer-motion';
import CvModal from '../components/CvModal';
import { useTranslation } from 'react-i18next';
import './About.css';

/* ── 竞赛时间线 ── */
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

/* ── 按分类组织的 Tech Stack ── */
const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const ic  = (name, file) => ({ name, src:`${DEV}/${file}` });

const SKILL_CATS_ZH = [
  {
    label: '编程语言',
    chips: [
      ic('Python','python/python-original.svg'),
      ic('Java','java/java-original.svg'),
      ic('C','c/c-original.svg'),
      ic('JavaScript','javascript/javascript-original.svg'),
      ic('HTML','html5/html5-original.svg'),
      ic('CSS','css3/css3-original.svg'),
      ic('PHP','php/php-original.svg'),
      ic('MySQL','mysql/mysql-original.svg'),
    ],
  },
  {
    label: '机器学习',
    chips: [
      ic('PyTorch','pytorch/pytorch-original.svg'),
      { name:'Optuna', text:true },
    ],
  },
  {
    label: '量化研究',
    chips: [
      { name:'VeighNa',    text:true },
      { name:'Tushare Pro',text:true },
      { name:'Streamlit',  text:true },
      { name:'Plotly',     text:true },
    ],
  },
  {
    label: '工程',
    chips: [
      ic('Docker','docker/docker-original.svg'),
      ic('Git','git/git-original.svg'),
      ic('Linux','linux/linux-original.svg'),
      { name:'WSL2',   text:true },
      { name:'Web3.py',text:true },
    ],
  },
  {
    label: '其他工具',
    chips: [
      { name:'KNIME', text:true },
      { name:'LaTeX', text:true },
    ],
  },
];

const SKILL_CATS_EN = [
  {
    label: 'Languages',
    chips: SKILL_CATS_ZH[0].chips,
  },
  {
    label: 'Machine Learning',
    chips: SKILL_CATS_ZH[1].chips,
  },
  {
    label: 'Quant Research',
    chips: SKILL_CATS_ZH[2].chips,
  },
  {
    label: 'Engineering',
    chips: SKILL_CATS_ZH[3].chips,
  },
  {
    label: 'Other Tools',
    chips: SKILL_CATS_ZH[4].chips,
  },
];

/* ── 方法论（按 CV 原文）── */
const METHODS_ZH = [
  {
    label: '量化 / 建模',
    items: ['TOPSIS、层次分析法（AHP）','蒙特卡洛模拟、马尔可夫链','回测基础原理与风控指标'],
  },
  {
    label: '数据科学',
    items: ['数据清洗、特征工程','可视化、ML 建模','Python + KNIME 全流程'],
  },
  {
    label: 'AI 工作流',
    items: ['LLM 辅助开发（Claude + Codex）','claude code CLI vibe coding'],
  },
  {
    label: '工程 / 通识',
    items: ['Docker + WSL2 容器化部署','Git 版本控制','行研流程（PC 端游产业）','Web3 基础知识'],
  },
];
const METHODS_EN = [
  {
    label: 'Quant / Modeling',
    items: ['TOPSIS, Analytic Hierarchy Process (AHP)','Monte Carlo simulation, Markov chain','Backtesting principles & risk metrics'],
  },
  {
    label: 'Data Science',
    items: ['Data cleaning & feature engineering','Visualisation & ML modelling','Python + KNIME end-to-end'],
  },
  {
    label: 'AI Workflow',
    items: ['LLM-assisted development (Claude + Codex)','claude code CLI vibe coding'],
  },
  {
    label: 'Engineering',
    items: ['Docker + WSL2 containerised deployment','Git version control','Industry research (PC gaming sector)','Web3 fundamentals'],
  },
];

const fade = (d=0) => ({
  initial:{opacity:0,y:18}, animate:{opacity:1,y:0},
  transition:{duration:0.5,ease:[0.16,1,0.3,1],delay:d},
});

export default function About({ embedded=false }) {
  const { i18n } = useTranslation();
  const isZh     = i18n.language === 'zh';
  const tl       = isZh ? TL_ZH       : TL_EN;
  const cats     = isZh ? SKILL_CATS_ZH : SKILL_CATS_EN;
  const methods  = isZh ? METHODS_ZH  : METHODS_EN;
  const [cvOpen, setCvOpen] = useState(false);

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

            {/* 左：描述（更宽，行距更大）*/}
            <div className="about-lead-col">
              <p className="about-lead">
                {isZh ? (
                  <>
                    对 AI-related 的东西都感兴趣；<br/>
                    喜欢弄清模糊背后的东西是什么。<br/><br/>
                    虽是 CS，但主要在学<br/>
                    AI-related / 量化 / 数学统计的深刻理解 / 行为经济 / Web3<br/><br/>
                    做过技术线 + LLM 的交易推送系统、<br/>
                    A 股多因子框架完整链路、四模型集成的日内预测、<br/>
                    Binance Perp 跨市场的特质均值回归、<br/>
                    YouTube 全球市场和成功创作者的数据科学研究……<br/><br/>
                    大多为个人项目，对全链有些感觉。<br/>
                    倒不是局限于这几个 tag，持续挖掘兴趣点 ing
                  </>
                ) : (
                  <>
                    Interested in everything AI-related;<br/>
                    enjoy figuring out what's behind the fuzzy.<br/><br/>
                    Though a CS major, mainly studying<br/>
                    AI / quant / mathematical statistics / behavioural economics / Web3<br/><br/>
                    Built: a LLM-powered trading signal system,<br/>
                    a complete A-share multi-factor pipeline,<br/>
                    a four-model intraday ensemble,<br/>
                    Binance Perp cross-market idiosyncratic mean reversion,<br/>
                    and a data science study on YouTube global markets…<br/><br/>
                    Mostly solo projects — I have a sense of how the full stack fits.<br/>
                    Not limited to these tags — continuously exploring.
                  </>
                )}
              </p>
            </div>

            {/* 右：元信息，GPA 分两行 */}
            <div className="about-meta-kv">
              <div className="kv-row">
                <span className="mk">{isZh?'教育':'Education'}</span>
                <div className="kv-val">
                  <b>{isZh?'香港浸会大学（珠海）':'HKBU (Zhuhai)'}</b>
                  <span className="kv-sub">{isZh?'计算机科学与技术 — 29 届':'Computer Science — Class of 2029'}</span>
                </div>
              </div>
              <div className="kv-row">
                <span className="mk">GPA</span>
                <div className="kv-val">
                  <b>CGPA 3.85 / 4.0</b>
                  <span className="kv-sub">{isZh?'专业前 2% | 数学及 CS 专业课满绩':'Top 2% | Full marks in Math & CS core'}</span>
                </div>
              </div>
              <div className="kv-row">
                <span className="mk">{isZh?'方向':'Target'}</span>
                <div className="kv-val">
                  <b>Quant Strategy · PM · AI</b>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 竞赛 ── */}
        <motion.div className="about-block" {...fade(embedded?0.06:0.1)}>
          <h2 className="about-sub-title">{isZh?'竞赛':'Competitions'}</h2>
          <div className="timeline">
            {tl.map((item,i)=>(
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

        {/* ── 技能（分类框框 + 方法论）── */}
        <motion.div className="about-block" {...fade(embedded?0.1:0.14)}>
          <h2 className="about-sub-title">{isZh?'技能':'Skills'}</h2>

          {/* 按分类放芯片 */}
          <div className="skill-cats">
            {cats.map((cat,ci)=>(
              <div className="skill-cat" key={ci}>
                <div className="skill-cat-label">{cat.label}</div>
                <div className="skill-cat-chips">
                  {cat.chips.map(c=>(
                    <div className={`skill-chip${c.text?' skill-chip--text':''}`} key={c.name}>
                      {!c.text && <img src={c.src} alt={c.name} width="15" height="15" loading="lazy"/>}
                      <span>{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 方法论卡片 */}
          <div className="methods-grid">
            {methods.map((g,i)=>(
              <div className="method-card" key={i}>
                <div className="method-label">{g.label}</div>
                <ul className="skill-list">
                  {g.items.map((item,j)=><li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CV 下载 ── */}
        <motion.div className="about-cv-footer" {...fade(embedded?0.14:0.18)}>
          <div>
            <div className="cv-footer-label">Résumé</div>
            <div className="cv-footer-sub">{isZh?'点击下载完整简历 PDF':'Download the full résumé as PDF'}</div>
          </div>
          <button className="cv-download-btn" onClick={() => setCvOpen(true)}>
            <svg viewBox="0 0 30 24" width="24" height="19" fill="none" aria-hidden="true">
              <rect x="1.2" y="1.2" width="27.6" height="21.6" rx="3.4" stroke="currentColor" strokeWidth="1.6"/>
              <text x="15" y="15.7" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="currentColor">CV</text>
            </svg>
            <span>{isZh?'下载 PDF':'Download PDF'}</span>
            <span className="cv-btn-arr">↗</span>
          </button>
          <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
        </motion.div>

      </div>
    </motion.section>
  );
}
