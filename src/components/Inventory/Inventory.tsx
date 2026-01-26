import type { ReactNode } from "react";

import { useLevelEditor } from "../LevelEditor";
import type { Inventory as InventoryType } from "../../types";

type InventoryProps = {
  children: (props: { inventory: InventoryType }) => ReactNode;
};

export const Inventory = ({ children }: InventoryProps) => {
  const { inventory } = useLevelEditor();

  return <>{children({ inventory })}</>;
};
