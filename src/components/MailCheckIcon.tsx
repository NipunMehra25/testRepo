"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";

export interface MailCheckIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface MailCheckIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}

const CHECK_VARIANTS: Variants = {
    normal: {
        pathLength: 1,
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
    animate: {
        pathLength: [0, 1],
        opacity: [0, 1],
        transition: {
            pathLength: { duration: 0.4, ease: "easeInOut" },
            opacity: { duration: 0.4, ease: "easeInOut" },
        },
    },
};

const MailCheckIcon = forwardRef<MailCheckIconHandle, MailCheckIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);
        const [isHovered, setIsHovered] = useState(false);

        useImperativeHandle(ref, () => {
            isControlledRef.current = true;

            return {
                startAnimation: () => {
                    setIsHovered(true);
                    controls.start("animate");
                },
                stopAnimation: () => {
                    setIsHovered(false);
                    controls.start("normal");
                },
            };
        });

        const handleMouseEnter = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (isControlledRef.current) {
                    onMouseEnter?.(e);
                } else {
                    setIsHovered(true);
                    controls.start("animate");
                }
            },
            [controls, onMouseEnter]
        );

        const handleMouseLeave = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (isControlledRef.current) {
                    onMouseLeave?.(e);
                } else {
                    setIsHovered(false);
                    controls.start("normal");
                }
            },
            [controls, onMouseLeave]
        );

        return (
            <div
                className={className}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                <svg
                    fill="none"
                    height={size}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width={size}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="mailGradientRed" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#EA4335', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#EA4335', stopOpacity: 1 }} />
                        </linearGradient>
                        <linearGradient id="mailGradientYellowGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#FBBC04', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#34A853', stopOpacity: 1 }} />
                        </linearGradient>
                        <linearGradient id="mailGradientBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#4285F4', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#4285F4', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path
                        d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"
                        stroke={isHovered ? "url(#mailGradientRed)" : "currentColor"}
                        style={{ transition: 'stroke 0.3s ease' }}
                    />
                    <path
                        d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                        stroke={isHovered ? "url(#mailGradientYellowGreen)" : "currentColor"}
                        style={{ transition: 'stroke 0.3s ease' }}
                    />
                    <motion.path
                        animate={controls}
                        d="m16 19 2 2 4-4"
                        initial="normal"
                        style={{ transformOrigin: "center" }}
                        variants={CHECK_VARIANTS}
                        stroke={isHovered ? "url(#mailGradientBlue)" : "currentColor"}
                    />
                </svg>
            </div>
        );
    }
);

MailCheckIcon.displayName = "MailCheckIcon";

export { MailCheckIcon };
