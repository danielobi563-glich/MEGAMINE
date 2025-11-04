import { useState } from 'react';
import { Block } from './Block';
import { BlockData, BlockType, Biome } from '@/types/game';
import { usePlayer } from '@/stores/usePlayerStore';

const generateTerrain = (): BlockData[] => {
  const blocks: BlockData[] = [];
  const worldSize = 30;
  const halfSize = worldSize / 2;

  // Define biomes
  const biomes: Record<string, Biome> = {
    plains: { type: 'plains', primaryBlock: 'grass', secondaryBlock: 'dirt', treeChance: 0.02, heightVariation: 2 },
    forest: { type: 'forest', primaryBlock: 'grass', secondaryBlock: 'dirt', treeChance: 0.08, heightVariation: 3 },
    desert: { type: 'desert', primaryBlock: 'sand', secondaryBlock: 'sand', treeChance: 0.01, heightVariation: 2 },
    snow: { type: 'snow', primaryBlock: 'snow', secondaryBlock: 'ice', treeChance: 0.03, heightVariation: 3 }
  };

  // Simple noise function
  const noise = (x: number, z: number) => {
    return Math.sin(x * 0.1) * Math.cos(z * 0.1) + Math.sin(x * 0.05) * Math.cos(z * 0.05);
  };

  for (let x = -halfSize; x < halfSize; x++) {
    for (let z = -halfSize; z < halfSize; z++) {
      // Determine biome based on position
      const biomeNoise = noise(x * 0.3, z * 0.3);
      let currentBiome: Biome;
      
      if (biomeNoise > 0.5) currentBiome = biomes.forest;
      else if (biomeNoise > 0) currentBiome = biomes.plains;
      else if (biomeNoise > -0.5) currentBiome = biomes.desert;
      else currentBiome = biomes.snow;

      // Generate height
      const height = Math.floor(noise(x, z) * currentBiome.heightVariation);
      
      // Place top block
      blocks.push({
        position: [x, height, z],
        type: currentBiome.primaryBlock,
      });

      // Place subsurface blocks
      for (let y = height - 1; y >= height - 3; y--) {
        blocks.push({
          position: [x, y, z],
          type: currentBiome.secondaryBlock,
        });
      }

      // Add trees
      if (Math.random() < currentBiome.treeChance && currentBiome.type !== 'desert') {
        const treeHeight = 4;
        for (let y = 1; y <= treeHeight; y++) {
          blocks.push({
            position: [x, height + y, z],
            type: 'wood',
          });
        }
        // Tree leaves
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            for (let dy = 0; dy < 2; dy++) {
              if (dx === 0 && dz === 0 && dy === 0) continue;
              blocks.push({
                position: [x + dx, height + treeHeight + dy, z + dz],
                type: currentBiome.primaryBlock,
              });
            }
          }
        }
      }

      // Add cacti in desert
      if (currentBiome.type === 'desert' && Math.random() < 0.02) {
        for (let y = 1; y <= 3; y++) {
          blocks.push({
            position: [x, height + y, z],
            type: 'cactus',
          });
        }
      }
    }
  }

  return blocks;
};

export const VoxelWorld = () => {
  const { getSelectedItem, equippedTool } = usePlayer();
  const [blocks, setBlocks] = useState<BlockData[]>(() => generateTerrain());

  // Export blocks for collision detection
  const getBlocks = () => blocks;

  const handleBlockClick = (event: any, position: [number, number, number], isRightClick: boolean) => {
    event.stopPropagation();
    
    if (isRightClick) {
      // Place block
      const selectedItem = getSelectedItem();
      if (selectedItem && selectedItem.itemType === 'block') {
        const face = event.face;
        const normal = face.normal;
        const newPos: [number, number, number] = [
          position[0] + Math.round(normal.x),
          position[1] + Math.round(normal.y),
          position[2] + Math.round(normal.z),
        ];
        
        setBlocks(prev => [...prev, { position: newPos, type: selectedItem.data as BlockType }]);
      }
    } else {
      // Break block with tool effectiveness
      const miningSpeed = equippedTool?.miningSpeed || 1;
      // In a real implementation, you'd track mining progress
      // For now, instant break but could add delay based on miningSpeed
      setBlocks(prev => prev.filter(block => 
        !(block.position[0] === position[0] && 
          block.position[1] === position[1] && 
          block.position[2] === position[2])
      ));
    }
  };

  return {
    blocks,
    handleBlockClick,
    BlocksComponent: () => (
      <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} />
        
        {blocks.map((block, idx) => (
          <Block
            key={idx}
            position={block.position}
            type={block.type}
            onClick={(event, isRightClick) => handleBlockClick(event, block.position, isRightClick)}
          />
        ))}
        
        <gridHelper args={[100, 100]} />
      </>
    ),
  };
};
