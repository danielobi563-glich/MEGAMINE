export type BlockType = 'grass' | 'dirt' | 'stone' | 'wood' | 'water' | 'sand' | 'snow' | 'ice' | 'cactus';

export type BiomeType = 'plains' | 'forest' | 'desert' | 'snow';

export interface BlockData {
  position: [number, number, number];
  type: BlockType;
}

export interface Biome {
  type: BiomeType;
  primaryBlock: BlockType;
  secondaryBlock: BlockType;
  treeChance: number;
  heightVariation: number;
}

export interface InventoryItem {
  id: string;
  itemType: 'block' | 'tool';
  data: BlockType | ToolType;
  quantity: number;
}

export type ToolType = 'wooden_pickaxe' | 'stone_pickaxe' | 'wooden_axe' | 'stone_axe';

export interface Tool {
  type: ToolType;
  miningSpeed: number;
  durability: number;
}
