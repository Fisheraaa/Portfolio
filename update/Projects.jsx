import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { projects } from '../data/projects';
import ProjectModal from '../components/ProjectModal';
import './Projects.css';

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <motion.section
      className="projects-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="projects-inner">
        <h1 className="section-title title-italic">{t('projects.title')}</h1>

        <div className="projects-grid">
          {projects.map((proj, i) => (
            <motion.div
              className="project-card"
              key={proj.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="card-corner cc-tl" />
              <span className="card-corner cc-tr" />
              <span className="card-corner cc-bl" />
              <span className="card-corner cc-br" />

              <div className="card-header">
                <span className={proj.status === 'active' ? 'status-active' : 'status-done'}>
                  {proj.status === 'active'
                    ? (isZh ? '进行中' : 'IN PROGRESS')
                    : (isZh ? '已完成' : 'COMPLETED')}
                </span>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="card-link"
                  onClick={e => e.stopPropagation()}
                >
                  GitHub ↗
                </a>
              </div>

              <div className="card-num">{proj.id} <span className="card-date">{proj.date}</span></div>
              <div className="card-title">{isZh ? proj.titleZh : proj.titleEn}</div>

              <div className="tech-tags">
                {proj.tags.map(tag => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>

              <hr className="card-divider" />

              <p className="card-desc">
                {isZh ? proj.shortDescZh : proj.shortDescEn}
              </p>

              <button
                className="card-link"
                style={{ marginTop: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => setSelected(proj)}
              >
                {t('projects.viewDetail')} →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        isOpen={!!selected}
        project={selected}
        onClose={() => setSelected(null)}
      />
    </motion.section>
  );
}
