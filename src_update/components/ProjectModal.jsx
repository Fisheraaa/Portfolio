import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './ProjectModal.css';

export default function ProjectModal({ isOpen, onClose, project }) {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  // ESC 关闭
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!project) return null;

  const detail   = isZh ? project.detailZh   : project.detailEn;
  const title    = isZh ? project.titleZh    : project.titleEn;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-box"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

            {/* 占位图区 */}
            <div className="modal-img-placeholder">
              {t('projects.screenshotSoon')}
            </div>

            {/* 标题 & 状态 */}
            <div className="modal-header">
              <h2 className="modal-title title-italic">{title}</h2>
              <span className={project.status === 'active' ? 'status-active' : 'status-done'} style={{ fontSize: 11 }}>
                {detail.status}
              </span>
            </div>

            {/* 技术栈 */}
            <div className="modal-section-label">{t('projects.techStack')}</div>
            <div className="tech-tags" style={{ marginBottom: 24 }}>
              {project.tags.map(tag => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </div>

            {/* 背景 */}
            <div className="modal-section-label">{isZh ? '背景' : 'Background'}</div>
            <p className="modal-bg">{detail.background}</p>

            {/* 核心亮点 */}
            <div className="modal-section-label">{t('projects.highlights')}</div>
            <ul className="modal-highlights">
              {detail.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            {/* GitHub 链接 — 文字链接风格，不是大按钮 */}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="modal-github-link"
            >
              {t('projects.github')} ↗
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
