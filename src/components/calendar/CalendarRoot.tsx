"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { getMonthName } from "@/lib/calendarUtils";

import BindingRing from "@/components/ui/BindingRing";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import HeroImage from "@/components/calendar/HeroImage";
import NotesPanel from "@/components/calendar/NotesPanel";
import { useCalendar } from "@/hooks/useCalendar";
import { useDateRange } from "@/hooks/useDateRange";
import { useNotes } from "@/hooks/useNotes";

export default function CalendarRoot() {
  const { month, year, days, theme, goToPrevMonth, goToNextMonth, goToToday } =
    useCalendar();

  const {
    range,
    hoverDate,
    effectiveEnd,
    handleDayClick,
    handleDayHover,
    clearRange,
  } = useDateRange();

  const { monthNote, setMonthNote } = useNotes(year, month);
  const monthKey = `${year}-${month}`;
  const noteCount = monthNote.trim().length > 0 ? 1 : 0;

  useEffect(() => {
    document.documentElement.style.setProperty("--cal-primary", theme.primary);
    document.documentElement.style.setProperty("--cal-accent", theme.accent);
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevMonth();
      } else if (event.key === "ArrowRight") {
        goToNextMonth();
      } else if (event.key === "Escape") {
        clearRange();
      }
    };

    document.addEventListener("keydown", onKeyDown, { capture: true });
    return () => {
      document.removeEventListener("keydown", onKeyDown, { capture: true });
    };
  }, [goToPrevMonth, goToNextMonth, clearRange]);

  return (
    <div className="relative w-full max-w-[900px] mx-auto">
      <div className="-mb-2 z-10 relative">
        <BindingRing />
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-calendar w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={monthKey}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <HeroImage
              src={theme.imageSrc}
              alt={theme.imageAlt}
              primary={theme.primary}
              monthName={getMonthName(month)}
              year={year}
              credit="Unsplash"
            />
          </motion.div>
        </AnimatePresence>

        <CalendarHeader
          onPrev={goToPrevMonth}
          onNext={goToNextMonth}
          onToday={goToToday}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={monthKey}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col md:flex-row"
          >
            <div className="order-2 md:order-1 md:w-[35%] md:border-r border-gray-100">
              <NotesPanel
                monthNote={monthNote}
                onMonthNoteChange={setMonthNote}
                selectedRange={range}
                primary={theme.primary}
                onClearRange={clearRange}
              />
            </div>

            <div className="order-1 md:order-2 md:w-[65%]">
              <CalendarGrid
                days={days}
                range={range}
                hoverDate={hoverDate}
                effectiveEnd={effectiveEnd}
                noteCount={noteCount}
                primary={theme.primary}
                accent={theme.accent}
                onDayClick={handleDayClick}
                onDayHover={handleDayHover}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="text-center text-xs text-gray-400 mt-3 select-none">
        ← → to navigate months &nbsp;·&nbsp; Esc to clear selection
      </p>
    </div>
  );
}
