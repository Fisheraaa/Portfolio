import { motion } from 'framer-motion';
import './About.css';

export default function About() {
  return (
    <motion.section 
      className="about-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <h1 className="section-title title-italic">About Me</h1>
      
      <div style={{ marginBottom: '60px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-3)', fontSize: '12px', marginBottom: '16px' }}>
          &gt; whoami
        </div>
        <p style={{ color: 'var(--text-2)', fontSize: '15px', lineHeight: '1.8' }}>
          香港浸会大学（珠海）计算机科学的大一学生。想去 Quant Trader / Strategy Research / PM。<br/><br/>
          喜欢把模糊的东西搞清楚——不管是一个市场信号，还是一段关系，还是一个系统为什么会挂。现在在把 AI Trader 从「看行情」改成「能回测、有风控」，还在迭代中。
        </p>
      </div>

      <h2 className="title-italic" style={{ fontSize: '28px', color: 'var(--text-1)', marginBottom: '16px' }}>
        Education & Awards
      </h2>
      
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-date">2025.09 - PRESENT</div>
          <div className="timeline-title">香港浸会大学（珠海）</div>
          <div className="timeline-sub">计算机科学与技术 / CGPA 3.83 / 4.0</div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-date">2025.11</div>
          <div className="timeline-title">BNBU 程序设计大赛</div>
          <div className="timeline-sub">银奖 Silver Award</div>
        </div>

        <div className="timeline-item">
          <div className="timeline-date">2024.11</div>
          <div className="timeline-title">全国中学生数学联赛</div>
          <div className="timeline-sub">广东省二等奖</div>
        </div>
      </div>
    </motion.section>
  );
}