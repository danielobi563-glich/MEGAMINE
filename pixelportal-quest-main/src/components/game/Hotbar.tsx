import { useEffect } from 'react';
import { usePlayer } from '@/stores/usePlayerStore';
import { cn } from '@/lib/utils';

export const Hotbar = () => {
  const { inventory, hotbarSlots, selectedHotbarSlot, selectHotbarSlot } = usePlayer();
  const hotbarItems = inventory.slice(0, hotbarSlots);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = parseInt(e.key);
      if (key >= 1 && key <= 9) {
        selectHotbarSlot(key - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectHotbarSlot]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-1 bg-black/50 p-2 rounded minecraft-shadow">
      {Array.from({ length: hotbarSlots }).map((_, idx) => {
        const item = hotbarItems[idx];
        const isSelected = idx === selectedHotbarSlot;

        return (
          <div
            key={idx}
            onClick={() => selectHotbarSlot(idx)}
            className={cn(
              "w-12 h-12 border-2 flex items-center justify-center cursor-pointer transition-all",
              isSelected ? "border-white bg-white/20" : "border-gray-600 bg-black/30 hover:bg-black/40"
            )}
          >
            {item && (
              <div className="text-center">
                <div className="text-xs minecraft-text">{item.data.slice(0, 2).toUpperCase()}</div>
                <div className="text-[10px]">{item.quantity}</div>
              </div>
            )}
            <div className="absolute -top-3 text-[10px] text-white">{idx + 1}</div>
          </div>
        );
      })}
    </div>
  );
};
