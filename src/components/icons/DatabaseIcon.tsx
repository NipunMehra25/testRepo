"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface DatabaseIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface DatabaseIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const DatabaseIcon = forwardRef<DatabaseIconHandle, DatabaseIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, isHovered, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        const start = useCallback(() => {
            controls.start({
                y: [0, -2, 0],
                transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
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
                >
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <motion.path animate={controls} d="M3 5V19A9 3 0 0 0 21 19V5" />
                    <motion.path animate={controls} d="M3 12A9 3 0 0 0 21 12" />
                </svg>
            </div>
        );
    }
);

DatabaseIcon.displayName = "DatabaseIcon";

export { DatabaseIcon };
