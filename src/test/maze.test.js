const Maze = require('../Maze');
/* eslint-env jest */

describe('Maze created with the correct dimension', () => {
  it('is create correctly when dimensions are 1 by 1', () => {
    const maze1 = new Maze(1, 1);
    expect(maze1.cells.length).toBe(1);
    expect(maze1.cells[0].length).toBe(1);
  });

  it('is create correctly when dimensions are 5 by 5', () => {
    const maze2 = new Maze(5, 5);
    expect(maze2.cells.length).toBe(5);
    expect(maze2.cells[0].length).toBe(5);
  });

  it('is create correctly when dimensions are 100 by 50', () => {
    const maze3 = new Maze(100, 50);
    expect(maze3.cells.length).toBe(50);
    expect(maze3.cells[0].length).toBe(100);
  });
});

describe('Removing cell walls', () => {
  let maze;

  beforeEach(() => {
    maze = new Maze(3, 3);
  });

  it('Can remove cell wall', () => {
    maze.removeWall(0, 0, 'up');
    expect(maze.getWallStatus(0, 0, 'up')).toBe(false);
  });

  it('Removing the right wall of a cell removes the left of the next', () => {
    maze.removeWall(0, 1, 'right');
    expect(maze.getWallStatus(0, 1, 'right')).toBe(false);
    expect(maze.getWallStatus(0, 2, 'left')).toBe(false);
  });

  it('Removing the right wall of an outer cell works successfully', () => {
    maze.removeWall(0, 2, 'right');
    expect(maze.getWallStatus(0, 2, 'right')).toBe(false);
  });

  it('Removing the left wall of a cell removes the right of the previous', () => {
    maze.removeWall(0, 1, 'left');
    expect(maze.getWallStatus(0, 1, 'left')).toBe(false);
    expect(maze.getWallStatus(0, 0, 'right')).toBe(false);
  });

  it('Removing the left wall of an outer cell works successfully', () => {
    maze.removeWall(0, 0, 'left');
    expect(maze.getWallStatus(0, 0, 'left')).toBe(false);
  });

  it('Removing the top wall of a cell removes the bottom cell of the one above', () => {
    maze.removeWall(2, 1, 'up');
    expect(maze.getWallStatus(2, 1, 'up')).toBe(false);
    expect(maze.getWallStatus(1, 1, 'down')).toBe(false);
  });

  it('Removing the top wall of an outer cell works successfully', () => {
    maze.removeWall(0, 2, 'up');
    expect(maze.getWallStatus(0, 2, 'up')).toBe(false);
  });

  it('Removing the bottom wall of a cell removes the top cell of the one below', () => {
    maze.removeWall(0, 2, 'down');
    expect(maze.getWallStatus(0, 2, 'down')).toBe(false);
    expect(maze.getWallStatus(1, 2, 'up')).toBe(false);
  });

  it('Removing the bottom wall of an out cell works successfully', () => {
    maze.removeWall(2, 2, 'down');
    expect(maze.getWallStatus(2, 2, 'down')).toBe(false);
  });
});

describe('Visiting cells', () => {
  it('Can visit cells', () => {
    const maze = new Maze(3, 3);
    expect(maze.getCellVisited(0, 0)).toBe(false);
    maze.visitCell(0, 0);
    expect(maze.getCellVisited(0, 0)).toBe(true);
  });
});

describe('String representaion', () => {
  let maze;

  beforeEach(() => {
    maze = new Maze(3, 3);
  });

  it('Maze to string representation to be correct on creation', () => {
    expect(maze.toString()).toBe(' _ _ _\n|_|_|_|\n|_|_|_|\n|_|_|_|');
  });

  it('Maze to string representation to be correct when removing wall', () => {
    maze.removeWall(0, 0, 'right');
    expect(maze.toString()).toBe(' _ _ _\n|_ _|_|\n|_|_|_|\n|_|_|_|');
  });

  it('Maze to string representation to be correct when removing multiple walls', () => {
    maze.removeWall(0, 0, 'right');
    maze.removeWall(1, 1, 'up');
    maze.removeWall(1, 1, 'down');
    expect(maze.toString()).toBe(' _ _ _\n|_  |_|\n|_| |_|\n|_|_|_|');
  });

  test('Maze to string represenation is correct if top walls are removed', () => {
    maze.removeWall(0, 0, 'up');
    maze.removeWall(2, 2, 'down');
    expect(maze.toString()).toBe('   _ _\n|_|_|_|\n|_|_|_|\n|_|_| |');
  });
});

describe('Cell neighbours', () => {
  let maze;
  beforeEach(() => {
    maze = new Maze(3, 3);
  });

  it('Can get all neighbours indicies if in centre', () => {
    const actual = maze.getCellNeighbourIndices(1, 1);

    expect(actual.up.y).toBe(0);
    expect(actual.up.x).toBe(1);

    expect(actual.down.y).toBe(2);
    expect(actual.down.x).toBe(1);

    expect(actual.left.y).toBe(1);
    expect(actual.left.x).toBe(0);

    expect(actual.right.y).toBe(1);
    expect(actual.right.x).toBe(2);
  });

  it('Right cell is undefined if cell furthest right', () => {
    const actual = maze.getCellNeighbourIndices(1, 2);

    expect(actual.right).toBeUndefined();
    expect(actual.left.y).toEqual(1);
    expect(actual.left.x).toEqual(1);
  });

  it('Left cell is undefined if cell furthest Left', () => {
    const actual = maze.getCellNeighbourIndices(1, 0);

    expect(actual.left).toBeUndefined();
    expect(actual.right.y).toEqual(1);
    expect(actual.right.x).toEqual(1);
  });

  it('Up cell is undefined if cell furthest up', () => {
    const actual = maze.getCellNeighbourIndices(0, 1);

    expect(actual.up).toBeUndefined();
    expect(actual.down.y).toEqual(1);
    expect(actual.down.x).toEqual(1);
  });

  it('Down cell is undefined if cell furthest down', () => {
    const actual = maze.getCellNeighbourIndices(2, 1);

    expect(actual.down).toBeUndefined();
    expect(actual.up.y).toEqual(1);
    expect(actual.up.x).toEqual(1);
  });
});

describe('Unvisited Neighbours', () => {
  let maze;
  beforeEach(() => {
    maze = new Maze(3, 3);
  });

  it('Centre cell gets 4 unvisited neighbours on construction', () => {
    const unvisitedNeighboursIndicies = maze.getUnvisitedNeigbourIndices(1, 1);
    expect(unvisitedNeighboursIndicies.length).toBe(4);
  });

  it('Outer cell gets 3 unvisited neighbours on construction', () => {
    const unvisitedNeighboursIndicies = maze.getUnvisitedNeigbourIndices(0, 1);
    expect(unvisitedNeighboursIndicies.length).toBe(3);
  });

  it('Corner cell gets 2 unvisited neighbours on construction', () => {
    const unvisitedNeighboursIndicies = maze.getUnvisitedNeigbourIndices(0, 0);
    expect(unvisitedNeighboursIndicies.length).toBe(2);
  });

  it('Unvisited cell indicies length shortens as more neighbours are visited', () => {
    let unvisitedNeighboursIndicies = maze.getUnvisitedNeigbourIndices(1, 1);
    expect(unvisitedNeighboursIndicies.length).toBe(4);
    let nextCell = unvisitedNeighboursIndicies.pop();
    maze.visitCell(nextCell.y, nextCell.x);
    unvisitedNeighboursIndicies = maze.getUnvisitedNeigbourIndices(1, 1);
    expect(unvisitedNeighboursIndicies.length).toBe(3);
    nextCell = unvisitedNeighboursIndicies.pop();
    maze.visitCell(nextCell.y, nextCell.x);
    unvisitedNeighboursIndicies = maze.getUnvisitedNeigbourIndices(1, 1);
    expect(unvisitedNeighboursIndicies.length).toBe(2);
    nextCell = unvisitedNeighboursIndicies.pop();
    maze.visitCell(nextCell.y, nextCell.x);
    unvisitedNeighboursIndicies = maze.getUnvisitedNeigbourIndices(1, 1);
    expect(unvisitedNeighboursIndicies.length).toBe(1);
    nextCell = unvisitedNeighboursIndicies.pop();
    maze.visitCell(nextCell.y, nextCell.x);
    unvisitedNeighboursIndicies = maze.getUnvisitedNeigbourIndices(1, 1);
    expect(unvisitedNeighboursIndicies.length).toBe(0);
    nextCell = unvisitedNeighboursIndicies.pop();
    expect(nextCell).toBeUndefined();
  });
});

describe(('JSON representation'), () => {
  let maze;

  beforeEach(() => {
    maze = new Maze(3, 3);
  });
  it('Maze to JSON representation to be correct on creation', () => {
    maze = new Maze(3, 3);
    const testJSON = {
      rows: [
        [
          { left: true, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: true, down: true, visited: false }
        ],
        [
          { left: true, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: true, down: true, visited: false }
        ],
        [
          { left: true, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: true, down: true, visited: false }
        ]
      ]
    };
    expect(maze.toJSON()).toEqual(testJSON);
  });

  it('Maze to JSON representation to be correct when removing wall', () => {
    maze = new Maze(3, 3);
    maze.removeWall(0, 0, 'right');
    const testJSON = {
      rows: [
        [
          { left: true, right: false, up: true, down: true, visited: false },
          { left: false, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: true, down: true, visited: false }
        ],
        [
          { left: true, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: true, down: true, visited: false }
        ],
        [
          { left: true, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: true, down: true, visited: false }
        ]
      ]
    };
    expect(maze.toJSON()).toEqual(testJSON);
  });

  it('Maze to JSON representation to be correct when removing multiple walls', () => {
    maze = new Maze(3, 3);
    maze.removeWall(0, 0, 'right');
    maze.removeWall(1, 1, 'up');
    maze.removeWall(1, 1, 'down');
    const testJSON = {
      rows: [
        [
          { left: true, right: false, up: true, down: true, visited: false },
          { left: false, right: true, up: true, down: false, visited: false },
          { left: true, right: true, up: true, down: true, visited: false }
        ],
        [
          { left: true, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: false, down: false, visited: false },
          { left: true, right: true, up: true, down: true, visited: false }
        ],
        [
          { left: true, right: true, up: true, down: true, visited: false },
          { left: true, right: true, up: false, down: true, visited: false },
          { left: true, right: true, up: true, down: true, visited: false }
        ]
      ]
    };
    expect(maze.toJSON()).toEqual(testJSON);
  });
});

describe('Number of unvisited cells', () => {
  let maze;
  const width = 3;
  const height = 3;

  beforeEach(() => {
    maze = new Maze(width, height);
  });

  it('Should return the number of cells if all cells unvisited', () => {
    expect(maze.getTotalUnvisitedCells()).toEqual(width * height);
  });

  it('Should return the number of cells - 1 when a single cell is visited', () => {
    maze.visitCell(0, 0);
    expect(maze.getTotalUnvisitedCells()).toEqual((width * height) - 1);
  });

  it('Should return 0 when all cells have been visited', () => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        maze.visitCell(j, i);
      }
    }
    expect(maze.getTotalUnvisitedCells()).toEqual(0);
  });
});

describe('Find first univisted cell', () => {
  let maze;
  const width = 5;
  const height = 5;

  beforeEach(() => {
    maze = new Maze(width, height);
  });

  it('should return the first cell on construction', () => {
    const firstCell = maze.getFirstUnvisitedCell();
    expect(firstCell.x).toEqual(0);
    expect(firstCell.y).toEqual(0);
  });

  it('should return false if all cells are visited', () => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        maze.visitCell(i, j);
      }
    }
    expect(maze.getFirstUnvisitedCell()).toEqual(false);
  });

  it('should return the last cell of the first row if the all but the final cell of that row has been cleared', () => {
    for (let i = 0; i < width - 1; i++) {
      maze.visitCell(0, i);
    }
    const firstCell = maze.getFirstUnvisitedCell();
    expect(firstCell.x).toEqual(width - 1);
    expect(firstCell.y).toEqual(0);
  });

  it('should return the first cell of the second row if the first row has been visited', () => {
    for (let i = 0; i < width; i++) {
      maze.visitCell(0, i);
    }
    const firstCell = maze.getFirstUnvisitedCell();
    expect(firstCell.x).toEqual(0);
    expect(firstCell.y).toEqual(1);
  });
});
