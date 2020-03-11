const getType = require('jest-get-type');
const DepthFirst = require('../GenerationAlgorithms/DepthFirst');
/* eslint-env jest */

describe('DepthFirst alogorithm', () => {
  it('Returns an object', () => {
    const df = new DepthFirst(3, 3);
    expect(getType(df.generateMaze())).toBe('object');
  });

  it('Returns the same maze structure when given the same seed', () => {
    const df1 = new DepthFirst(3, 3, 123);
    const df2 = new DepthFirst(3, 3, 123);
    expect(df2.generateMaze()).toEqual(df1.generateMaze());
  });

  it('Returns the a different maze structure when given a different seed', () => {
    const df1 = new DepthFirst(3, 3, 123);
    const df2 = new DepthFirst(3, 3, 321);
    expect(df2.generateMaze()).not.toEqual(df1.generateMaze());
  });
});

describe('Random cell', () => {
  test('Can get a random cell', () => {
    const df = new DepthFirst(3, 3);
    const actual = df.getRandomCell();
    expect(actual.randomHeight).toBeLessThan(4);
    expect(actual.randomHeight).toBeGreaterThanOrEqual(0);
    expect(actual.randomWidth).toBeLessThan(3);
    expect(actual.randomWidth).toBeGreaterThanOrEqual(0);
  });
});
