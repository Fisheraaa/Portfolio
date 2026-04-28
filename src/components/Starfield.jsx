import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  // 星空 Canvas 动画
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // 生成 180 颗星
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4,
      alpha: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.4 + 0.1,
      phase: Math.random() * Math.PI * 2
    }));

    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = time * 0.001;

      stars.forEach(star => {
        // sin 波动呼吸感
        const currentAlpha = star.alpha * (0.6 + 0.4 * Math.sin(t * star.speed + star.phase));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 鼠标光晕跟随
  useEffect(() => {
    const cursor = cursorRef.current;
    const moveCursor = (e) => {
      // 减去宽高的一半(150px)使其居中
      cursor.style.left = `${e.clientX - 150}px`;
      cursor.style.top = `${e.clientY - 150}px`;
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      {/* Canvas 星空 */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      {/* 鼠标光晕 */}
      <div
        ref={cursorRef}
        style={{
          width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,255,176,0.04) 0%, transparent 65%)',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'left 0.1s ease-out, top 0.1s ease-out',
          left: '-300px', top: '-300px' // 初始隐藏
        }}
      />

      {/* 固定角落星云 */}
      <div style={{
        position: 'fixed',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(79,255,176,0.06) 0%, transparent 65%)',
        top: '-100px', right: 0,
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(120,100,255,0.05) 0%, transparent 65%)',
        bottom: 0, left: '-80px',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
    </>
  );
}