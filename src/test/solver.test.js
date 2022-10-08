const Solver = require('../Solver');
const Generator = require('../Generator');
const Prando = require('prando');

const testOptions = {
  width: 4,
  height: 4,
  seed: 'testseed',
  algorithm: 'DEPTHFIRST'
};

/* eslint-env jest */
describe('Constructor', () => {
  let gen, testMaze;

  beforeEach(() => {
    gen = new Generator(testOptions.width, testOptions.height);
    testMaze = gen.generateMaze(testOptions.algorithm, new Prando(testOptions.seed));
  });

  it('Solves maze with a given seed', () => {
    const testStart = {
      row: 0,
      column: 0
    };
    const testGoal = {
      row: 3,
      column: 3
    };
    const testSolver = new Solver(testMaze.cells, testStart, testGoal);
    const expected = [
      {
        column: 0,
        row: 0
      },
      {
        column: 0,
        row: 1
      },
      {
        column: 0,
        row: 2
      },
      {
        column: 1,
        row: 2
      },
      {
        column: 2,
        row: 2
      },
      {
        column: 3,
        row: 2
      },
      {
        column: 3,
        row: 3
      }
    ];
    const actual = testSolver.path;
    expect(actual).toEqual(expected);
  });

  describe('goal errors', () => {
    it('throws an error if the goal row is larger than the width of the maze', () => {
      const testStart = {
        row: 0,
        column: 0
      };
      const testGoal = {
        row: 4,
        column: 3
      };
      expect(() => {
        const testSolver = new Solver(testMaze.cells, testStart, testGoal);
        console.log(testSolver.path);
      }).toThrowError('start/goal rows must be less than maze height (3).');
    });

    it('throws an error if the goal column is larger than the width of the maze', () => {
      const testStart = {
        row: 0,
        column: 0
      };
      const testGoal = {
        row: 3,
        column: 4
      };
      expect(() => {
        const testSolver = new Solver(testMaze.cells, testStart, testGoal);
        console.log(testSolver.path);
      }).toThrowError('start/goal columns must be less than maze width (3).');
    });

    it('throws an error if the goal row is set to less than 0', () => {
      const testStart = {
        row: 0,
        column: 0
      };
      const testGoal = {
        row: -1,
        column: 3
      };
      expect(() => {
        const testSolver = new Solver(testMaze.cells, testStart, testGoal);
        console.log(testSolver.path);
      }).toThrowError('goal column/row must be greater than or equal to 0.');
    });

    it('throws an error if the goal column is set to less than 0', () => {
      const testStart = {
        row: 0,
        column: 0
      };
      const testGoal = {
        row: 4,
        column: -1
      };
      expect(() => {
        const testSolver = new Solver(testMaze.cells, testStart, testGoal);
        console.log(testSolver.path);
      }).toThrowError('goal column/row must be greater than or equal to 0.');
    });
  });

  describe('start errors', () => {
    it('throws an error if the start row is larger than the width of the maze', () => {
      const testStart = {
        row: 4,
        column: 3
      };
      const testGoal = {
        row: 0,
        column: 0
      };
      expect(() => {
        const testSolver = new Solver(testMaze.cells, testStart, testGoal);
        console.log(testSolver.path);
      }).toThrowError('start/goal rows must be less than maze height (3).');
    });

    it('throws an error if the start column is larger than the width of the maze', () => {
      const testStart = {
        row: 3,
        column: 4
      };
      const testGoal = {
        row: 0,
        column: 0
      };
      expect(() => {
        const testSolver = new Solver(testMaze.cells, testStart, testGoal);
        console.log(testSolver.path);
      }).toThrowError('start/goal columns must be less than maze width (3).');
    });

    it('throws an error if the start row is less than 0', () => {
      const testStart = {
        row: -1,
        column: 4
      };
      const testGoal = {
        row: 0,
        column: 0
      };
      expect(() => {
        const testSolver = new Solver(testMaze.cells, testStart, testGoal);
        console.log(testSolver.path);
      }).toThrowError('start column/row must be greater than or equal to 0.');
    });

    it('throws an error if the start column is less than 0', () => {
      const testStart = {
        row: 3,
        column: -1
      };
      const testGoal = {
        row: 0,
        column: 0
      };
      expect(() => {
        const testSolver = new Solver(testMaze.cells, testStart, testGoal);
        console.log(testSolver.path);
      }).toThrowError('start column/row must be greater than or equal to 0.');
    });
  });

  describe('no path found', () => {
    beforeEach(() => {
      // make goal cell impossible to get to
      testMaze.cells[2][3].walls = { left: true, right: true, up: true, down: true };
      testMaze.cells[3][2].walls = { left: true, right: true, up: true, down: true };
      testMaze.cells[3][3].walls = { left: true, right: true, up: true, down: true };
    });

    it('returns empty array if no path can be found', () => {
      const testStart = {
        row: 0,
        column: 0
      };
      const testGoal = {
        row: 3,
        column: 3
      };
      const testSolver = new Solver(testMaze.cells, testStart, testGoal);
      const expected = [];
      const actual = testSolver.path;
      expect(actual).toEqual(expected);
    });

    it('returns an empty string when showing no found path as string', () => {
      const testStart = {
        row: 0,
        column: 0
      };
      const testGoal = {
        row: 3,
        column: 3
      };
      const testSolver = new Solver(testMaze.cells, testStart, testGoal);
      const expected = '';
      const actual = testSolver.toString();
      expect(actual).toEqual(expected);
    });

    it('returns an empty array when showing no found path as string', () => {
      const testStart = {
        row: 0,
        column: 0
      };
      const testGoal = {
        row: 3,
        column: 3
      };
      const testSolver = new Solver(testMaze.cells, testStart, testGoal);
      const expected = [];
      const actual = testSolver.toJSON();
      expect(actual).toEqual(expected);
    });
  });
});

describe('toString', () => {
  // TODO CHANGE FOR THIS TEST TO USE MORE ARROW TYPES
  it('correctly creates string representation of the path', () => {
    const testStart = {
      row: 0,
      column: 0
    };
    const testGoal = {
      row: 3,
      column: 3
    };
    const gen = new Generator(testOptions.width, testOptions.height);
    const testMaze = gen.generateMaze(testOptions.algorithm, new Prando(testOptions.seed));
    const testSolver = new Solver(testMaze.cells, testStart, testGoal);
    const actual = testSolver.toString();
    const expected =
      ' _ _ _ _\n' +
      '|↓ _  | |\n' +
      '|↓|_ _ _|\n' +
      '|↳ → → ↴|\n' +
      '|_|_ _ G|\n' +
      '       ¯';
    expect(actual).toEqual(expected);
  });
});

describe('toJSON', () => {
  it('correctly creates JSON representation of the path', () => {
    const testStart = {
      row: 0,
      column: 0
    };
    const testGoal = {
      row: 3,
      column: 3
    };
    const gen = new Generator(testOptions.width, testOptions.height);
    const testMaze = gen.generateMaze(testOptions.algorithm, new Prando(testOptions.seed));
    const testSolver = new Solver(testMaze.cells, testStart, testGoal);
    const actual = testSolver.toJSON();
    const expected =
      [{ column: 0, row: 0 }, { column: 0, row: 1 }, { column: 0, row: 2 }, { column: 1, row: 2 }, { column: 2, row: 2 }, { column: 3, row: 2 }, { column: 3, row: 3 }];
    expect(actual).toEqual(expected);
  });
});
