import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const glowRef   = useRef(null);   // 大光晕 blob

  /* ── 星空 canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId, shootTimers = [], shootingStars = [], stars = [];
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 240 }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.18, alpha: Math.random() * 0.55 + 0.08,
        speed: Math.random() * 0.38 + 0.06, phase: Math.random() * Math.PI * 2,
        warm: Math.random() > 0.22,
      }));
    };
    resize();
    window.addEventListener('resize', resize);
    const spawnShoot = () => {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.85, y: Math.random() * canvas.height * 0.45,
        len: Math.random() * 100 + 60, speed: Math.random() * 7 + 4,
        alpha: 0, life: 0, maxLife: Math.random() * 45 + 28,
        angle: Math.PI / 5 + (Math.random() - 0.5) * 0.4,
      });
    };
    const sched = (mn, mx2) => {
      const t = setTimeout(() => { spawnShoot(); shootTimers.push(sched(mn, mx2)); }, mn + Math.random() * (mx2 - mn));
      return t;
    };
    shootTimers.push(sched(2500, 5000));
    setTimeout(() => shootTimers.push(sched(3000, 6000)), 1200);
    setTimeout(() => shootTimers.push(sched(4000, 7000)), 2800);
    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.007;
      stars.forEach(s => {
        const a = s.alpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.warm ? `rgba(220,200,150,${a})` : `rgba(185,205,255,${a * 0.65})`;
        ctx.fill();
      });
      shootingStars = shootingStars.filter(ss => ss.life < ss.maxLife);
      shootingStars.forEach(ss => {
        ss.life++; ss.x += Math.cos(ss.angle) * ss.speed; ss.y += Math.sin(ss.angle) * ss.speed;
        const prog = ss.life / ss.maxLife;
        ss.alpha = prog < 0.25 ? prog / 0.25 : 1 - (prog - 0.25) / 0.75;
        const tx = ss.x - Math.cos(ss.angle) * ss.len, ty = ss.y - Math.sin(ss.angle) * ss.len;
        const g = ctx.createLinearGradient(ss.x, ss.y, tx, ty);
        g.addColorStop(0, `rgba(225,198,128,${ss.alpha * 0.95})`);
        g.addColorStop(0.4, `rgba(225,198,128,${ss.alpha * 0.4})`);
        g.addColorStop(1, 'rgba(225,198,128,0)');
        ctx.beginPath(); ctx.moveTo(ss.x, ss.y); ctx.lineTo(tx, ty);
        ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.stroke();
        ctx.beginPath(); ctx.arc(ss.x, ss.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,220,155,${ss.alpha})`; ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };
    render();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); shootTimers.forEach(clearTimeout); };
  }, []);

  /* ── 光标系统：点 + 圆环 + 大光晕 ── */
  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    let mx = -400, my = -400;   // 精确位置 → 点
    let rx = -400, ry = -400;   // 圆环跟随（中速 lerp）
    let gx = -400, gy = -400;   // 光晕跟随（慢速 lerp）
    let rafId;

    const onMove = e => {
      mx = e.clientX; my = e.clientY;
      // 点：立即跟随
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    };
    document.addEventListener('mousemove', onMove);

    const animate = () => {
      // 圆环：中速 lerp
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      // 大光晕：慢速 lerp
      gx += (mx - gx) * 0.055;
      gy += (my - gy) * 0.055;
      glow.style.left = gx + 'px';
      glow.style.top  = gy + 'px';
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // 悬停状态
    const setHover = on => document.body.classList.toggle('cursor-hover', on);
    const attach = () => {
      document.querySelectorAll('a,button,[role="button"],[tabindex]').forEach(el => {
        el.addEventListener('mouseenter', () => setHover(true));
        el.addEventListener('mouseleave', () => setHover(false));
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }} />

      {/* 大光晕 blob — 320×320，慢速跟随，是主要"光晕感" */}
      <div ref={glowRef} style={{
        position:'fixed', zIndex:1, pointerEvents:'none',
        width:320, height:320,
        marginLeft:-160, marginTop:-160,    // 以光标为中心
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(201,168,76,0.11) 0%, rgba(201,168,76,0.03) 45%, transparent 70%)',
        filter:'blur(18px)',
        transition:'opacity .3s',
      }} />

      {/* 圆环 — 44px，中速跟随 */}
      <div ref={ringRef} className="cursor-ring" />

      {/* 精确点 — 8px，立即跟随 */}
      <div ref={dotRef} className="cursor-dot" />

      {/* 环境光晕（固定，不跟随鼠标）*/}
      <div style={{ position:'fixed', width:500, height:500, background:'radial-gradient(circle, rgba(201,168,76,0.055) 0%, transparent 65%)', top:-100, right:-60, filter:'blur(70px)', pointerEvents:'none', zIndex:0 }}/>
      <div style={{ position:'fixed', width:440, height:440, background:'radial-gradient(circle, rgba(28,14,110,0.24) 0%, transparent 65%)', bottom:-60, left:-60, filter:'blur(60px)', pointerEvents:'none', zIndex:0 }}/>

      {/* 浮动数据片段 */}
      {[
        { t:'MACD_CROSS', top:'16%', left:'55%', d:'0s' },
        { t:'∇f(x)',      top:'32%', left:'74%', d:'2s' },
        { t:'Null(A)',    top:'57%', left:'61%', d:'4s' },
        { t:'Σᵢλᵢ',      top:'22%', left:'68%', d:'6s' },
        { t:'RR≥2.0',    top:'71%', left:'77%', d:'3s' },
      ].map((f, i) => (
        <span key={i} style={{ position:'fixed', top:f.top, left:f.left, fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(201,168,76,0.07)', letterSpacing:'0.05em', pointerEvents:'none', zIndex:0, animation:`datafrag 10s ease-in-out ${f.d} infinite alternate` }}>{f.t}</span>
      ))}

      <style>{`
        body { cursor: none; }

        /* 精确点 */
        .cursor-dot {
          position: fixed; z-index: 9999; pointer-events: none;
          width: 8px; height: 8px; border-radius: 50%;
          background: #c9a84c;
          margin-left: -4px; margin-top: -4px;
          transition: opacity .15s, transform .15s;
        }

        /* 圆环 — 44px 比之前 28px 大得多 */
        .cursor-ring {
          position: fixed; z-index: 9998; pointer-events: none;
          width: 44px; height: 44px; border-radius: 50%;
          border: 1.5px solid rgba(201,168,76,0.55);
          margin-left: -22px; margin-top: -22px;
          transition: width .3s cubic-bezier(.16,1,.3,1),
                      height .3s cubic-bezier(.16,1,.3,1),
                      border-color .3s, background .3s,
                      margin .3s cubic-bezier(.16,1,.3,1);
        }

        /* 悬停状态：点消失，圆环扩展 */
        body.cursor-hover .cursor-dot  { opacity: 0; transform: scale(0.5); }
        body.cursor-hover .cursor-ring {
          width: 68px; height: 68px;
          margin-left: -34px; margin-top: -34px;
          border-color: rgba(201,168,76,0.9);
          background: rgba(201,168,76,0.06);
        }

        @keyframes datafrag { 0%{opacity:.3} 50%{opacity:1} 100%{opacity:.28} }
      `}</style>
    </>
  );
}
