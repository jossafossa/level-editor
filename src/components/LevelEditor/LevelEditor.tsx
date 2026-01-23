import { useState, type ReactNode } from "react";
import { LevelEditorContext } from "./LevelEditorContext";
import type { Inventory, Map } from "../../types";

const initialMap: Map = [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
];

type LevelEditorChildren = {
  inventory: Inventory;
  map: Map;
  currentRotation: number;
  setCurrentRotation: (rotation: number) => void;
};

type LevelEditorProps = {
  children: (props: LevelEditorChildren) => ReactNode;
  inventory: Inventory;
};

export const LevelEditor = ({ children, inventory }: LevelEditorProps) => {
  const [selectedItemId, selectItem] = useState<string>();
  const [map, setMap] = useState<Map>(initialMap);
  const [currentRotation, setCurrentRotation] = useState(0);

  return (
    <LevelEditorContext
      value={{
        selectedItemId,
        selectItem,
        map,
        setMap,
        inventory,
        currentRotation,
      }}
    >
      {children({ inventory, map, currentRotation, setCurrentRotation })}
    </LevelEditorContext>
  );
};
