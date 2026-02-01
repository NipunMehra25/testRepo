"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface ActivityIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface ActivityIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const ActivityIcon = forwardRef<ActivityIconHandle, ActivityIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, isHovered, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        const start = useCallback(() => {
            controls.start({
                pathLength: [0, 1],
                opacity: [0, 1],
                transition: { duration: 1, repeat: Infinity, ease: "linear" }
            });
        }, [controls]);

        const stop = useCallback(() => {
            controls.stop();
            controls.set({ pathLength: 1, opacity: 1 });
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
                    <motion.path
                        animate={controls}
                        initial={{ pathLength: 1, opacity: 1 }}
                        d="M22 12h-4l-3 9L9 3l-3 9H2"
                    />
                </svg>
            </div>
        );
    }
);

ActivityIcon.displayName = "ActivityIcon";

export { ActivityIcon };
