"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { DateRange } from "@/types";

interface NotesPanelProps {
  monthNote: string;
  onMonthNoteChange: (val: string) => void;
  selectedRange: DateRange;
  primary: string;
  onClearRange?: () => void;
}

function formatMonthDay(date: Date): string {
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${month} ${date.getDate()}`;
}

export default function NotesPanel({
  monthNote,
  onMonthNoteChange,
  selectedRange,
  primary,
  onClearRange,
}: NotesPanelProps) {
  const monthKeyedPrimary = primary;

  const startText = selectedRange.start ? formatMonthDay(selectedRange.start) : "";
  const endText = selectedRange.end ? formatMonthDay(selectedRange.end) : "…";

  return (
    <div className="bg-gray-50 rounded-xl p-4" style={{ ["--primary" as any]: monthKeyedPrimary }}>
      <div className="flex items-baseline justify-between gap-3">
        <div
          className="font-display text-lg font-semibold"
          style={{ color: monthKeyedPrimary }}
        >
          Notes
        </div>
      </div>

      <div className="h-px bg-gray-200 my-3" />

      <div
        className="rounded-lg overflow-hidden border border-gray-200/70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 23px, rgba(0,0,0,0.06) 23px, rgba(0,0,0,0.06) 24px)",
          backgroundSize: "100% 24px",
          backgroundAttachment: "local",
        }}
      >
        <label htmlFor="month-notes" className="sr-only">
          Monthly notes
        </label>
        <textarea
          id="month-notes"
          className="w-full resize-none bg-transparent text-sm font-body px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]"
          rows={6}
          placeholder="Jot down your thoughts for this month..."
          value={monthNote}
          onChange={(e) => onMonthNoteChange(e.target.value)}
          style={{ color: "rgb(30 41 59)", lineHeight: "24px", paddingTop: "4px" }}
        />
      </div>

      {!monthNote && !selectedRange.start ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-300 italic mt-2 px-1"
        >
          Select dates on the calendar to plan your schedule...
        </motion.p>
      ) : null}

      <AnimatePresence initial={false}>
        {selectedRange.start ? (
          <motion.div
            key="selected-range"
            className="pt-3 overflow-hidden"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="text-xs uppercase tracking-widest text-gray-400 flex items-center justify-between gap-3">
              <span>Selected Range</span>
              <button
                type="button"
                onClick={() => onClearRange?.()}
                className="text-gray-500 underline underline-offset-4 hover:text-[var(--primary)] transition-colors disabled:opacity-50 disabled:cursor-default"
                disabled={!onClearRange}
              >
                Clear
              </button>
            </div>

            <div className="mt-2 text-sm font-medium text-gray-700">
              {startText} → {endText}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
