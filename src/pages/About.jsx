import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';

const TIMELINE_ZH = [
  {
    date: '2025.09 — 至今',
    title: '香港浸会大学（珠海校区）',
    sub: '计算机科学与技术 · CGPA 3.83 / 4.0（数学及CS专业课满绩）',
  },
  {
    date: '2026.02',
    title: 'MCM 美国大学生数学建模竞赛',
    sub: 'Meritorious（一等奖）',
  },
  {
    date: '2025.11',
    title: 'BNBU 程序设计大赛',
    sub: '银奖',
  },
  {
    date: '2024.11',
    title: '全国中学生数学联赛',
    sub: '广东省三等奖（裸考）',
  },
];

const TIMELINE_EN = [
  {
    date: '2025.09 — Present',
    title: 'BNU-HKBU United International College (Zhuhai)',
    sub: 'Computer Science & Technology · CGPA 3.83 / 4.0 (full marks in Math & CS core courses)',
  },
  {
    date: '2026.02',
    title: 'MCM Mathematical Contest in Modeling',
    sub: 'Meritorious (Top ~7%)',
  },
  {
    date: '2025.11',
    title: 'BNBU Programming Contest',
    sub: 'Silver Award',
  },
  {
    date: '2024.11',
    title: 'National High School Mathematics League',
    sub: 'Guangdong Province Third Prize (no prep)',
  },
];

// 核心技能 — 从简历挑最有代表性的
const SKILLS_ZH = [
  { label: '量化 / 建模', items: ['MACD, ARIMA 等技术分析', 'TOPSIS, AHP, 蒙特卡洛', 'Sharpe / Max Drawdown 回测指标'] },
  { label: '编程', items: ['Python, C, Java, JS', 'HTML, CSS, PHP', 'SQL / Pandas 数据处理'] },
  { label: '工程', items: ['Docker, WSL2, Git', 'FastAPI, React, Streamlit', 'LLM API, Web3.py'] },
  { label: 'AI 工作流', items: ['Claude 分析 + Codex 编码', 'Vibe coding 快速原型', 'KNIME 数据科学全流程'] },
];

const SKILLS_EN = [
  { label: 'Quant / Modeling', items: ['MACD, ARIMA, technical analysis', 'TOPSIS, AHP, Monte Carlo', 'Sharpe, Max Drawdown backtesting'] },
  { label: 'Programming', items: ['Python, C, Java, JS', 'HTML, CSS, PHP', 'SQL / Pandas data processing'] },
  { label: 'Engineering', items: ['Docker, WSL2, Git', 'FastAPI, React, Streamlit', 'LLM API, Web3.py'] },
  { label: 'AI Workflow', items: ['Claude analysis + Codex coding', 'Vibe coding rapid prototyping', 'KNIME full data science pipeline'] },
];

export default function About() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const timeline = isZh ? TIMELINE_ZH : TIMELINE_EN;
  const skills   = isZh ? SKILLS_ZH   : SKILLS_EN;

  return (
    <motion.section
      className="about-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="about-inner">

        {/* 页面标题 */}
        <h1 className="section-title">
          {isZh ? '关于我' : 'About'}
        </h1>

        {/* 自我介绍 */}
        <div className="about-intro-block">
          <div className="about-whoami">&gt; whoami</div>
          <p className="about-intro-text">
            {isZh
              ? '香港浸会大学（珠海）计算机科学的小大一\n\n想去 Quant Trader / Strategy Research / PM\n\n对AI-related的东西都感兴趣\n\n喜欢弄清模糊背后的东西是什么——一个信号？一个概念？还是一种全新的理解与认知？\n\n现在在迭代跑通quant全链的小project'
              : "First-year CS student at BNU-HKBU United International College (Zhuhai)\n\nAiming for Quant Trader / Strategy Research / PM\n\nInterested in everything AI-related\n\nI like figuring out what's behind the fuzzy — a signal? a concept? or an entirely new way of understanding something?\n\nCurrently iterating on small projects to run through the full quant pipeline"
            }
          </p>
        </div>

        {/* 教育 & 竞赛时间线 */}
        <h2 className="about-sub-title">
          {isZh ? '教育 & 竞赛' : 'Education & Awards'}
        </h2>

        <div className="timeline">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
            >
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-title">{item.title}</div>
              <div className="timeline-sub">{item.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* 技能矩阵 */}
        <h2 className="about-sub-title" style={{ marginTop: 72 }}>
          {isZh ? '技能' : 'Skills'}
        </h2>

        <div className="skills-grid">
          {skills.map((group, i) => (
            <div className="skill-card" key={i}>
              <div className="skill-card-label">{group.label}</div>
              <ul className="skill-list">
                {group.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}