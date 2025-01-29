import { Maze } from "../Maze";
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
  let maze: Maze;

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
  let maze: Maze;

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
  let maze: Maze;
  beforeEach(() => {
    maze = new Maze(3, 3);
  });

  describe('Get cell neighbour indicies', () => {
    it('Can get all neighbours indicies if in centre', () => {
      const actual = maze.getCellNeighbourIndices(1, 1);

      if (!actual.up || !actual.down || !actual.left || !actual.right) {
        throw Error("expected actual.right, actual.left, actual.up and actual.down to be defined")
      }

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

      if (!actual.left) {
        throw Error("expected actual defined")
      }

      expect(actual.right).toBeUndefined();
      expect(actual.left.y).toEqual(1);
      expect(actual.left.x).toEqual(1);
    });

    it('Left cell is undefined if cell furthest Left', () => {
      const actual = maze.getCellNeighbourIndices(1, 0);

      if (!actual.right) {
        throw Error("expected actual.right to be defined")
      }

      expect(actual.left).toBeUndefined();
      expect(actual.right.y).toEqual(1);
      expect(actual.right.x).toEqual(1);
    });

    it('Up cell is undefined if cell furthest up', () => {
      const actual = maze.getCellNeighbourIndices(0, 1);

      if (!actual.down) {
        throw Error("expected actual.down to be defined")
      }
      expect(actual.up).toBeUndefined();
      expect(actual.down.y).toEqual(1);
      expect(actual.down.x).toEqual(1);
    });

    it('Down cell is undefined if cell furthest down', () => {
      const actual = maze.getCellNeighbourIndices(2, 1);

      if (!actual.up) {
        throw Error("expected actual.up to be defined")
      }
      expect(actual.down).toBeUndefined();
      expect(actual.up.y).toEqual(1);
      expect(actual.up.x).toEqual(1);
    });
  });
});

describe('Unvisited Neighbour Indicies', () => {
  let maze: Maze;
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
    if(!nextCell){
      throw new Error("Expected nextCell to be defined");
    }
    maze.visitCell(nextCell.y, nextCell.x);
    unvisitedNeighboursIndicies = maze.getUnvisitedNeigbourIndices(1, 1);
    expect(unvisitedNeighboursIndicies.length).toBe(3);

    nextCell = unvisitedNeighboursIndicies.pop();
    if(!nextCell){
      throw new Error("Expected nextCell to be defined");
    }
    maze.visitCell(nextCell.y, nextCell.x);
    if(!nextCell){
      throw new Error("Expected nextCell to be defined");
    }
    unvisitedNeighboursIndicies = maze.getUnvisitedNeigbourIndices(1, 1);
    expect(unvisitedNeighboursIndicies.length).toBe(2);

    nextCell = unvisitedNeighboursIndicies.pop();
    if(!nextCell){
      throw new Error("Expected nextCell to be defined");
    }
    maze.visitCell(nextCell.y, nextCell.x);
    unvisitedNeighboursIndicies = maze.getUnvisitedNeigbourIndices(1, 1);
    expect(unvisitedNeighboursIndicies.length).toBe(1);

    nextCell = unvisitedNeighboursIndicies.pop();
    if(!nextCell){
      throw new Error("Expected nextCell to be defined");
    }
    maze.visitCell(nextCell.y, nextCell.x);
    unvisitedNeighboursIndicies = maze.getUnvisitedNeigbourIndices(1, 1);
    expect(unvisitedNeighboursIndicies.length).toBe(0);
    nextCell = unvisitedNeighboursIndicies.pop();
    expect(nextCell).toBeUndefined();
  });
});

describe('Visited Neighbour Indicies', () => {
  let maze: Maze;
  beforeEach(() => {
    maze = new Maze(3, 3);
  });

  it('Centre cell gets 0 visited neighbours on construction', () => {
    const visitedNeighboursIndicies = maze.getVisitedNeigbourIndices(1, 1);
    expect(visitedNeighboursIndicies.length).toBe(0);
  });

  it('Outer cell gets 0 visited neighbours on construction', () => {
    const visitedNeighboursIndicies = maze.getVisitedNeigbourIndices(0, 1);
    expect(visitedNeighboursIndicies.length).toBe(0);
  });

  it('Corner cell gets 0 visited neighbours on construction', () => {
    const visitedNeighboursIndicies = maze.getVisitedNeigbourIndices(0, 0);
    expect(visitedNeighboursIndicies.length).toBe(0);
  });

  it('Visited cell indicies length grows as more neighbours are visited', () => {
    let visitedNeighboursIndicies = maze.getVisitedNeigbourIndices(1, 1);
    expect(visitedNeighboursIndicies.length).toBe(0);
    const nextCell = visitedNeighboursIndicies.pop();
    expect(nextCell).toBeUndefined();
    maze.visitCell(0, 1);
    visitedNeighboursIndicies = maze.getVisitedNeigbourIndices(1, 1);
    expect(visitedNeighboursIndicies.length).toBe(1);
    maze.visitCell(2, 1);
    visitedNeighboursIndicies = maze.getVisitedNeigbourIndices(1, 1);
    expect(visitedNeighboursIndicies.length).toBe(2);
    maze.visitCell(1, 0);
    visitedNeighboursIndicies = maze.getVisitedNeigbourIndices(1, 1);
    expect(visitedNeighboursIndicies.length).toBe(3);
    maze.visitCell(1, 2);
    visitedNeighboursIndicies = maze.getVisitedNeigbourIndices(1, 1);
    expect(visitedNeighboursIndicies.length).toBe(4);
  });
});

describe('First cell with an unvisited neighbour', () => {
  let maze: Maze;
  const width = 3;
  const height = 3;

  beforeEach(() => {
    maze = new Maze(width, height);
  });

  it('Should return false if no unvisited cell with visited neighbour exists', () => {
    const expected = false;
    const actual = maze.getFirstUnvisitedCellWithVisitedNeighbour();
    expect(actual).toEqual(expected);
  });

  it('Should return false if all cells have been visited', () => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        maze.visitCell(j, i);
      }
    }
    const expected = false;
    const actual = maze.getFirstUnvisitedCellWithVisitedNeighbour();
    expect(actual).toEqual(expected);
  });

  it('Should return the top left cell and cell (1,0) if cell (1,0) has been visited', () => {
    maze.visitCell(0, 1);
    const firstUnivistedCellWithNeighbours = maze.getFirstUnvisitedCellWithVisitedNeighbour()
    if(!firstUnivistedCellWithNeighbours){
      throw new Error("Expected firstUnivistedCellWithNeighbours to not be false")
    }

    const firstCellExpected = { x: 0, y: 0 };
    const firstCellActual = firstUnivistedCellWithNeighbours.firstCell;
    expect(firstCellActual).toEqual(firstCellExpected);

    const neighbours = firstUnivistedCellWithNeighbours.neighbours;
    const expectedNeighboursLength = 1;
    const actualNeighboursLength = neighbours.length;
    expect(actualNeighboursLength).toEqual(expectedNeighboursLength);

    const expectedNeighbour = { direction: 'right', x: 1, y: 0 };
    const actualNeighbour = neighbours[0];
    expect(actualNeighbour).toEqual(expectedNeighbour);
  });

  it('Should return the centre cell and cells (1,0) & (0,1) if the top row, and left most cell on the second row has been visited', () => {
    maze.visitCell(0, 0);
    maze.visitCell(0, 1);
    maze.visitCell(0, 2);
    maze.visitCell(1, 0);
    const firstUnivistedCellWithNeighbours = maze.getFirstUnvisitedCellWithVisitedNeighbour()
    if(!firstUnivistedCellWithNeighbours){
      throw new Error("Expected firstUnivistedCellWithNeighbours to not be false")
    }
    
    const firstCellExpected = { x: 1, y: 1 };
    const firstCellActual = firstUnivistedCellWithNeighbours.firstCell;
    expect(firstCellActual).toEqual(firstCellExpected);

    const neighbours = firstUnivistedCellWithNeighbours.neighbours;
    const expectedNeighboursLength = 2;
    const actualNeighboursLength = neighbours.length;
    expect(actualNeighboursLength).toEqual(expectedNeighboursLength);

    const expectedNeighbourOne = { direction: 'up', x: 1, y: 0 };
    const expectedNeighbourTwo = { direction: 'left', x: 0, y: 1 };
    const actualNeighbourOne = neighbours[0];
    const actualNeighbourTwo = neighbours[1];
    expect(actualNeighbourOne).toEqual(expectedNeighbourOne);
    expect(actualNeighbourTwo).toEqual(expectedNeighbourTwo);
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
  let maze: Maze;
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
