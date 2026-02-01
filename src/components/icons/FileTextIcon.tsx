"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface FileTextIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface FileTextIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const FileTextIcon = forwardRef<FileTextIconHandle, FileTextIconProps>(
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
                >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <motion.path
                        variants={{
                            normal: { pathLength: 1, opacity: 1 },
                            animate: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.3, delay: 0.1 } }
                        }}
                        animate={controls}
                        initial="normal"
                        d="M10 9H8"
                    />
                    <motion.path
                        variants={{
                            normal: { pathLength: 1, opacity: 1 },
                            animate: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.3, delay: 0.2 } }
                        }}
                        animate={controls}
                        initial="normal"
                        d="M16 13H8"
                    />
                    <motion.path
                        variants={{
                            normal: { pathLength: 1, opacity: 1 },
                            animate: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.3, delay: 0.3 } }
                        }}
                        animate={controls}
                        initial="normal"
                        d="M16 17H8"
                    />
                </svg>
            </div>
        );
    }
);

FileTextIcon.displayName = "FileTextIcon";

export { FileTextIcon };
