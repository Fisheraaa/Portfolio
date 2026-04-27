import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tag from './Tag';

export default function ProjectModal({ project, open, onClose }) {
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-mask" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="modal card" onClick={(e) => e.stopPropagation()} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul>{project.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {project.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
            <a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}