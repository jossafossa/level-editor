export type Position = {
  x: number;
  y: number;
};

export type Inventory = InventoryItem[];

export type InventoryItemId = number | undefined;

export type InventoryItem = {
  imageUrl: string;
  label: string;
  id: InventoryItemId;
};

export type MapSize = [number, number];

export type Map = (MapCell | undefined)[][];

export type MapCell = {
  inventoryItemId: InventoryItemId;
  rotation: number;
};
