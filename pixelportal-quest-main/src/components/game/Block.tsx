import { BlockType } from '@/types/game';
import * as THREE from 'three';

interface BlockProps {
  position: [number, number, number];
  type: BlockType;
  onClick: (event: any, isRightClick: boolean) => void;
}

const blockColors: Record<BlockType, string> = {
  grass: '#5a8f3a',
  dirt: '#8B4513',
  stone: '#808080',
  wood: '#654321',
  water: '#1E90FF',
  sand: '#F4A460',
  snow: '#FFFAFA',
  ice: '#B0E0E6',
  cactus: '#228B22',
};

const blockTextures: Record<BlockType, { roughness: number; metalness: number }> = {
  grass: { roughness: 0.9, metalness: 0 },
  dirt: { roughness: 1, metalness: 0 },
  stone: { roughness: 0.8, metalness: 0.1 },
  wood: { roughness: 0.9, metalness: 0 },
  water: { roughness: 0.1, metalness: 0.3 },
  sand: { roughness: 0.95, metalness: 0 },
  snow: { roughness: 0.7, metalness: 0 },
  ice: { roughness: 0.2, metalness: 0.4 },
  cactus: { roughness: 0.8, metalness: 0 },
};

export const Block = ({ position, type, onClick }: BlockProps) => {
  const texture = blockTextures[type];
  const isTransparent = type === 'water' || type === 'ice';

  return (
    <mesh
      position={position}
      onClick={(e) => onClick(e, false)}
      onContextMenu={(e) => {
        e.stopPropagation();
        onClick(e, true);
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={blockColors[type]}
        roughness={texture.roughness}
        metalness={texture.metalness}
        transparent={isTransparent}
        opacity={isTransparent ? 0.7 : 1}
      />
    </mesh>
  );
};
