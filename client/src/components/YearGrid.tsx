import { useJournalStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { format, isLeapYear } from "date-fns";
import { useState } from "react";
import EntryModal from "./EntryModal";

export default function YearGrid() {
  const entries = useJournalStore((state) => state.entries);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const currentYear = new Date().getFullYear();
  const totalDays = isLeapYear(new Date(currentYear, 0, 1)) ? 366 : 365;
  const days = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(currentYear, 0, i + 1);
    return {
      date,
      dayOfYear: i + 1,
      entry: entries[format(date, "yyyy-MM-dd")],
    };
  });

  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");

  return (
    <div className="flex flex-col items-center w-full max-w-[340px] mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold mb-4">
          {currentYear}
        </div>
        <div className="flex gap-4 justify-center text-primary/60 text-2xl">
          {/* Weather/Mood icons placeholder - static for now to match video vibe */}
          <span>☼</span>
          <span>☁</span>
          <span>☂</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-12 gap-x-3 gap-y-3 w-full">
        {days.map(({ date, entry }) => {
          const isToday = format(date, "yyyy-MM-dd") === todayStr;
          const hasEntry = !!entry;
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300 mx-auto",
                hasEntry 
                  ? "bg-primary scale-125" 
                  : "bg-primary/20 hover:bg-primary/40",
                isToday && !hasEntry && "ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse"
              )}
              title={format(date, "MMM d, yyyy")}
            />
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center text-xs text-primary/50 font-mono">
        trial ends in 23 hours
      </div>

      <EntryModal 
        isOpen={!!selectedDate} 
        onClose={() => setSelectedDate(null)} 
        date={selectedDate || new Date()} 
      />
    </div>
  );
}
