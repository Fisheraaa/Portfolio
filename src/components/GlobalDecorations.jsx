import { useEffect, useRef } from 'react';

/**
 * 全局背景装饰层
 * 在 App.jsx 的最顶层渲染一次，fixed 定位，所有页面共享
 *
 * 使用方法：在 App.jsx 的 <Router> 内最顶部加：
 *   <GlobalDecorations />
 */
export default function GlobalDecorations() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // 150颗星，暖金白色调
    const stars = Array.from({ length: 160 }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      r:     Math.random() * 1.3 + 0.2,
      alpha: Math.random() * 0.5 + 0.08,
      speed: Math.random() * 0.35 + 0.08,
      phase: Math.random() * Math.PI * 2,
    }));

    // 少量蓝白星（点缀）
    const coolStars = Array.from({ length: 30 }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      r:     Math.random() * 0.8 + 0.15,
      alpha: Math.random() * 0.25 + 0.05,
      speed: Math.random() * 0.2 + 0.05,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.007;

      stars.forEach(s => {
        const a = s.alpha * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,200,155,${a})`;
        ctx.fill();
      });

      coolStars.forEach(s => {
        const a = s.alpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,200,255,${a})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const DATA_FRAGS = [
    { text: 'MACD_CROSS',  top: '18%', left: '55%', delay: '0s'  },
    { text: 'SH510880',    top: '32%', left: '76%', delay: '2s'  },
    { text: '∇f(x)',       top: '58%', left: '60%', delay: '4s'  },
    { text: 'GPA 3.83',    top: '12%', left: '82%', delay: '1s'  },
    { text: 'Null(A)',      top: '70%', left: '72%', delay: '3s'  },
    { text: 'IQR',         top: '45%', left: '88%', delay: '5s'  },
    { text: 'Σᵢλᵢ',        top: '25%', left: '68%', delay: '6s'  },
    { text: 'RR≥2.0',      top: '80%', left: '80%', delay: '7s'  },
  ];

  return (
    <>
      {/* 星空 */}
      <canvas
        ref={canvasRef}
        id="star-canvas"
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      />

      {/* 交易终端网格 */}
      <div className="grid-overlay" />

      {/* 星云光晕 */}
      <div className="nebula nebula-gold" />
      <div className="nebula nebula-indigo" />
      <div className="nebula nebula-indigo2" />

      {/* 浮动数据碎片 */}
      {DATA_FRAGS.map((f, i) => (
        <span
          key={i}
          className="data-frag"
          style={{ top: f.top, left: f.left, animationDelay: f.delay }}
        >
          {f.text}
        </span>
      ))}

      {/* 底部状态条 */}
      <div className="status-bar-global">
        <span className="status-bar-item">BNU-HKBU UIC · 2025</span>
        <span className="status-bar-item">● SYS_OK</span>
        <span className="status-bar-item">© 2026 Yu Qiuxing</span>
      </div>
    </>
  );
}