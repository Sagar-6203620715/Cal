"use client";

import { motion } from "framer-motion";

interface CalendarHeaderProps {
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  onPrev,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-2 border-b border-gray-100">
      <motion.button
        type="button"
        onClick={onPrev}
        aria-label="Previous month"
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.85 }}
        transition={{ duration: 0.15 }}
        className="text-gray-700 hover:text-[var(--primary)] transition-colors"
      >
        <span className="text-2xl leading-none">←</span>
      </motion.button>

      <div />

      <div className="flex items-center gap-4">
        <motion.button
          type="button"
          onClick={onNext}
          aria-label="Next month"
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.15 }}
          className="text-gray-700 hover:text-[var(--primary)] transition-colors"
        >
          <span className="text-2xl leading-none">→</span>
        </motion.button>

        <button
          type="button"
          onClick={onToday}
          className="text-sm text-gray-600 underline underline-offset-4 hover:text-[var(--primary)] transition-colors"
        >
          Today
        </button>
      </div>
    </div>
  );
}
