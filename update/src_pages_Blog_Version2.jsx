import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Blog.css';

const POSTS = [
  {
    id: 'look-ahead-bias',
    date: '2026.04.12',
    title: 'How to Prevent Look-ahead Bias in Event-driven Backtesting',
    excerpt: '在事件驱动回测框架中，未来函数的引入往往是隐蔽的。本文探讨了如何在 Pandas 数据流切片和订单撮合机制中彻底阻断这一问题...'
  },
  {
    id: 'llm-signals',
    date: '2026.03.28',
    title: 'Evaluating LLM as a Signal Filter for MACD Indicators',
    excerpt: '技术指标常因市场噪音产生伪信号。通过接入 GPT-4 对短周期的新闻情绪进行特征提取，我们在某些标的上将 MACD 胜率提高了 12%...'
  }
];

export default function Blog() {
  return (
    <motion.section 
      className="blog-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <h1 className="section-title title-italic">Thoughts</h1>
      
      <div className="post-list">
        {POSTS.map(post => (
          <Link key={post.id} to={`/blog/${post.id}`} className="post-item">
            <div className="post-date">{post.date}</div>
            <div className="post-title">{post.title}</div>
            <div className="post-excerpt">{post.excerpt}</div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}