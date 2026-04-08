"use client";

import { useEffect, useState } from "react";

import { fromDateKey } from "@/lib/calendarUtils";
import type { Note } from "@/types";

const NOTES_STORAGE_KEY = "wall-calendar-notes";
const MONTH_NOTES_STORAGE_KEY = "wall-calendar-month-notes";

export function useNotes(year: number, month: number) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [monthNotes, setMonthNotes] = useState<Record<string, string>>({});

  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthNote = monthNotes[monthKey] ?? "";

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const rawNotes = window.localStorage.getItem(NOTES_STORAGE_KEY);
      if (rawNotes) {
        const parsedNotes = JSON.parse(rawNotes) as Note[];
        if (Array.isArray(parsedNotes)) {
          setNotes(parsedNotes);
        }
      }
    } catch {
      setNotes([]);
    }

    try {
      const rawMonthNotes = window.localStorage.getItem(MONTH_NOTES_STORAGE_KEY);
      if (rawMonthNotes) {
        const parsedMonthNotes = JSON.parse(rawMonthNotes) as Record<string, string>;
        if (parsedMonthNotes && typeof parsedMonthNotes === "object") {
          setMonthNotes(parsedMonthNotes);
        }
      }
    } catch {
      setMonthNotes({});
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(MONTH_NOTES_STORAGE_KEY, JSON.stringify(monthNotes));
  }, [monthNotes]);

  const addNote = (dateKey: string, content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const newNote: Note = {
      id: crypto.randomUUID(),
      dateKey,
      content: trimmed,
      createdAt: Date.now(),
    };

    setNotes((prev) => [newNote, ...prev]);
  };

  const updateNote = (id: string, content: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, content } : note)),
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const getNotesForKey = (dateKey: string) => {
    return notes.filter((note) => note.dateKey === dateKey);
  };

  const getNotesForRange = (start: Date, end: Date) => {
    const min = Math.min(start.getTime(), end.getTime());
    const max = Math.max(start.getTime(), end.getTime());

    return notes.filter((note) => {
      const noteDate = fromDateKey(note.dateKey).getTime();
      return noteDate >= min && noteDate <= max;
    });
  };

  const setMonthNote = (content: string) => {
    setMonthNotes((prev) => ({
      ...prev,
      [monthKey]: content,
    }));
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNotesForKey,
    getNotesForRange,
    monthNote,
    setMonthNote,
  };
}
