import React from 'react';
import { motion } from 'framer-motion';
import Orb from '../ReactBits/Orb';
import './OrbSectionWithCards.css';

/* CRAZY ANIMATED ICONS - BLACK & WHITE */
const BrainIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="animated-icon brain-icon">
    {/* Neural network connections */}
    <g className="neural-network">
      <circle cx="32" cy="20" r="2" fill="white" className="neuron n1" />
      <circle cx="20" cy="28" r="2" fill="white" className="neuron n2" />
      <circle cx="44" cy="28" r="2" fill="white" className="neuron n3" />
      <circle cx="26" cy="38" r="2" fill="white" className="neuron n4" />
      <circle cx="38" cy="38" r="2" fill="white" className="neuron n5" />
      <circle cx="32" cy="46" r="2" fill="white" className="neuron n6" />

      <line x1="32" y1="20" x2="20" y2="28" stroke="white" strokeWidth="0.5" className="synapse s1" />
      <line x1="32" y1="20" x2="44" y2="28" stroke="white" strokeWidth="0.5" className="synapse s2" />
      <line x1="20" y1="28" x2="26" y2="38" stroke="white" strokeWidth="0.5" className="synapse s3" />
      <line x1="44" y1="28" x2="38" y2="38" stroke="white" strokeWidth="0.5" className="synapse s4" />
      <line x1="26" y1="38" x2="32" y2="46" stroke="white" strokeWidth="0.5" className="synapse s5" />
      <line x1="38" y1="38" x2="32" y2="46" stroke="white" strokeWidth="0.5" className="synapse s6" />
    </g>

    {/* Brain outline */}
    <path d="M32 12C22 12 14 20 14 30C14 36 17 41 21 44V50C21 52 23 54 25 54H39C41 54 43 52 43 50V44C47 41 50 36 50 30C50 20 42 12 32 12Z"
      stroke="white" strokeWidth="2" fill="none" className="brain-outline" />

    {/* Pulsing circles */}
    <circle cx="32" cy="32" r="18" stroke="white" strokeWidth="1" fill="none" opacity="0.3" className="pulse-ring r1" />
    <circle cx="32" cy="32" r="22" stroke="white" strokeWidth="0.5" fill="none" opacity="0.2" className="pulse-ring r2" />
  </svg>
);

const NetworkIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="animated-icon network-icon">
    {/* Central hub */}
    <circle cx="32" cy="32" r="3" fill="white" className="hub-center" />

    {/* Orbiting nodes */}
    <g className="orbit-group">
      <circle cx="32" cy="12" r="2.5" fill="white" className="orbit-node node1" />
      <circle cx="48" cy="20" r="2.5" fill="white" className="orbit-node node2" />
      <circle cx="52" cy="32" r="2.5" fill="white" className="orbit-node node3" />
      <circle cx="48" cy="44" r="2.5" fill="white" className="orbit-node node4" />
      <circle cx="32" cy="52" r="2.5" fill="white" className="orbit-node node5" />
      <circle cx="16" cy="44" r="2.5" fill="white" className="orbit-node node6" />
      <circle cx="12" cy="32" r="2.5" fill="white" className="orbit-node node7" />
      <circle cx="16" cy="20" r="2.5" fill="white" className="orbit-node node8" />
    </g>

    {/* Connection lines */}
    <g className="connections">
      <line x1="32" y1="32" x2="32" y2="12" stroke="white" strokeWidth="0.8" className="conn-line c1" />
      <line x1="32" y1="32" x2="48" y2="20" stroke="white" strokeWidth="0.8" className="conn-line c2" />
      <line x1="32" y1="32" x2="52" y2="32" stroke="white" strokeWidth="0.8" className="conn-line c3" />
      <line x1="32" y1="32" x2="48" y2="44" stroke="white" strokeWidth="0.8" className="conn-line c4" />
      <line x1="32" y1="32" x2="32" y2="52" stroke="white" strokeWidth="0.8" className="conn-line c5" />
      <line x1="32" y1="32" x2="16" y2="44" stroke="white" strokeWidth="0.8" className="conn-line c6" />
      <line x1="32" y1="32" x2="12" y2="32" stroke="white" strokeWidth="0.8" className="conn-line c7" />
      <line x1="32" y1="32" x2="16" y2="20" stroke="white" strokeWidth="0.8" className="conn-line c8" />
    </g>

    {/* Rotating orbit rings */}
    <circle cx="32" cy="32" r="20" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 4" className="orbit-ring ring1" />
    <circle cx="32" cy="32" r="26" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="2 2" opacity="0.5" className="orbit-ring ring2" />
  </svg>
);

const LightbulbIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="animated-icon bulb-icon">
    {/* Light rays */}
    <g className="light-rays">
      <line x1="32" y1="8" x2="32" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" className="ray r1" />
      <line x1="48" y1="12" x2="44" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" className="ray r2" />
      <line x1="54" y1="24" x2="48" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" className="ray r3" />
      <line x1="16" y1="12" x2="20" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" className="ray r4" />
      <line x1="10" y1="24" x2="16" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" className="ray r5" />
    </g>

    {/* Bulb body */}
    <path d="M32 16C26 16 21 21 21 27C21 31 23 34 25 36V44C25 45.5 26.5 47 28 47H36C37.5 47 39 45.5 39 44V36C41 34 43 31 43 27C43 21 38 16 32 16Z"
      stroke="white" strokeWidth="2" fill="none" className="bulb-body" />

    {/* Filament */}
    <path d="M28 27C28 27 30 30 32 30C34 30 36 27 36 27" stroke="white" strokeWidth="1.5" className="filament" />

    {/* Base */}
    <line x1="27" y1="50" x2="37" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="53" x2="36" y2="53" stroke="white" strokeWidth="2" strokeLinecap="round" />

    {/* Energy particles */}
    <circle cx="32" cy="24" r="1" fill="white" className="energy-particle p1" />
    <circle cx="28" cy="28" r="1" fill="white" className="energy-particle p2" />
    <circle cx="36" cy="28" r="1" fill="white" className="energy-particle p3" />
  </svg>
);

const dataStreams = [
  {
    id: 1,
    badge: '01',
    icon: <BrainIcon />,
    title: 'Deep code intelligence',
    description: 'AI analyzes structure, dependencies, and patterns across your entire repo.',
    color: '#8b5cf6',
    metrics: [
      { label: 'Accuracy', value: '99.2%' },
      { label: 'Speed', value: '<100ms' }
    ]
  },
  {
    id: 2,
    badge: '02',
    icon: <NetworkIcon />,
    title: 'Visual dependency maps',
    description: 'See how modules connect. No more guessing where impact lands.',
    color: '#3b82f6',
    metrics: [
      { label: 'Coverage', value: '100%' },
      { label: 'Real-time', value: 'Live' }
    ]
  },
  {
    id: 3,
    badge: '03',
    icon: <LightbulbIcon />,
    title: 'Actionable insights',
    description: 'Get clear next steps, not just metrics. Built for developers.',
    color: '#ec4899',
    metrics: [
      { label: 'Suggestions', value: '50+' },
      { label: 'Auto-fix', value: 'Yes' }
    ]
  }
];

const OrbSectionWithCards: React.FC = () => {
  return (
    <section className="orb-section-with-cards">
      {/* Floating particles */}
      <div className="orb-section-particles" aria-hidden>
        <div className="orb-particle-dot" />
        <div className="orb-particle-dot" />
        <div className="orb-particle-dot" />
        <div className="orb-particle-dot" />
        <div className="orb-particle-dot" />
      </div>

      {/* Accent light beams */}
      <div className="orb-section-beam" aria-hidden />
      <div className="orb-section-beam" aria-hidden />
      <div className="orb-section-beam" aria-hidden />

      {/* Background: Orb (glowing ring) - interactive hover */}
      <div className="orb-section-bg" aria-hidden>
        <Orb
          hoverIntensity={2}
          rotateOnHover
          hue={0}
          forceHoverState={false}
          backgroundColor="#000000"
        />
      </div>

      {/* Overlay: minimal section title */}
      <motion.div
        className="orb-section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="orb-section-label">Platform</span>
        <h2 className="orb-section-title">Understand your codebase at a glance</h2>
      </motion.div>

      {/* Holographic Data Panels */}
      <div className="data-stream-container">
        {dataStreams.map((stream, index) => (
          <motion.div
            key={stream.id}
            className="data-panel"
            initial={{ opacity: 0, y: 60, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{ '--accent-color': stream.color } as React.CSSProperties}
          >
            {/* Icon Badge */}
            <div className="panel-badge" style={{
              background: `linear-gradient(135deg, ${stream.color}, ${stream.color}cc)`,
              boxShadow: `0 0 20px ${stream.color}88`,
              color: '#fff'
            }}>
              {stream.icon}
            </div>

            {/* Content */}
            <div className="panel-content">
              <h3 className="panel-title">{stream.title}</h3>
              <p className="panel-description">{stream.description}</p>

              {/* Metrics bar */}
              <div className="panel-metrics">
                {stream.metrics.map((metric, i) => (
                  <div key={i} className="metric-item">
                    <span className="metric-label">{metric.label}</span>
                    <span className="metric-value" style={{ color: stream.color }}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Holographic corner accents */}
            <div className="panel-corner corner-tl" />
            <div className="panel-corner corner-tr" />
            <div className="panel-corner corner-bl" />
            <div className="panel-corner corner-br" />

            {/* Data stream lines */}
            <div className="data-stream-line line-1" />
            <div className="data-stream-line line-2" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OrbSectionWithCards;
