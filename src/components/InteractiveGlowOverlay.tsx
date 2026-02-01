import React, { useEffect, useState } from 'react';
import './InteractiveGlowOverlay.css';

interface InteractiveGlowOverlayProps {
  /** Hue: 'purple' | 'cyan' | 'blue' */
  hue?: 'purple' | 'cyan' | 'blue';
  /** Size of the glow in px */
  size?: number;
  /** Max opacity of the glow (0–1) */
  intensity?: number;
}

const hueToGradient: Record<string, string> = {
  purple: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(82, 39, 255, 0.2) 35%, transparent 70%)',
  cyan: 'radial-gradient(circle, rgba(34, 211, 238, 0.35) 0%, rgba(6, 182, 212, 0.18) 35%, transparent 70%)',
  blue: 'radial-gradient(circle, rgba(96, 165, 250, 0.35) 0%, rgba(59, 130, 246, 0.18) 35%, transparent 70%)',
};

const InteractiveGlowOverlay: React.FC<InteractiveGlowOverlayProps> = ({
  hue = 'purple',
  size = 500,
  intensity = 1,
}) => {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener('mousemove', handleMove);
    document.body.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.body.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      className="interactive-glow-overlay"
      aria-hidden
      style={{
        ['--glow-x' as string]: `${pos.x}px`,
        ['--glow-y' as string]: `${pos.y}px`,
        ['--glow-size' as string]: `${size}px`,
        ['--glow-opacity' as string]: visible ? String(intensity) : '0',
        ['--glow-gradient' as string]: hueToGradient[hue],
      }}
    />
  );
};

export default InteractiveGlowOverlay;
