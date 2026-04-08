"use client";

import { useMemo, useState } from "react";

import type { DateRange } from "@/types";
import { isSameDay } from "@/lib/calendarUtils";

type SelectionMode = "idle" | "selecting";

export function useDateRange() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [selectionMode, setSelectionMode] = useState<SelectionMode>("idle");
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handleDayClick = (date: Date) => {
    if (selectionMode === "idle") {
      if (range.start && isSameDay(range.start, date)) {
        setRange({ start: null, end: null });
        setHoverDate(null);
        return;
      }

      setRange({ start: date, end: null });
      setSelectionMode("selecting");
      setHoverDate(null);
      return;
    }

    if (!range.start) {
      setRange({ start: date, end: null });
      return;
    }

    if (date.getTime() < range.start.getTime()) {
      setRange({ start: date, end: range.start });
    } else {
      setRange({ start: range.start, end: date });
    }

    setSelectionMode("idle");
    setHoverDate(null);
  };

  const handleDayHover = (date: Date) => {
    if (selectionMode === "selecting") {
      setHoverDate(date);
    }
  };

  const clearRange = () => {
    setRange({ start: null, end: null });
    setSelectionMode("idle");
    setHoverDate(null);
  };

  const effectiveEnd = useMemo(() => {
    if (selectionMode === "selecting") {
      return hoverDate;
    }
    return range.end;
  }, [selectionMode, hoverDate, range.end]);

  return {
    range,
    selectionMode,
    handleDayClick,
    handleDayHover,
    hoverDate,
    clearRange,
    effectiveEnd,
  };
}
