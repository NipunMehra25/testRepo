import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './VisualFlowSection.css';

const VisualFlowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionStart = window.innerHeight * 1.2;
      const sectionEnd = sectionStart + window.innerHeight * 2;
      
      if (scrollPosition >= sectionStart && scrollPosition <= sectionEnd) {
        const progress = (scrollPosition - sectionStart) / (sectionEnd - sectionStart);
        if (progress < 0.25) setActiveStep(0);
        else if (progress < 0.5) setActiveStep(1);
        else if (progress < 0.75) setActiveStep(2);
        else setActiveStep(3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      id: 0,
      title: 'GitHub Input',
      icon: '📥',
      description: 'Connect your repository',
      color: '#5227FF',
    },
    {
      id: 1,
      title: 'AI Analysis',
      icon: '🤖',
      description: 'Deep code intelligence',
      color: '#FF9FFC',
    },
    {
      id: 2,
      title: 'Visual Insights',
      icon: '📊',
      description: 'Interactive dashboards',
      color: '#B19EEF',
    },
    {
      id: 3,
      title: 'Summary Output',
      icon: '✨',
      description: 'Actionable reports',
      color: '#5227FF',
    },
  ];

  return (
    <motion.section className="visual-flow-section" style={{ opacity }}>
      <div className="flow-container">
        <motion.h2
          className="flow-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>

        <div className="flow-steps">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.div
                className={`flow-step ${activeStep === step.id ? 'active' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                animate={{
                  scale: activeStep === step.id ? 1.1 : 1,
                }}
              >
                <div
                  className="step-icon-wrapper"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}22, ${step.color}11)`,
                    borderColor: activeStep === step.id ? step.color : 'transparent',
                  }}
                >
                  <span className="step-icon">{step.icon}</span>
                  {activeStep === step.id && (
                    <motion.div
                      className="step-pulse"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ backgroundColor: step.color }}
                    />
                  )}
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  className="flow-connector"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                >
                  <motion.div
                    className="connector-line"
                    animate={{
                      backgroundPosition: activeStep > index ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="connector-arrow"
                    animate={{
                      x: activeStep > index ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default VisualFlowSection;
