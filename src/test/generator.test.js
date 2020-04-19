const Generator = require('../Generator');
const Prando = require('prando');
const Maze = require('../Maze');

/* eslint-env jest */
describe('Calls the correct algorithms', () => {
  let gen;

  beforeAll(() => {
    gen = new Generator(10, 10);
  });

  it('Should call depthFirst when DEPTHFIRST is entered as generateMaze param', () => {
    const spy = jest.spyOn(gen, 'depthFirst');
    gen.generateMaze('depthFirst');
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
  });

  it('Should call depthFirst when no algorithm is entered as generateMaze param', () => {
    const gen = new Generator(10, 10);
    const spy = jest.spyOn(gen, 'depthFirst');
    gen.generateMaze();
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
  });

  it('Should call depthFirst when an invalid algorithm is chosen at construction', () => {
    const gen = new Generator(10, 10);
    expect(() => {
      gen.generateMaze('InvalidAlgorithm');
    }).toThrowError();
  });

  it('Should call huntAndKill when HUNTANDKILL is is entered as generateMaze param', () => {
    const gen = new Generator(10, 10, 'huntandkill');
    const spy = jest.spyOn(gen, 'huntAndKill');
    gen.generateMaze('huntAndKill');
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
  });
});

describe('Returns mazes', () => {
  it('Should return a maze when DEPTHFIRST is chosen', () => {
    const gen = new Generator(10, 10, 'DepthFirst');
    const maze = gen.generateMaze();
    expect(maze.getTotalUnvisitedCells()).toEqual(0);
  });

  it('Should return a maze when HUNTANDKILL is chosen', () => {
    const gen = new Generator(10, 10, 'HuntAndKill');
    const maze = gen.generateMaze();
    expect(maze.getTotalUnvisitedCells()).toEqual(0);
  });

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
    expect(gen.isValidAlgorithm('HUNTANDKILL')).toEqual(true);
  });

  it('Returns true when DEPTHFIRST is chosen', () => {
    expect(gen.isValidAlgorithm('DEPTHFIRST')).toEqual(true);
  });

  it('Returns false when an invalid algorithm is chosen', () => {
    expect(gen.isValidAlgorithm('InvalidAlgorithm')).toEqual(false);
  });

  it('Returns true when a lower case valid algorithm is chosen', () => {
    expect(gen.isValidAlgorithm('depthfirst')).toEqual(true);
  });

  it('Returns false when a none string parameter is entered', () => {
    expect(gen.isValidAlgorithm(123)).toEqual(false);
    expect(gen.isValidAlgorithm(123.0)).toEqual(false);
    expect(gen.isValidAlgorithm(true)).toEqual(false);
  });
});

describe('Algorithm tests', () => {
  let gen;

  describe('Depth First Algorithm', () => {
    beforeEach(() => {
      gen = new Generator(3, 3);
    });
    it('Should return a maze when DEPTHFIRST is chosen', () => {
      const prando = new Prando();
      const maze = gen.depthFirst(prando);
      expect(maze.getTotalUnvisitedCells()).toEqual(0);
    });

    it('Returns the same maze structure when given the same seed', () => {
      const prando1 = new Prando(123);
      const prando2 = new Prando(123);
      const maze1 = gen.depthFirst(prando1);
      const maze2 = gen.depthFirst(prando2);
      expect(maze1).toEqual(maze2);
    });

    it('Returns a different maze structure when given a different seed', () => {
      const prando1 = new Prando(123);
      const prando2 = new Prando(1234);
      const maze1 = gen.depthFirst(prando1);
      const maze2 = gen.depthFirst(prando2);
      expect(maze1).not.toEqual(maze2);
    });
  });

  describe('Hunt and kill Algorithm', () => {
    beforeEach(() => { gen = new Generator(3, 3); });
    it('Should return a maze when HUNTANDKILL is chosen', () => {
      const prando = new Prando();
      const maze = gen.huntAndKill(prando);
      expect(maze.getCellVisited(0, 0)).toEqual(true);
    });

    it('Returns the same maze structure when given the same seed', () => {
      const prando1 = new Prando(123);
      const prando2 = new Prando(123);
      const maze1 = gen.huntAndKill(prando1);
      const maze2 = gen.huntAndKill(prando2);
      expect(maze1).toEqual(maze2);
    });

    it('Returns a different maze structure when given a different seed', () => {
      const prando1 = new Prando(123);
      const prando2 = new Prando(1234);
      const maze1 = gen.huntAndKill(prando1);
      const maze2 = gen.huntAndKill(prando2);
      expect(maze1).not.toEqual(maze2);
    });
  });
});

describe('Randomised walk', () => {
  const width = 5;
  const height = 5;
  let gen;

  beforeAll(() => {
    gen = new Generator(width, height);
  });

  it('Should return a maze with fewer visited cells than on construction', () => {
    const rng = new Prando();
    const currentCell = { x: 0, y: 0 };
    const maze = new Maze(width, height);
    const generatedMaze = gen.randomisedWalk(currentCell, rng, maze);
    expect(generatedMaze.getTotalUnvisitedCells()).toBeLessThan(width * height);
  });
});

describe('Seed Test', () => {
  const width = 15;
  const height = 15;

  it('should return the same maze given two seperate generators with the same seed and DEPTHFIRST selected', () => {
    const gen1 = new Generator(width, height);
    const gen2 = new Generator(width, height);
    const prando1 = new Prando(123);
    const prando2 = new Prando(123);
    expect(gen1.generateMaze('DEPTHFIRST', prando1)).toEqual(gen2.generateMaze('DEPTHFIRST', prando2));
  });

  it('should return a different maze given two seperate generators with a different seed and DEPTHFIRST selected', () => {
    const gen1 = new Generator(width, height);
    const gen2 = new Generator(width, height);
    const prando1 = new Prando(123);
    const prando2 = new Prando(1234);
    expect(gen1.generateMaze('DEPTHFIRST', prando1)).not.toEqual(gen2.generateMaze('DEPTHFIRST', prando2));
  });

  it('should return the same maze given two seperate generators with the same seed and HUNTANDKILL selected', () => {
    const gen1 = new Generator(width, height);
    const gen2 = new Generator(width, height);
    const prando1 = new Prando(123);
    const prando2 = new Prando(123);
    expect(gen1.generateMaze('HUNTANDKILL', prando1)).toEqual(gen2.generateMaze('HUNTANDKILL', prando2));
  });

  it('should return a different maze given two seperate generators with a different seed and HUNTANDKILL selected', () => {
    const gen1 = new Generator(width, height);
    const gen2 = new Generator(width, height);
    const prando1 = new Prando(123);
    const prando2 = new Prando(1234);
    expect(gen1.generateMaze('HUNTANDKILL', prando1)).not.toEqual(gen2.generateMaze('HUNTANDKILL', prando2));
  });
});
