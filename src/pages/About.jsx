import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';

/* ── 时间线 ── */
const TIMELINE_ZH = [
  { date: '2025.09 — 至今',
    title: '香港浸会大学（珠海校区）',
    sub: '计算机科学与技术 · CGPA 3.85 / 4.0（数学及 CS 专业课满绩）' },
  { date: '2026.02',
    title: 'MCM 美国大学生数学建模竞赛',
    sub: 'Meritorious（Top ~7%）' },
  { date: '2025.11',
    title: 'BNBU 程序设计大赛',
    sub: '银奖' },
  { date: '2024.11',
    title: '全国中学生数学联赛',
    sub: '广东省三等奖（裸考）' },
];

const TIMELINE_EN = [
  { date: '2025.09 — Present',
    title: 'Hong Kong Baptist University (Zhuhai Campus)',
    sub: 'Computer Science · CGPA 3.85 / 4.0 (full marks in Math & CS core courses)' },
  { date: '2026.02',
    title: 'MCM Mathematical Contest in Modeling',
    sub: 'Meritorious (Top ~7%)' },
  { date: '2025.11',
    title: 'BNBU Programming Contest',
    sub: 'Silver Award' },
  { date: '2024.11',
    title: 'National High School Mathematics League',
    sub: 'Guangdong Province Third Prize (no prep)' },
];

/* ── skillicons.dev 图标组 ── */
const ICON_GROUPS = [
  {
    label: '量化 · 数据 / Quant · Data',
    icons: 'py,pytorch,mysql',
    extra: ['MACD/ARIMA', 'Walk-Forward', 'Kalman/RLS', 'statsmodels', 'Optuna'],
  },
  {
    label: '工程 / Engineering',
    icons: 'react,js,fastapi,docker,git,linux',
    extra: ['Web3.py', 'Streamlit', 'Vite', 'LaTeX'],
  },
];

/* ── 文字技能分组（保留原有详细信息）── */
const SKILLS_ZH = [
  { label: '量化 / 建模',
    items: ['MACD、ARIMA 等技术分析', 'Walk-Forward 验证协议', '回测原理与风控指标（Sharpe、MDD）',
            'TOPSIS、AHP、蒙特卡洛', 'Kalman / RLS 动态 beta 估计'] },
  { label: '编程',
    items: ['Python（主）、C、Java、JS', 'SQL / MySQL · Pandas 数据处理',
            'Linux 命令行 · Docker · WSL2', 'React · FastAPI · Streamlit · LLM API'] },
  { label: 'AI 工作流',
    items: ['Claude 分析 + Codex 编码', 'Vibe coding 快速原型', '熟悉 prompt engineering'] },
  { label: '通识 / 工具',
    items: ['Git、LaTeX、Notion、KNIME', 'Web3 基础 (Web3.py)', '行研经验（PC 端游产业）'] },
];

const SKILLS_EN = [
  { label: 'Quant / Modeling',
    items: ['MACD, ARIMA, technical analysis', 'Walk-Forward validation protocol',
            'Backtesting principles & risk metrics (Sharpe, MDD)', 'TOPSIS, AHP, Monte Carlo',
            'Kalman / RLS dynamic beta estimation'] },
  { label: 'Programming',
    items: ['Python (primary), C, Java, JS', 'SQL / MySQL · Pandas data processing',
            'Linux CLI · Docker · WSL2', 'React · FastAPI · Streamlit · LLM API'] },
  { label: 'AI Workflow',
    items: ['Claude analysis + Codex coding', 'Vibe coding rapid prototyping',
            'Prompt engineering'] },
  { label: 'General / Tools',
    items: ['Git, LaTeX, Notion, KNIME', 'Web3 basics (Web3.py)',
            'Industry research experience (PC gaming)'] },
];

/* 动画 preset */
const fade = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.5, ease: [0.16,1,0.3,1], delay },
});

export default function About() {
  const { i18n } = useTranslation();
  const isZh     = i18n.language === 'zh';
  const timeline = isZh ? TIMELINE_ZH : TIMELINE_EN;
  const skills   = isZh ? SKILLS_ZH   : SKILLS_EN;

  return (
    <motion.section
      className="about-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
    >
      <div className="about-inner">

        {/* 页面大标题 */}
        <motion.h1 className="about-page-title" {...fade(0)}>
          {isZh ? '关于我' : 'About'}
        </motion.h1>

        {/* whoami 块 */}
        <motion.div className="about-intro-block" {...fade(0.06)}>
          <div className="about-whoami">&gt; whoami</div>
          <div className="about-intro-grid">
            <p className="about-lead">
              {isZh
                ? '香港浸会大学（珠海校区）计算机科学与技术的大一。想去 Quant Trader / Strategy Research / PM。对 AI-related 的东西都感兴趣。喜欢弄清模糊背后的东西是什么——一个信号？一个概念？还是一种全新的理解与认知？现在在迭代跑通 quant 全链的小 project。'
                : "First-year Computer Science student at Hong Kong Baptist University (Zhuhai Campus). Aiming for Quant Strategy Research / PM. Interested in everything AI-related. I like figuring out what's behind the fuzzy — a signal? a concept? or an entirely new way of understanding something? Currently iterating on end-to-end quant pipeline projects."}
            </p>
            <div className="about-intro-meta">
              <p><span className="mk">{isZh ? '学校' : 'School'}</span>
                 <b>{isZh ? '香港浸会大学（珠海校区）' : 'HKBU, Zhuhai Campus'}</b></p>
              <p><span className="mk">{isZh ? '专业' : 'Major'}</span>
                 <b>{isZh ? '计算机科学与技术' : 'Computer Science'}</b></p>
              <p><span className="mk">GPA</span><b>3.85 / 4.0</b></p>
              <p><span className="mk">{isZh ? '方向' : 'Target'}</span>
                 <b>Quant Strategy · PM · AI</b></p>
            </div>
          </div>
        </motion.div>

        {/* ── Tech Stack — skillicons 风格 ── */}
        <motion.div className="about-block" {...fade(0.1)}>
          <h2 className="about-sub-title">{isZh ? 'Tech Stack' : 'Tech Stack'}</h2>
          <div className="skillicons-section">
            {ICON_GROUPS.map((g, i) => (
              <div className="skillicon-group" key={i}>
                <div className="skillicon-label">{g.label}</div>
                <div className="skillicon-row">
                  <img
                    src={`https://skillicons.dev/icons?i=${g.icons}&theme=dark`}
                    alt={g.label}
                    loading="lazy"
                    className="skillicons-img"
                  />
                  {g.extra.map((t, j) => (
                    <span key={j} className="skill-extra-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 时间线 ── */}
        <motion.div className="about-block" {...fade(0.14)}>
          <h2 className="about-sub-title">{isZh ? '教育 & 竞赛' : 'Education & Awards'}</h2>
          <div className="timeline">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + i * 0.08, duration: 0.4, ease: [0.16,1,0.3,1] }}
              >
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-title">{item.title}</div>
                <div className="timeline-sub">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── 技能文字 ── */}
        <motion.div className="about-block" {...fade(0.18)}>
          <h2 className="about-sub-title">{isZh ? '技能详情' : 'Skills'}</h2>
          <div className="skills-grid">
            {skills.map((group, i) => (
              <div className="skill-card" key={i}>
                <div className="skill-card-label">{group.label}</div>
                <ul className="skill-list">
                  {group.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CV 下载 CTA（底部）── */}
        <motion.div className="about-cv-footer" {...fade(0.22)}>
          <div className="cv-footer-text">
            <div className="cv-footer-label">
              {isZh ? '简历' : 'Résumé'}
            </div>
            <div className="cv-footer-sub">
              {isZh ? '如需完整简历，点击下载 PDF' : 'Download the full résumé as PDF'}
            </div>
          </div>
          <a
            id="resume-foot"
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="cv-download-btn"
          >
            {/* CV SVG 卡片图标 — f0xy 风格 */}
            <svg viewBox="0 0 30 24" width="26" height="20" fill="none" aria-hidden="true">
              <rect x="1.2" y="1.2" width="27.6" height="21.6" rx="3.4"
                stroke="currentColor" strokeWidth="1.6"/>
              <text x="15" y="15.7" textAnchor="middle" fontSize="10.5"
                fontWeight="700" fill="currentColor">CV</text>
            </svg>
            <span>{isZh ? '下载 PDF' : 'Download PDF'}</span>
            <span className="cv-btn-arr">↗</span>
          </a>
        </motion.div>

      </div>
    </motion.section>
  );
}
