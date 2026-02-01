import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './ShowcaseGlassCard.css';

export interface ShowcaseGlassCardProps {
  index: number;
  title: string;
  description: string;
  accent?: 'purple' | 'cyan' | 'pink';
  delay?: number;
}

const accentColors = {
  purple: { from: '#5227FF', to: '#8B5CF6', glow: 'rgba(82, 39, 255, 0.5)' },
  cyan: { from: '#06B6D4', to: '#22D3EE', glow: 'rgba(6, 182, 212, 0.5)' },
  pink: { from: '#EC4899', to: '#F472B6', glow: 'rgba(236, 72, 153, 0.5)' },
};

const ShowcaseGlassCard: React.FC<ShowcaseGlassCardProps> = ({
  index,
  title,
  description,
  accent = 'purple',
  delay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 50 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);
  const z = useTransform(mouseYSpring, [-0.5, 0.5], [0, 25]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const colors = accentColors[accent];

  return (
    <motion.div
      ref={cardRef}
      className="showcase-glass-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        z,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Liquid border wrapper - animated gradient stroke */}
      <div className="showcase-card-border" aria-hidden>
        <div
          className="showcase-card-border-inner"
          style={{
            ['--accent-from' as string]: colors.from,
            ['--accent-to' as string]: colors.to,
            ['--accent-glow' as string]: colors.glow,
          }}
        />
      </div>

      {/* Hover glow blob */}
      <motion.div
        className="showcase-card-hover-glow"
        style={{ ['--glow' as string]: colors.glow }}
        animate={{
          opacity: isHovered ? 0.8 : 0,
          scale: isHovered ? 1.1 : 0.9,
        }}
        transition={{ duration: 0.4 }}
      />

      <div className="showcase-card-inner">
        {/* Shine sweep on hover */}
        <motion.div
          className="showcase-card-shine"
          animate={
            isHovered
              ? { x: ['-100%', '200%'], opacity: [0.4, 0] }
              : { x: '-100%', opacity: 0 }
          }
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />

        {/* Index badge with gradient */}
        <motion.span
          className="showcase-card-index"
          style={{
            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
            boxShadow: isHovered ? `0 0 24px ${colors.glow}` : 'none',
          }}
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {String(index).padStart(2, '0')}
        </motion.span>

        <h3 className="showcase-card-title">{title}</h3>
        <p className="showcase-card-description">{description}</p>

        {/* Subtle gradient line under title */}
        <motion.div
          className="showcase-card-underline"
          style={{
            background: `linear-gradient(90deg, ${colors.from}, transparent)`,
          }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating accent orb - subtle depth */}
        <motion.div
          className="showcase-card-orb"
          style={{
            background: `radial-gradient(circle, ${colors.from}40 0%, transparent 70%)`,
          }}
          animate={
            isHovered
              ? { scale: 1.2, x: 8, y: -4, opacity: 0.6 }
              : { scale: 1, x: 0, y: 0, opacity: 0.35 }
          }
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

export default ShowcaseGlassCard;
