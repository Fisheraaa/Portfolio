import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Hero.css';

export default function Hero() {
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const { i18n }     = useTranslation();
  const isZh         = i18n.language === 'zh';
  const [time, setTime] = useState('--:--:--');

  // 实时时钟
  useEffect(() => {
    const tick = () => {
      try {
        setTime(new Date().toLocaleTimeString('zh-CN', { hour12: false, timeZone: 'Asia/Shanghai' }));
      } catch {
        setTime(new Date().toLocaleTimeString());
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // 价格图 canvas（保留原动画）
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
      return { x: p, baseY: 0.78 - p * 0.55 + Math.sin(p * Math.PI * 3) * 0.13,
        phase: Math.random() * Math.PI * 2, speed: Math.random() * 0.018 + 0.008,
        amp: Math.random() * 0.04 + 0.018 };
    });

    const render = (ts) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height, t = ts * 0.001;
      const pts = points.map(p => ({ x: p.x * W,
        y: (p.baseY + Math.sin(t * p.speed * 10 + p.phase) * p.amp) * H }));
      ctx.beginPath(); ctx.moveTo(pts[0].x, H); ctx.lineTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const mx = (pts[i-1].x + pts[i].x) / 2;
        ctx.bezierCurveTo(mx, pts[i-1].y, mx, pts[i].y, pts[i].x, pts[i].y);
      }
      ctx.lineTo(pts[pts.length-1].x, H); ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'rgba(201,168,76,0.14)'); grad.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const mx = (pts[i-1].x + pts[i].x) / 2;
        ctx.bezierCurveTo(mx, pts[i-1].y, mx, pts[i].y, pts[i].x, pts[i].y);
      }
      ctx.strokeStyle = 'rgba(201,168,76,0.6)'; ctx.lineWidth = 1.5; ctx.stroke();
      const last = pts[pts.length-1];
      const glow = Math.sin(t * 2) * 3;
      ctx.beginPath(); ctx.arc(last.x, last.y, 8 + glow, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(201,168,76,0.12)'; ctx.fill();
      ctx.beginPath(); ctx.arc(last.x, last.y, 3, 0, Math.PI*2);
      ctx.fillStyle = '#c9a84c'; ctx.fill();
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, []);

  // Scroll reveal for about section
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-item');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="hero-page">

      {/* ═══ HERO SECTION ═══ */}
      <section className="hero-section">
        <div className="hero-inner">

          {/* 状态栏 — f0xy style */}
          <div className="hero-top">
            <div className="hero-top-loc">
              <span>{isZh ? '坐标 珠海' : 'Based in Zhuhai'}</span>
              <span className="arr"> → </span>
              <b>{time}</b>
            </div>
            <div className="hero-top-status">
              <span className="hero-spark">✦</span>
              <span>{isZh ? '状态' : 'Status'}</span>
              <span className="arr"> → </span>
              <b>{isZh ? '实习申请中' : 'Open to internships'}</b>
            </div>
          </div>

          <hr className="hero-rule" />

          {/* 大字标题 */}
          <h1 className="hero-heading">
            {isZh ? '你好，我是' : "Hi, I'm"}
            <span className="hero-name"> Leon Yu<span className="hero-dot">。</span></span>
          </h1>

          {/* 元信息 key → value */}
          <div className="hero-meta">
            <p>
              <span className="hero-lbl">{isZh ? '现在' : 'Now'}</span>
              <span className="arr">→ </span>
              <b>{isZh
                ? '香港浸会大学（珠海校区）计算机科学与技术 大一'
                : 'HKBU (Zhuhai Campus) · Computer Science · Year 1'}</b>
            </p>
            <p>
              <span className="hero-lbl">{isZh ? '方向' : 'Target'}</span>
              <span className="arr">→ </span>
              <b>Quant Strategy Research · PM · AI</b>
            </p>
            <p>
              <span className="hero-lbl">{isZh ? '在做' : 'Building'}</span>
              <span className="arr">→ </span>
              <b>{isZh
                ? '跨市场特质收益反转研究 · DayAlpha · quant 全链'
                : 'Cross-Market Idiosyncratic Reversion · DayAlpha'}</b>
            </p>
          </div>

          {/* CTA 按钮 */}
          <div className="hero-btns">
            <Link to="/projects" className="btn-primary">
              {isZh ? '查看项目' : 'View Projects'} →
            </Link>
            <Link to="/contact" className="btn-ghost">
              {isZh ? '打个招呼' : 'Say Hi'}
            </Link>
          </div>

          {/* 向下滚动提示 */}
          <div className="hero-scroll-cue" aria-hidden="true">↓ SCROLL</div>
        </div>

        {/* 装饰：星座 SVG */}
        <svg className="hero-constellation" viewBox="0 0 220 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

        {/* 装饰：价格图 */}
        <div className="hero-chart-wrap" ref={containerRef} aria-hidden="true">
          <div className="hero-chart-grid" />
          <canvas ref={canvasRef} className="hero-chart-canvas" />
          <span className="card-corner cc-tl" /><span className="card-corner cc-tr" />
          <span className="card-corner cc-bl" /><span className="card-corner cc-br" />
        </div>
      </section>

      {/* ═══ 内联关于部分 — 向下滚动可见 ═══ */}
      <section className="hero-about-section" id="about">
        <div className="hero-about-inner">

          {/* 分区头 */}
          <div className="sec-head reveal-item">
            <h2 className="sec-h2">{isZh ? '关于' : 'About'}</h2>
            <div className="sec-stat">✦ CGPA 3.85 / 4.0</div>
          </div>

          {/* 两栏：简介 + 元信息 */}
          <div className="about-grid">
            <p className="about-lead reveal-item">
              {isZh
                ? '喜欢弄清模糊背后的东西是什么——一个信号？一个概念？还是一种全新的理解与认知？从数据采集到回测，从特征工程到模型解释，倾向于先把整个管道跑通，再追问每一步的前提是否成立。'
                : "I like figuring out what's behind the fuzzy — a signal? a concept? or an entirely new way of understanding something? From data ingestion to backtesting, from feature engineering to model interpretation, I prefer getting the full pipeline running before questioning each assumption."}
            </p>
            <div className="about-kv reveal-item" style={{ transitionDelay: '0.08s' }}>
              <p><span className="about-k">{isZh ? '学校' : 'School'}</span>
                <b>{isZh ? '香港浸会大学（珠海校区）' : 'HKBU, Zhuhai Campus'}</b></p>
              <p><span className="about-k">{isZh ? '专业' : 'Major'}</span>
                <b>{isZh ? '计算机科学与技术' : 'Computer Science'}</b></p>
              <p><span className="about-k">GPA</span><b>3.85 / 4.0</b></p>
              <p><span className="about-k">{isZh ? '获奖' : 'Awards'}</span>
                <b>{isZh ? 'MCM Meritorious · BNBU 银奖' : 'MCM Meritorious · BNBU Silver'}</b></p>
            </div>
          </div>

          {/* Tech Stack — skillicons.dev */}
          <div className="skills-block reveal-item" style={{ transitionDelay: '0.14s' }}>
            <div className="skills-label">{isZh ? '技术栈' : 'Tech Stack'}</div>
            <div className="skills-icons">
              <img
                src="https://skillicons.dev/icons?i=py,pytorch,react,fastapi,docker,git,linux,mysql&theme=dark&perline=8"
                alt="Python PyTorch React FastAPI Docker Git Linux MySQL"
                loading="lazy"
              />
            </div>
          </div>

          {/* 关于我完整页面 CTA */}
          <Link to="/about" className="about-cta-card reveal-item" style={{ transitionDelay: '0.2s' }}>
            <div>
              <div className="cta-label">{isZh ? '了解更多' : 'More'}</div>
              <div className="cta-title">{isZh ? '完整关于页面' : 'Full About Page'}</div>
            </div>
            <span className="cta-arr">→</span>
          </Link>

        </div>
      </section>
    </div>
  );
}
