import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Grid3X3, Flower2, BookOpen } from "lucide-react";

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
    <div className="min-h-screen bg-background text-foreground font-mono selection:bg-primary/20">
      <main className="container max-w-md mx-auto px-4 pb-32 pt-8 min-h-screen flex flex-col relative">
        {children}
      </main>

      {/* Floating Pill Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <nav className="bg-[#d4d4d4] rounded-full p-1 flex items-center shadow-sm">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-foreground hover:bg-white/50"
                )}
              >
                <item.icon className="w-5 h-5" strokeWidth={2.5} />
                <span className="sr-only">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
