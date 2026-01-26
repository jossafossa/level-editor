import type { ReactNode } from "react";
import styles from "./Map.module.scss";
import { useLevelEditor } from "../LevelEditor";
import type { Map as MapType } from "../../types";

type ChildrenProps = {
  map: MapType;
};

type MapProps = {
  children: (props: ChildrenProps) => ReactNode;
};

export const Map = ({ children }: MapProps) => {
  const { map } = useLevelEditor();

  return <>{children({ map })}</>;
};
