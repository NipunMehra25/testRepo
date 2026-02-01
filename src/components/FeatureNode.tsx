import React from 'react';
import { motion } from 'framer-motion';
import './FeatureNode.css';

export interface FeatureNodeProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    isHovered: boolean;
    isDimmed: boolean;
    isActivating?: boolean;
    activationDelay?: number;
    onHover: () => void;
    onLeave: () => void;
    delay?: number;
}

const FeatureNode: React.FC<FeatureNodeProps> = ({
    icon,
    title,
    description,
    isHovered,
    isDimmed,
    isActivating = false,
    activationDelay = 0,
    onHover,
    onLeave,
    delay = 0,
}) => {
    return (
        <motion.div
            className={`feature-node ${isHovered ? 'feature-node-hovered' : ''} ${isDimmed ? 'feature-node-dimmed' : ''} ${isActivating ? 'feature-node-activating' : ''}`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: isActivating ? 1.03 : 1,
                y: [0, -8, 0]
            }}
            transition={{
                opacity: { duration: 0.6, delay },
                scale: isActivating ?
                    { duration: 0.3, delay: activationDelay } :
                    { duration: 0.6, delay },
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay + Math.random() * 2
                }
            }}
        >
            {/* Glow effect */}
            <motion.div
                className="feature-node-glow"
                animate={isHovered ? {
                    opacity: 1,
                    scale: 1.2
                } : {
                    opacity: 0.5,
                    scale: 1
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Icon */}
            <motion.div
                className="feature-node-icon"
                animate={isHovered ? {
                    scale: 1.1,
                } : {
                    scale: 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                {React.isValidElement(icon)
                    ? React.cloneElement(icon as React.ReactElement<any>, { isHovered })
                    : icon}
            </motion.div>

            {/* Title */}
            <motion.h3
                className="feature-node-title"
                animate={{
                    opacity: isHovered ? 1 : 0.9
                }}
            >
                {title}
            </motion.h3>

            {/* Description */}
            <p className="feature-node-description">{description}</p>
        </motion.div>
    );
};

export default FeatureNode;
