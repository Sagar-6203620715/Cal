"use client";

import type { DateRange } from "@/types";

import {
  getWeekdayHeaders,
  isInRange,
  isSameDay,
  toDateKey,
} from "@/lib/calendarUtils";
import type { CalendarDay } from "@/types";

import DayCell from "@/components/calendar/DayCell";

interface CalendarGridProps {
  days: CalendarDay[];
  range: DateRange;
  hoverDate: Date | null;
  effectiveEnd: Date | null;
  noteCount: number;
  primary: string;
  accent: string;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date) => void;
}

export default function CalendarGrid({
  days,
  range,
  hoverDate,
  effectiveEnd,
  noteCount,
  primary,
  accent,
  onDayClick,
  onDayHover,
}: CalendarGridProps) {
  const headers = getWeekdayHeaders();
  const rangeStartMs = range.start
    ? new Date(
        range.start.getFullYear(),
        range.start.getMonth(),
        range.start.getDate(),
      ).getTime()
    : null;

  return (
    <div className="px-3 md:px-4 pb-4 pt-1">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {headers.map((label, idx) => {
          const isWeekendHeader = idx >= 5;
          return (
            <div
              key={label}
              className={[
                "text-xs font-semibold tracking-widest uppercase text-gray-500 flex items-center justify-center h-8",
                isWeekendHeader ? "text-gray-400" : "",
              ].join(" ")}
            >
              {label}
            </div>
          );
        })}
      </div>

      <div role="grid" className="grid grid-cols-7 gap-1 [&>*]:max-h-[72px]">
        {days.map((day) => {
          const isStart = range.start ? isSameDay(day.date, range.start) : false;
          const isEnd = range.end ? isSameDay(day.date, range.end) : false;
          const highlighted = isInRange(day.date, range.start, effectiveEnd);
          const isHovered =
            hoverDate && isSameDay(day.date, hoverDate) && !isStart && !isEnd;
          const dayMs = new Date(
            day.date.getFullYear(),
            day.date.getMonth(),
            day.date.getDate(),
          ).getTime();
          const computedRangeIndex =
            highlighted && rangeStartMs !== null
              ? Math.floor(Math.abs(dayMs - rangeStartMs) / (1000 * 60 * 60 * 24))
              : 0;
          const rangeIndex = Math.min(computedRangeIndex, 14);

          return (
            <DayCell
              key={toDateKey(day.date)}
              day={day}
              isStart={isStart}
              isEnd={isEnd}
              isInRange={highlighted}
              isHovered={!!isHovered}
              rangeIndex={rangeIndex}
              primary={primary}
              accent={accent}
              onClick={() => onDayClick(day.date)}
              onMouseEnter={() => onDayHover(day.date)}
            />
          );
        })}
      </div>

      {noteCount > 0 ? (
        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400 text-right pr-1">
          {noteCount} word{noteCount !== 1 ? "s" : ""} noted
        </div>
      ) : null}
    </div>
  );
}
