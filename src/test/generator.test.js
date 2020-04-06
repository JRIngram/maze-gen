const Generator = require('../GenerationAlgorithms/Generator');
const DepthFirst = require('../GenerationAlgorithms/DepthFirst');

/* eslint-env jest */
describe('Calls the correct algorithms', () => {
  it('Should call depthFirst when DEPTHFIRST is chosen at construction', () => {
    const gen = new Generator(10, 10, 'DepthFirst');
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

  it('Should call huntAndKill when HUNTANDKILL is chosen at construction', () => {
    const gen = new Generator(10, 10, 'huntandkill');
    const spy = jest.spyOn(gen, 'huntAndKill');
    gen.generateMaze();
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
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

  describe('Parameter types', () => {
    it('Throws an error if an int parameter is passed', () => {
      expect(() => {
        gen.isValidAlgorithm(123);
      }).toThrowError();
    });

    it('Throws an error if a boolean parameter is passed', () => {
      expect(() => {
        gen.isValidAlgorithm(true);
      }).toThrowError();
    });
  });
});
