import { useEffect, useRef } from 'react';

/* 完全复刻 f0xy 效果：
   - 保留系统默认光标（不设 cursor:none）
   - 背景跟随鼠标的软光晕 blob（= f0xy WebGL 背景的 canvas 光晕等效）
   - 无任何自定义圆圈/点覆盖层                                        */
export default function Starfield() {
  const canvasRef = useRef(null);
  const glowRef   = useRef(null);

  /* ── 星空 + 流星 canvas ── */
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

  /* ── 背景光晕 blob — 复刻 f0xy WebGL 鼠标光效的平替 ── */
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    let gx = -600, gy = -600, rafId;

    const onMove = e => { gx = e.clientX; gy = e.clientY; };
    document.addEventListener('mousemove', onMove, { passive: true });

    /* 慢速 lerp：跟随鼠标但有明显惯性，与 f0xy WebGL mx lerp 0.06 一致 */
    const animate = () => {
      const bx = parseFloat(glow.dataset.x || -600);
      const by = parseFloat(glow.dataset.y || -600);
      const nx = bx + (gx - bx) * 0.055;
      const ny = by + (gy - by) * 0.055;
      glow.dataset.x = nx; glow.dataset.y = ny;
      glow.style.left = nx + 'px';
      glow.style.top  = ny + 'px';
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }} />

      {/* 背景跟随光晕 — 尺寸约为 f0xy WebGL 光效的 70%
          以鼠标为圆心，纯背景层，不遮挡任何交互                     */}
      <div ref={glowRef} style={{
        position: 'fixed', zIndex: 0, pointerEvents: 'none',
        width: 560, height: 560,
        marginLeft: -280, marginTop: -280,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.025) 40%, transparent 70%)',
        filter: 'blur(40px)',
        willChange: 'left, top',
      }} />

      {/* 固定环境光（不跟随鼠标）*/}
      <div style={{ position:'fixed', width:500, height:500, background:'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)', top:-100, right:-60, filter:'blur(70px)', pointerEvents:'none', zIndex:0 }}/>
      <div style={{ position:'fixed', width:440, height:440, background:'radial-gradient(circle, rgba(28,14,110,0.22) 0%, transparent 65%)', bottom:-60, left:-60, filter:'blur(60px)', pointerEvents:'none', zIndex:0 }}/>

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
      <style>{`@keyframes datafrag{0%{opacity:.3}50%{opacity:1}100%{opacity:.28}}`}</style>
    </>
  );
}
