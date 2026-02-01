"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface TrendingUpIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface TrendingUpIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const TrendingUpIcon = forwardRef<TrendingUpIconHandle, TrendingUpIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, isHovered, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        const start = useCallback(() => {
            controls.start({
                pathLength: [0, 1],
                transition: { duration: 0.8, repeat: Infinity, repeatDelay: 0.5 }
            });
        }, [controls]);

        const stop = useCallback(() => {
            controls.stop();
            controls.set({ pathLength: 1 });
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
                    <motion.polyline
                        animate={controls}
                        initial={{ pathLength: 1 }}
                        points="22 7 13.5 15.5 8.5 10.5 2 17"
                    />
                    <motion.polyline
                        animate={controls}
                        initial={{ pathLength: 1 }}
                        points="16 7 22 7 22 13"
                    />
                </svg>
            </div>
        );
    }
);

TrendingUpIcon.displayName = "TrendingUpIcon";

export { TrendingUpIcon };
