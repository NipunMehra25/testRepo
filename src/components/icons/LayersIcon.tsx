"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface LayersIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface LayersIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const LayersIcon = forwardRef<LayersIconHandle, LayersIconProps>(
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

        const layerVariants = {
            normal: { y: 0, opacity: 1 },
            animate: (i: number) => ({
                y: [0, -4, 0],
                opacity: [1, 0.8, 1],
                transition: {
                    duration: 0.8,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
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
                        variants={layerVariants}
                        animate={controls}
                        initial="normal"
                        d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
                    />
                    <motion.path
                        custom={1}
                        variants={layerVariants}
                        animate={controls}
                        initial="normal"
                        d="m2.2 12.91 8.97 4.08a2 2 0 0 0 1.66 0l8.97-4.08"
                    />
                    <motion.path
                        custom={2}
                        variants={layerVariants}
                        animate={controls}
                        initial="normal"
                        d="m2.2 17.91 8.97 4.08a2 2 0 0 0 1.66 0l8.97-4.08"
                    />
                </svg>
            </div>
        );
    }
);

LayersIcon.displayName = "LayersIcon";

export { LayersIcon };
