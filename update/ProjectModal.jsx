import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ProjectModal({ isOpen, onClose, project }) {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen, onClose]);

  if (!project) return null;

  const detail = isZh ? project.detailZh : project.detailEn;
  const title  = isZh ? project.titleZh  : project.titleEn;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={S.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            style={S.box}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 12,  scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button style={S.close} onClick={onClose}>×</button>

            {/* ── 图片 / 报告链接区 ── */}
            <MediaBlock
              src={project.image}
              reportUrl={project.reportUrl}
              alt={title}
              placeholder={t('projects.screenshotSoon')}
              isZh={isZh}
            />

            {/* ── 标题 & 状态 ── */}
            <div style={S.headerRow}>
              <div>
                <h2 style={S.title}>{title}</h2>
                {project.date && (
                  <div style={S.dateTag}>{project.date}</div>
                )}
              </div>
              <span
                className={project.status === 'active' ? 'status-active' : 'status-done'}
                style={{ fontSize: 10, flexShrink: 0, marginTop: 4 }}
              >
                {detail.status}
              </span>
            </div>

            {/* ── 技术栈 ── */}
            <div style={S.label}>{t('projects.techStack')}</div>
            <div className="tech-tags" style={{ marginBottom: 24 }}>
              {project.tags.map(tag => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </div>

            {/* ── 背景 ── */}
            <div style={S.label}>{isZh ? '背景' : 'Background'}</div>
            <p style={S.bg}>{detail.background}</p>

            {/* ── 核心亮点 ── */}
            <div style={S.label}>{t('projects.highlights')}</div>
            <ul style={S.list}>
              {detail.highlights.map((h, i) => (
                <li key={i} style={S.listItem}>
                  <span style={S.dash}>—</span>
                  {h}
                </li>
              ))}
            </ul>

            {/* ── GitHub ── */}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              style={S.ghLink}
            >
              {t('projects.github')} ↗
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* 媒体区：优先展示报告链接，其次图片，最后占位 */
function MediaBlock({ src, reportUrl, alt, placeholder, isZh }) {
  if (reportUrl) {
    return (
      <a
        href={reportUrl}
        target="_blank"
        rel="noreferrer"
        style={S.reportLink}
      >
        <span style={S.reportIcon}>↗</span>
        <span>{isZh ? '查看完整项目报告' : 'View Full Project Report'}</span>
      </a>
    );
  }
  if (!src) return <Placeholder text={placeholder} />;
  return (
    <div style={S.imgWrap}>
      <img
        src={src}
        alt={alt}
        style={S.img}
        onError={e => {
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.parentElement.querySelector('[data-fallback]');
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div data-fallback="1" style={{ ...S.placeholder, display: 'none' }}>
        {placeholder}
      </div>
    </div>
  );
}

function Placeholder({ text }) {
  return <div style={S.placeholder}>{text}</div>;
}

/* ── 样式对象 ── */
const S = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 200,
    background: 'rgba(2,3,10,0.9)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 40,
  },
  box: {
    background: '#07091a',
    border: '1px solid rgba(201,168,76,0.18)',
    borderRadius: 16,
    maxWidth: 680, width: '100%',
    padding: 44,
    position: 'relative',
    maxHeight: '84vh',
    overflowY: 'auto',
  },
  close: {
    position: 'absolute', top: 20, right: 22,
    fontSize: 22,
    color: 'rgba(210,195,155,0.42)',
    cursor: 'pointer',
    background: 'none', border: 'none', lineHeight: 1,
    transition: 'color 0.2s',
  },
  imgWrap: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 28,
    border: '1px solid rgba(201,168,76,0.09)',
    background: '#04050e',
    position: 'relative',
  },
  img: {
    width: '100%',
    height: 'auto',
    maxHeight: 280,
    objectFit: 'cover',
    objectPosition: 'top',
    display: 'block',
    opacity: 0.9,
  },
  placeholder: {
    width: '100%', height: 160,
    background: 'repeating-linear-gradient(45deg, rgba(201,168,76,0.03), rgba(201,168,76,0.03) 1px, transparent 1px, transparent 12px)',
    border: '1px solid rgba(201,168,76,0.09)',
    borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-mono)', fontSize: 11,
    letterSpacing: '0.1em',
    color: 'rgba(210,195,155,0.3)',
    marginBottom: 28,
  },
  reportLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    marginBottom: 28,
    padding: '18px 24px',
    background: 'rgba(201,168,76,0.05)',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 10,
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    letterSpacing: '0.04em',
    color: '#c9a84c',
    textDecoration: 'none',
    transition: 'background 0.2s, border-color 0.2s',
    cursor: 'pointer',
  },
  reportIcon: {
    fontSize: 18,
    lineHeight: 1,
    flexShrink: 0,
  },
  dateTag: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'rgba(210,195,155,0.4)',
    letterSpacing: '0.1em',
    marginTop: 5,
  },
  headerRow: {
    display: 'flex', alignItems: 'flex-start',
    justifyContent: 'space-between', gap: 12, marginBottom: 22,
  },
  title: {
    fontFamily: 'var(--font-display)', fontStyle: 'italic',
    fontSize: 24, fontWeight: 700,
    color: '#f5f0e4', lineHeight: 1.3,
  },
  label: {
    fontFamily: 'var(--font-mono)', fontSize: 10,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: '#c9a84c', opacity: 0.75, marginBottom: 10,
  },
  bg: {
    fontFamily: 'var(--font-zh)', fontSize: 14, fontWeight: 300,
    color: 'rgba(220,205,170,0.72)', lineHeight: 1.85,
    marginBottom: 26, letterSpacing: '0.025em',
  },
  list: {
    listStyle: 'none', padding: 0, margin: '0 0 28px',
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  listItem: {
    fontFamily: 'var(--font-zh)', fontSize: 13.5, fontWeight: 300,
    color: 'rgba(220,205,170,0.72)', lineHeight: 1.75,
    paddingLeft: 20, position: 'relative', letterSpacing: '0.02em',
    display: 'flex', gap: 8, alignItems: 'flex-start',
  },
  dash: {
    color: '#c9a84c', opacity: 0.55,
    fontFamily: 'var(--font-mono)', fontSize: 11,
    flexShrink: 0, marginTop: 2,
  },
  ghLink: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: 'var(--font-mono)', fontSize: 12,
    letterSpacing: '0.06em', color: '#c9a84c',
    opacity: 0.65, textDecoration: 'none',
  },
};