import { createContext } from "react";

export const PointerContext = createContext<{
  isPointerDown: boolean;
}>({
  isPointerDown: false,
});
