import React, { useMemo } from 'react';
import Layout from '@/components/Layout';
import { useJournalStore } from '@/lib/store';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function Garden() {
  const entriesMap = useJournalStore((state) => state.entries);
  
  const entries = useMemo(() => {
    return Object.values(entriesMap).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [entriesMap]);

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="text-center space-y-2">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            My Memory Garden
          </h2>
          <p className="text-blue-200/60 tracking-widest text-sm">
            Watch your year grow, one plant at a time.
          </p>
        </div>

        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
            <img src="/images/plants/set1_1.png" alt="Seedling" className="w-24 h-24 mb-4 grayscale opacity-50 invert" />
            <p className="font-display text-xl text-blue-100">Your garden is empty...</p>
            <p className="text-sm text-blue-200/60">Start journaling to plant your first seed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {entries.map((entry) => {
              const setNum = entry.plantId <= 9 ? 1 : 2;
              const imgNum = entry.plantId <= 9 ? entry.plantId : entry.plantId - 9;
              const plantImage = `/images/plants/set${setNum}_${imgNum}.png`;

              return (
                <motion.div 
                  key={entry.date}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group relative aspect-[3/4] bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col items-center justify-between p-4 transition-all hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  <span className="text-[10px] tracking-widest uppercase text-blue-200/60">
                    {format(new Date(entry.date), 'MMM d')}
                  </span>
                  
                  <div className="flex-1 w-full flex items-center justify-center p-2">
                    <img 
                      src={plantImage} 
                      alt="Memory plant" 
                      className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-[#0f172a]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-4 flex items-center justify-center text-center backdrop-blur-md border border-white/10">
                    <p className="font-sans text-sm text-blue-100 line-clamp-4 italic">
                      "{entry.text}"
                    </p>
                  </div>
                  
                  {/* Reflection effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
