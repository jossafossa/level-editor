import type { ReactNode } from "react";
import { type InventoryItem as InventoryItemType } from "../../types";
import { useLevelEditor } from "../LevelEditor";
import { Clickable } from "../Clickable";

type SingleInventoryItemChildren = {
  type: "single";
  isSelected: boolean;
  rotation: number;
  flippedX: boolean;
  flippedY: boolean;
};

type EmptyInventoryItemChildren = {
  type: "empty";
  isSelected: boolean;
};

type InventoryItemChildren =
  | SingleInventoryItemChildren
  | EmptyInventoryItemChildren;

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

  const getProps = (item: InventoryItemType) => {
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

  return (
    <Clickable onClick={() => selectItem(item.id)}>
      {children({ isSelected, ...getProps(item) })}
    </Clickable>
  );
};
