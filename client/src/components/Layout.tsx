import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Grid3X3, Flower2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: Grid3X3, label: "Year" },
    { href: "/garden", icon: Flower2, label: "Garden" },
    { href: "/journal", icon: BookOpen, label: "Journal" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white font-mono selection:bg-blue-500/30">
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      {/* --- Twinkling Stars --- */}
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
      <main className="relative z-10 container max-w-md mx-auto px-4 pb-32 pt-8 min-h-screen flex flex-col">
        {children}
      </main>

      {/* Floating Cosmic Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-6 px-6 py-4 rounded-full bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className="relative p-2"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-glow"
                    className="absolute inset-0 bg-blue-500/50 blur-lg rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <item.icon 
                  size={24} 
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-blue-900' : 'text-blue-200 hover:text-white'
                  }`} 
                />
                <span className="sr-only">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
