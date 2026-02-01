import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import './AnimatedPreviewPanels.css';

// Import NEW Unique Animated Icons
import { BrainIcon } from './icons/BrainIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { ScrollIcon } from './icons/ScrollIcon';
import { RadarIcon } from './icons/RadarIcon';
import { DatabaseIcon } from './icons/DatabaseIcon';
import { ZapIcon } from './icons/ZapIcon';

const AnimatedPreviewPanels: React.FC = () => {
  const [currentHex, setCurrentHex] = useState('0x7F066E5');
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const cards = [
    {
      id: 1,
      title: 'Neural Engine',
      description: 'Advanced pattern recognition and code-path optimization.',
      icon: <BrainIcon />,
      sysId: 'AI.CORE-01',
      hex: '0x4A2F//A1',
      gridArea: 'neural'
    },
    {
      id: 2,
      title: 'Growth Matrix',
      description: 'Performance scaling metrics.',
      icon: <TrendingUpIcon />,
      sysId: 'MET.ANA-06',
      hex: '0x9E1B//M6',
      gridArea: 'growth'
    },
    {
      id: 3,
      title: 'Documentation',
      description: 'Structured debt analysis.',
      icon: <ScrollIcon />,
      sysId: 'DOC.GEN-03',
      hex: '0x3C8D//D3',
      gridArea: 'docs'
    },
    {
      id: 4,
      title: 'Activity Stream',
      description: 'Real-time telemetry monitoring.',
      icon: <RadarIcon />,
      sysId: 'VIS.INS-02',
      hex: '0x1F2A//V2',
      gridArea: 'activity'
    },
    {
      id: 5,
      title: 'Infrastructure',
      description: 'Zero-latency data routing.',
      icon: <DatabaseIcon />,
      sysId: 'NET.STK-04',
      hex: '0x8B4E//N4',
      gridArea: 'infra'
    },
    {
      id: 6,
      title: 'CI/CD Pipelines',
      description: 'Deployment synchronization.',
      icon: <ZapIcon />,
      sysId: 'OPS.AUT-05',
      hex: '0xC9F0//O5',
      gridArea: 'cicd'
    }
  ];

  const handleCardHover = (id: number | null, hex: string) => {
    setHoveredCardId(id);
    if (hex) setCurrentHex(hex);
    else setCurrentHex('0x7F066E5');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section className="preview-panels-section modular-grid-theme">

      <div className="mainframe-box congested internal-glare-contain">
        {/* 
                   INTERNAL SHARP LIGHTS 
                   Direct Bright Light Core - Contained within 
                */}
        <div className="joint-light horizontal-mid" />
        <div className="joint-light vertical-mid" />
        <div className="joint-light center-burst" />

        <div className="scan-line-global" />

        {/* CONSOLE HEADER BAR */}
        <div className="console-header-bar">
          <div className="console-status-group">
            <span className="status-label">SYSTEM_CORE:</span>
            <span className="status-value active-text">ACTIVE_SYNC</span>
          </div>
          <div className="console-breadcrumbs">CYRUS_OS // CONGESTED_MODULAR_GRID // 0xAF</div>
          <div className="console-hex-display">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentHex}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
              >
                {currentHex}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* CONGESTED MODULAR GRID */}
        <motion.div
          className="dense-modular-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              className={`modular-card ${card.gridArea} proper-symmetric-cut`}
              variants={cardVariants}
              onMouseEnter={() => handleCardHover(card.id, card.hex)}
              onMouseLeave={() => handleCardHover(null, '0x7F066E5')}
            >
              <div className="card-header">
                <span className="module-tag">{card.sysId}</span>
                <div className={`status-pulser ${hoveredCardId === card.id ? 'active' : ''}`} />
              </div>

              <div className="card-body">
                <div className="card-icon-wrap">
                  {React.cloneElement(card.icon as any, { isHovered: hoveredCardId === card.id, size: card.gridArea === 'neural' ? 32 : 28 })}
                </div>
                <div className="card-content-wrap">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                </div>
              </div>

              <div className="card-footer">
                <div className="footer-line" />
                <span className="footer-index">0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedPreviewPanels;
