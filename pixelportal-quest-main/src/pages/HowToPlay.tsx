import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowToPlay = () => {
  const navigate = useNavigate();

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
          <h1 className="text-4xl font-bold minecraft-text">HOW TO PLAY</h1>
          <div className="w-24"></div>
        </div>

        <div className="bg-card border-4 border-border p-8 rounded-lg minecraft-shadow space-y-6">
          <section>
            <h2 className="text-2xl font-bold minecraft-text mb-4">🎮 BASIC CONTROLS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-muted rounded">
                <strong>Movement:</strong> WASD keys
              </div>
              <div className="p-4 bg-muted rounded">
                <strong>Jump:</strong> SPACE bar
              </div>
              <div className="p-4 bg-muted rounded">
                <strong>Break Block:</strong> LEFT CLICK
              </div>
              <div className="p-4 bg-muted rounded">
                <strong>Place Block:</strong> RIGHT CLICK
              </div>
              <div className="p-4 bg-muted rounded">
                <strong>Inventory:</strong> E key
              </div>
              <div className="p-4 bg-muted rounded">
                <strong>Hotbar:</strong> Number keys 1-9
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold minecraft-text mb-4">🏗️ BUILDING</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Select blocks from your hotbar using number keys (1-9)</li>
              <li>• Left-click to break blocks and add them to your inventory</li>
              <li>• Right-click while holding a block to place it in the world</li>
              <li>• Build structures, houses, or whatever your imagination creates!</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold minecraft-text mb-4">🌍 WORLD FEATURES</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Plains:</strong> Grasslands with occasional trees</li>
              <li>• <strong>Forest:</strong> Dense tree coverage, great for wood</li>
              <li>• <strong>Desert:</strong> Sandy terrain with cacti</li>
              <li>• <strong>Snow:</strong> Frozen biome with snow and ice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold minecraft-text mb-4">📦 INVENTORY MANAGEMENT</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Press E to open your full inventory</li>
              <li>• The bottom row (hotbar) is accessible during gameplay</li>
              <li>• Each slot can hold up to 64 of the same block type</li>
              <li>• Organize your blocks for efficient building!</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold minecraft-text mb-4">💡 TIPS & TRICKS</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Click on the screen to lock your cursor for better camera control</li>
              <li>• Press ESC to unlock your cursor and access menus</li>
              <li>• Collect different block types to expand your building palette</li>
              <li>• Explore different biomes to find unique resources</li>
              <li>• Remember: creativity has no limits in Megamine!</li>
            </ul>
          </section>

          <Button
            onClick={() => navigate('/')}
            className="w-full minecraft-shadow mt-6"
          >
            BACK TO MAIN MENU
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
