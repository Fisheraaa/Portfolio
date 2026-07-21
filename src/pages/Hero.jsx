import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import About from './About';
import './Hero.css';

export default function Hero() {
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const { i18n }     = useTranslation();
  const isZh         = i18n.language === 'zh';

  useEffect(() => {
    const canvas = canvasRef.current, container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = container.clientWidth; canvas.height = container.clientHeight; };
    window.addEventListener('resize', resize); resize();
    const N = 44;
    const pts = Array.from({ length: N }, (_, i) => {
      const p = i / (N - 1);
      return { x: p, baseY: 0.78 - p * 0.55 + Math.sin(p * Math.PI * 3) * 0.13,
        phase: Math.random() * Math.PI * 2, speed: Math.random() * 0.018 + 0.008, amp: Math.random() * 0.04 + 0.018 };
    });
    const render = ts => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height, t = ts * 0.001;
      const p = pts.map(q => ({ x: q.x * W, y: (q.baseY + Math.sin(t * q.speed * 10 + q.phase) * q.amp) * H }));
      ctx.beginPath(); ctx.moveTo(p[0].x, H); ctx.lineTo(p[0].x, p[0].y);
      for (let i = 1; i < p.length; i++) { const mx = (p[i-1].x + p[i].x) / 2; ctx.bezierCurveTo(mx, p[i-1].y, mx, p[i].y, p[i].x, p[i].y); }
      ctx.lineTo(p[p.length-1].x, H); ctx.closePath();
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, 'rgba(201,168,76,0.13)'); g.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.moveTo(p[0].x, p[0].y);
      for (let i = 1; i < p.length; i++) { const mx = (p[i-1].x + p[i].x) / 2; ctx.bezierCurveTo(mx, p[i-1].y, mx, p[i].y, p[i].x, p[i].y); }
      ctx.strokeStyle = 'rgba(201,168,76,0.55)'; ctx.lineWidth = 1.5; ctx.stroke();
      const last = p[p.length-1], gw = Math.sin(t * 2) * 3;
      ctx.beginPath(); ctx.arc(last.x, last.y, 7 + gw, 0, Math.PI*2); ctx.fillStyle = 'rgba(201,168,76,0.1)'; ctx.fill();
      ctx.beginPath(); ctx.arc(last.x, last.y, 2.5, 0, Math.PI*2); ctx.fillStyle = '#c9a84c'; ctx.fill();
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <div className="hero-page">
      <section className="hero-section">
        <div className="hero-inner">

          {/* 状态栏 — 支持中英文切换 */}
          <div className="hero-top">
            <div className="hero-top-loc">
              <span>{isZh ? '坐标 珠海' : 'Based in Zhuhai'}</span>
              <span className="arr"> → </span>
              <b>BNBU · CS</b>
            </div>
            <div className="hero-top-status">
              <span className="hero-spark">✦</span>
              <span className="arr"> </span>
              <b>{isZh ? '实习申请中' : 'Open to internships'}</b>
            </div>
          </div>

          <hr className="hero-rule" />

          {/* 大字标题 */}
          <h1 className="hero-heading">
            <span className="hero-heading-line1">Hi, this is</span>
            <span className="hero-heading-line2">Leon Yu<span className="hero-dot">.</span></span>
          </h1>

          {/* CTA 按钮 — 支持中英文切换 */}
          <div className="hero-btns">
            <Link to="/projects" className="btn-primary">
              {isZh ? '查看项目' : 'View Projects'} →
            </Link>
            <Link to="/contact" className="btn-ghost">
              {isZh ? '打个招呼' : 'Say Hi'}
            </Link>
          </div>
        </div>

        {/* 星座 */}
        <svg className="hero-constellation" viewBox="0 0 220 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="40"  y1="60"  x2="110" y2="30"  stroke="rgba(201,168,76,0.12)" strokeWidth="0.5"/>
          <line x1="110" y1="30"  x2="180" y2="80"  stroke="rgba(201,168,76,0.10)" strokeWidth="0.5"/>
          <line x1="180" y1="80"  x2="150" y2="150" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5"/>
          <line x1="40"  y1="60"  x2="80"  y2="130" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5"/>
          <line x1="80"  y1="130" x2="150" y2="150" stroke="rgba(201,168,76,0.07)" strokeWidth="0.5"/>
          <line x1="150" y1="150" x2="190" y2="220" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5"/>
          <circle cx="40"  cy="60"  r="2"   fill="rgba(201,168,76,0.55)"/>
          <circle cx="110" cy="30"  r="2.5" fill="rgba(201,168,76,0.75)"/>
          <circle cx="80"  cy="130" r="2"   fill="rgba(201,168,76,0.5)"/>
          <circle cx="150" cy="150" r="1.5" fill="rgba(201,168,76,0.35)"/>
          <circle cx="190" cy="220" r="1"   fill="rgba(201,168,76,0.25)"/>
        </svg>

        {/* 价格图 */}
        <div className="hero-chart-wrap" ref={containerRef} aria-hidden="true">
          <div className="hero-chart-grid" />
          <canvas ref={canvasRef} className="hero-chart-canvas" />
          <span className="card-corner cc-tl"/><span className="card-corner cc-tr"/>
          <span className="card-corner cc-bl"/><span className="card-corner cc-br"/>
        </div>

        <div className="hero-scroll-cue" aria-hidden="true">↓ SCROLL</div>
      </section>

      <div id="about">
        <About embedded={true} />
      </div>
    </div>
  );
}
