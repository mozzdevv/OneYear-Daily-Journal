import React, { useMemo } from 'react';
import Layout from '@/components/Layout';
import { useJournalStore } from '@/lib/store';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function Journal() {
  const entriesMap = useJournalStore((state) => state.entries);
  
  const entries = useMemo(() => {
    return Object.values(entriesMap).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [entriesMap]);

  // Group entries by month
  const groupedEntries = entries.reduce((acc, entry) => {
    const monthYear = format(new Date(entry.date), 'MMMM yyyy');
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(entry);
    return acc;
  }, {} as Record<string, typeof entries>);

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-700 max-w-2xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            Journal Entries
          </h2>
          <p className="text-blue-200/60 tracking-widest text-sm">
            Reflect on your journey through the cosmos.
          </p>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <p className="font-display text-xl text-blue-100">No entries yet.</p>
            <p className="text-sm text-blue-200/60 mt-2">Your story begins with a single star.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedEntries).map(([month, monthEntries]) => (
              <div key={month} className="space-y-6">
                <h3 className="font-display text-2xl text-blue-200/80 border-b border-white/10 pb-2 sticky top-0 bg-[#0f172a]/80 backdrop-blur-md z-10">
                  {month}
                </h3>
                
                <div className="space-y-8">
                  {monthEntries.map((entry, index) => (
                    <motion.div 
                      key={entry.date}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-6 border-l border-white/20 hover:border-blue-400/50 transition-colors group"
                    >
                      <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:bg-blue-400 group-hover:shadow-[0_0_15px_rgba(96,165,250,0.8)] transition-all" />
                      
                      <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all backdrop-blur-sm">
                        <div className="flex items-baseline justify-between border-b border-white/5 pb-2">
                          <span className="font-display text-xl text-blue-100">
                            {format(new Date(entry.date), 'do')}
                          </span>
                          <span className="text-xs text-blue-200/60 font-sans uppercase tracking-wider">
                            {format(new Date(entry.date), 'EEEE')}
                          </span>
                        </div>
                        
                        <p className="font-sans text-blue-50/90 leading-relaxed whitespace-pre-wrap">
                          {entry.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
