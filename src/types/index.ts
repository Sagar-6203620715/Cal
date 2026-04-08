export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Note {
  id: string;
  dateKey: string; // format: "YYYY-MM-DD"
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
