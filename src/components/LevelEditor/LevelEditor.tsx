import { useState, type ReactNode } from "react";
import { LevelEditorContext } from "./LevelEditorContext";
import type { Inventory, Map } from "../../types";

const inventory: Inventory = [
  {
    imageUrl: "https://cataas.com/cat",
    label: "Tile 1",
    id: "1",
  },
  {
    imageUrl: "https://cataas.com/cat/2",
    label: "Tile 2",
    id: "2",
  },
  {
    imageUrl: "https://cataas.com/cat/3",
    label: "Tile 3",
    id: "3",
  },
];

const initialMap: Map = [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
];

type LevelEditorChildren = {
  inventory: Inventory;
  map: Map;
};

type LevelEditorProps = {
  children: (props: LevelEditorChildren) => ReactNode;
};

export const LevelEditor = ({ children }: LevelEditorProps) => {
  const [selectedItemId, selectItem] = useState<string>();
  const [map, setMap] = useState<Map>(initialMap);

  return (
    <LevelEditorContext
      value={{ selectedItemId, selectItem, map, setMap, inventory }}
    >
      {children({ inventory, map })}
    </LevelEditorContext>
  );
};
