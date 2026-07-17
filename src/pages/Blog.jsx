import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { blogPosts } from '../data/blogPosts';
import './Blog.css';

function Block({ block }) {
  if (block.type === 'math') {
    const html = katex.renderToString(block.text, { throwOnError: false, displayMode: true });
    return <div className="blog-math-block" dangerouslySetInnerHTML={{ __html: html }} />;
  }
  if (block.type === 'quote')   return <blockquote className="blog-blockquote">{block.text}</blockquote>;
  if (block.type === 'bullets') return (
    <ul className="blog-bullets">{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
  );
  return <p className="blog-para">{block.text}</p>;
}

/* 标签颜色映射 */
const TAG_COLOR = {
  Quant: 'rgba(201,168,76,0.7)',
  Math:  'rgba(100,180,255,0.7)',
  CS:    'rgba(120,220,160,0.7)',
  AI:    'rgba(200,120,255,0.7)',
};
const tagColor = tag => TAG_COLOR[tag] || 'rgba(210,195,155,0.5)';

export default function Blog() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [selected, setSelected] = useState(null);

  return (
    <motion.section
      className="blog-section"
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
    >
      <div className="blog-inner">

        {/* 页头 */}
        <div className="blog-head">
          <h1 className="section-title title-italic">{isZh ? '思考' : 'Thoughts'}</h1>
          <div className="blog-head-stat">
            <span className="blog-head-dot" />
            {blogPosts.length} {isZh ? '篇文章' : 'articles'}
          </div>
        </div>

        {/* 文章列表 — f0xy 行列式 */}
        <div className="blog-rows">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              className="blog-row"
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-50px' }}
              transition={{ delay:i*0.07, duration:0.45, ease:[0.16,1,0.3,1] }}
              onClick={() => setSelected(post)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key==='Enter' && setSelected(post)}
            >
              {/* 左：标签徽章 */}
              <div className="blog-row-left">
                <div className="blog-tag-badges">
                  {post.tags.slice(0,2).map(tag => (
                    <span key={tag} className="blog-tag-badge" style={{ color: tagColor(tag), borderColor: tagColor(tag) }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="blog-row-date">{post.date}</div>
              </div>

              {/* 主体：标题 + 摘要 */}
              <div className="blog-row-main">
                <h2 className="blog-row-title">{isZh ? post.titleZh : post.titleEn}</h2>
                <p className="blog-row-summary">{isZh ? post.summaryZh : post.summaryEn}</p>
                <div className="blog-row-sections">
                  {post.sections.slice(0,2).map((s, j) => (
                    <span key={j} className="blog-section-chip">
                      {isZh ? s.titleZh : s.titleEn}
                    </span>
                  ))}
                </div>
              </div>

              {/* 右：箭头 */}
              <div className="blog-row-arr" aria-hidden="true">→</div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal — 保持原有 */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal-box blog-modal-box"
              initial={{ opacity:0, y:28, scale:0.97 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:12, scale:0.98 }}
              transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
              <div className="blog-modal-meta">
                <span className="blog-date">{selected.date}</span>
                <div className="blog-tags">
                  {selected.tags.map(tag => (
                    <span key={tag} className="blog-tag" style={{ color:tagColor(tag), borderColor:tagColor(tag) }}>{tag}</span>
                  ))}
                </div>
              </div>
              <h2 className="blog-modal-title title-italic">{isZh ? selected.titleZh : selected.titleEn}</h2>
              <div className="blog-modal-sections">
                {selected.sections.map((section, i) => (
                  <div key={i} className="blog-modal-section">
                    <h3 className="blog-modal-section-title">{isZh ? section.titleZh : section.titleEn}</h3>
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
