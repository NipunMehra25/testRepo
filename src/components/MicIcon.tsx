import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

export interface MicIconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

interface MicIconProps {
  size?: number
  className?: string
}

import { easeInOut } from 'framer-motion'

const CAPSULE_VARIANTS = {
  normal: { y: 0 },
  animate: {
    y: [0, -3, 0, -2, 0],
    transition: {
      duration: 0.6,
      ease: easeInOut, // ← FIX
    },
  },
}


const MicIcon = forwardRef<MicIconHandle, MicIconProps>(
  ({ size = 24, className }, ref) => {
    const controls = useAnimation()
    const isControlledRef = useRef(false)

    useImperativeHandle(ref, () => {
      isControlledRef.current = true
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      }
    })

    const handleMouseEnter = useCallback(() => {
      if (!isControlledRef.current) controls.start('animate')
    }, [controls])

    const handleMouseLeave = useCallback(() => {
      if (!isControlledRef.current) controls.start('normal')
    }, [controls])

    return (
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          fill="none"
          height={size}
          width={size}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M12 19v3" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <motion.rect
            animate={controls}
            variants={CAPSULE_VARIANTS}
            x="9"
            y="2"
            width="6"
            height="13"
            rx="3"
          />
        </svg>
      </div>
    )
  }
)

MicIcon.displayName = 'MicIcon'
export default MicIcon
