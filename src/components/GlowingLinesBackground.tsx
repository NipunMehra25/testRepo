import React, { useEffect, useState } from 'react';
import './GlowingLinesBackground.css';

interface GlowingLinesBackgroundProps {
  /** Neon color for lines */
  color?: string;
  /** Number of horizontal + vertical lines */
  count?: number;
}

const GlowingLinesBackground: React.FC<GlowingLinesBackgroundProps> = ({
  color = 'rgba(96, 165, 250, 0.5)',
  count = 20,
}) => {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const lines: Array<{ type: 'h' | 'v'; i: number }> = [];
  for (let i = 0; i < count; i++) {
    lines.push({ type: 'h', i });
    lines.push({ type: 'v', i });
  }

  return (
    <div className="glowing-lines-bg" aria-hidden style={{ ['--line-color' as string]: color }}>
      {lines.map(({ type, i }) => {
        const pos = (i / (count - 1)) * 100;
        const distX = type === 'v' ? Math.abs(mouse.x - i / (count - 1)) : 0;
        const distY = type === 'h' ? Math.abs(mouse.y - i / (count - 1)) : 0;
        const dist = type === 'v' ? distX : distY;
        const opacity = 0.15 + (1 - Math.min(dist * 2, 1)) * 0.5;
        return (
          <div
            key={`${type}-${i}`}
            className={`glowing-line glowing-line--${type}`}
            style={
              type === 'h'
                ? { top: `${pos}%`, opacity }
                : { left: `${pos}%`, opacity }
            }
          />
        );
      })}
    </div>
  );
};

export default GlowingLinesBackground;
