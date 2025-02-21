import { Cell } from "../Cell";
/* eslint-env jest */

// Walls
test("Walls all present on construction", () => {
  const cell = new Cell();
  expect(cell.walls.left).toBe(true);
  expect(cell.walls.right).toBe(true);
  expect(cell.walls.up).toBe(true);
  expect(cell.walls.down).toBe(true);
});

test("Remove cell function sets cell wall to false", () => {
  const cell = new Cell();

  // Left wall
  expect(cell.getWallStatus("left")).toBe(true);
  cell.removeWall("left");
  expect(cell.walls.left).toBe(false);
  expect(cell.getWallStatus("left")).toBe(false);

  // Right Wall
  expect(cell.getWallStatus("right")).toBe(true);
  cell.removeWall("right");
  expect(cell.walls.right).toBe(false);
  expect(cell.getWallStatus("right")).toBe(false);

  // Up wall
  expect(cell.getWallStatus("up")).toBe(true);
  cell.removeWall("up");
  expect(cell.walls.up).toBe(false);
  expect(cell.getWallStatus("up")).toBe(false);

  // Down wall
  expect(cell.getWallStatus("down")).toBe(true);
  cell.removeWall("down");
  expect(cell.walls.down).toBe(false);
  expect(cell.getWallStatus("down")).toBe(false);
});

// Visit and unvisiting
test("Cell is marked as unvisited on start", () => {
  const cell = new Cell();
  expect(cell.visited).toBe(false);
  expect(cell.getCellVisited()).toBe(false);
});

test("Cell can be marked as visited on start", () => {
  const cell = new Cell();
  cell.setCellVisited(true);
  expect(cell.visited).toBe(true);
  expect(cell.getCellVisited()).toBe(true);
});

test("Cell can be marked as unvisited", () => {
  const cell = new Cell();
  cell.setCellVisited(false);
  expect(cell.visited).toBe(false);
});

// String representations
test("String representation displays correctly on construction", () => {
  const cell = new Cell();
  expect(cell.toString()).toBe("_|");
});

test("String representation correct when removing up wall", () => {
  const cell = new Cell();
  cell.removeWall("up");
  expect(cell.toString()).toBe("_|");
});

test("String representation correct when removing left wall", () => {
  const cell = new Cell();
  cell.removeWall("left");
  expect(cell.toString()).toBe("_|");
});

test("String representation correct when removing down wall", () => {
  const cell = new Cell();
  cell.removeWall("down");
  expect(cell.toString()).toBe(" |");
});

test("String representation correct when removing right wall", () => {
  const cell = new Cell();
  cell.removeWall("right");
  expect(cell.toString()).toBe("_ ");
});

test("String representation is correct when removiing all walls", () => {
  const cell = new Cell();
  cell.removeWall("right");
  cell.removeWall("down");
  expect(cell.toString()).toBe("  ");
});

// JSON representation tests
test("JSON representation stays correct if walls are removed", () => {
  const cell = new Cell();
  const testJSON = {
    left: true,
    right: true,
    up: true,
    down: true,
    visited: false,
  };
  expect(cell.toJSON()).toEqual(testJSON);

  cell.removeWall("left");
  testJSON.left = false;
  expect(cell.toJSON()).toEqual(testJSON);

  cell.removeWall("right");
  testJSON.right = false;
  expect(cell.toJSON()).toEqual(testJSON);

  cell.removeWall("up");
  testJSON.up = false;
  expect(cell.toJSON()).toEqual(testJSON);

  cell.removeWall("down");
  testJSON.down = false;
  expect(cell.toJSON()).toEqual(testJSON);
});

test("JSON representation displays correctly if cell marked as visited", () => {
  const cell = new Cell();
  const testJSON = {
    left: true,
    right: true,
    up: true,
    down: true,
    visited: true,
  };
  cell.setCellVisited(true);
  expect(cell.toJSON()).toEqual(testJSON);
});
