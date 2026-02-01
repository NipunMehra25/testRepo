"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface FolderCodeIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface FolderCodeIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const FolderCodeIcon = forwardRef<FolderCodeIconHandle, FolderCodeIconProps>(
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
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                    <motion.path
                        variants={{
                            normal: { pathLength: 1, opacity: 1, x: 0 },
                            animate: {
                                pathLength: [0, 1],
                                opacity: [0, 1],
                                x: [0, 1, 0],
                                transition: { duration: 0.8, repeat: Infinity }
                            }
                        }}
                        animate={controls}
                        initial="normal"
                        d="m10 10-2 2 2 2"
                    />
                    <motion.path
                        variants={{
                            normal: { pathLength: 1, opacity: 1, x: 0 },
                            animate: {
                                pathLength: [0, 1],
                                opacity: [0, 1],
                                x: [0, -1, 0],
                                transition: { duration: 0.8, repeat: Infinity, delay: 0.1 }
                            }
                        }}
                        animate={controls}
                        initial="normal"
                        d="m14 14 2-2-2-2"
                    />
                </svg>
            </div>
        );
    }
);

FolderCodeIcon.displayName = "FolderCodeIcon";

export { FolderCodeIcon };
