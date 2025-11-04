import { Button } from '@/components/ui/button';
import { Plus, Trash2, Play, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface World {
  id: string;
  name: string;
  seed: number;
  lastPlayed: string;
}

const WorldSelect = () => {
  const navigate = useNavigate();
  const [worlds, setWorlds] = useState<World[]>([
    { id: '1', name: 'My World', seed: 12345, lastPlayed: 'Today' },
    { id: '2', name: 'Creative Build', seed: 67890, lastPlayed: 'Yesterday' },
  ]);

  const createNewWorld = () => {
    const newWorld: World = {
      id: Date.now().toString(),
      name: `World ${worlds.length + 1}`,
      seed: Math.floor(Math.random() * 1000000),
      lastPlayed: 'Never',
    };
    setWorlds([...worlds, newWorld]);
  };

  const deleteWorld = (id: string) => {
    setWorlds(worlds.filter(w => w.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="minecraft-shadow"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK
          </Button>
          <h1 className="text-4xl font-bold minecraft-text">SELECT WORLD</h1>
          <div className="w-24"></div>
        </div>

        <div className="space-y-4">
          {worlds.map((world) => (
            <div
              key={world.id}
              className="bg-card border-4 border-border p-6 rounded-lg minecraft-shadow flex items-center justify-between hover:bg-card/80 transition-colors"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold minecraft-text">{world.name}</h3>
                <div className="text-sm text-muted-foreground mt-1">
                  Seed: {world.seed} • Last played: {world.lastPlayed}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate(`/game?world=${world.id}`)}
                  className="bg-primary hover:bg-primary/90 minecraft-shadow"
                >
                  <Play className="w-4 h-4 mr-2" />
                  PLAY
                </Button>
                <Button
                  onClick={() => deleteWorld(world.id)}
                  variant="destructive"
                  className="minecraft-shadow"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button
            onClick={createNewWorld}
            variant="outline"
            className="w-full py-8 text-xl minecraft-shadow border-dashed"
          >
            <Plus className="w-6 h-6 mr-2" />
            CREATE NEW WORLD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorldSelect;
