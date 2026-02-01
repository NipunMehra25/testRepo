"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface GitCompareArrowsIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface GitCompareArrowsIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const GitCompareArrowsIcon = forwardRef<GitCompareArrowsIconHandle, GitCompareArrowsIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, isHovered, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        const start = useCallback(() => {
            controls.start({
                x: [0, -2, 2, -2, 0],
                transition: { duration: 0.5, repeat: Infinity }
            });
        }, [controls]);

        const stop = useCallback(() => {
            controls.stop();
            controls.set({ x: 0 });
        }, [controls]);

        useImperativeHandle(ref, () => {
            isControlledRef.current = true;
            return {
                startAnimation: start,
                stopAnimation: stop,
            };
        });

        useEffect(() => {
            if (isHovered) {
                start();
            } else {
                stop();
            }
        }, [isHovered, start, stop]);

        return (
            <div
                className={className}
                onMouseEnter={(e) => {
                    onMouseEnter?.(e);
                    if (!isControlledRef.current && isHovered === undefined) start();
                }}
                onMouseLeave={(e) => {
                    onMouseLeave?.(e);
                    if (!isControlledRef.current && isHovered === undefined) stop();
                }}
                {...props}
            >
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <motion.path animate={controls} d="m15 18 3-3-3-3" />
                    <motion.path animate={controls} d="M6 15h12" />
                    <motion.path animate={controls} d="m9 6-3 3 3 3" />
                    <motion.path animate={controls} d="M18 9H6" />
                </svg>
            </div>
        );
    }
);

GitCompareArrowsIcon.displayName = "GitCompareArrowsIcon";

export { GitCompareArrowsIcon };
