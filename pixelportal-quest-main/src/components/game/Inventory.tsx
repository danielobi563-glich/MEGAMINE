import { useState, useEffect } from 'react';
import { usePlayer } from '@/stores/usePlayerStore';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const Inventory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { inventory } = usePlayer();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E') {
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-20 bg-primary hover:bg-primary/90 minecraft-shadow"
        size="sm"
      >
        INVENTORY (E)
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-30 flex items-center justify-center p-4">
      <div className="bg-card border-4 border-border p-6 rounded-lg max-w-2xl w-full minecraft-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold minecraft-text">INVENTORY</h2>
          <Button onClick={() => setIsOpen(false)} variant="outline" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-9 gap-2">
          {inventory.map((item) => (
            <div
              key={item.id}
              className="aspect-square border-2 border-border bg-muted p-2 flex flex-col items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <div className="text-xs minecraft-text text-center">{item.data.toUpperCase()}</div>
              <div className="text-[10px] text-muted-foreground">{item.quantity}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Press E to close • 1-9 to select hotbar slot
        </div>
      </div>
    </div>
  );
};
