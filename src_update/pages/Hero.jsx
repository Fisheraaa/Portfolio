import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Hero.css';

export default function Hero() {
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width  = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const pointsCount = 40;
    const points = Array.from({ length: pointsCount }, (_, i) => {
      const progress = i / (pointsCount - 1);
      const baseY    = 0.8 - progress * 0.6 + Math.sin(progress * Math.PI * 3) * 0.15;
      return {
        x:         progress,
        baseY,
        phase:     Math.random() * Math.PI * 2,
        speed:     Math.random() * 0.02 + 0.01,
        amplitude: Math.random() * 0.05 + 0.02,
      };
    });

    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      const pts = points.map(p => ({
        x: p.x * w,
        y: (p.baseY + Math.sin(time * 0.05 * p.speed + p.phase) * p.amplitude) * h,
      }));

      ctx.beginPath();
      ctx.moveTo(pts[0].x, h);
      ctx.lineTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.lineTo(pts[pts.length - 1].x, h);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, 'rgba(79,255,176,0.15)');
      gradient.addColorStop(1, 'rgba(79,255,176,0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.strokeStyle = '#4fffb0';
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      const last = pts[pts.length - 1];
      ctx.beginPath();
      ctx.arc(last.x, last.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#4fffb0';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(last.x, last.y, 10 + Math.sin(time * 0.003) * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79,255,176,0.18)';
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

        {/* 左侧 */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="dot"></span>
            {t('hero.badge')}
          </div>

          {/* 主标题：不放名字，放定位标签 */}
          <h1 className="hero-name">{t('hero.heading')}</h1>
          <p className="hero-pinyin">{t('hero.subheading')}</p>

          <div className="hero-roles">
            <span>Quant Trader</span>
            <span className="sep"></span>
            <span>Strategy Research</span>
            <span className="sep"></span>
            <span>PM</span>
          </div>

          <hr className="hero-divider" />

          <p className="hero-intro">{t('hero.intro')}</p>

          <div className="hero-btns">
            <Link to="/projects" className="btn-primary">{t('hero.ctaProjects')} →</Link>
            <Link to="/about"    className="btn-ghost">{t('hero.ctaAbout')}</Link>
          </div>
        </div>

        {/* 右侧图表 */}
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
