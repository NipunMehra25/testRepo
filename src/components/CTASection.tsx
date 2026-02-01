import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { useNavigate } from 'react-router-dom';
import './CTASection.css';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Ready to Transform Your Codebase?</h2>
          <p className="cta-description">
            Join thousands of developers who are already using AI to build better software.
            Get started in seconds.
          </p>
          <div className="cta-buttons">
            <MagneticButton
              variant="primary"
              onClick={() => navigate('/signin')}
            >
              Get Started Free
            </MagneticButton>
            <MagneticButton
              variant="secondary"
              onClick={() => {
                document.querySelector('.features-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </MagneticButton>
          </div>
        </motion.div>
        <div className="cta-border-gradient" />
      </div>
    </section>
  );
};

export default CTASection;
