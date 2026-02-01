"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface ScrollIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface ScrollIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const ScrollIcon = forwardRef<ScrollIconHandle, ScrollIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, isHovered, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        const start = useCallback(() => {
            controls.start({
                y: [0, -2, 0],
                transition: { duration: 1, repeat: Infinity }
            });
        }, [controls]);

        const stop = useCallback(() => {
            controls.stop();
            controls.set({ y: 0 });
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
                    style={{ overflow: 'visible' }}
                >
                    <motion.path animate={controls} d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
                    <motion.path animate={controls} d="M19 17V5a2 2 0 0 0-2-2H4" />
                    <motion.path animate={controls} d="M15 8h-5" />
                    <motion.path animate={controls} d="M15 12h-5" />
                </svg>
            </div>
        );
    }
);

ScrollIcon.displayName = "ScrollIcon";

export { ScrollIcon };
