const mazegeneration = require('../../index');
/* eslint-env jest */

describe('Maze created with the correct dimension', () => {
  it('is created correctly when dimensions are 3 by 3', () => {
    const maze = mazegeneration(3, 3);
    const height = maze.cells.length;
    const width = maze.cells[0].length;
    expect(width).toBe(3);
    expect(height).toBe(3);
  });

  it('is created correctly when dimensions are 50 by 100', () => {
    const maze = mazegeneration(50, 100);
    const height = maze.cells.length;
    const width = maze.cells[0].length;
    expect(height).toBe(100);
    expect(width).toBe(50);
  });

  it('is created correctly when dimensions are 50000 by 100000', () => {
    const maze = mazegeneration(3000, 3000);
    const height = maze.cells.length;
    const width = maze.cells[0].length;
    expect(height).toBe(3000);
    expect(width).toBe(3000);
  });
});

describe('Seed generation', () => {
  it('generates the same maze if the same numerical seed is provided', () => {
    const maze1 = mazegeneration(10, 10, 12345, 'DEPTHFIRST');
    const maze2 = mazegeneration(10, 10, 12345, 'DEPTHFIRST');
    expect(maze1).toEqual(maze2);
  });

  it('generates the same maze if the same alphabetical seed is provided', () => {
    const maze1 = mazegeneration(10, 10, 'test', 'DEPTHFIRST');
    const maze2 = mazegeneration(10, 10, 'test', 'DEPTHFIRST');
    expect(maze1).toEqual(maze2);
  });
});

describe('Error handling', () => {
  describe('Dimensions', () => {
    it('throws an error if width and height are 0', () => {
      expect(() => {
        mazegeneration(0, 0);
      }).toThrowError('Width and height must be greater than 0');
    });

    it('throws an error if height is 0', () => {
      expect(() => {
        mazegeneration(50, 0);
      }).toThrowError('Width and height must be greater than 0');
    });

    it('throws an error if width is 0', () => {
      expect(() => {
        mazegeneration(0, 50);
      }).toThrowError('Width and height must be greater than 0');
    });

    it('throws an error if width and height are above 3000', () => {
      expect(() => {
        mazegeneration(3001, 3001);
      }).toThrowError('Height and width must be a maximum of 3000');
    });

    it('throws an error if width is above 3000', () => {
      expect(() => {
        mazegeneration(3001, 3000);
      }).toThrowError('Height and width must be a maximum of 3000');
    });

    it('throws an error if height is above 3000', () => {
      expect(() => {
        mazegeneration(3000, 3001);
      }).toThrowError('Height and width must be a maximum of 3000');
    });
  });

  describe('Height and row types', () => {
    describe('strings', () => {
      it('throws an error if height and width are strings', () => {
        expect(() => {
          mazegeneration('3', '3');
        }).toThrowError('Width and height must be numbers');
      });

      it('throws an error if height is a string', () => {
        expect(() => {
          mazegeneration('3', 3);
        }).toThrowError('Width and height must be numbers');
      });

      it('throws an error if width is a string', () => {
        expect(() => {
          mazegeneration(3, '3');
        }).toThrowError('Width and height must be numbers');
      });
    });

    describe('booleans', () => {
      it('throws an error if height and width are booleans', () => {
        expect(() => {
          mazegeneration(false, true);
        }).toThrowError('Width and height must be numbers');
      });

      it('throws an error if height is a boolean', () => {
        expect(() => {
          mazegeneration(3, true);
        }).toThrowError('Width and height must be numbers');
      });

      it('throws an error if width is a boolean', () => {
        expect(() => {
          mazegeneration(false, 3);
        }).toThrowError('Width and height must be numbers');
      });
    });

    describe('objects', () => {
      it('throws an error if height and width are objects', () => {
        const testObject = { number: 3 };
        expect(() => {
          mazegeneration(testObject, testObject);
        }).toThrowError('Width and height must be numbers');
      });

      it('throws an error if height is a objects', () => {
        const testObject = { number: 3 };
        expect(() => {
          mazegeneration(3, testObject);
        }).toThrowError('Width and height must be numbers');
      });

      it('throws an error if width is a objects', () => {
        const testObject = { number: 3 };
        expect(() => {
          mazegeneration(testObject, 3);
        }).toThrowError('Width and height must be numbers');
      });
    });

    it('Invalid algorithm', () => {
      const invalidAlgorithm = 'INVALIDALGORITHM';
      expect(() => {
        mazegeneration(10, 10, 12345, invalidAlgorithm);
      }).toThrowError(`${invalidAlgorithm} is an Invalid Maze Generation Algorithm`);
    });
  });
});
