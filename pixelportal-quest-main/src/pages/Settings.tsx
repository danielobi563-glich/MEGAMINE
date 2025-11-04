import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const navigate = useNavigate();
  const [renderDistance, setRenderDistance] = useState([8]);
  const [fov, setFov] = useState([70]);
  const [mouseSensitivity, setMouseSensitivity] = useState([50]);
  const [showFPS, setShowFPS] = useState(false);
  const [smoothLighting, setSmoothLighting] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="minecraft-shadow"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK
          </Button>
          <h1 className="text-4xl font-bold minecraft-text">SETTINGS</h1>
          <div className="w-24"></div>
        </div>

        <div className="bg-card border-4 border-border p-8 rounded-lg minecraft-shadow space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold minecraft-text border-b-2 border-border pb-2">
              VIDEO SETTINGS
            </h2>

            <div className="space-y-2">
              <Label className="text-lg">Render Distance: {renderDistance[0]} chunks</Label>
              <Slider
                value={renderDistance}
                onValueChange={setRenderDistance}
                min={2}
                max={16}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-lg">Field of View: {fov[0]}°</Label>
              <Slider
                value={fov}
                onValueChange={setFov}
                min={30}
                max={110}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-lg">Smooth Lighting</Label>
              <Switch checked={smoothLighting} onCheckedChange={setSmoothLighting} />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-lg">Show FPS</Label>
              <Switch checked={showFPS} onCheckedChange={setShowFPS} />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold minecraft-text border-b-2 border-border pb-2">
              CONTROLS
            </h2>

            <div className="space-y-2">
              <Label className="text-lg">Mouse Sensitivity: {mouseSensitivity[0]}%</Label>
              <Slider
                value={mouseSensitivity}
                onValueChange={setMouseSensitivity}
                min={10}
                max={200}
                step={5}
                className="w-full"
              />
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>• WASD - Move</p>
              <p>• SPACE - Jump</p>
              <p>• LEFT CLICK - Break Block</p>
              <p>• RIGHT CLICK - Place Block</p>
              <p>• E - Inventory</p>
              <p>• 1-9 - Hotbar Selection</p>
              <p>• ESC - Pause/Exit Pointer Lock</p>
            </div>
          </div>

          <Button
            onClick={() => navigate('/')}
            className="w-full minecraft-shadow"
          >
            DONE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
