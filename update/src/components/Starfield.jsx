import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;
    let stars          = [];
    let shootingStars  = [];
    let shootTimers    = [];

    // ── 设置 canvas 尺寸 ──
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // resize 后重新生成，确保用最新尺寸
      generateStars();
    };

    // ── 生成星星：用 canvas.width/height（已经是真实尺寸）──
    const generateStars = () => {
      const W = canvas.width;
      const H = canvas.height;
      stars = Array.from({ length: 240 }, () => ({
        x:     Math.random() * W,          // 直接用像素，不用百分比
        y:     Math.random() * H,
        r:     Math.random() * 1.5 + 0.18,
        alpha: Math.random() * 0.55 + 0.08,
        speed: Math.random() * 0.38 + 0.06,
        phase: Math.random() * Math.PI * 2,
        warm:  Math.random() > 0.22,       // 78% 暖金，22% 冷蓝白
      }));
    };

    // 先设尺寸再生成
    resize();
    window.addEventListener('resize', resize);

    // ── 生成流星 ──
    const spawnShootingStar = () => {
      const W = canvas.width;
      const H = canvas.height;
      shootingStars.push({
        x:       Math.random() * W * 0.85,
        y:       Math.random() * H * 0.45,
        len:     Math.random() * 100 + 60,
        speed:   Math.random() * 7 + 4,
        alpha:   0,
        life:    0,
        maxLife: Math.random() * 45 + 28,
        angle:   Math.PI / 5 + (Math.random() - 0.5) * 0.4,
      });
    };

    // 同时维持 3 条流星的随机间隔生成（每条独立计时）
    const scheduleShooter = (minMs, maxMs) => {
      const delay = minMs + Math.random() * (maxMs - minMs);
      const t = setTimeout(() => {
        spawnShootingStar();
        shootTimers.push(scheduleShooter(minMs, maxMs));
      }, delay);
      return t;
    };

    // 启动 3 个独立流星调度器，错开首次触发
    shootTimers.push(scheduleShooter(2500, 5000));
    setTimeout(() => shootTimers.push(scheduleShooter(3000, 6000)), 1200);
    setTimeout(() => shootTimers.push(scheduleShooter(4000, 7000)), 2800);

    // ── 渲染 ──
    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.007;

      // 星星
      stars.forEach(s => {
        const a = s.alpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.warm
          ? `rgba(220,200,150,${a})`
          : `rgba(185,205,255,${a * 0.65})`;
        ctx.fill();
      });

      // 流星
      shootingStars = shootingStars.filter(ss => ss.life < ss.maxLife);
      shootingStars.forEach(ss => {
        ss.life++;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        const prog = ss.life / ss.maxLife;
        ss.alpha = prog < 0.25
          ? prog / 0.25
          : 1 - (prog - 0.25) / 0.75;

        const tailX = ss.x - Math.cos(ss.angle) * ss.len;
        const tailY = ss.y - Math.sin(ss.angle) * ss.len;

        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0, `rgba(225,198,128,${ss.alpha * 0.95})`);
        grad.addColorStop(0.4, `rgba(225,198,128,${ss.alpha * 0.4})`);
        grad.addColorStop(1,   'rgba(225,198,128,0)');

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.4;
        ctx.stroke();

        // 流星头亮点
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,220,155,${ss.alpha})`;
        ctx.fill();

        // 头部光晕
        const glow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 6);
        glow.addColorStop(0, `rgba(225,198,128,${ss.alpha * 0.4})`);
        glow.addColorStop(1, 'rgba(225,198,128,0)');
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      shootTimers.forEach(clearTimeout);
    };
  }, []);

  // ── 鼠标光晕 ──
  useEffect(() => {
    const cursor = cursorRef.current;
    const move   = (e) => {
      cursor.style.left = `${e.clientX - 200}px`;
      cursor.style.top  = `${e.clientY - 200}px`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      {/* 星空 canvas */}
      <canvas
        ref={canvasRef}
        style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}
      />

      {/* 鼠标金色光晕 */}
      <div
        ref={cursorRef}
        style={{
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'left 0.1s ease-out, top 0.1s ease-out',
          left: -500, top: -500,
        }}
      />

      {/* 星云光晕 */}
      <div style={{ position:'fixed', width:540, height:540, background:'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)', top:-110, right:-70, filter:'blur(70px)', pointerEvents:'none', zIndex:0 }}/>
      <div style={{ position:'fixed', width:460, height:460, background:'radial-gradient(circle, rgba(28,14,110,0.26) 0%, transparent 65%)', bottom:-70, left:-70, filter:'blur(60px)', pointerEvents:'none', zIndex:0 }}/>
      <div style={{ position:'fixed', width:280, height:280, background:'radial-gradient(circle, rgba(45,20,160,0.11) 0%, transparent 65%)', top:'38%', right:'10%', filter:'blur(42px)', pointerEvents:'none', zIndex:0 }}/>

      {/* 交易终端网格 */}
      <div style={{
        position:'fixed', inset:0,
        backgroundImage:`linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
        backgroundSize:'56px 56px',
        pointerEvents:'none', zIndex:0,
      }}/>

      {/* 浮动数据碎片 */}
      {[
        { t:'MACD_CROSS', top:'17%', left:'56%', d:'0s'  },
        { t:'∇f(x)',      top:'33%', left:'75%', d:'2s'  },
        { t:'Null(A)',    top:'58%', left:'62%', d:'4s'  },
        { t:'GPA 3.83',  top:'11%', left:'82%', d:'1s'  },
        { t:'IQR',       top:'44%', left:'88%', d:'5s'  },
        { t:'Σᵢλᵢ',      top:'24%', left:'69%', d:'6s'  },
        { t:'RR≥2.0',    top:'72%', left:'78%', d:'3s'  },
        { t:'x=x₀+z',   top:'82%', left:'58%', d:'7s'  },
      ].map((f, i) => (
        <span key={i} style={{
          position:'fixed', top:f.top, left:f.left,
          fontFamily:'var(--font-mono)', fontSize:'10px',
          color:'rgba(201,168,76,0.07)', letterSpacing:'0.05em',
          pointerEvents:'none', zIndex:0,
          animation:`datafrag 10s ease-in-out ${f.d} infinite alternate`,
        }}>{f.t}</span>
      ))}

      <style>{`@keyframes datafrag { 0%{opacity:.35} 50%{opacity:1} 100%{opacity:.3} }`}</style>
    </>
  );
}
