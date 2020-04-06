const Prando = require('prando');
const DepthFirst = require('./DepthFirst');
const validAlgorithms = ['DEPTHFIRST', 'HUNTANDKILL'];

class Generator {
  constructor (width, height, algorithm, seed = (Math.floor(Math.random() * 10000))) {
    this.rng = new Prando(seed);
    this.width = width;
    this.height = height;
    this.seed = seed;

    if (this.isValidAlgorithm(algorithm)) {
      this.algorithm = algorithm.toUpperCase();
    } else {
      console.log(`${algorithm} is an invalid algorithm. Defaulting to ${validAlgorithms[0]}`);
      this.algorithm = validAlgorithms[0];
    }
  }

  isValidAlgorithm (algorithm) {
    if (typeof algorithm === 'string') {
      for (let i = 0; i < validAlgorithms.length; i++) {
        if (algorithm.toUpperCase() === validAlgorithms[i]) {
          return true;
        }
      }
      return false;
    } else {
      throw new Error('Invalid Parameter Type');
    }
  }

  generateMaze () {
    switch (this.algorithm) {
      case 'DEPTHFIRST':
        this.depthFirst();
        break;
      case 'HUNTANDKILL':
        this.huntAndKill();
        break;
    }
  }

  depthFirst () {
    const df = new DepthFirst(this.width, this.height, this.seed);
    return df.generateMaze();
  }
}

module.exports = Generator;
