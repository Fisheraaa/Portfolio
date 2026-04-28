import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // 动态价格曲线 Canvas 引擎
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;

    // 响应式重置尺寸
    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // 生成初始点位 (模拟震荡向上的价格图)
    const pointsCount = 40;
    const points = Array.from({ length: pointsCount }, (_, i) => {
      const progress = i / (pointsCount - 1);
      // 基础形态：整体向上，中途有回调
      const baseY = 0.8 - (progress * 0.6) + Math.sin(progress * Math.PI * 3) * 0.15; 
      return {
        x: progress,
        baseY: baseY,
        // 每个点自己的微小波动相位和速度
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        amplitude: Math.random() * 0.05 + 0.02
      };
    });

    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // 计算当前帧的所有点真实坐标
      const currentPoints = points.map(p => ({
        x: p.x * w,
        y: (p.baseY + Math.sin(time * 0.05 * p.speed + p.phase) * p.amplitude) * h
      }));

      // 1. 绘制曲线下方渐变
      ctx.beginPath();
      ctx.moveTo(currentPoints[0].x, h); // 从左下角开始
      ctx.lineTo(currentPoints[0].x, currentPoints[0].y);
      
      for (let i = 1; i < currentPoints.length; i++) {
        // 使用简单的直线连接，因为点足够密，也可以用贝塞尔
        ctx.lineTo(currentPoints[i].x, currentPoints[i].y);
      }
      ctx.lineTo(currentPoints[currentPoints.length - 1].x, h); // 连到右下角
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, 'rgba(79, 255, 176, 0.15)');
      gradient.addColorStop(1, 'rgba(79, 255, 176, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // 2. 绘制冷绿折线
      ctx.beginPath();
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
      for (let i = 1; i < currentPoints.length; i++) {
        ctx.lineTo(currentPoints[i].x, currentPoints[i].y);
      }
      ctx.strokeStyle = '#4fffb0';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. 绘制末端闪烁呼吸灯（实心点）
      const lastPoint = currentPoints[currentPoints.length - 1];
      ctx.beginPath();
      ctx.arc(lastPoint.x, lastPoint.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#4fffb0';
      ctx.fill();
      
      // 光晕
      ctx.beginPath();
      ctx.arc(lastPoint.x, lastPoint.y, 10 + Math.sin(time * 0.003) * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79, 255, 176, 0.2)';
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        
        {/* 左侧内容 */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="dot"></span>
            SYSTEM ONLINE
          </div>
          
          <h1 className="hero-name">俞秋行</h1>
          <p className="hero-pinyin">Yu Qiuxing</p>
          
          <div className="hero-roles">
            <span>Quant Trader</span>
            <span className="sep"></span>
            <span>Strategy Research</span>
            <span className="sep"></span>
            <span>PM</span>
          </div>
          
          <hr className="hero-divider" />
          
          <p className="hero-intro">
            香港浸会大学（珠海）计算机科学的大一学生。喜欢把模糊的东西搞清楚——不管是一个市场信号，还是一个系统为什么会挂。目前正在迭代融合 LLM 的事件驱动型量化信号流水线。
          </p>
          
          <div className="hero-btns">
            <Link to="/projects" className="btn-primary">View Projects</Link>
            <Link to="/contact" className="btn-ghost">Contact Me</Link>
          </div>
        </div>

        {/* 右侧动态图表区 */}
        <div className="hero-right">
          <div className="chart-container" ref={containerRef}>
            <div className="chart-grid"></div>
            <canvas ref={canvasRef} className="chart-canvas"></canvas>
          </div>
        </div>

      </div>
    </section>
  );
}