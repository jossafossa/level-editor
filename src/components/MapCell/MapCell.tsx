import type { ReactNode } from "react";
import type { Inventory, MapCell as MapCellType, Position } from "../../types";
import { useLevelEditorContext } from "../LevelEditor";

const getIntoryItemById = (inventory: Inventory, id: string | undefined) => {
  return inventory.find((item) => item.id === id);
};

type MapCellChildren = {
  item?: MapCellType;
};

type MapCellProps = {
  item?: MapCellType;
  position: Position;
  children: (props: MapCellChildren) => ReactNode;
  className?: string;
};

export const MapCell = ({
  item,
  position,
  children,
  className,
}: MapCellProps) => {
  const { selectedItemId, setMap, inventory } = useLevelEditorContext();

  const setCellAt =
    (position: Position, selectedItemId: string | undefined) => () => {
      setMap((prevMap) => {
        const newMap = prevMap.map((row) => row.slice());
        newMap[position.y][position.x] = getIntoryItemById(
          inventory,
          selectedItemId || undefined
        );
        return newMap;
      });
    };

  return (
    <button onClick={setCellAt(position, selectedItemId)} className={className}>
      {children({ item })}
    </button>
  );
};
