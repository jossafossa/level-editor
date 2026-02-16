export type Position = {
  x: number;
  y: number;
};

export type Inventory = InventoryItem[];

export type InventoryItemId = number | undefined;

export type SingleInventoryItem = {
  type: "single";
  imageUrl: string;
  label: string;
  id: InventoryItemId;
  canRotate: boolean;
  canFlipX: boolean;
  canFlipY: boolean;
};

export type EmptyInventoryItem = {
  type: "empty";
  imageUrl: string;
  label: string;
  id: InventoryItemId;
};

export type InventoryItem = SingleInventoryItem | EmptyInventoryItem;

export type MapSize = [number, number];

export type Map = (MapCell | undefined)[][];

export type MapCell = {
  inventoryItemId: InventoryItemId;
  rotation: number;
  flippedX: boolean;
  flippedY: boolean;
};
