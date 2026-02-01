"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface RadarIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface RadarIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const RadarIcon = forwardRef<RadarIconHandle, RadarIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, isHovered, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        const start = useCallback(() => {
            controls.start({
                rotate: [0, 360],
                transition: { duration: 2, repeat: Infinity, ease: "linear" }
            });
        }, [controls]);

        const stop = useCallback(() => {
            controls.stop();
            controls.set({ rotate: 0 });
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
                    <path d="M12 2a10 10 0 1 0 10 10" />
                    <path d="M12 22a10 10 0 0 0 10-10" />
                    <circle cx="12" cy="12" r="2" />
                    <motion.path
                        animate={controls}
                        d="M12 12 22 12"
                        style={{ originX: "0px", originY: "0px" }}
                    />
                </svg>
            </div>
        );
    }
);

RadarIcon.displayName = "RadarIcon";

export { RadarIcon };
