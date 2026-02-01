import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import './AICore.css';

interface AICoreProps {
    isAnalyzing?: boolean;
    activationPhase?: 'idle' | 'core' | 'lines' | 'cards' | 'content' | 'stable';
    hoveredCardAngle?: number | null;
    onActivate?: () => void;
}

const statusMessages = [
    'System idle. Awaiting command.',
    'Cyrus Core initialized.',
    'Select a capability to analyze.',
    'Neural pathways active.',
];

const AICore: React.FC<AICoreProps> = ({
    isAnalyzing = false,
    activationPhase = 'idle',
    hoveredCardAngle = null,
    onActivate
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);
    const coreRef = useRef<HTMLButtonElement>(null);

    // Spring animations for smooth dialog movement
    const dialogX = useSpring(0, { stiffness: 100, damping: 15 });
    const dialogY = useSpring(0, { stiffness: 100, damping: 15 });

    // Handle mouse movement for cursor-following dialog
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!coreRef.current) return;

        const rect = coreRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate offset relative to core center
        const offsetX = (e.clientX - centerX) * 0.4;
        const offsetY = (e.clientY - centerY) * 0.4;

        dialogX.set(offsetX);
        dialogY.set(offsetY);
    };

    // Rotate status messages
    useEffect(() => {
        if (isHovered && !isAnalyzing) {
            const interval = setInterval(() => {
                setMessageIndex((prev) => (prev + 1) % statusMessages.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovered, isAnalyzing]);

    // Dialog message based on activation phase
    const getDialogMessage = () => {
        if (activationPhase === 'core') return 'Activating modules…';
        if (activationPhase === 'lines') return 'Routing data streams…';
        if (activationPhase === 'cards') return 'Modules online…';
        if (activationPhase === 'content' || activationPhase === 'stable') return 'System online.';
        if (isAnalyzing) return 'Analyzing connected systems…';
        return statusMessages[messageIndex];
    };

    const currentMessage = getDialogMessage();

    // Calculate target rotation: point at hovered cards, otherwise stay static
    const targetRotation = hoveredCardAngle !== null
        ? (hoveredCardAngle + Math.PI / 2) * (180 / Math.PI)
        : 0;

    return (
        <div className="ai-core-container">
            {/* Smooth radar waves - pure CSS for perfect continuity */}
            <div className="ai-core-radar-wave radar-wave-1" />
            <div className="ai-core-radar-wave radar-wave-2" />
            <div className="ai-core-radar-wave radar-wave-3" />

            {/* Main core - black box */}
            <motion.button
                ref={coreRef}
                className={`ai-core-main ${isAnalyzing ? 'ai-core-analyzing' : ''} ${activationPhase === 'core' ? 'ai-core-activating' : ''}`}
                onClick={onActivate}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                animate={{
                    rotate: targetRotation,
                    scale: activationPhase === 'core' ? 0.96 : 1,
                }}
                transition={{
                    rotate: { type: 'spring', stiffness: 60, damping: 15 },
                    scale: { duration: 0.15, ease: "easeOut" }
                }}
            >
                {/* Crosshair symbol */}
                <div className="ai-core-crosshair">
                    <div className="crosshair-h" />
                    <div className="crosshair-v" />
                    <div className="crosshair-dot" />
                </div>
            </motion.button>

            {/* Label */}
            <div className="ai-core-label">CYRUS CORE</div>

            {/* Cursor-following terminal dialog */}
            {isHovered && (
                <motion.div
                    className="ai-core-dialog"
                    style={{
                        x: dialogX,
                        y: dialogY,
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="dialog-header">
                        <span className="dialog-indicator">●</span>
                        <span className="dialog-title">SYSTEM STATUS</span>
                    </div>
                    <div className="dialog-content">
                        {currentMessage}
                    </div>
                    {isAnalyzing && (
                        <div className="dialog-footer">
                            7 modules detected.
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default AICore;
