import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './FeatureCardGlass.css';

export type FeatureCardAccent = 'purple' | 'cyan' | 'green' | 'blue';

export interface FeatureCardGlassProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent?: FeatureCardAccent;
  delay?: number;
  stagger?: number;
}

const accentStyles: Record<FeatureCardAccent, { border: string; glow: string; icon: string }> = {
  purple: { border: 'rgba(139, 92, 246, 0.8)', glow: 'rgba(139, 92, 246, 0.35)', icon: '#a78bfa' },
  cyan: { border: 'rgba(34, 211, 238, 0.8)', glow: 'rgba(34, 211, 238, 0.35)', icon: '#22d3ee' },
  green: { border: 'rgba(52, 211, 153, 0.8)', glow: 'rgba(52, 211, 153, 0.35)', icon: '#34d399' },
  blue: { border: 'rgba(96, 165, 250, 0.95)', glow: 'rgba(96, 165, 250, 0.5)', icon: '#93c5fd' },
};

const FeatureCardGlass: React.FC<FeatureCardGlassProps> = ({
  title,
  description,
  icon,
  accent = 'blue',
  delay = 0,
  stagger = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 50 });
  const springY = useSpring(y, { stiffness: 400, damping: 50 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const style = accentStyles[accent];

  return (
    <motion.article
      ref={cardRef}
      className="feature-card-glass"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        ['--card-border' as string]: style.border,
        ['--card-glow' as string]: style.glow,
        ['--card-icon' as string]: style.icon,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: delay + stagger, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="feature-card-glass-glow" aria-hidden />
      <div className="feature-card-glass-border" />
      <div className="feature-card-glass-inner">
        <motion.div
          className="feature-card-glass-icon"
          animate={hovered ? { scale: 1.08 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {icon}
        </motion.div>
        <h3 className="feature-card-glass-title">{title}</h3>
        <p className="feature-card-glass-desc">{description}</p>
      </div>
    </motion.article>
  );
};

export default FeatureCardGlass;
