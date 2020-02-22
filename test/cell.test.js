const Cell = require('../Cell');
/* eslint-env jest */

// Walls
test('Walls all present on construction', () => {
  const cell = new Cell();
  expect(cell.walls.left).toBe(true);
  expect(cell.walls.right).toBe(true);
  expect(cell.walls.up).toBe(true);
  expect(cell.walls.down).toBe(true);
});

test('Remove cell function sets cell wall to false', () => {
  const cell = new Cell();

  // Left wall
  expect(cell.getWallStatus('left')).toBe(true);
  cell.removeWall('left');
  expect(cell.walls.left).toBe(false);
  expect(cell.getWallStatus('left')).toBe(false);

  // Right Wall
  expect(cell.getWallStatus('right')).toBe(true);
  cell.removeWall('right');
  expect(cell.walls.right).toBe(false);
  expect(cell.getWallStatus('right')).toBe(false);

  // Up wall
  expect(cell.getWallStatus('up')).toBe(true);
  cell.removeWall('up');
  expect(cell.walls.up).toBe(false);
  expect(cell.getWallStatus('up')).toBe(false);

  // Down wall
  expect(cell.getWallStatus('down')).toBe(true);
  cell.removeWall('down');
  expect(cell.walls.down).toBe(false);
  expect(cell.getWallStatus('down')).toBe(false);
});

test('No wall removed and error to be throw if invalid parameter entered on removeWall', () => {
  const cell = new Cell();

  expect(() => {
    cell.removeWall('test');
  }).toThrowError('Invalid direction');
  expect(cell.getWallStatus('left')).toBe(true);
  expect(cell.getWallStatus('right')).toBe(true);
  expect(cell.getWallStatus('up')).toBe(true);
  expect(cell.getWallStatus('down')).toBe(true);
});

test('Error is thrown if invalid wall status is checked', () => {
  const cell = new Cell();
  expect(() => {
    cell.getWallStatus('test');
  }).toThrowError('Invalid direction');
});

// Visit and unvisiting
test('Cell is marked as unvisited on start', () => {
  const cell = new Cell();
  expect(cell.visited).toBe(false);
  expect(cell.getCellVisited()).toBe(false);
});

test('Cell can be marked as visited on start', () => {
  const cell = new Cell();
  cell.setCellVisited(true);
  expect(cell.visited).toBe(true);
  expect(cell.getCellVisited()).toBe(true);
});

test('Cell can be marked as unvisited', () => {
  const cell = new Cell();
  cell.setCellVisited(false);
  expect(cell.visited).toBe(false);
});

// String representations
test('String representation displays correctly on construction when cell is not an edge cell', () => {
  const cell = new Cell();
  expect(cell.toString()).toBe('_|');
});

test('String representation correct when removing up wall', () => {
  const cell = new Cell();
  cell.removeWall('up');
  expect(cell.toString()).toBe('_|');
});

test('String representation correct when removing left wall', () => {
  const cell = new Cell();
  cell.removeWall('left');
  expect(cell.toString()).toBe('_|');
});

test('String representation correct when removing down wall', () => {
  const cell = new Cell();
  cell.removeWall('down');
  expect(cell.toString()).toBe(' |');
});

test('String representation correct when removing right wall', () => {
  const cell = new Cell();
  cell.removeWall('right');
  expect(cell.toString()).toBe('_ ');
});

test('String representation correct when removing up and down wall and cell is a non-edge cell', () => {
  const cell = new Cell();
  cell.removeWall('up');
  cell.removeWall('down');
  expect(cell.toString()).toBe(' |');
});

test('String representation correct when removing up and down wall and cell is a top cell', () => {
  const cell = new Cell(true, false);
  cell.removeWall('up');
  cell.removeWall('down');
  expect(cell.toString()).toBe(' |');
});

test('String representation correct when removing up and down wall and cell is a top left cell', () => {
  const cell = new Cell(true, true);
  cell.removeWall('up');
  cell.removeWall('down');
  expect(cell.toString()).toBe('| |');
});

test('String representation correct on construction if cell is a top non-left cell', () => {
  const cell = new Cell(true, false);
  expect(cell.toString()).toBe('=|');
});

test('String representation correct on construction if cell is a top left cell', () => {
  const cell = new Cell(true, true);
  expect(cell.toString()).toBe('|=|');
});

test('String representation correct on construction if cell is a non-top left cell', () => {
  const cell = new Cell(false, true);
  expect(cell.toString()).toBe('|_|');
});

// JSON representation tests
test('JSON representation is correct on construction of a cells regardless of if they\'re top left cells', () => {
  const normalCellJSON = new Cell(false, false).toJSON();
  const topNonLeftCellJSON = new Cell(true, false).toJSON();
  const topLeftCellJSON = new Cell(true, true).toJSON();
  const leftCellJSON = new Cell(false, true).toJSON();

  const constructionJSON = {
    left: true,
    right: true,
    up: true,
    down: true,
    visited: false
  };
  expect(normalCellJSON).toEqual(constructionJSON);
  expect(topNonLeftCellJSON).toEqual(normalCellJSON);
  expect(topLeftCellJSON).toEqual(normalCellJSON);
  expect(leftCellJSON).toEqual(normalCellJSON);
});

test('JSON representation stays correct if walls are removed', () => {
  const cell = new Cell();
  const testJSON = {
    left: true,
    right: true,
    up: true,
    down: true,
    visited: false
  };
  expect(cell.toJSON()).toEqual(testJSON);

  cell.removeWall('left');
  testJSON.left = false;
  expect(cell.toJSON()).toEqual(testJSON);

  cell.removeWall('right');
  testJSON.right = false;
  expect(cell.toJSON()).toEqual(testJSON);

  cell.removeWall('up');
  testJSON.up = false;
  expect(cell.toJSON()).toEqual(testJSON);

  cell.removeWall('down');
  testJSON.down = false;
  expect(cell.toJSON()).toEqual(testJSON);
});
