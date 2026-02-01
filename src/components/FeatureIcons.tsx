import React from 'react';

const size = 40;
const stroke = 'currentColor';
const strokeWidth = 1.5;

export const IconAIAnalysis: React.FC<{ className?: string }> = ({ className }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
    <circle cx="20" cy="12" r="3" stroke={stroke} strokeWidth={strokeWidth} />
    <circle cx="10" cy="26" r="2.5" stroke={stroke} strokeWidth={strokeWidth} />
    <circle cx="30" cy="26" r="2.5" stroke={stroke} strokeWidth={strokeWidth} />
    <path d="M20 15v6M20 21l-8 5M20 21l8 5M10 26l8-5M30 26l-8-5" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconRealTime: React.FC<{ className?: string }> = ({ className }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M8 20h4l2-6 4 12 2-6h4" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 28h28M6 12h28" stroke={stroke} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity={0.5} />
  </svg>
);

export const IconSmartRecs: React.FC<{ className?: string }> = ({ className }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 6c-6 0-10 4-10 9 0 4 3 7 6 8v5h8v-5c3-1 6-4 6-8 0-5-4-9-10-9z" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 28v4M16 34h8" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconTeam: React.FC<{ className?: string }> = ({ className }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
    <circle cx="14" cy="14" r="5" stroke={stroke} strokeWidth={strokeWidth} />
    <circle cx="26" cy="14" r="5" stroke={stroke} strokeWidth={strokeWidth} />
    <path d="M8 32c0-4 3-7 6-7M32 32c0-4-3-7-6-7M20 32c0-5-2-8-6-8s-6 3-6 8" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

export const IconSecurity: React.FC<{ className?: string }> = ({ className }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 6l-12 4v8c0 7 6 12 12 14 6-2 12-7 12-14v-8l-12-4z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <path d="M16 20l3 3 6-6" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconPerformance: React.FC<{ className?: string }> = ({ className }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
    <rect x="6" y="14" width="6" height="14" rx="1" stroke={stroke} strokeWidth={strokeWidth} />
    <rect x="17" y="10" width="6" height="18" rx="1" stroke={stroke} strokeWidth={strokeWidth} />
    <rect x="28" y="18" width="6" height="10" rx="1" stroke={stroke} strokeWidth={strokeWidth} />
    <path d="M9 14v-2M20 10V8M31 18v-4" stroke={stroke} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" opacity={0.6} />
  </svg>
);

const icons = {
  ai: IconAIAnalysis,
  realtime: IconRealTime,
  smart: IconSmartRecs,
  team: IconTeam,
  security: IconSecurity,
  performance: IconPerformance,
};

export type FeatureIconKey = keyof typeof icons;
export default icons;
