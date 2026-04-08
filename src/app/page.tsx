import CalendarRoot from "@/components/calendar/CalendarRoot";

export default function HomePage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      style={{
        background: "radial-gradient(ellipse at 60% 40%, #e8edf5 0%, #d4dbe8 50%, #c8d0e0 100%)",
      }}
    >
      <CalendarRoot />
    </main>
  );
}
