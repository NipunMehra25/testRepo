import React from 'react';
import { motion } from 'framer-motion';
import FeaturesConstellation from './FeaturesConstellation';
import ParticlesBackground from './ParticlesBackground';
import './FeaturesSection.css';

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section-recreate">
      {/* Pure black background with subtle grid */}
      <ParticlesBackground />
      <div className="features-section-bg" aria-hidden>
        <div className="features-section-grid" />
        <div className="features-section-dots" />
      </div>

      <div className="features-section-container">
        <motion.header
          className="features-section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="features-section-title">Powerful Features</h2>
          <p className="features-section-subtitle">
            Everything you need to understand and improve your codebase
          </p>
        </motion.header>

        {/* AI Core Constellation Layout */}
        <FeaturesConstellation />
      </div>
    </section>
  );
};

export default FeaturesSection;

