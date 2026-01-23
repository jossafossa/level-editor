import { LevelEditorContext } from "./LevelEditorContext";
import { useContext } from "react";

export const useLevelEditor = () => {
  const context = useContext(LevelEditorContext);

  if (context === null) {
    throw new Error(
      "useLevelEditor can only be used inside a LevelEditorProvider",
    );
  }

  return context;
};
