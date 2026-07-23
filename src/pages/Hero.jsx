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

    const G    = a => `rgba(201,168,76,${a})`;
    const GOLD = '#c9a84c';
    const BG   = '#04050e';
    const mt = 16, mb = 16, gap = 4;
    const SPKX = 20; // px / s 滚动速度

    // ── Seeded LCG random — 每次刷新图形一致 ──
    let seed = 0x9e3779b9;
    const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0x100000000; };

    // ── 预生成 240 根蜡烛，双频正弦趋势使首尾自然衔接 ──
    const N = 240;
    let price = 100;
    const data = Array.from({ length: N }, (_, i) => {
      const ph     = (i / N) * Math.PI * 2;
      const target = 100 + 13 * Math.sin(ph) + 5 * Math.sin(ph * 2.9 + 0.6);
      const o      = price;
      price = Math.max(65, Math.min(135, price + (rand() - 0.47) * 4 + (target - price) * 0.13));
      return {
        o, c: price,
        h: Math.max(o, price) + rand() * 2.2 + 0.5,
        l: Math.min(o, price) - rand() * 2.2 - 0.5,
      };
    });

    // ── 预算 MA10（循环索引，首尾连续）──
    const maData = data.map((_, i) => {
      let s = 0;
      for (let k = 0; k < 10; k++) s += data[(i - k + N) % N].c;
      return s / 10;
    });

    // ── 固定价格范围，Y 轴不抖动 ──
    const allP = data.flatMap(c => [c.h, c.l]);
    const minP = Math.min(...allP) - 2;
    const maxP = Math.max(...allP) + 2;

    // ── 初始化画布尺寸 ──
    const resize = () => {
      canvas.width  = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // cw / step / loopPx 基于初始宽度固定，避免 resize 引起滚动跳变
    const cw     = Math.max(9, Math.floor(canvas.width / 44));
    const step   = cw + gap;
    const loopPx = N * step;

    // ── 渲染循环 ──
    const render = ts => {
      const W = canvas.width, H = canvas.height;
      if (!W || !H) { animId = requestAnimationFrame(render); return; }

      const t      = ts * 0.001;
      const priceH = H - mt - mb;
      const py     = p => mt + priceH * (1 - (p - minP) / (maxP - minP));
      const wCy    = mt + priceH * 0.5;
      const wAmp   = priceH * 0.24;
      const nVis   = Math.ceil(W / step) + 2;

      // 亚像素平滑滚动，在 [0, loopPx) 内无缝循环
      const scrollPx = (t * SPKX) % loopPx;
      const baseIdx  = Math.floor(scrollPx / step) % N;
      const subPx    = scrollPx % step;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // 格线 + 右侧价格标签
      for (let i = 1; i <= 3; i++) {
        const y = mt + priceH * i / 4;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y);
        ctx.strokeStyle = G(0.045); ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = G(0.18); ctx.font = '9px monospace'; ctx.textAlign = 'right';
        ctx.fillText((maxP - (maxP - minP) * i / 4).toFixed(0), W - 5, y - 2);
        ctx.textAlign = 'left';
      }

      // 背景多层波形（实时 sin，在蜡烛下层）
      [
        { f: 0.014, a: 1.00, s: 52, al: 0.26, lw: 1.6, fi: true },
        { f: 0.027, a: 0.62, s: 35, al: 0.14, lw: 1.0 },
        { f: 0.044, a: 0.40, s: 88, al: 0.08, lw: 0.7 },
      ].forEach(w => {
        const pts = [];
        for (let x = 0; x <= W; x += 2)
          pts.push([x,
            wCy + Math.sin((x + t * w.s) * w.f) * wAmp * w.a
                + Math.sin((x + t * w.s) * w.f * 2.1 + 0.9) * wAmp * w.a * 0.28]);
        if (w.fi) {
          ctx.beginPath();
          ctx.moveTo(0, wCy); pts.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(W, wCy);
          ctx.closePath();
          const g = ctx.createLinearGradient(0, wCy - wAmp, 0, wCy + wAmp);
          g.addColorStop(0, G(0.07)); g.addColorStop(0.5, G(0)); g.addColorStop(1, G(0.07));
          ctx.fillStyle = g; ctx.fill();
        }
        ctx.beginPath();
        pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
        ctx.strokeStyle = G(w.al); ctx.lineWidth = w.lw; ctx.stroke();
      });

      // 裁剪蜡烛区域，防止亚像素偏移时溢出边缘
      ctx.save();
      ctx.beginPath(); ctx.rect(0, mt, W, priceH); ctx.clip();

      // MA10 线
      ctx.beginPath();
      for (let i = 0; i <= nVis; i++) {
        const idx = (baseIdx + i) % N;
        const mx  = i * step - subPx + cw / 2;
        i === 0 ? ctx.moveTo(mx, py(maData[idx])) : ctx.lineTo(mx, py(maData[idx]));
      }
      ctx.strokeStyle = G(0.22); ctx.lineWidth = 1; ctx.stroke();

      // 蜡烛（从预生成数组取，零运算）
      for (let i = 0; i <= nVis; i++) {
        const idx  = (baseIdx + i) % N;
        const c    = data[idx];
        const x    = i * step - subPx;
        const mx   = x + cw / 2;
        const bull = c.c >= c.o;
        const bT   = py(Math.max(c.o, c.c));
        const bB   = py(Math.min(c.o, c.c));
        const bH   = Math.max(1, bB - bT);

        ctx.beginPath(); ctx.moveTo(mx, py(c.h)); ctx.lineTo(mx, py(c.l));
        ctx.strokeStyle = G(bull ? 0.50 : 0.34); ctx.lineWidth = 1; ctx.stroke();

        if (bull) {
          ctx.fillStyle   = G(0.05); ctx.fillRect(x, bT, cw, bH);
          ctx.strokeStyle = G(0.70); ctx.lineWidth = 1.5; ctx.strokeRect(x, bT, cw, bH);
        } else {
          ctx.fillStyle   = G(0.24); ctx.fillRect(x, bT, cw, bH);
          ctx.strokeStyle = G(0.37); ctx.lineWidth = 1;   ctx.strokeRect(x, bT, cw, bH);
        }
      }

      ctx.restore();

      // 脉冲点：跟随最右侧完整可见蜡烛的收盘价
      const lastSlot = Math.floor((W - step) / step);
      const lastIdx  = (baseIdx + lastSlot) % N;
      const lx = lastSlot * step - subPx + cw / 2;
      const ly = py(data[lastIdx].c);
      ctx.beginPath(); ctx.arc(lx, ly, 7 + Math.sin(t * 2.4) * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = G(0.11); ctx.fill();
      ctx.beginPath(); ctx.arc(lx, ly, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = GOLD; ctx.fill();

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

          {/* 状态栏 — 支持中英文切换 */}
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

        <div className="hero-scroll-cue" aria-hidden="true">↓ <b>{isZh ? '向下了解更多' : 'SCROLL'}</b></div>
      </section>

      <div id="about">
        <About embedded={true} />
      </div>
    </div>
  );
}
