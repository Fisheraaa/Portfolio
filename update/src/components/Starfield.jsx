import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // 重新分配星星位置
      initStars();
    };

    let stars = [];
    let shootingStars = [];

    const initStars = () => {
      // 暖金白星 220颗
      stars = Array.from({ length: 220 }, () => ({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        r:     Math.random() * 1.5 + 0.15,
        alpha: Math.random() * 0.55 + 0.08,
        speed: Math.random() * 0.35 + 0.06,
        phase: Math.random() * Math.PI * 2,
        warm:  Math.random() > 0.25,   // 75% 暖金，25% 冷蓝白
      }));
    };

    initStars();
    window.addEventListener('resize', resize);

    // 流星生成
    const spawnShootingStar = () => {
      shootingStars.push({
        x:      Math.random() * canvas.width * 0.8,
        y:      Math.random() * canvas.height * 0.4,
        len:    Math.random() * 80 + 60,
        speed:  Math.random() * 6 + 4,
        alpha:  0,
        life:   0,
        maxLife: Math.random() * 40 + 30,
        angle:  Math.PI / 5 + Math.random() * 0.3,
      });
    };

    // 每 4-8 秒随机流星
    let shootTimer = setTimeout(function spawn() {
      spawnShootingStar();
      shootTimer = setTimeout(spawn, 4000 + Math.random() * 4000);
    }, 3000 + Math.random() * 3000);

    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.007;

      // 画星星
      stars.forEach(s => {
        const a = s.alpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.warm
          ? `rgba(220,200,150,${a})`
          : `rgba(180,200,255,${a * 0.6})`;
        ctx.fill();
      });

      // 画流星
      shootingStars = shootingStars.filter(ss => ss.life < ss.maxLife);
      shootingStars.forEach(ss => {
        ss.life++;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        // fade in then out
        ss.alpha = ss.life < ss.maxLife * 0.3
          ? ss.life / (ss.maxLife * 0.3)
          : 1 - (ss.life - ss.maxLife * 0.3) / (ss.maxLife * 0.7);

        const grad = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - Math.cos(ss.angle) * ss.len,
          ss.y - Math.sin(ss.angle) * ss.len
        );
        grad.addColorStop(0, `rgba(220,195,130,${ss.alpha * 0.9})`);
        grad.addColorStop(1, 'rgba(220,195,130,0)');

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x - Math.cos(ss.angle) * ss.len,
          ss.y - Math.sin(ss.angle) * ss.len
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // 流星头部亮点
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,215,150,${ss.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      clearTimeout(shootTimer);
    };
  }, []);

  // 鼠标光晕跟随 — 金色
  useEffect(() => {
    const cursor = cursorRef.current;
    const move = (e) => {
      cursor.style.left = `${e.clientX - 180}px`;
      cursor.style.top  = `${e.clientY - 180}px`;
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

      {/* 鼠标光晕 — 金色 */}
      <div
        ref={cursorRef}
        style={{
          width:'360px', height:'360px',
          borderRadius:'50%',
          background:'radial-gradient(circle, rgba(201,168,76,0.055) 0%, transparent 65%)',
          position:'fixed',
          pointerEvents:'none',
          zIndex:1,
          transition:'left 0.12s ease-out, top 0.12s ease-out',
          left:'-400px', top:'-400px',
        }}
      />

      {/* 星云光晕 — 右上金，左下深靛 */}
      <div style={{
        position:'fixed', width:'520px', height:'520px',
        background:'radial-gradient(circle, rgba(201,168,76,0.065) 0%, transparent 65%)',
        top:'-100px', right:'-60px',
        filter:'blur(70px)', pointerEvents:'none', zIndex:0,
      }}/>
      <div style={{
        position:'fixed', width:'440px', height:'440px',
        background:'radial-gradient(circle, rgba(28,14,110,0.28) 0%, transparent 65%)',
        bottom:'-60px', left:'-60px',
        filter:'blur(60px)', pointerEvents:'none', zIndex:0,
      }}/>
      <div style={{
        position:'fixed', width:'260px', height:'260px',
        background:'radial-gradient(circle, rgba(45,20,160,0.12) 0%, transparent 65%)',
        top:'38%', right:'10%',
        filter:'blur(40px)', pointerEvents:'none', zIndex:0,
      }}/>

      {/* 交易终端金色网格 */}
      <div style={{
        position:'fixed', inset:0,
        backgroundImage:`
          linear-gradient(rgba(201,168,76,0.032) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.032) 1px, transparent 1px)`,
        backgroundSize:'56px 56px',
        pointerEvents:'none', zIndex:0,
      }}/>

      {/* 浮动数据碎片 */}
      {[
        { text:'MACD_CROSS', top:'17%', left:'56%', delay:'0s' },
        { text:'∇f(x)',      top:'33%', left:'75%', delay:'2s' },
        { text:'Null(A)',    top:'58%', left:'62%', delay:'4s' },
        { text:'GPA 3.83',  top:'11%', left:'82%', delay:'1s' },
        { text:'IQR',       top:'44%', left:'88%', delay:'5s' },
        { text:'Σᵢλᵢ',      top:'24%', left:'69%', delay:'6s' },
        { text:'RR≥2.0',    top:'72%', left:'78%', delay:'3s' },
        { text:'x=x₀+z',   top:'82%', left:'58%', delay:'7s' },
      ].map((f,i) => (
        <span key={i} style={{
          position:'fixed', top:f.top, left:f.left,
          fontFamily:'var(--font-mono)', fontSize:'10px',
          color:'rgba(201,168,76,0.07)', letterSpacing:'0.05em',
          pointerEvents:'none', zIndex:0,
          animation:`datafrag 10s ease-in-out ${f.delay} infinite alternate`,
        }}>{f.text}</span>
      ))}

      <style>{`
        @keyframes datafrag {
          0%   { opacity: 0.35; }
          50%  { opacity: 1; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}
