import type { ReactNode } from "react";
import { type InventoryItem as InventoryItemType } from "../../types";
import { useLevelEditorContext } from "../LevelEditor";

type InventoryItemChildren = {
  isSelected: boolean;
};

type InventoryitemProps = {
  item: InventoryItemType;
  children: (props: InventoryItemChildren) => ReactNode;
};

export const Inventoryitem = ({ item, children }: InventoryitemProps) => {
  const { selectItem, selectedItemId } = useLevelEditorContext();

  const isSelected = selectedItemId === item.id;

  return (
    <button onClick={() => selectItem(item.id)}>
      {children({ isSelected })}
    </button>
  );
};
