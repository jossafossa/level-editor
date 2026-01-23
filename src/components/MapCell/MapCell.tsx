import type { ReactNode } from "react";
import type {
  Inventory,
  InventoryItem,
  InventoryItemId,
  MapCell as MapCellType,
  Position,
} from "../../types";
import { useLevelEditorContext } from "../LevelEditor";
import { Clickable } from "../Clickable";

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
    useLevelEditorContext();

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

  return (
    <Clickable
      onClick={setCellAt(position, selectedItemId)}
      className={className}
    >
      {children({
        inventoryItem,
        rotation,
      })}
    </Clickable>
  );
};
