import React from 'react';

const size = 32;
const stroke = 'currentColor';
const strokeWidth = 1.5;

// GitHub Repository Automation
export const IconRepository: React.FC<{ className?: string }> = ({ className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 18c-4.51 2-5-2-7-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Code & Contribution Analytics
export const IconAnalytics: React.FC<{ className?: string }> = ({ className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 17V9M13 17V5M8 17v-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Visual Insights & Charts
export const IconCharts: React.FC<{ className?: string }> = ({ className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 16l4-4 4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 10h4v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Heatmaps & GitHub Stats
export const IconHeatmap: React.FC<{ className?: string }> = ({ className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke={stroke} strokeWidth={strokeWidth}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="7" y="14" width="2" height="2" fill={stroke} />
        <rect x="11" y="14" width="2" height="2" fill={stroke} />
        <rect x="15" y="14" width="2" height="2" fill={stroke} />
    </svg>
);

// AI Smart Summary
export const IconAI: React.FC<{ className?: string }> = ({ className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Excel Export & Reports
export const IconExcel: React.FC<{ className?: string }> = ({ className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Email Intelligence System
export const IconEmail: React.FC<{ className?: string }> = ({ className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke={stroke} strokeWidth={strokeWidth}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const AIFeatureIcons = {
    repository: IconRepository,
    analytics: IconAnalytics,
    charts: IconCharts,
    heatmap: IconHeatmap,
    ai: IconAI,
    excel: IconExcel,
    email: IconEmail,
};
