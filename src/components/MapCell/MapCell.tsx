import { useMemo, useState, type ReactNode } from "react";
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
): MapCellType | undefined => {
  if (!inventoryItemId) {
    return undefined;
  }

  return {
    inventoryItemId,
    rotation,
  };
};

type UnpackedMapCell = {
  inventoryItem?: InventoryItem;
  rotation?: number;
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
  const { selectedItemId, setMap, inventory, currentRotation } =
    useLevelEditor();

  const [isGhost, setIsGhost] = useState(false);

  const { isPointerDown } = usePointer();

  const { rotation, inventoryItemId } = mapCell || {};

  const inventoryItem = getInventoryItemById(inventory, inventoryItemId);

  const setCellAt =
    (position: Position, selectedItemId: InventoryItemId) => () => {
      setMap((prevMap) => {
        const newMap = prevMap.map((row) => row.slice());
        newMap[position.y][position.x] = inventoryItemToMapCell(
          selectedItemId,
          currentRotation,
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

  const ghost = {
    rotation: currentRotation,
    inventoryItem: isGhost
      ? getInventoryItemById(inventory, selectedItemId)
      : undefined,
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
        rotation,
        ghost,
      })}
    </Clickable>
  );
};
