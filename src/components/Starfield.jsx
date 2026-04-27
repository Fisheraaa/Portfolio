import { useEffect, useState } from 'react';

export default function Starfield() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="starfield">
      <div 
        className="cursor-glow" 
        style={{ 
          left: cursor.x, 
          top: cursor.y 
        }} 
      />
    </div>
  );
}
