import type { ReactNode } from "react";
import { type InventoryItem as InventoryItemType } from "../../types";
import { useLevelEditor } from "../LevelEditor";
import { Clickable } from "../Clickable";

type InventoryItemChildren = {
  isSelected: boolean;
  rotation: number;
  flippedX: boolean;
  flippedY: boolean;
};

type InventoryItemProps = {
  item: InventoryItemType;
  children: (props: InventoryItemChildren) => ReactNode;
};

export const InventoryItem = ({ item, children }: InventoryItemProps) => {
  const {
    selectItem,
    selectedItemId,
    currentRotation,
    currentFlippedX,
    currentFlippedY,
  } = useLevelEditor();

  const isSelected = selectedItemId === item.id;

  const rotation = item.canRotate ? currentRotation : 0;
  const flippedX = item.canFlipX ? currentFlippedX : false;
  const flippedY = item.canFlipY ? currentFlippedY : false;

  return (
    <Clickable onClick={() => selectItem(item.id)}>
      {children({ isSelected, rotation, flippedX, flippedY })}
    </Clickable>
  );
};
