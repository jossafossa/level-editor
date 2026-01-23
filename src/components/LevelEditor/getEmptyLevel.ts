import type { Map } from "../../types";

export const getEmptyLevel = (rows: number, cols: number): Map => {
  return new Array(rows).fill(null).map(() => new Array(cols).fill(undefined));
};
