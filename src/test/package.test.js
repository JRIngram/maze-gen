const mazegeneration = require('../../index');
/* eslint-env jest */

describe('Maze created with the correct dimensions', () => {
  it.each([
    [1, 1],
    [3, 3],
    [50, 100],
    [100, 50],
    [2999, 2999],
    [3000, 3000]
  ])('is created correctly when dimensions are %i by %i', (width, height) => {
    const maze = mazegeneration({ width: width, height: height });
    const expectedHeight = maze.cells.length;
    const expectedWidth = maze.cells[0].length;
    expect(expectedWidth).toBe(width);
    expect(expectedHeight).toBe(height);
  });
});

describe('Algorithms', () => {
  const testOptions = {
    width: 10,
    height: 10
  };

  describe('Default (DEPTHFIRST)', () => {
    it('generates the same maze if the same numerical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 12345 });
      const maze2 = mazegeneration({ ...testOptions, seed: 12345 });
      expect(maze1).toEqual(maze2);
    });

    it('generates the same maze if the same alphabetical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 'test' });
      const maze2 = mazegeneration({ ...testOptions, seed: 'test' });
      expect(maze1).toEqual(maze2);
    });

    it('generates a different maze if a different numerical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 11234 });
      const maze2 = mazegeneration({ ...testOptions, seed: 12345 });
      expect(maze1).not.toEqual(maze2);
    });

    it('generates a different maze if a different alphabetical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 'test' });
      const maze2 = mazegeneration({ ...testOptions, seed: 'testseed' });
      expect(maze1).not.toEqual(maze2);
    });
  });
});

describe('Seed generation', () => {
  let testOptions = {
    width: 10,
    height: 10
  };

  describe('DEPTHFIRST', () => {
    testOptions = { ...testOptions, algorithm: 'DEPTHFIRST' };

    it('generates the same maze if the same numerical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 12345 });
      const maze2 = mazegeneration({ ...testOptions, seed: 12345 });
      expect(maze1).toEqual(maze2);
    });

    it('generates the same maze if the same alphabetical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 'test' });
      const maze2 = mazegeneration({ ...testOptions, seed: 'test' });
      expect(maze1).toEqual(maze2);
    });

    it('generates a different maze if a different numerical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 11234 });
      const maze2 = mazegeneration({ ...testOptions, seed: 12345 });
      expect(maze1).not.toEqual(maze2);
    });

    it('generates a different maze if a different alphabetical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 'test' });
      const maze2 = mazegeneration({ ...testOptions, seed: 'testseed' });
      expect(maze1).not.toEqual(maze2);
    });
  });

  describe('Default (DEPTHFIRST)', () => {
    it('generates the same maze if the same numerical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 12345 });
      const maze2 = mazegeneration({ ...testOptions, seed: 12345 });
      expect(maze1).toEqual(maze2);
    });

    it('generates the same maze if the same alphabetical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 'test' });
      const maze2 = mazegeneration({ ...testOptions, seed: 'test' });
      expect(maze1).toEqual(maze2);
    });

    it('generates a different maze if a different numerical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 11234 });
      const maze2 = mazegeneration({ ...testOptions, seed: 12345 });
      expect(maze1).not.toEqual(maze2);
    });

    it('generates a different maze if a different alphabetical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 'test' });
      const maze2 = mazegeneration({ ...testOptions, seed: 'testseed' });
      expect(maze1).not.toEqual(maze2);
    });
  });

  describe('HUNTANDKILL', () => {
    testOptions = { ...testOptions, algorithm: 'HUNTANDKILL' };

    it('generates the same maze if the same numerical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 12345 });
      const maze2 = mazegeneration({ ...testOptions, seed: 12345 });
      expect(maze1).toEqual(maze2);
    });

    it('generates the same maze if the same alphabetical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 'test' });
      const maze2 = mazegeneration({ ...testOptions, seed: 'test' });
      expect(maze1).toEqual(maze2);
    });

    it('generates a different maze if a different numerical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 11234 });
      const maze2 = mazegeneration({ ...testOptions, seed: 12345 });
      expect(maze1).not.toEqual(maze2);
    });

    it('generates a different maze if a different alphabetical seed is provided', () => {
      const maze1 = mazegeneration({ ...testOptions, seed: 'test' });
      const maze2 = mazegeneration({ ...testOptions, seed: 'testseed' });
      expect(maze1).not.toEqual(maze2);
    });
  });
});

describe('Error handling', () => {
  describe('min / max Dimensions', () => {
    describe('Width and Height must be above 0', () => {
      it.each([
        [0, 0],
        [3, 0],
        [0, 3]
      ])('throws an error if width is %i and height is %i', (width, height) => {
        expect(() => {
          const options = { width: width, height: height };
          mazegeneration(options);
        }).toThrowError('Width and height must be greater than 0');
      });
    });

    describe('Width and Height must be below 3000', () => {
      it.each([
        [3001, 3001],
        [3001, 3],
        [3, 3001]
      ])('throws an error if width is %i and height is %i', (width, height) => {
        expect(() => {
          const options = { width: width, height: height };
          mazegeneration(options);
        }).toThrowError('Height and width must be a maximum of 3000');
      });
    });
  });

  describe('no required parameters', () => {
    it('throws an error if an empty object is passed as parameter', () => {
      expect(() => {
        const options = {};
        mazegeneration(options);
      }).toThrowError('An object with the following parameters is required to generate a maze:\n{ height, width, seed (optional), algorithm (optional) }');
    });

    it.each(
      [
        [{ width: 3 }],
        [{ width: 3, seed: 1234, algorithm: 'HUNTANDKILL' }]
      ]
    )('throws an error if an object without the height parameter is passed', () => {
      expect(() => {
        const options = { width: 3 };
        mazegeneration(options);
      }).toThrowError('An object with the following parameters is required to generate a maze:\n{ height, width, seed (optional), algorithm (optional) }');
    });

    it.each(
      [
        [{ height: 3 }],
        [{ height: 3, seed: 1234, algorithm: 'HUNTANDKILL' }]
      ]
    )('throws an error if an object without the width parameter is passed', () => {
      expect(() => {
        const options = { width: 3 };
        mazegeneration(options);
      }).toThrowError('An object with the following parameters is required to generate a maze:\n{ height, width, seed (optional), algorithm (optional) }');
    });

    it('throws an error if an object is passed without both dimension parameters', () => {
      expect(() => {
        const options = { seed: 1234, algorithm: 'HUNTANDKILL' };
        mazegeneration(options);
      }).toThrowError('An object with the following parameters is required to generate a maze:\n{ height, width, seed (optional), algorithm (optional) }');
    });
  });

  it('Invalid algorithm', () => {
    const options = { width: 3, height: 3, seed: 12345, algorithm: 'INVALIDALGORITHM' };
    expect(() => {
      mazegeneration(options);
    }).toThrowError(`${options.algorithm} is an Invalid Maze Generation Algorithm`);
  });

  describe('height and width types', () => {
    describe('are passed as strings', () => {
      it.each([
        ['3', '3'],
        ['3', 3],
        [3, '3']
      ])('throws an error if width is %s and height is %s', (width, height) => {
        const options = { width: width, height: height };
        expect(() => {
          mazegeneration(options);
        }).toThrowError('Width and height must be numbers');
      });
    });

    describe('are passed as boolean', () => {
      it.each([
        [3, false],
        [3, true],
        [false, false],
        [false, true],
        [false, 3],
        [true, 3]
      ])('throws an error if width is %o and height is %o', (width, height) => {
        const options = { width: width, height: height };
        expect(() => {
          mazegeneration(options);
        }).toThrowError('Width and height must be numbers');
      });
    });

    describe('objects', () => {
      it.each([
        [{ width: 3 }, { height: 3 }],
        [3, { height: 3 }],
        [{ width: 3 }, 3]
      ])(('throws an error if width is %o and height is %o'), (width, height) => {
        const options = { width: width, height: height };
        expect(() => {
          mazegeneration(options);
        }).toThrowError('Width and height must be numbers');
      });
    });
  });
});
