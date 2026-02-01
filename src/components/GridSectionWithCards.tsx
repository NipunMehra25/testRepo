import React from 'react';
import { motion } from 'framer-motion';
import RippleGrid from '../ReactBits/RippleGrid';
import './GridSectionWithCards.css';

const GridSectionWithCards: React.FC = () => {
  return (
    <section className="grid-section-with-cards">
      {/* Background: RippleGrid */}
      <div className="grid-section-bg" aria-hidden>
        <RippleGrid
          enableRainbow
          gridColor="#a929ff"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          fadeDistance={1.5}
          vignetteStrength={2}
          glowIntensity={0.1}
          opacity={1}
          gridRotation={0}
          mouseInteraction
          mouseInteractionRadius={0.8}
        />
      </div>

      {/* Header */}
      <motion.div
        className="grid-section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="grid-section-label">Platform</span>
        <h2 className="grid-section-title">Code intelligence at scale</h2>
      </motion.div>

      {/* Grid Layout */}
      <div className="reference-grid">
        {/* Top Preview Card */}
        <motion.div
          className="preview-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Corner brackets */}
          <div className="corner-bracket tl" />
          <div className="corner-bracket tr" />
          <div className="corner-bracket bl" />
          <div className="corner-bracket br" />

          {/* Preview content - Abstract code visualization */}
          <div className="preview-visual">
            {/* Code structure visualization */}
            <div className="code-viz">
              <div className="code-line line-1" />
              <div className="code-line line-2" />
              <div className="code-line line-3" />
              <div className="code-line line-4" />
              <div className="code-line line-5" />
            </div>

            {/* Connecting nodes */}
            <div className="viz-node node-1" />
            <div className="viz-node node-2" />
            <div className="viz-node node-3" />

            {/* Glow effect */}
            <div className="viz-glow" />
          </div>

          <span className="preview-label">AI Analysis</span>
        </motion.div>

        {/* Center Icon Button */}
        <motion.div
          className="center-icon-container"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="center-icon-button">
            <div className="icon-ring" />
            <div className="icon-inner">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="url(#lightning-grad)" stroke="url(#lightning-grad)" strokeWidth="0.5" />
                <defs>
                  <linearGradient id="lightning-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Bottom Info Cards */}
        <div className="stats-grid">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="stat-number">Real-time</div>
            <div className="stat-label">Code Analysis</div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="stat-number">AI-Powered</div>
            <div className="stat-label">Insights</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GridSectionWithCards;
