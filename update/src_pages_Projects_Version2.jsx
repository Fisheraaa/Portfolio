import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectModal from '../components/ProjectModal';
import './Projects.css';

// 模拟数据 (你可以后续抽离到 data/ 目录)
const PROJECTS = [
  {
    id: '01',
    title: 'AI Quant Trading System',
    status: 'active',
    github: '#',
    tags: ['Python', 'Docker', 'LLM'],
    shortDesc: '设计事件驱动型信号流水线<br/>MACD多因子体系接入LLM<br/>正在迭代回测与风控模块...',
    details: '基于大模型的量化交易流水线，集成了实时的 MACD 和 RSI 因子计算。通过 GPT 接口进行市场情绪校验，最后由本地的风控模块进行开仓拦截。目前胜率回测中。'
  },
  {
    id: '02',
    title: 'Portfolio Architecture',
    status: 'done',
    github: '#',
    tags: ['React', 'Vite', 'Framer'],
    shortDesc: '个人作品集架构设计<br/>极客冷绿视觉体系建立<br/>性能与动效优化',
    details: '高度自定义的深色极客风网站，使用 Canvas 渲染背景与图表，Framer Motion 处理全局路由及弹窗动效。全站无第三方沉重 UI 库，极致轻量。'
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <motion.section 
      className="projects-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="section-title title-italic">Selected Works</h1>
      
      <div className="projects-grid">
        {PROJECTS.map(proj => (
          <div 
            className="project-card" 
            key={proj.id}
            onClick={() => setSelectedProject(proj)}
          >
            <div className="card-header">
              <span className={proj.status === 'active' ? 'status-active' : 'status-done'}>
                {proj.status === 'active' ? 'IN PROGRESS' : 'COMPLETED'}
              </span>
              <a href={proj.github} className="card-link" onClick={e => e.stopPropagation()}>GitHub ↗</a>
            </div>
            
            <div className="card-num">{proj.id}</div>
            <div className="card-title">{proj.title}</div>
            
            <div className="tech-tags">
              {proj.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </div>
            
            <hr className="card-divider" />
            
            <div className="card-desc" dangerouslySetInnerHTML={{ __html: proj.shortDesc }} />
            
            <button className="card-link" style={{ marginTop: 'auto' }}>
              查看详情 →
            </button>
          </div>
        ))}
      </div>

      <ProjectModal 
        isOpen={!!selectedProject} 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </motion.section>
  );
}