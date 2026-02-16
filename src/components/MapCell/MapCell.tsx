import { useState, type ReactNode } from "react";
import type {
  Inventory,
  InventoryItem,
  InventoryItemId,
  MapCell as MapCellType,
  Position,
} from "../../types";
import { useLevelEditor } from "../LevelEditor";
import { Clickable } from "../Clickable";
import { usePointer } from "../PointerProvider";
import classNames from "classnames";
import styles from "./Mapcell.module.scss";

const getInventoryItemById = (inventory: Inventory, id: InventoryItemId) => {
  return inventory.find((item) => item?.id === id);
};

const inventoryItemToMapCell = (
  inventoryItemId: InventoryItemId,
  rotation: number,
  flippedX: boolean,
  flippedY: boolean,
): MapCellType | undefined => {
  if (!inventoryItemId) {
    return undefined;
  }

  return {
    inventoryItemId,
    rotation,
    flippedX,
    flippedY,
  };
};

type UnpackedMapSingleCell = {
  type: "single";
  rotation: number;
  flippedX: boolean;
  flippedY: boolean;
};

type UnpackedMapEmptyCell = {
  type: "empty";
};

type UnpackedMapCell = (UnpackedMapSingleCell | UnpackedMapEmptyCell) & {
  ghost?: UnpackedMapCell;
};

type MapCellProps = {
  mapCell?: MapCellType;
  position: Position;
  children: (props: UnpackedMapCell) => ReactNode;
  className?: string;
};

export const MapCell = ({
  mapCell,
  position,
  children,
  className,
}: MapCellProps) => {
  const {
    selectedItemId,
    setMap,
    inventory,
    currentRotation,
    currentFlippedX,
    currentFlippedY,
  } = useLevelEditor();

  const [isGhost, setIsGhost] = useState(false);

  const { isPointerDown } = usePointer();

  const { rotation, inventoryItemId, flippedX, flippedY } = mapCell || {};

  const inventoryItem = getInventoryItemById(inventory, inventoryItemId);

  const ghostItem = getInventoryItemById(inventory, selectedItemId);

  const getProps = (item?: InventoryItem) => {
    if (!item) {
      return {};
    }

    switch (item.type) {
      case "single":
        return {
          type: item.type,
          rotation: item.canRotate ? currentRotation : 0,
          flippedX: item.canFlipX ? currentFlippedX : false,
          flippedY: item.canFlipY ? currentFlippedY : false,
        };
      case "empty":
        return {
          type: item.type,
        };
    }
  };

  const ghost = {
    inventoryItem: isGhost ? ghostItem : undefined,
    ...getProps(ghostItem),
  };

  const setCellAt =
    (position: Position, selectedItemId: InventoryItemId) => () => {
      setMap((prevMap) => {
        const newMap = prevMap.map((row) => row.slice());
        newMap[position.y][position.x] = inventoryItemToMapCell(
          selectedItemId,
          ghost.rotation,
          ghost.flippedX,
          ghost.flippedY,
        );
        return newMap;
      });
    };

  const handlePointerEnter = () => {
    setIsGhost(true);
    if (!isPointerDown) return;
    setCellAt(position, selectedItemId)();
  };

  const handlePointerLeave = () => {
    setIsGhost(false);
    if (!isPointerDown) return;
    setCellAt(position, selectedItemId)();
  };

  return (
    <Clickable
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={setCellAt(position, selectedItemId)}
      className={classNames(className, styles.mapCell)}
    >
      {children({
        inventoryItem,
        ghost,
        rotation,
        flippedX,
        flippedY,
      })}
    </Clickable>
  );
};
