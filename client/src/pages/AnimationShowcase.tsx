import React from 'react';
import CosmicLayout from '../components/CosmicLayout';
import CosmicNav from '../components/CosmicNav';
import GlassCard from '../components/GlassCard';

// Mock Data
const days = [
  { id: 1, day: 'DEC', date: '31' },
  { id: 2, day: 'JAN', date: '1' },
  { id: 3, day: 'JAN', date: '2', active: true }, // The active one
  { id: 4, day: 'JAN', date: '3' },
  { id: 5, day: 'JAN', date: '4' },
];

const AnimationShowcase: React.FC = () => {
  return (
    <CosmicLayout>
      <div className="flex flex-col items-center justify-center h-screen w-full p-4">
        
        {/* Header Text with Glow */}
        <div className="text-center mb-16 space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            My Memory Garden
          </h1>
          <p className="text-blue-200/60 tracking-widest text-sm">
            Watch your year grow, one plant at a time.
          </p>
        </div>

        {/* The "Constellation" Line connecting the cards */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8 w-full max-w-4xl">
          
          {/* The thin glowing line behind the cards */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent -translate-y-1/2" />
          
          {days.map((d) => (
            <GlassCard 
              key={d.id} 
              day={d.day} 
              date={d.date} 
              isActive={d.active} 
            />
          ))}
        </div>

      </div>
      
      <CosmicNav />
    </CosmicLayout>
  );
};

export default AnimationShowcase;
