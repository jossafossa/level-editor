import { createContext } from "react";
import type { Inventory, Map } from "../../types";

export type LevelEditorProps = {
  selectedItemId?: string;
  selectItem: (item: string) => void;
  map: Map;
  setMap: (updater: (prevMap: Map) => Map) => void;
  inventory: Inventory;
} | null;

export const LevelEditorContext = createContext<LevelEditorProps>(null);
