import type { ReactNode } from "react";
import { type InventoryItem as InventoryItemType } from "../../types";
import { useLevelEditorContext } from "../LevelEditor";
import { Clickable } from "../Clickable";

type InventoryItemChildren = {
  isSelected: boolean;
};

type InventoryItemProps = {
  item: InventoryItemType;
  children: (props: InventoryItemChildren) => ReactNode;
};

export const InventoryItem = ({ item, children }: InventoryItemProps) => {
  const { selectItem, selectedItemId } = useLevelEditorContext();

  const isSelected = selectedItemId === item.id;

  return (
    <Clickable onClick={() => selectItem(item.id)}>
      {children({ isSelected })}
    </Clickable>
  );
};
