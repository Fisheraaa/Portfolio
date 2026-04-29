import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { blogPosts } from '../data/blogPosts';
import './Blog.css';

/** 渲染单个 block */
function Block({ block }) {
  if (block.type === 'math') {
    const html = katex.renderToString(block.text, { throwOnError: false, displayMode: true });
    return (
      <div
        className="blog-math-block"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  if (block.type === 'quote') {
    return <blockquote className="blog-blockquote">{block.text}</blockquote>;
  }
  if (block.type === 'bullets') {
    return (
      <ul className="blog-bullets">
        {block.items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    );
  }
  // type === 'text'
  return <p className="blog-para">{block.text}</p>;
}

export default function Blog() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [selected, setSelected] = useState(null);

  return (
    <motion.section
      className="blog-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="blog-inner">
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
              transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelected(post)}
            >
              {/* 卡片角装饰 */}
              <span className="card-corner cc-tl" />
              <span className="card-corner cc-tr" />
              <span className="card-corner cc-bl" />
              <span className="card-corner cc-br" />

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

              {/* 小节列表预览 */}
              <ul className="blog-section-list">
                {post.sections.map((s, j) => (
                  <li key={j}>{isZh ? s.titleZh : s.titleEn}</li>
                ))}
              </ul>

              <div className="card-link" style={{ marginTop: 'auto' }}>
                {isZh ? '展开阅读' : 'Read'} →
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Modal ── */}
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
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>

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

              <div className="blog-modal-sections">
                {selected.sections.map((section, i) => (
                  <div key={i} className="blog-modal-section">
                    <h3 className="blog-modal-section-title">
                      {isZh ? section.titleZh : section.titleEn}
                    </h3>
                    <div className="blog-modal-content">
                      {(isZh ? section.contentZh : section.contentEn).map((block, j) => (
                        <Block key={j} block={block} />
                      ))}
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
