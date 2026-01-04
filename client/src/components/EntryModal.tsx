import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useJournalStore } from "@/lib/store";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface EntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
}

export default function EntryModal({ isOpen, onClose, date }: EntryModalProps) {
  const { entries, addEntry } = useJournalStore();
  const [text, setText] = useState("");

  useEffect(() => {
    if (isOpen && date) {
      const dateKey = format(date, "yyyy-MM-dd");
      const existingEntry = entries[dateKey];
      setText(existingEntry?.text || "");
    }
  }, [isOpen, date, entries]);

  const handleSave = () => {
    if (date && text.trim()) {
      const dateKey = format(date, "yyyy-MM-dd");
      const existingEntry = entries[dateKey];
      addEntry(dateKey, text.trim());
    }
    onClose();
  };

  if (!date) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-none shadow-none p-6">
        <DialogHeader className="flex flex-row items-center justify-between mb-6">
          <DialogTitle className="text-primary font-mono text-xl font-normal">
            {format(date, "MMM d, yyyy")}
          </DialogTitle>
          <button 
            onClick={onClose}
            className="text-primary hover:opacity-70 transition-opacity"
          >
            <X className="w-6 h-6" />
          </button>
        </DialogHeader>
        
        <div className="space-y-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your memory here..."
            className="w-full h-48 bg-transparent border-none resize-none focus:ring-0 text-primary placeholder:text-primary/30 font-mono text-lg leading-relaxed p-0"
            maxLength={280}
          />
          
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-mono text-sm hover:opacity-90 transition-opacity"
            >
              plant memory
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
