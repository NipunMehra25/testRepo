import React, { useEffect, useState } from 'react';
import './ParticlesBackground.css';

const PARTICLE_COUNT = 60;

const ParticlesBackground: React.FC = () => {
  const [particles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 1.5,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="particles-bg" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="particles-bg-dot"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
