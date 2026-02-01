"use client";

import { motion, useAnimation } from "framer-motion";
import type { Variants } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface ChartPieIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface ChartPieIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const PATH_VARIANTS: Variants = {
    normal: { translateX: 0, translateY: 0 },
    animate: { translateX: 1.1, translateY: -1.1 },
};

const ChartPieIcon = forwardRef<ChartPieIconHandle, ChartPieIconProps>(
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
            if (isHovered !== undefined) {
                if (isHovered) {
                    start();
                } else {
                    stop();
                }
            }
        }, [isHovered, start, stop]);

        const handleMouseEnter = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                onMouseEnter?.(e);
                if (!isControlledRef.current && isHovered === undefined) {
                    start();
                }
            },
            [start, onMouseEnter, isHovered]
        );

        const handleMouseLeave = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                onMouseLeave?.(e);
                if (!isControlledRef.current && isHovered === undefined) {
                    stop();
                }
            },
            [stop, onMouseLeave, isHovered]
        );

        return (
            <div
                className={className}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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
                        animate={controls}
                        d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 15,
                            bounce: 0.6,
                        }}
                        variants={PATH_VARIANTS}
                    />
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                </svg>
            </div>
        );
    }
);

ChartPieIcon.displayName = "ChartPieIcon";

export { ChartPieIcon };
