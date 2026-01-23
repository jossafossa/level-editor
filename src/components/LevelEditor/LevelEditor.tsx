import { useState, type ReactNode } from "react";
import { LevelEditorContext } from "./LevelEditorContext";
import type { Inventory, InventoryItemId, Map } from "../../types";
import { useUrlSync } from "../../hooks";
import { decodeMap, encodeMap } from "../../utils";
import { PointerProvider } from "../PointerProvider/PointerProvider";
import { getEmptyLevel } from "./getEmptyLevel";

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

const emptyLevel = getEmptyLevel(16, 16);

export const LevelEditor = ({ children, inventory }: LevelEditorProps) => {
  const [selectedItemId, selectItem] = useState<InventoryItemId>();
  const [map, setMap] = useUrlSync<Map>(emptyLevel, {
    key: "m",
    encode: encodeMap,
    decode: decodeMap,
  });
  const [currentRotation, setCurrentRotation] = useState(0);

  return (
    <PointerProvider>
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
    </PointerProvider>
  );
};
