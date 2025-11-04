import { Button } from '@/components/ui/button';
import { Play, Settings, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/20 to-background p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold minecraft-text animate-pulse">
            MEGAMINE
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Build, Explore, Create in Your Own Blocky World
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/world-select')}
            size="lg"
            className="text-xl py-6 minecraft-shadow bg-primary hover:bg-primary/90"
          >
            <Play className="w-6 h-6 mr-2" />
            SINGLEPLAYER
          </Button>
          <Button
            onClick={() => navigate('/settings')}
            variant="outline"
            size="lg"
            className="text-xl py-6 minecraft-shadow"
          >
            <Settings className="w-6 h-6 mr-2" />
            SETTINGS
          </Button>
          <Button
            onClick={() => navigate('/how-to-play')}
            variant="outline"
            size="lg"
            className="text-xl py-6 minecraft-shadow"
          >
            <Book className="w-6 h-6 mr-2" />
            HOW TO PLAY
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="p-6 bg-card border-2 border-border rounded-lg minecraft-shadow">
            <div className="text-3xl mb-2">🏗️</div>
            <h3 className="font-bold mb-2 minecraft-text">BUILD</h3>
            <p className="text-sm text-muted-foreground">
              Place and break blocks to create your own structures
            </p>
          </div>
          <div className="p-6 bg-card border-2 border-border rounded-lg minecraft-shadow">
            <div className="text-3xl mb-2">🌍</div>
            <h3 className="font-bold mb-2 minecraft-text">EXPLORE</h3>
            <p className="text-sm text-muted-foreground">
              Discover different biomes and terrain features
            </p>
          </div>
          <div className="p-6 bg-card border-2 border-border rounded-lg minecraft-shadow">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-bold mb-2 minecraft-text">CREATE</h3>
            <p className="text-sm text-muted-foreground">
              Use your imagination to build anything you want
            </p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground pt-4">
          Controls: WASD to move • SPACE to jump • Mouse to look around • E for inventory
        </div>
      </div>
    </div>
  );
};

export default Index;
