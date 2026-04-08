"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { CalendarDay } from "@/types";

interface DayCellProps {
  day: CalendarDay;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isHovered: boolean;
  rangeIndex: number;
  primary: string;
  accent: string;
  onClick: () => void;
  onMouseEnter: () => void;
}

function hexToRgba(hex: string, alpha: number): string {
  const cleaned = hex.replace("#", "").trim();
  const normalized =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => `${c}${c}`)
          .join("")
      : cleaned;

  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function DayCell({
  day,
  isStart,
  isEnd,
  isInRange,
  isHovered,
  rangeIndex,
  primary,
  accent,
  onClick,
  onMouseEnter,
}: DayCellProps) {
  const amber = "#F59E0B";
  const isSelected = isStart || isEnd;
  const defaultNumberColor =
    !isSelected && !isInRange && day.isWeekend ? "rgba(0,0,0,0.7)" : "#1f2937";
  const inRangeNumberColor = primary;

  const holidayShort =
    day.holiday && day.holiday.length > 8 ? `${day.holiday.slice(0, 8)}…` : day.holiday;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`${day.date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}${day.holiday ? `, ${day.holiday}` : ""}${isStart ? ", range start" : ""}${isEnd ? ", range end" : ""}`}
      aria-disabled={!day.isCurrentMonth}
      onClick={() => {
        if (day.isCurrentMonth) onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (day.isCurrentMonth) onClick();
        }
      }}
      onMouseEnter={() => {
        if (day.isCurrentMonth) onMouseEnter();
      }}
      whileHover={day.isCurrentMonth ? { scale: 1.08 } : {}}
      whileTap={day.isCurrentMonth ? { scale: 0.94 } : {}}
      transition={{ duration: 0.12 }}
      className={[
        "relative isolate flex flex-col items-center justify-center w-full h-14 md:h-16 select-none rounded-lg text-sm transition-all duration-150",
        !day.isCurrentMonth ? "opacity-30 cursor-default pointer-events-none" : "cursor-pointer",
        isHovered && !isSelected && !isInRange ? "bg-gray-100" : "",
      ].join(" ")}
    >
      <AnimatePresence>
        {isInRange && !isSelected ? (
          <motion.div
            key="range-highlight"
            className="absolute inset-1 rounded-md"
            style={{ backgroundColor: hexToRgba(accent, 0.3) }}
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: rangeIndex * 0.02, duration: 0.15 }}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isSelected ? (
          <motion.div
            key="selected-circle"
            className="absolute inset-1 rounded-full z-[-1]"
            style={{ backgroundColor: primary }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
        ) : null}
      </AnimatePresence>

      <motion.span
        className="font-body font-medium leading-none z-10"
        animate={{
          color: isSelected ? "#ffffff" : isInRange ? inRangeNumberColor : defaultNumberColor,
        }}
        transition={{ duration: 0.15 }}
      >
        {day.date.getDate()}
      </motion.span>

      {day.isToday && !isSelected ? (
        <motion.div
          className="mt-1 w-[5px] h-[5px] rounded-full z-10"
          style={{ backgroundColor: primary }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        // Keep layout stable if there's no dot
        <div className="mt-1 w-[5px] h-[5px] z-10" />
      )}

      {day.holiday ? (
        <div className="flex flex-col items-center mt-[2px] z-10">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: amber }}
          />
          <div
            className="text-[9px] text-[#F59E0B] max-w-[44px] truncate leading-tight"
            title={day.holiday}
            style={{ fontWeight: 600 }}
          >
            {holidayShort}
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}
