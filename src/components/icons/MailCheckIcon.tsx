"use client";

import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface MailCheckIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface MailCheckIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    isHovered?: boolean;
}

const MailCheckIcon = forwardRef<MailCheckIconHandle, MailCheckIconProps>(
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
                    <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                    <motion.path
                        variants={{
                            normal: { pathLength: 1, opacity: 1 },
                            animate: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.5 } }
                        }}
                        animate={controls}
                        initial="normal"
                        d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                    />
                    <motion.path
                        variants={{
                            normal: { pathLength: 1, opacity: 1 },
                            animate: { pathLength: [0, 1], opacity: [0, 1], transition: { duration: 0.3, delay: 0.4 } }
                        }}
                        animate={controls}
                        initial="normal"
                        d="m16 19 2 2 4-4"
                    />
                </svg>
            </div>
        );
    }
);

MailCheckIcon.displayName = "MailCheckIcon";

export { MailCheckIcon };
