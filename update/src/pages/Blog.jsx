import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '../data/blogPosts';
import './Blog.css';

export default function Blog() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [selected, setSelected] = useState(null);

  return (
    <motion.section
      className="blog-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <h1 className="section-title title-italic">
        {isZh ? '思考' : 'Thoughts'}
      </h1>

      <div className="blog-grid">
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.id}
            className="blog-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelected(post)}
          >
            {/* 日期 + 标签 */}
            <div className="blog-card-meta">
              <span className="blog-date">{post.date}</span>
              <div className="blog-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* 标题 */}
            <h2 className="blog-card-title title-italic">
              {isZh ? post.titleZh : post.titleEn}
            </h2>

            {/* 摘要 */}
            <p className="blog-card-summary">
              {isZh ? post.summaryZh : post.summaryEn}
            </p>

            {/* 小节预览列表 */}
            <ul className="blog-section-list">
              {post.sections.map(s => (
                <li key={s.titleZh}>
                  {isZh ? s.titleZh : s.titleEn}
                </li>
              ))}
            </ul>

            <div className="card-link" style={{ marginTop: 'auto' }}>
              {isZh ? '展开阅读' : 'Read'} →
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal-box blog-modal-box"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>

              {/* 顶部 meta */}
              <div className="blog-modal-meta">
                <span className="blog-date">{selected.date}</span>
                <div className="blog-tags">
                  {selected.tags.map(tag => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <h2 className="blog-modal-title title-italic">
                {isZh ? selected.titleZh : selected.titleEn}
              </h2>

              {/* 所有小节 */}
              <div className="blog-modal-sections">
                {selected.sections.map((section, i) => (
                  <div key={i} className="blog-modal-section">
                    <h3 className="blog-modal-section-title">
                      {isZh ? section.titleZh : section.titleEn}
                    </h3>
                    <div className="blog-modal-section-content">
                      {(isZh ? section.contentZh : section.contentEn)
                        .split('\n')
                        .map((line, j) => {
                          if (!line.trim()) return <br key={j} />;
                          // 以 — 开头的行做特殊样式
                          if (line.trim().startsWith('—')) {
                            return (
                              <p key={j} className="blog-indent-line">{line.trim()}</p>
                            );
                          }
                          return <p key={j}>{line}</p>;
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
