"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { DateRange, Note } from "@/types";
import { toDateKey } from "@/lib/calendarUtils";

interface NotesPanelProps {
  monthNote: string;
  onMonthNoteChange: (val: string) => void;
  selectedRange: DateRange;
  primary: string;
  onClearRange?: () => void;
  notes: Note[];
  onAddNote: (dateKey: string, content: string, rangeEnd?: string) => void;
  onDeleteNote: (id: string) => void;
}

function formatDate(date: Date): string {
  return date.toLocaleString("en-GB", { month: "short", day: "numeric" });
}

export default function NotesPanel({
  monthNote,
  onMonthNoteChange,
  selectedRange,
  primary,
  onClearRange,
  notes,
  onAddNote,
  onDeleteNote,
}: NotesPanelProps) {
  const [saving, setSaving] = useState(false);

  const hasRange = !!selectedRange.start;
  const rangeLabel = hasRange
    ? selectedRange.end
      ? `${formatDate(selectedRange.start!)} → ${formatDate(selectedRange.end)}`
      : `${formatDate(selectedRange.start!)} → …`
    : null;

  // Notes saved for the current selected range
  const rangeKey = selectedRange.start ? toDateKey(selectedRange.start) : null;
  const rangeEndKey = selectedRange.end ? toDateKey(selectedRange.end) : null;
  const rangeNotes = notes.filter(
    (n) => n.dateKey === rangeKey && (n.rangeEnd ?? null) === rangeEndKey
  );

  // All other saved notes for this month (not matching current range)
  const otherNotes = notes.filter(
    (n) => !(n.dateKey === rangeKey && (n.rangeEnd ?? null) === rangeEndKey)
  );

  function handleSave() {
    if (!monthNote.trim() || !selectedRange.start) return;
    onAddNote(
      toDateKey(selectedRange.start),
      monthNote,
      selectedRange.end ? toDateKey(selectedRange.end) : undefined
    );
    onMonthNoteChange("");
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  }

  return (
    <div
      className="bg-gray-50 rounded-xl p-4 h-full flex flex-col gap-3"
      style={{ ["--cal-primary" as any]: primary }}
    >
      {/* Header */}
      <div className="font-display text-lg font-semibold" style={{ color: primary }}>
        Notes
      </div>

      <div className="h-px bg-gray-200" />

      {/* Range badge — shows when dates are selected */}
      <AnimatePresence>
        {hasRange && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-between"
          >
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{ backgroundColor: `${primary}18`, color: primary }}
            >
              {rangeLabel}
            </span>
            <button
              type="button"
              onClick={() => onClearRange?.()}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors underline underline-offset-2"
            >
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single textarea */}
      <div
        className="rounded-lg overflow-hidden border border-gray-200/70 flex-1"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 23px, rgba(0,0,0,0.06) 23px, rgba(0,0,0,0.06) 24px)",
          backgroundSize: "100% 24px",
          backgroundAttachment: "local",
        }}
      >
        <label htmlFor="month-notes" className="sr-only">
          {hasRange ? `Note for ${rangeLabel}` : "Monthly notes"}
        </label>
        <textarea
          id="month-notes"
          className="w-full resize-none bg-transparent text-sm font-body px-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--cal-primary)]"
          rows={6}
          placeholder={
            hasRange
              ? `Write a note for ${rangeLabel}...`
              : "Jot down your thoughts for this month..."
          }
          value={monthNote}
          onChange={(e) => onMonthNoteChange(e.target.value)}
          style={{ color: "rgb(30 41 59)", lineHeight: "24px", paddingTop: "4px" }}
        />
      </div>

      {/* Save button — only appears when a range is selected AND there is text */}
      <AnimatePresence>
        {hasRange && monthNote.trim() && (
          <motion.button
            type="button"
            onClick={handleSave}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2 rounded-lg text-white text-sm font-semibold transition-opacity"
            style={{ backgroundColor: primary }}
          >
            {saving ? "Saved ✓" : `Save note for ${rangeLabel}`}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ghost prompt when nothing is happening */}
      {!monthNote && !hasRange && notes.length === 0 && (
        <p className="text-xs text-gray-300 italic px-1">
          Select dates on the calendar to attach a note to a specific period...
        </p>
      )}

      {/* Saved notes for the currently selected range */}
      <AnimatePresence>
        {rangeNotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
              Saved for this range
            </p>
            <ul className="space-y-1">
              {rangeNotes.map((note) => (
                <motion.li
                  key={note.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  className="flex items-start justify-between gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2 text-xs text-gray-700"
                >
                  <span className="flex-1 leading-relaxed">{note.content}</span>
                  <button
                    type="button"
                    onClick={() => onDeleteNote(note.id)}
                    aria-label="Delete note"
                    className="text-gray-300 hover:text-red-400 transition-colors text-base leading-none shrink-0"
                  >
                    ×
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All other saved notes for this month */}
      <AnimatePresence>
        {otherNotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 mt-1">
              Other notes this month
            </p>
            <ul className="space-y-1">
              {otherNotes.map((note) => (
                <motion.li
                  key={note.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  className="flex items-start justify-between gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2 text-xs text-gray-600"
                >
                  <div className="flex-1">
                    <p className="leading-relaxed">{note.content}</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">
                      {note.dateKey}{note.rangeEnd ? ` → ${note.rangeEnd}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteNote(note.id)}
                    aria-label="Delete note"
                    className="text-gray-300 hover:text-red-400 transition-colors text-base leading-none shrink-0"
                  >
                    ×
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
