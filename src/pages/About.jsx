import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';

const eduItems = [
  { year: '2024', titleZh: '香港浸会大学（珠海）', titleEn: 'BNU-HKBU UIC', descZh: '计算机科学，大一在读', descEn: 'Computer Science, Freshman' },
  { year: '2025', titleZh: '数学建模竞赛', titleEn: 'Math Modeling Competition', descZh: '校队训练中', descEn: 'In Team Training' },
];

const skillGroups = [
  {
    titleZh: '编程', titleEn: 'Coding',
    items: ['Python', 'JavaScript/TypeScript', 'React', 'FastAPI', 'Docker'],
  },
  {
    titleZh: '数据', titleEn: 'Data',
    items: ['Pandas', 'NumPy', 'Streamlit', 'Web3.py', 'AkShare'],
  },
  {
    titleZh: '工具', titleEn: 'Tools',
    items: ['Git', 'VSCode', 'Linux', 'WSL2', '飞书API'],
  },
];

export default function About() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <motion.section
      className="about-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="about-content">
        <h1 className="section-title title-italic">{t('about.title')}</h1>

        {/* ── whoami 区块 ── */}
        <div className="whoami-box">
          <span className="whoami-prompt">{t('about.whoami')}</span>
          <pre className="whoami-output">
            {t('about.intro')}
          </pre>
        </div>

        {/* ── 教育时间线 ── */}
        <div className="timeline-section">
          <h2 className="section-subtitle">{t('about.edu')}</h2>
          <div className="timeline">
            {eduItems.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{isZh ? item.titleZh : item.titleEn}</h3>
                  <p className="timeline-desc">{isZh ? item.descZh : item.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 技能卡片 ── */}
        <div className="skills-section">
          <h2 className="section-subtitle">{t('about.skills')}</h2>
          <div className="skills-grid">
            {skillGroups.map((group, i) => (
              <div key={i} className="skill-card">
                <h3 className="skill-card-title">{isZh ? group.titleZh : group.titleEn}</h3>
                <div className="skill-items">
                  {group.items.map((item, j) => (
                    <span key={j} className="skill-item">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 渐变光带装饰 ── */}
        <div className="gradient-band" />
      </div>
    </motion.section>
  );
}