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
  currentFlippedX: boolean;
  setCurrentFlippedX: (flipped: boolean) => void;
  currentFlippedY: boolean;
  setCurrentFlippedY: (flipped: boolean) => void;
};

type LevelEditorProps = {
  children: (props: LevelEditorChildren) => ReactNode;
  inventory: Inventory;
  initialMap?: Map;
};

const emptyLevel = getEmptyLevel(16, 16);

export const LevelEditor = ({
  children,
  inventory,
  initialMap,
}: LevelEditorProps) => {
  const [selectedItemId, selectItem] = useState<InventoryItemId>();
  const [map, setMap] = useUrlSync<Map>(initialMap ?? emptyLevel, {
    key: "m",
    encode: encodeMap,
    decode: decodeMap,
  });
  const [currentRotation, setCurrentRotation] = useState(0);
  const [currentFlippedX, setCurrentFlippedX] = useState(false);
  const [currentFlippedY, setCurrentFlippedY] = useState(false);

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
          currentFlippedX,
          currentFlippedY,
        }}
      >
        {children({
          inventory,
          map,
          currentRotation,
          setCurrentRotation,
          currentFlippedX,
          setCurrentFlippedX,
          currentFlippedY,
          setCurrentFlippedY,
        })}
      </LevelEditorContext>
    </PointerProvider>
  );
};
