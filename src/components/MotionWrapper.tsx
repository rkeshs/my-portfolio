import React from "react";
import { domAnimation, LazyMotion, m, useReducedMotion } from "framer-motion";
import type { MotionProps } from "framer-motion";

interface MotionWrapperProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
}

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

export default function MotionWrapper({ children, delay = 0, ...props }: MotionWrapperProps) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: reduceMotion ? 0.2 : 0.6,
          delay,
          ease: EASE_OUT_QUINT,
        }}
        {...props}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
