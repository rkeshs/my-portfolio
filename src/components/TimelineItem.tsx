import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  isLast?: boolean;
  index?: number;
  children?: React.ReactNode;
}

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

export default function TimelineItem({
  title,
  subtitle,
  date,
  isLast = false,
  index = 0,
  children,
}: TimelineItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative flex gap-6"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.6,
        delay: index * 0.1,
        ease: EASE_OUT_QUINT,
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex flex-col items-center" aria-hidden="true">
        <div className="h-2.5 w-2.5 mt-2 shrink-0 bg-primary z-10" />
        {!isLast && <div className="w-px grow bg-border" />}
      </div>
      <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-12"}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground tabular-nums shrink-0">
            {date}
          </p>
        </div>
        <p className="text-sm font-medium text-primary mt-1">{subtitle}</p>
        {children}
      </div>
    </motion.div>
  );
}
