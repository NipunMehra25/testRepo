"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface ChartColumnIncreasingIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface ChartColumnIncreasingIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const ChartColumnIncreasingIcon = forwardRef<ChartColumnIncreasingIconHandle, ChartColumnIncreasingIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, isHovered, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        const start = useCallback(() => {
            controls.start("animate");
        }, [controls]);

        const stop = useCallback(() => {
            controls.start("normal");
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

        const barVariants = {
            normal: { scaleY: 1 },
            animate: (i: number) => ({
                scaleY: [1, 1.2, 1],
                transition: { duration: 0.6, delay: i * 0.1, repeat: Infinity }
            })
        };

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
                    <motion.path
                        custom={0}
                        variants={barVariants}
                        animate={controls}
                        initial="normal"
                        style={{ originY: "20px" }}
                        d="M7 20v-5"
                    />
                    <motion.path
                        custom={1}
                        variants={barVariants}
                        animate={controls}
                        initial="normal"
                        style={{ originY: "20px" }}
                        d="M12 20v-9"
                    />
                    <motion.path
                        custom={2}
                        variants={barVariants}
                        animate={controls}
                        initial="normal"
                        style={{ originY: "20px" }}
                        d="M17 20v-13"
                    />
                    <path d="M3 3v17h17" />
                </svg>
            </div>
        );
    }
);

ChartColumnIncreasingIcon.displayName = "ChartColumnIncreasingIcon";

export { ChartColumnIncreasingIcon };
