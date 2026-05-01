import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Hero.css';

export default function Hero() {
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const N = 44;
    const points = Array.from({ length: N }, (_, i) => {
      const p = i / (N - 1);
      return {
        x:     p,
        baseY: 0.78 - p * 0.55 + Math.sin(p * Math.PI * 3) * 0.13,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.018 + 0.008,
        amp:   Math.random() * 0.04 + 0.018,
      };
    });

    const render = (ts) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;
      const t = ts * 0.001;

      const pts = points.map(p => ({
        x: p.x * W,
        y: (p.baseY + Math.sin(t * p.speed * 10 + p.phase) * p.amp) * H,
      }));

      // 填充
      ctx.beginPath();
      ctx.moveTo(pts[0].x, H);
      ctx.lineTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const mx = (pts[i - 1].x + pts[i].x) / 2;
        ctx.bezierCurveTo(mx, pts[i-1].y, mx, pts[i].y, pts[i].x, pts[i].y);
      }
      ctx.lineTo(pts[pts.length - 1].x, H);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'rgba(201,168,76,0.14)');
      grad.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.fillStyle = grad;
      ctx.fill();

      // 线条
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const mx = (pts[i - 1].x + pts[i].x) / 2;
        ctx.bezierCurveTo(mx, pts[i-1].y, mx, pts[i].y, pts[i].x, pts[i].y);
      }
      ctx.strokeStyle = 'rgba(201,168,76,0.6)';
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      // 末端光点
      const last = pts[pts.length - 1];
      const glow = Math.sin(t * 2) * 3;
      ctx.beginPath();
      ctx.arc(last.x, last.y, 8 + glow, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201,168,76,0.12)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(last.x, last.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#c9a84c';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-inner">

        {/* 左列 */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            AVAILABLE FOR INTERNSHIP 2026
          </div>

          <h1 className="hero-heading title-italic">
            {isZh ? '个人主页' : 'Portfolio'}
          </h1>

          <p className="hero-subheading">
            BNU-HKBU UIC
          </p>

          <div className="hero-roles">
            <span>Quant Trader</span>
            <span className="role-sep" />
            <span>Strategy Research</span>
            <span className="role-sep" />
            <span>PM</span>
          </div>

          <div className="hero-divider">
            <div className="divider-line" />
            <div className="divider-diamond" />
            <div className="divider-line" style={{ width: 18 }} />
          </div>

          <p className="hero-intro">
            {isZh
              ? '喜欢弄清模糊背后的东西是什么——一个信号？一个概念？还是一个系统的崩溃边界？'
              : 'I like figuring out what\'s behind the fuzzy — a signal? a concept? a system\'s breaking point?'}
          </p>

          <div className="hero-btns">
            <Link to="/projects" className="btn-primary">
              {t('hero.ctaProjects')} →
            </Link>
            <Link to="/about" className="btn-ghost">
              {t('hero.ctaAbout')}
            </Link>
          </div>
        </div>

        {/* 右列：价格图表 + 星座 */}
        <div className="hero-right">
          <svg className="hero-constellation" viewBox="0 0 220 280" xmlns="http://www.w3.org/2000/svg">
            <line x1="40"  y1="60"  x2="110" y2="30"  stroke="rgba(201,168,76,0.12)" strokeWidth="0.5"/>
            <line x1="110" y1="30"  x2="180" y2="80"  stroke="rgba(201,168,76,0.10)" strokeWidth="0.5"/>
            <line x1="180" y1="80"  x2="150" y2="150" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5"/>
            <line x1="40"  y1="60"  x2="80"  y2="130" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5"/>
            <line x1="80"  y1="130" x2="150" y2="150" stroke="rgba(201,168,76,0.07)" strokeWidth="0.5"/>
            <line x1="80"  y1="130" x2="60"  y2="210" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5"/>
            <line x1="150" y1="150" x2="190" y2="220" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5"/>
            <circle cx="40"  cy="60"  r="2"   fill="rgba(201,168,76,0.55)"/>
            <circle cx="110" cy="30"  r="2.5" fill="rgba(201,168,76,0.75)"/>
            <circle cx="180" cy="80"  r="1.5" fill="rgba(201,168,76,0.4)"/>
            <circle cx="80"  cy="130" r="2"   fill="rgba(201,168,76,0.5)"/>
            <circle cx="150" cy="150" r="1.5" fill="rgba(201,168,76,0.35)"/>
            <circle cx="60"  cy="210" r="1.5" fill="rgba(201,168,76,0.3)"/>
            <circle cx="190" cy="220" r="1"   fill="rgba(201,168,76,0.25)"/>
            <circle cx="110" cy="30"  r="9"   fill="rgba(60,30,160,0.07)"/>
          </svg>

          <div className="hero-chart-wrap" ref={containerRef}>
            <div className="hero-chart-grid" />
            <canvas ref={canvasRef} className="hero-chart-canvas" />
            <span className="card-corner cc-tl" />
            <span className="card-corner cc-tr" />
            <span className="card-corner cc-bl" />
            <span className="card-corner cc-br" />
          </div>
        </div>

      </div>
    </section>
  );
}
