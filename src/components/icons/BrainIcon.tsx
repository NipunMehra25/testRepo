"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface BrainIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface BrainIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const BrainIcon = forwardRef<BrainIconHandle, BrainIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, isHovered, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        const start = useCallback(() => {
            controls.start({
                scale: [1, 1.05, 1], // Reduced zoom for more subtle effect
                opacity: [0.8, 1, 0.8],
                transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            });
        }, [controls]);

        const stop = useCallback(() => {
            controls.stop();
            controls.set({ scale: 1, opacity: 1 });
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
                    style={{ overflow: 'visible' }} // FIXED: Prevents clipping during scale animation
                >
                    <motion.path
                        animate={controls}
                        d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.208 4 4 0 0 0 6.503 2.152 4 4 0 0 0 6.503-2.152 4 4 0 0 0 .52-8.208 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5z"
                    />
                    <motion.path animate={controls} d="M12 11v8" />
                    <motion.path animate={controls} d="M8 13h8" />
                </svg>
            </div>
        );
    }
);

BrainIcon.displayName = "BrainIcon";

export { BrainIcon };
