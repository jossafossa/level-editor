export type Position = {
  x: number;
  y: number;
};

export type Inventory = InventoryItem[];

export type InventoryItem = {
  imageUrl: string;
  label: string;
  id: string;
};

export type MapSize = [number, number];

export type Map = (MapCell | undefined)[][];

export type MapCell = {
  inventoryItem?: InventoryItem;
  rotation?: number;
};
