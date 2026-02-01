import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FolderCodeIcon } from './icons/FolderCodeIcon';
import { MailCheckIcon } from './icons/MailCheckIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { ChartPieIcon } from './icons/ChartPieIcon';
import { ChartColumnIncreasingIcon } from './icons/ChartColumnIncreasingIcon';
import { LayersIcon } from './icons/LayersIcon';
import { GithubIcon } from './icons/GithubIcon';
import FeatureNode from './FeatureNode';
import AICore from './AICore';
import './FeaturesConstellation.css';

interface Feature {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        id: 'analytics',
        icon: <FolderCodeIcon size={24} />,
        title: 'Code & Contribution Analytics',
        description: 'Analyze lines of code, total commits, and contribution trends.',
    },
    {
        id: 'email',
        icon: <MailCheckIcon size={24} />,
        title: 'Email Intelligence System',
        description: 'Fetch emails, create AI summaries, and automate workflows.',
    },
    {
        id: 'reports',
        icon: <FileTextIcon size={24} />,
        title: 'Excel Export & Reports',
        description: 'Export all analytics, charts, and summaries directly to Excel.',
    },
    {
        id: 'heatmaps',
        icon: <ChartPieIcon size={24} />,
        title: 'Visual Insights & Charts',
        description: 'Generate bar charts and 3D charts showing commit activity.',
    },
    {
        id: 'automation',
        icon: <GithubIcon size={32} />,
        title: 'GitHub Repository Automation',
        description: 'Automate repo creation, folder structures, and project navigation.',
    },
    {
        id: 'database',
        icon: <LayersIcon size={24} />,
        title: 'Smart Data Processing',
        description: 'Intelligent data extraction and organization for deep insights.',
    },
    {
        id: 'trends',
        icon: <ChartColumnIncreasingIcon size={24} />,
        title: 'Trend Analysis',
        description: 'Track and visualize development patterns and team performance.',
    },
];

const FeaturesConstellation: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [activationPhase, setActivationPhase] = useState<'idle' | 'core' | 'lines' | 'cards' | 'content' | 'stable'>('idle');
    const coreRef = useRef<HTMLDivElement>(null);

    // Calculate positions for circular layout (desktop)
    const getNodePosition = (index: number, total: number) => {
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
        const radius = 320; // Distance from center
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            angle: angle,
        };
    };

    // Calculate angle to hovered card
    const hoveredCardAngle = hoveredNode
        ? getNodePosition(features.findIndex(f => f.id === hoveredNode), features.length).angle
        : null;

    // Center-out activation sequence
    const handleCoreActivate = () => {
        setIsAnalyzing(true);

        // Phase 1: Core Activation (0-150ms)
        setActivationPhase('core');

        // Phase 2: Line Drawing (150-600ms)
        setTimeout(() => setActivationPhase('lines'), 150);

        // Phase 3: Card Glow (600-900ms)
        setTimeout(() => setActivationPhase('cards'), 600);

        // Phase 4: Content Fade (900-1200ms)
        setTimeout(() => setActivationPhase('content'), 900);

        // Phase 5: Stabilization (1200-1500ms)
        setTimeout(() => setActivationPhase('stable'), 1200);

        // Return to idle
        setTimeout(() => {
            setActivationPhase('idle');
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="features-constellation">
            {/* SVG for connection lines */}
            <svg className="constellation-lines" aria-hidden="true">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
                        <stop offset="50%" stopColor="rgba(255, 255, 255, 0.2)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                    </linearGradient>
                </defs>

                {/* Connection lines - always visible, glow on hover */}
                {features.map((feature, index) => {
                    const pos = getNodePosition(index, features.length);
                    const isActive = hoveredNode === feature.id;

                    return (
                        <motion.line
                            key={feature.id}
                            x1="50%"
                            y1="50%"
                            x2={`calc(50% + ${pos.x}px)`}
                            y2={`calc(50% + ${pos.y}px)`}
                            stroke={isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(150, 150, 150, 0.3)'}
                            strokeWidth={isActive ? 2 : 1}
                            strokeLinecap="round"
                            initial={{ pathLength: 1, opacity: 1 }}
                            animate={{
                                stroke: isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(150, 150, 150, 0.3)',
                                strokeWidth: isActive ? 2 : 1,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                        />
                    );
                })}

                {/* White activation lines - draw from center when activated */}
                {(activationPhase === 'lines' || activationPhase === 'cards' || activationPhase === 'content' || activationPhase === 'stable') && features.map((feature, index) => {
                    const pos = getNodePosition(index, features.length);

                    return (
                        <motion.line
                            key={`activation-${feature.id}`}
                            x1="50%"
                            y1="50%"
                            x2={`calc(50% + ${pos.x}px)`}
                            y2={`calc(50% + ${pos.y}px)`}
                            stroke="rgba(255, 255, 255, 0.9)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: 1,
                                opacity: [0, 1, 0.6, 0],
                            }}
                            transition={{
                                pathLength: { duration: 0.5, delay: 0, ease: "easeOut" },
                                opacity: { duration: 1.2, delay: 0 }
                            }}
                        />
                    );
                })}
            </svg>

            {/* Central AI Core */}
            <div className="constellation-core" ref={coreRef}>
                <AICore
                    isAnalyzing={isAnalyzing}
                    activationPhase={activationPhase}
                    hoveredCardAngle={hoveredCardAngle}
                    onActivate={handleCoreActivate}
                />
            </div>

            {/* Feature Nodes */}
            <div className="constellation-nodes">
                {features.map((feature, index) => {
                    const pos = getNodePosition(index, features.length);

                    return (
                        <div
                            key={feature.id}
                            className="constellation-node-wrapper"
                            style={{
                                '--node-x': `${pos.x}px`,
                                '--node-y': `${pos.y}px`,
                            } as React.CSSProperties}
                        >
                            <FeatureNode
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                isHovered={hoveredNode === feature.id}
                                isDimmed={hoveredNode !== null && hoveredNode !== feature.id}
                                isActivating={activationPhase === 'cards' || activationPhase === 'content' || activationPhase === 'stable'}
                                activationDelay={index * 0.06} // 60ms stagger
                                onHover={() => setHoveredNode(feature.id)}
                                onLeave={() => setHoveredNode(null)}
                                delay={index * 0.1}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturesConstellation;

