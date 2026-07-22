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

    const resize = () => {
      canvas.width  = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    /*
     * 多层波形 — 像信号分析仪 / 示波器
     * 每层波有独立频率、振幅、滚动速度和透明度
     * 叠加在一起形成复杂但优雅的干涉图案
     */
    const waves = [
      /* 主波：最亮、最宽、有填充渐变 */
      { freq: 0.013, amp: 0.155, speed: 62,  alpha: 0.65, lw: 1.7, fill: true  },
      /* 中频副波 */
      { freq: 0.023, amp: 0.088, speed: 37,  alpha: 0.30, lw: 1.0, fill: false },
      /* 低频慢波 */
      { freq: 0.007, amp: 0.120, speed: 20,  alpha: 0.17, lw: 0.8, fill: false },
      /* 高频细波 */
      { freq: 0.041, amp: 0.048, speed: 95,  alpha: 0.11, lw: 0.6, fill: false },
    ];

    const getY = (x, t, w) =>
      canvas.height * 0.5
      + Math.sin((x + t * w.speed) * w.freq)               * canvas.height * w.amp
      + Math.sin((x + t * w.speed) * w.freq * 2.15 + 0.9)  * canvas.height * w.amp * 0.32;

    const render = ts => {
      const W = canvas.width, H = canvas.height;
      const t = ts * 0.001;
      ctx.clearRect(0, 0, W, H);

      waves.forEach(w => {
        /* 收集各 x 处的 y 值 */
        const pts = [];
        for (let x = 0; x <= W; x += 2) pts.push([x, getY(x, t, w)]);

        /* 渐变填充（只有主波） */
        if (w.fill) {
          ctx.beginPath();
          ctx.moveTo(0, H);
          pts.forEach(([x, y]) => ctx.lineTo(x, y));
          ctx.lineTo(W, H);
          ctx.closePath();
          const g = ctx.createLinearGradient(0, 0, 0, H);
          g.addColorStop(0, 'rgba(201,168,76,0.13)');
          g.addColorStop(1, 'rgba(201,168,76,0)');
          ctx.fillStyle = g;
          ctx.fill();
        }

        /* 波形线 */
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.strokeStyle = `rgba(201,168,76,${w.alpha})`;
        ctx.lineWidth   = w.lw;
        ctx.stroke();
      });

      /* 主波右端的实时跳动圆点 */
      const mw = waves[0];
      const dotY = getY(W, t, mw);
      const glow = 7 + Math.sin(t * 3.2) * 2.5;
      ctx.beginPath();
      ctx.arc(W - 2, dotY, glow, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201,168,76,0.10)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(W - 2, dotY, 2.5, 0, Math.PI * 2);
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
    <div className="hero-page">
      <section className="hero-section">
        <div className="hero-inner">

          {/* 状态栏 */}
          <div className="hero-top">
            <div className="hero-top-loc">
              <span>{isZh ? '坐标 珠海' : 'Based in Zhuhai'}</span>
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
            <span className="hero-heading-line2">Leon Yu<span className="hero-dot"></span></span>
          </h1>

          {/* CTA 按钮 */}
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

        {/* 信号图 */}
        <div className="hero-chart-wrap" ref={containerRef} aria-hidden="true">
          <div className="hero-chart-grid" />
          <canvas ref={canvasRef} className="hero-chart-canvas" />
          <span className="card-corner cc-tl"/><span className="card-corner cc-tr"/>
          <span className="card-corner cc-bl"/><span className="card-corner cc-br"/>
        </div>

        <div className="hero-scroll-cue" aria-hidden="true">↓ <b>{isZh ? '向下了解更多' : 'SCROLL'}</b></div>
      </section>

      <div id="about">
        <About embedded={true} />
      </div>
    </div>
  );
}
