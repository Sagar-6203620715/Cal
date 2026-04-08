import type { CalendarDay } from "@/types";

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromDateKey(key: string): Date {
  const [yearStr, monthStr, dayStr] = key.split("-");
  const year = Number.parseInt(yearStr, 10);
  const month = Number.parseInt(monthStr, 10);
  const day = Number.parseInt(dayStr, 10);
  return new Date(year, month - 1, day);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isInRange(
  date: Date,
  start: Date | null,
  end: Date | null,
): boolean {
  if (!start) return false;

  if (!end) return isSameDay(date, start);

  const dateMs = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
  const startMs = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  ).getTime();
  const endMs = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();

  const min = Math.min(startMs, endMs);
  const max = Math.max(startMs, endMs);
  return dateMs >= min && dateMs <= max;
}

export function getMonthName(month: number): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month] ?? "";
}

export function getWeekdayHeaders(): string[] {
  return ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function getMonthDays(year: number, month: number): CalendarDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastOfMonth.getDate();
  const leadingDays = (firstOfMonth.getDay() + 6) % 7; // Monday = 0, Sunday = 6
  const trailingDays = 6 - ((lastOfMonth.getDay() + 6) % 7);

  let totalCells = daysInMonth + leadingDays + trailingDays;
  while (totalCells < 35) {
    totalCells += 7;
  }

  const startDate = new Date(year, month, 1 - leadingDays);
  const today = new Date();

  const days: CalendarDay[] = [];
  for (let i = 0; i < totalCells; i += 1) {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + i,
    );

    days.push({
      date,
      isCurrentMonth: date.getMonth() === month,
      isToday: isSameDay(date, today),
      isWeekend: isWeekend(date),
    });
  }

  return days;
}
