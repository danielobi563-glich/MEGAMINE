import { usePlayer } from '@/stores/usePlayerStore';
import { Heart, Drumstick } from 'lucide-react';

export const HUD = () => {
  const { health, hunger } = usePlayer();
  const hearts = Math.ceil(health / 2);
  const drumsticks = Math.ceil(hunger / 2);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-20">
      <div className="flex gap-4 bg-black/50 p-3 rounded minecraft-shadow">
        <div className="flex gap-1 items-center">
          {Array.from({ length: 10 }).map((_, idx) => (
            <Heart
              key={idx}
              className={`w-5 h-5 ${idx < hearts ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          ))}
        </div>
        <div className="flex gap-1 items-center">
          {Array.from({ length: 10 }).map((_, idx) => (
            <Drumstick
              key={idx}
              className={`w-5 h-5 ${idx < drumsticks ? 'fill-orange-500 text-orange-500' : 'text-gray-600'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
