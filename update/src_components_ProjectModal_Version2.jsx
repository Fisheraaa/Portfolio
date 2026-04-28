import { motion, AnimatePresence } from 'framer-motion';
import './ProjectModal.css';

export default function ProjectModal({ isOpen, onClose, project }) {
  if (!project) return null;

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
            onClick={(e) => e.stopPropagation()} /* 防止点击内容区关闭 */
          >
            <button className="modal-close" onClick={onClose}>×</button>
            
            <div className="modal-img-placeholder">
              SCREENSHOT COMING SOON
            </div>
            
            <div className="tech-tags" style={{ marginBottom: '16px' }}>
              {project.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </div>
            
            <h2 className="modal-title">{project.title}</h2>
            <div className="modal-desc" dangerouslySetInnerHTML={{ __html: project.details }} />
            
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary">
              View Source Code
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}