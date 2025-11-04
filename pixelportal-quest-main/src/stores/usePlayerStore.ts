import { create } from 'zustand';
import { InventoryItem, Tool } from '@/types/game';

interface PlayerState {
  health: number;
  hunger: number;
  inventory: InventoryItem[];
  hotbarSlots: number;
  selectedHotbarSlot: number;
  equippedTool: Tool | null;
  
  setHealth: (health: number) => void;
  setHunger: (hunger: number) => void;
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  removeItem: (id: string) => void;
  selectHotbarSlot: (slot: number) => void;
  getSelectedItem: () => InventoryItem | null;
  equipTool: (tool: Tool | null) => void;
}

export const usePlayer = create<PlayerState>((set, get) => ({
  health: 20,
  hunger: 20,
  inventory: [
    { id: '1', itemType: 'block', data: 'grass', quantity: 64 },
    { id: '2', itemType: 'block', data: 'dirt', quantity: 64 },
    { id: '3', itemType: 'block', data: 'stone', quantity: 64 },
    { id: '4', itemType: 'block', data: 'wood', quantity: 64 },
  ],
  hotbarSlots: 9,
  selectedHotbarSlot: 0,
  equippedTool: null,
  
  setHealth: (health) => set({ health: Math.max(0, Math.min(20, health)) }),
  setHunger: (hunger) => set({ hunger: Math.max(0, Math.min(20, hunger)) }),
  
  addItem: (item) => set((state) => {
    const existingItem = state.inventory.find(
      i => i.itemType === item.itemType && i.data === item.data
    );
    
    if (existingItem) {
      return {
        inventory: state.inventory.map(i =>
          i.id === existingItem.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      };
    }
    
    return {
      inventory: [...state.inventory, { ...item, id: Math.random().toString() }],
    };
  }),
  
  removeItem: (id) => set((state) => {
    const item = state.inventory.find(i => i.id === id);
    if (!item) return state;
    
    if (item.quantity > 1) {
      return {
        inventory: state.inventory.map(i =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }
    
    return {
      inventory: state.inventory.filter(i => i.id !== id),
    };
  }),
  
  selectHotbarSlot: (slot) => set({ selectedHotbarSlot: slot }),
  
  getSelectedItem: () => {
    const state = get();
    return state.inventory[state.selectedHotbarSlot] || null;
  },
  
  equipTool: (tool) => set({ equippedTool: tool }),
}));
