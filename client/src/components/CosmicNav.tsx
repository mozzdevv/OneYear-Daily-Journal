import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Flower, BookOpen } from 'lucide-react';

const navItems = [
  { id: 'grid', icon: Grid },
  { id: 'garden', icon: Flower },
  { id: 'journal', icon: BookOpen },
];

const CosmicNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState('garden');

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-6 px-6 py-4 rounded-full bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="relative p-2"
          >
            {activeTab === item.id && (
              <motion.div
                layoutId="nav-glow"
                className="absolute inset-0 bg-blue-500/50 blur-lg rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {activeTab === item.id && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            <item.icon 
              size={24} 
              className={`relative z-10 transition-colors duration-200 ${
                activeTab === item.id ? 'text-blue-900' : 'text-blue-200 hover:text-white'
              }`} 
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CosmicNav;
