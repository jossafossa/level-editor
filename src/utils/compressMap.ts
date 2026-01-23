import type { Map } from "../types";

export function encodeMap(map: Map): string {
  const rows = map.length;
  const cols = map[0]?.length || 0;
  const bitStream: number[] = [];

  // 1. Encode Dimensions into the bitstream (16 bits each)
  for (let i = 15; i >= 0; i--) bitStream.push((rows >> i) & 1);
  for (let i = 15; i >= 0; i--) bitStream.push((cols >> i) & 1);

  // 2. Encode Cells
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = map[r][c];
      if (!cell || cell.inventoryItemId === undefined) {
        bitStream.push(0);
      } else {
        bitStream.push(1);
        for (let i = 7; i >= 0; i--)
          bitStream.push((cell.inventoryItemId >> i) & 1);
        for (let i = 1; i >= 0; i--) bitStream.push((cell.rotation >> i) & 1);
      }
    }
  }

  const bytes = new Uint8Array(Math.ceil(bitStream.length / 8));
  for (let i = 0; i < bitStream.length; i++) {
    if (bitStream[i]) {
      bytes[Math.floor(i / 8)] |= 1 << (7 - (i % 8));
    }
  }

  const base64 = btoa(String.fromCharCode(...bytes));

  return base64;
}

export function decodeMap(base64: string): Map {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  let bitPtr = 0;

  const readBits = (numBits: number): number => {
    let value = 0;
    for (let i = 0; i < numBits; i++) {
      const byteIndex = Math.floor(bitPtr / 8);
      const bitIndex = 7 - (bitPtr % 8);
      const bit = (bytes[byteIndex] >> bitIndex) & 1;
      value = (value << 1) | bit;
      bitPtr++;
    }
    return value;
  };

  // 1. Read dimensions back (16 bits each)
  const rows = readBits(16);
  const cols = readBits(16);

  const map: Map = Array.from({ length: rows }, () =>
    Array(cols).fill(undefined),
  );

  // 2. Read cells
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (readBits(1) === 1) {
        const inventoryItemId = readBits(8);
        const rotation = readBits(2);
        map[r][c] = { inventoryItemId, rotation };
      }
    }
  }

  return map;
}
