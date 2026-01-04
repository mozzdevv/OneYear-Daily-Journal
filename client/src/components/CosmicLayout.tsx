import React from 'react';
import { motion } from 'framer-motion';

interface CosmicLayoutProps {
  children: React.ReactNode;
}

const CosmicLayout: React.FC<CosmicLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white font-mono">
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen" />

      {/* --- Twinkling Stars (CSS generation) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            initial={{ opacity: 0.2, scale: 0.5 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2], 
              scale: [0.5, 1, 0.5] 
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: Math.random() < 0.5 ? '2px' : '3px',
              height: Math.random() < 0.5 ? '2px' : '3px',
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default CosmicLayout;
