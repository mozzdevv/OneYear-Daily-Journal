import Layout from '@/components/Layout';
import YearGrid from '@/components/YearGrid';
import { useState, useEffect } from 'react';
import { useJournalStore } from '@/lib/store';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function Home() {
  const [isWriting, setIsWriting] = useState(false);
  const [text, setText] = useState("");
  const { entries, addEntry } = useJournalStore();
  
  const today = new Date();
  const dateKey = format(today, "yyyy-MM-dd");
  const existingEntry = entries[dateKey];

  useEffect(() => {
    if (isWriting) {
      setText(existingEntry?.text || "");
    }
  }, [isWriting, existingEntry]);

  const handleSave = () => {
    if (text.trim()) {
      addEntry(dateKey, text.trim());
    }
    setIsWriting(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in duration-700 relative">
        
        {/* View Mode: Year Grid */}
        <div className={cn(
          "transition-all duration-500 ease-in-out w-full flex justify-center",
          isWriting ? "opacity-0 pointer-events-none absolute scale-95" : "opacity-100 scale-100"
        )}>
          <div className="flex flex-col items-center gap-12">
            <YearGrid />
            
            {/* Plant Memory Button (Trigger) */}
            <button 
              onClick={() => setIsWriting(true)}
              className="group flex flex-col items-center gap-3 transition-all hover:scale-105"
            >
              <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary text-4xl font-light pb-1 group-hover:bg-primary/5 transition-colors">
                +
              </div>
              <span className="font-mono text-primary text-sm tracking-wide">plant memory</span>
            </button>
          </div>
        </div>

        {/* Writing Mode: Inline Editor */}
        <div className={cn(
          "transition-all duration-500 ease-in-out w-full max-w-md flex flex-col items-center",
          !isWriting ? "opacity-0 pointer-events-none absolute scale-105" : "opacity-100 scale-100"
        )}>
          {/* Header Date */}
          <div className="mb-12">
            <div className="bg-primary/10 text-primary px-6 py-2 rounded-full font-mono text-sm">
              today
            </div>
          </div>

          {/* Weather/Mood Selector (Static for now) */}
          <div className="flex gap-8 mb-16 text-primary/40 text-3xl">
            <button className="hover:text-primary hover:scale-110 transition-all">☼</button>
            <button className="hover:text-primary hover:scale-110 transition-all">☁</button>
            <button className="hover:text-primary hover:scale-110 transition-all">☂</button>
            <button className="hover:text-primary hover:scale-110 transition-all text-primary">🍎</button>
          </div>

          {/* Text Input */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a memory..."
            className="w-full h-48 bg-transparent border-none resize-none focus:ring-0 text-primary placeholder:text-primary/30 font-mono text-xl leading-relaxed text-center p-0"
            autoFocus={isWriting}
            maxLength={280}
          />

          {/* Done Button */}
          <div className="mt-8 flex justify-end w-full">
            <button
              onClick={handleSave}
              className="bg-primary text-primary-foreground px-8 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </Layout>
  );
}
