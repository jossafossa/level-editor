import { createContext } from "react";
import type { Inventory, InventoryItemId, Map } from "../../types";

export type LevelEditorProps = {
  selectedItemId?: InventoryItemId;
  selectItem: (inventoryItemId: InventoryItemId) => void;
  map: Map;
  setMap: (updater: (prevMap: Map) => Map) => void;
  inventory: Inventory;
  currentRotation: number;
} | null;

export const LevelEditorContext = createContext<LevelEditorProps>(null);
