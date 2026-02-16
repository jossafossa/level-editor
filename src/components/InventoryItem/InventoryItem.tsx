import type { ReactNode } from "react";
import { type InventoryItem as InventoryItemType } from "../../types";
import { useLevelEditor } from "../LevelEditor";
import { Clickable } from "../Clickable";

type InventoryItemChildren = {
  isSelected: boolean;
  rotation: number;
};

type InventoryItemProps = {
  item: InventoryItemType;
  children: (props: InventoryItemChildren) => ReactNode;
};

export const InventoryItem = ({ item, children }: InventoryItemProps) => {
  const { selectItem, selectedItemId, currentRotation } = useLevelEditor();

  const isSelected = selectedItemId === item.id;

  return (
    <Clickable onClick={() => selectItem(item.id)}>
      {children({ isSelected, rotation: item.canRotate ? currentRotation : 0 })}
    </Clickable>
  );
};
