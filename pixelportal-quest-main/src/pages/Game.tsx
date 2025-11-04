import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Player } from '@/components/game/Player';
import { VoxelWorld } from '@/components/game/World';
import { Hotbar } from '@/components/game/Hotbar';
import { Inventory } from '@/components/game/Inventory';
import { HUD } from '@/components/game/HUD';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const navigate = useNavigate();
  const world = VoxelWorld();

  return (
    <div className="w-screen h-screen">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 z-20 bg-stone hover:bg-stone/90 minecraft-shadow pointer-events-auto"
          size="sm"
        >
          <Home className="w-4 h-4 mr-2" />
          HOME
        </Button>

        <HUD />
        <Hotbar />
        <Inventory />

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded minecraft-text">
          WASD: Move | SPACE: Jump | LEFT CLICK: Break | RIGHT CLICK: Place | 1-9: Hotbar | E: Inventory | ESC: Exit pointer lock
        </div>
      </div>

      <Canvas
        shadows
        onCreated={({ gl }) => {
          gl.setClearColor('#87CEEB');
        }}
      >
        <Sky sunPosition={[100, 20, 100]} />
        <Player blocks={world.blocks} />
        <world.BlocksComponent />
      </Canvas>
    </div>
  );
};

export default Game;
