import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId, shootTimers = [], shootingStars = [], stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
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
    const sched = (min, max) => {
      const t = setTimeout(() => { spawnShoot(); shootTimers.push(sched(min, max)); },
        min + Math.random() * (max - min));
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

  useEffect(() => {
    const cur = cursorRef.current;
    const move = e => { cur.style.left = `${e.clientX - 135}px`; cur.style.top = `${e.clientY - 135}px`; };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }} />
      {/* 光晕 270×270 */}
      <div ref={cursorRef} style={{
        width:270, height:270, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)',
        position:'fixed', pointerEvents:'none', zIndex:1,
        transition:'left 0.08s ease-out, top 0.08s ease-out', left:-400, top:-400,
      }} />
      <div style={{ position:'fixed', width:540, height:540, background:'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)', top:-110, right:-70, filter:'blur(70px)', pointerEvents:'none', zIndex:0 }}/>
      <div style={{ position:'fixed', width:460, height:460, background:'radial-gradient(circle, rgba(28,14,110,0.26) 0%, transparent 65%)', bottom:-70, left:-70, filter:'blur(60px)', pointerEvents:'none', zIndex:0 }}/>
      {[
        { t:'MACD_CROSS', top:'17%', left:'56%', d:'0s' },
        { t:'∇f(x)',      top:'33%', left:'75%', d:'2s' },
        { t:'Null(A)',    top:'58%', left:'62%', d:'4s' },
        { t:'GPA 3.85',  top:'11%', left:'82%', d:'1s' },
        { t:'Σᵢλᵢ',      top:'24%', left:'69%', d:'6s' },
        { t:'RR≥2.0',    top:'72%', left:'78%', d:'3s' },
      ].map((f, i) => (
        <span key={i} style={{ position:'fixed', top:f.top, left:f.left, fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(201,168,76,0.07)', letterSpacing:'0.05em', pointerEvents:'none', zIndex:0, animation:`datafrag 10s ease-in-out ${f.d} infinite alternate` }}>{f.t}</span>
      ))}
      <style>{`@keyframes datafrag{0%{opacity:.35}50%{opacity:1}100%{opacity:.3}}`}</style>
    </>
  );
}
