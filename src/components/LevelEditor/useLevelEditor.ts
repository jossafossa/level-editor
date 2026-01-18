import { LevelEditorContext } from "./LevelEditorContext";
import { useContext } from "react";

export const useLevelEditorContext = () => {
  const context = useContext(LevelEditorContext);

  if (context === null) {
    throw new Error(
      "useLevelEditorContext can only be used inside a LevelEditorProvider"
    );
  }

  return context;
};
