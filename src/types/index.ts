export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Note {
  id: string;
  dateKey: string; // start date "YYYY-MM-DD"
  rangeEnd?: string; // end date "YYYY-MM-DD" — only set for range notes
  content: string;
  createdAt: number;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  holiday?: string;
}

export interface MonthTheme {
  primary: string;
  accent: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
}
