export type Direction = "up" | "down" | "left" | "right";

export type Coordinate = { x: number; y: number };

export type ColumnRowCoordinate = { row: number; column: number };

export type Config = {
  width: number;
  height: number;
  seed?: number | string;
  algorithm?: string;
};
