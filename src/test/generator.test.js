const Generator = require('../GenerationAlgorithms/Generator');
const Prando = require('prando');
const Maze = require('../Maze');

/* eslint-env jest */
describe('Calls the correct algorithms', () => {
  it('Should call depthFirst when DEPTHFIRST is entered as generateMaze param', () => {
    const gen = new Generator(10, 10);
    const spy = jest.spyOn(gen, 'depthFirst');
    gen.generateMaze();
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
  });

  it('Should call depthFirst when an invalid algorithm is chosen at construction', () => {
    const gen = new Generator(10, 10, 'InvalidAlgorithm');
    const spy = jest.spyOn(gen, 'depthFirst');
    gen.generateMaze();
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
  });

  // it('Should call huntAndKill when HUNTANDKILL is chosen at construction', () => {
  //   const gen = new Generator(10, 10, 'huntandkill');
  //   const spy = jest.spyOn(gen, 'huntAndKill');
  //   gen.generateMaze();
  //   expect(spy).toHaveBeenCalled();
  //   spy.mockReset();
  // });
});

describe('Returns mazes', () => {
  it('Should return a maze when DEPTHFIRST is chosen', () => {
    const gen = new Generator(10, 10, 'DepthFirst');
    const maze = gen.generateMaze();
    expect(maze.getTotalUnvisitedCells()).toEqual(0);
  });

  // it('Should return a maze when HUNTANDKILL is chosen', () => {
  //   const gen = new Generator(10, 10, 'HuntAndKill');
  //   const maze = gen.generateMaze();
  //   expect(maze.getTotalUnvisitedCells()).toEqual(0);
  // });

  it('Should return a maze when an invalid algorithm is chosen', () => {
    const gen = new Generator(10, 10, 'InvalidAlgorithm');
    const maze = gen.generateMaze();
    expect(maze.getTotalUnvisitedCells()).toEqual(0);
  });
});

describe('isValidAlgorithm', () => {
  let gen;

  beforeAll(() => {
    gen = new Generator(10, 10, 'DepthFirst');
  });

  it('Returns true when HUNTANDKILL is chosen', () => {
    gen.isValidAlgorithm('HUNTANDKILL');
  });

  it('Returns true when DEPTHFIRST is chosen', () => {
    gen.isValidAlgorithm('DEPTHFIRST');
  });

  it('Returns false when an invalid algorithm is chosen', () => {
    gen.isValidAlgorithm('InvalidAlgorithm');
  });

  it('Returns true when a lower case valid algorithm is chosen', () =>{
    gen.isValidAlgorithm('depthfirst');
  });
});

describe('Algorithm tests', () => {
  let gen;

  describe('Depth First Algorithm', () => {
    beforeEach(() => { gen = new Generator(3, 3); });
    it('Should return a maze when DEPTHFIRST is chosen', () => {
      const maze = gen.depthFirst(123);
      expect(maze.getTotalUnvisitedCells()).toEqual(0);
    });

    it('Returns the same maze structure when given the same seed', () => {
      const maze1 = gen.depthFirst(123);
      const maze2 = gen.depthFirst(123);
      expect(maze1).toEqual(maze2);
    });

    it('Returns a different maze structure when given a different seed', () => {
      const maze1 = gen.depthFirst(123);
      const maze2 = gen.depthFirst(1234);
      expect(maze1).not.toEqual(maze2);
    });
  });

  // describe('Hunt and kill Algorithm', () => {
  //   beforeEach(() => { gen = new Generator(3, 3); });
  //   it('Should return a maze when HUNTANDKILL is chosen', () => {
  //     const maze = gen.huntAndKill(123);
  //     expect(maze.getCellVisited(0, 0)).toEqual(true);
  //   });

  //   it('Returns the same maze structure when given the same seed', () => {
  //     const maze1 = gen.huntAndKill(123);
  //     const maze2 = gen.huntAndKill(123);
  //     expect(maze1).toEqual(maze2);
  //   });

  //   it('Returns a different maze structure when given a different seed', () => {
  //     const maze1 = gen.huntAndKill(123);
  //     const maze2 = gen.huntAndKill(1234);
  //     expect(maze1).not.toEqual(maze2);
  //   });
  // });
});

describe('Randomised walk', () => {
  const width = 3;
  const height = 3;
  let gen;

  beforeAll(() => {
    gen = new Generator(width, height);
  });
  it('Should return a maze with fewer visited cells than on construction', () => {
    const rng = new Prando();
    const currentCell = { x: 0, y: 0 };
    const maze = new Maze(3,3);
    const generatedMaze = gen.randomisedWalk(currentCell, rng, maze);

    expect(generatedMaze.getTotalUnvisitedCells()).toBeLessThan(width * height);
  });
});
