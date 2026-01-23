import { useContext } from "react";
import { PointerContext } from "./PointerContext";

export const usePointer = () => {
  const context = useContext(PointerContext);

  if (!context) {
    throw new Error("PointerProvider must be used within a PointerContext");
  }

  return context;
};
