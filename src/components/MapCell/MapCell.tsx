import type { ReactNode } from "react";
import type {
  Inventory,
  InventoryItem,
  MapCell as MapCellType,
  Position,
} from "../../types";
import { useLevelEditorContext } from "../LevelEditor";
import { Clickable } from "../Clickable";

const getInventoryItemById = (inventory: Inventory, id: string | undefined) => {
  return inventory.find((item) => item.id === id);
};

const inventoryItemToMapCell = (
  inventoryItem: InventoryItem | undefined,
  rotation: number,
): MapCellType | undefined => {
  if (!inventoryItem) {
    return undefined;
  }

  return {
    inventoryItem,
    rotation,
  };
};

type MapCellProps = {
  mapCell?: MapCellType;
  position: Position;
  children: (props: MapCellType) => ReactNode;
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

  const { inventoryItem, rotation } = mapCell || {};

  const setCellAt =
    (position: Position, selectedItemId: string | undefined) => () => {
      setMap((prevMap) => {
        const newMap = prevMap.map((row) => row.slice());
        const inventoryItem = getInventoryItemById(
          inventory,
          selectedItemId || undefined,
        );
        newMap[position.y][position.x] = inventoryItemToMapCell(
          inventoryItem,
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
