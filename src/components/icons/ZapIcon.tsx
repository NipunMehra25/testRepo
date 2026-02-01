"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface ZapIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface ZapIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const ZapIcon = forwardRef<ZapIconHandle, ZapIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, isHovered, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        const start = useCallback(() => {
            controls.start({
                scale: [1, 1.2, 0.95, 1.1, 1],
                opacity: [1, 0.4, 1, 0.7, 1],
                transition: { duration: 0.3, repeat: Infinity, repeatDelay: 0.1 }
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
                >
                    <motion.polygon
                        animate={controls}
                        points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
                    />
                </svg>
            </div>
        );
    }
);

ZapIcon.displayName = "ZapIcon";

export { ZapIcon };
