import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';

/* ── 时间线 ── */
const TL_ZH = [
  { date:'2025.09 — 至今',  title:'香港浸会大学（珠海校区）', sub:'计算机科学与技术 · CGPA 3.85 / 4.0' },
  { date:'2026.02',         title:'MCM 美国大学生数学建模竞赛', sub:'Meritorious（Top ~7%）' },
  { date:'2025.11',         title:'BNBU 程序设计大赛',          sub:'银奖' },
  { date:'2024.11',         title:'全国中学生数学联赛',          sub:'广东省三等奖（裸考）' },
];
const TL_EN = [
  { date:'2025.09 — Present', title:'Hong Kong Baptist University (Zhuhai Campus)', sub:'Computer Science · CGPA 3.85 / 4.0' },
  { date:'2026.02',           title:'MCM Mathematical Contest in Modeling', sub:'Meritorious (Top ~7%)' },
  { date:'2025.11',           title:'BNBU Programming Contest', sub:'Silver Award' },
  { date:'2024.11',           title:'National HS Mathematics League', sub:'Guangdong Province 3rd Prize' },
];

/* ── 技能 — 小图标+文字 chip 形式 ── */
const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const CHIPS = [
  { name:'Python',  src:`${DEV}/python/python-original.svg`  },
  { name:'PyTorch', src:`${DEV}/pytorch/pytorch-original.svg`},
  { name:'React',   src:`${DEV}/react/react-original.svg`    },
  { name:'FastAPI', src:`${DEV}/fastapi/fastapi-original.svg`},
  { name:'Docker',  src:`${DEV}/docker/docker-original.svg`  },
  { name:'Git',     src:`${DEV}/git/git-original.svg`        },
  { name:'Linux',   src:`${DEV}/linux/linux-original.svg`    },
  { name:'MySQL',   src:`${DEV}/mysql/mysql-original.svg`    },
];
/* 量化工具：devicon 没有，用文字标签 */
const QUANT_TAGS = ['XGBoost','Pandas','statsmodels','Kalman/RLS','Optuna','Web3.py','LaTeX'];

const SKILLS_ZH = [
  { label:'量化 / 建模',   items:['MACD、ARIMA 等技术分析','Walk-Forward 验证','Sharpe、MDD 风控指标','Kalman / RLS 动态 beta 估计','蒙特卡洛 / TOPSIS / AHP'] },
  { label:'编程',          items:['Python（主）、C、Java、JS','Pandas 数据处理 · SQL / MySQL','Linux · Docker · WSL2 · Git','React · FastAPI · Streamlit'] },
  { label:'AI 工作流',     items:['Claude 分析 + Codex 编码','Prompt engineering','Vibe coding 快速原型'] },
  { label:'通识 / 工具',   items:['Web3.py · LaTeX · Notion','行研经验（PC 端游产业）','KNIME 工作流'] },
];
const SKILLS_EN = [
  { label:'Quant / Modeling', items:['MACD, ARIMA, technical analysis','Walk-Forward validation','Sharpe, MDD risk metrics','Kalman / RLS dynamic beta','Monte Carlo / TOPSIS / AHP'] },
  { label:'Programming',      items:['Python (primary), C, Java, JS','Pandas · SQL / MySQL','Linux · Docker · WSL2 · Git','React · FastAPI · Streamlit'] },
  { label:'AI Workflow',      items:['Claude + Codex workflow','Prompt engineering','Vibe coding rapid prototyping'] },
  { label:'Tools',            items:['Web3.py · LaTeX · Notion','Industry research (PC gaming)','KNIME workflows'] },
];

const fade = (d = 0) => ({ initial:{opacity:0,y:18}, animate:{opacity:1,y:0}, transition:{duration:0.5, ease:[0.16,1,0.3,1], delay:d} });

export default function About({ embedded = false }) {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const tl    = isZh ? TL_ZH : TL_EN;
  const sk    = isZh ? SKILLS_ZH : SKILLS_EN;

  return (
    <motion.section
      className={`about-section${embedded ? ' about-embedded' : ''}`}
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
    >
      <div className="about-inner">

        {/* 页面标题 — embedded 时隐藏 */}
        {!embedded && (
          <motion.h1 className="about-page-title" {...fade(0)}>
            {isZh ? '关于我' : 'About'}
          </motion.h1>
        )}

        {/* 简介 + 元信息 */}
        <motion.div className="about-intro" {...fade(embedded ? 0 : 0.06)}>
          {!embedded && <div className="about-whoami">&gt; whoami</div>}
          <div className="about-intro-grid">
            <p className="about-lead">
              {isZh
                ? '香港浸会大学（珠海校区）计算机科学与技术的大一。喜欢弄清模糊背后的东西是什么——一个信号？一个概念？还是一种全新的理解与认知？从数据采集到回测，从特征工程到模型解释，倾向于先把整个管道跑通，再追问每一步的前提是否成立。'
                : "First-year CS student at HKBU, Zhuhai Campus. I like figuring out what's behind the fuzzy — a signal? a concept? or an entirely new way of understanding something? From data ingestion to backtesting, from feature engineering to model interpretation, I prefer getting the full pipeline running before questioning each step."}
            </p>
            <div className="about-meta-kv">
              <p><span className="mk">{isZh?'学校':'School'}</span><b>{isZh?'香港浸会大学（珠海校区）':'HKBU, Zhuhai Campus'}</b></p>
              <p><span className="mk">{isZh?'专业':'Major'}</span><b>{isZh?'计算机科学与技术':'Computer Science'}</b></p>
              <p><span className="mk">GPA</span><b>3.85 / 4.0</b></p>
              <p><span className="mk">{isZh?'方向':'Target'}</span><b>Quant Strategy · PM · AI</b></p>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack — 小图标+文字 */}
        <motion.div className="about-block" {...fade(embedded ? 0.06 : 0.1)}>
          <h2 className="about-sub-title">Tech Stack</h2>
          <div className="chips-grid">
            {CHIPS.map(c => (
              <div className="skill-chip" key={c.name}>
                <img src={c.src} alt={c.name} width="16" height="16" loading="lazy" />
                <span>{c.name}</span>
              </div>
            ))}
            {QUANT_TAGS.map(t => (
              <div className="skill-chip skill-chip--text" key={t}><span>{t}</span></div>
            ))}
          </div>
        </motion.div>

        {/* 时间线 */}
        <motion.div className="about-block" {...fade(embedded ? 0.1 : 0.14)}>
          <h2 className="about-sub-title">{isZh?'教育 & 竞赛':'Education & Awards'}</h2>
          <div className="timeline">
            {tl.map((item, i) => (
              <motion.div key={i} className="tl-item"
                initial={{ opacity:0, x:-12 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay:0.18 + i*0.08, duration:0.4, ease:[0.16,1,0.3,1] }}>
                <div className="tl-date">{item.date}</div>
                <div className="tl-title">{item.title}</div>
                <div className="tl-sub">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 技能详情 */}
        <motion.div className="about-block" {...fade(embedded ? 0.14 : 0.18)}>
          <h2 className="about-sub-title">{isZh?'技能':'Skills'}</h2>
          <div className="skills-grid">
            {sk.map((g, i) => (
              <div className="skill-card" key={i}>
                <div className="skill-card-label">{g.label}</div>
                <ul className="skill-list">
                  {g.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CV 下载 */}
        <motion.div className="about-cv-footer" {...fade(embedded ? 0.18 : 0.22)}>
          <div>
            <div className="cv-footer-label">Résumé</div>
            <div className="cv-footer-sub">{isZh?'点击下载完整简历 PDF':'Download the full résumé as PDF'}</div>
          </div>
          <a id="resume-foot" href="/resume.pdf" target="_blank" rel="noopener" className="cv-download-btn">
            <svg viewBox="0 0 30 24" width="24" height="19" fill="none" aria-hidden="true">
              <rect x="1.2" y="1.2" width="27.6" height="21.6" rx="3.4" stroke="currentColor" strokeWidth="1.6"/>
              <text x="15" y="15.7" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="currentColor">CV</text>
            </svg>
            <span>{isZh?'下载 PDF':'Download PDF'}</span>
            <span className="cv-btn-arr">↗</span>
          </a>
        </motion.div>

      </div>
    </motion.section>
  );
}
