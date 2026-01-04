import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  date: string;
  day: string;
  isActive?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ date, day, isActive, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -10, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative flex flex-col items-center justify-center 
        w-24 h-32 rounded-2xl cursor-pointer border transition-all duration-500
        ${isActive 
          ? 'bg-white/20 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.3)] backdrop-blur-md' 
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm'
        }
      `}
    >
      {/* The Glow Dot (Active Indicator) */}
      {isActive && (
        <motion.div 
          layoutId="activeGlow"
          className="absolute -top-2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
        />
      )}

      <span className="text-[10px] tracking-widest uppercase opacity-70 mb-1">{day}</span>
      <span className={`text-xl font-bold ${isActive ? 'text-white' : 'text-blue-100'}`}>
        {date}
      </span>
      
      {/* Reflection effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
    </motion.div>
  );
};

export default GlassCard;
