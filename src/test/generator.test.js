const Generator = require('../GenerationAlgorithms/Generator');

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
    expect(gen.generateMaze().getCellVisited(0, 0)).toBe(true);
  });

  it('Should return a maze when HUNTANDKILL is chosen', () => {
    const gen = new Generator(10, 10, 'HuntAndKill');
    expect(gen.generateMaze().getCellVisited(0, 0)).toBe(true);
  });

  it('Should return a maze when an invalid algorithm is chosen', () => {
    const gen = new Generator(10, 10, 'InvalidAlgorithm');
    expect(gen.generateMaze().getCellVisited(0, 0)).toBe(true);
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

  describe('DepthFirst Algorithm', () => {
    beforeEach(() => { gen = new Generator(3, 3); });
    it('Should return a maze when DEPTHFIRST is chosen', () => {
      const maze = gen.depthFirst(123);
      expect(maze.getCellVisited(0, 0)).toEqual(true);
    });

    it('Returns the same maze structure when given the same seed', () => {
      const maze1 = gen.depthFirst(123);
      const maze2 = gen.depthFirst(123);
      expect(maze1).toEqual(maze2);
    });

    it('Returns a different maze structure when given a different seed', () => {
      const maze1 = gen.depthFirst(123);
      const maze2 = gen.depthFirst(1234);
      console.log(maze1.toString());
      console.log(maze2.toString());
      expect(maze1).not.toEqual(maze2);
    });
  });
});
