import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ProjectModal({ isOpen, onClose, project }) {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  // ESC 关闭
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
          style={overlayStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            style={boxStyle}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 12,  scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <button style={closeStyle} onClick={onClose}>×</button>

            {/* ── 截图区 ── */}
            {project.image ? (
              <div style={imgWrapStyle}>
                <img
                  src={project.image}
                  alt={title}
                  style={imgStyle}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                {/* 加载失败时的占位 */}
                <div style={{ ...placeholderStyle, display: 'none' }}>
                  {t('projects.screenshotSoon')}
                </div>
              </div>
            ) : (
              <div style={placeholderStyle}>{t('projects.screenshotSoon')}</div>
            )}

            {/* ── 标题 & 状态 ── */}
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:22 }}>
              <h2 style={titleStyle}>{title}</h2>
              <span className={project.status === 'active' ? 'status-active' : 'status-done'}
                style={{ fontSize:10, flexShrink:0, marginTop:4 }}>
                {detail.status}
              </span>
            </div>

            {/* ── 技术栈 ── */}
            <div style={labelStyle}>{t('projects.techStack')}</div>
            <div className="tech-tags" style={{ marginBottom:24 }}>
              {project.tags.map(tag => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </div>

            {/* ── 背景 ── */}
            <div style={labelStyle}>{isZh ? '背景' : 'Background'}</div>
            <p style={bgStyle}>{detail.background}</p>

            {/* ── 核心亮点 ── */}
            <div style={labelStyle}>{t('projects.highlights')}</div>
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 28px', display:'flex', flexDirection:'column', gap:10 }}>
              {detail.highlights.map((h, i) => (
                <li key={i} style={highlightItemStyle}>{h}</li>
              ))}
            </ul>

            {/* ── GitHub 链接 ── */}
            <a href={project.github} target="_blank" rel="noreferrer" style={githubLinkStyle}>
              {t('projects.github')} ↗
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── 内联样式（避免依赖外部 CSS 文件丢失问题）── */
const overlayStyle = {
  position:'fixed', inset:0, zIndex:200,
  background:'rgba(2,3,10,0.9)',
  backdropFilter:'blur(14px)',
  display:'flex', alignItems:'center', justifyContent:'center',
  padding:40,
};
const boxStyle = {
  background:'#07091a',
  border:'1px solid rgba(201,168,76,0.18)',
  borderRadius:16,
  maxWidth:680, width:'100%',
  padding:44,
  position:'relative',
  maxHeight:'84vh',
  overflowY:'auto',
};
const closeStyle = {
  position:'absolute', top:20, right:22,
  fontSize:22, color:'rgba(210,195,155,0.42)',
  cursor:'pointer', background:'none', border:'none', lineHeight:1,
};
const imgWrapStyle = {
  width:'100%', borderRadius:8, overflow:'hidden',
  marginBottom:28, border:'1px solid rgba(201,168,76,0.09)',
  background:'#04050e',
};
const imgStyle = {
  width:'100%', height:'auto', maxHeight:280,
  objectFit:'cover', objectPosition:'top',
  display:'block', opacity:0.88,
};
const placeholderStyle = {
  width:'100%', height:160,
  background:'repeating-linear-gradient(45deg, rgba(201,168,76,0.03), rgba(201,168,76,0.03) 1px, transparent 1px, transparent 12px)',
  border:'1px solid rgba(201,168,76,0.09)',
  borderRadius:8,
  display:'flex', alignItems:'center', justifyContent:'center',
  fontFamily:'var(--font-mono)', fontSize:11,
  letterSpacing:'0.1em', color:'rgba(210,195,155,0.3)',
  marginBottom:28,
};
const titleStyle = {
  fontFamily:'var(--font-display)', fontStyle:'italic',
  fontSize:24, fontWeight:700, color:'#f5f0e4', lineHeight:1.3,
};
const labelStyle = {
  fontFamily:'var(--font-mono)', fontSize:10,
  letterSpacing:'0.12em', textTransform:'uppercase',
  color:'#c9a84c', opacity:0.75, marginBottom:10,
};
const bgStyle = {
  fontFamily:'var(--font-zh)', fontSize:14, fontWeight:300,
  color:'rgba(220,205,170,0.72)', lineHeight:1.85,
  marginBottom:26, letterSpacing:'0.025em',
};
const highlightItemStyle = {
  fontFamily:'var(--font-zh)', fontSize:13.5, fontWeight:300,
  color:'rgba(220,205,170,0.72)', lineHeight:1.75,
  paddingLeft:18, position:'relative', letterSpacing:'0.02em',
  /* ::before 无法用 inline style，改用 box-shadow 模拟 */
};
const githubLinkStyle = {
  display:'inline-flex', alignItems:'center', gap:6,
  fontFamily:'var(--font-mono)', fontSize:12,
  letterSpacing:'0.06em', color:'#c9a84c',
  opacity:0.65, textDecoration:'none',
};
