"use client";

import { useCallback, useMemo, useState } from "react";

import { HOLIDAYS } from "@/lib/holidays";
import { MONTH_IMAGES } from "@/lib/monthImages";
import { getMonthDays, toDateKey } from "@/lib/calendarUtils";

export function useCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const days = useMemo(() => {
    return getMonthDays(year, month).map((day) => {
      const holiday = HOLIDAYS[toDateKey(day.date)];
      return holiday ? { ...day, holiday } : day;
    });
  }, [year, month]);

  const theme = useMemo(() => MONTH_IMAGES[month], [month]);

  const goToPrevMonth = useCallback(() => {
    setMonth((prevMonth) => {
      if (prevMonth === 0) {
        setYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setMonth((prevMonth) => {
      if (prevMonth === 11) {
        setYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  }, []);

  return {
    year,
    month,
    days,
    theme,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  };
}
