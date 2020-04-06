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
    if (this.algorithm === 'DEPTHFIRST') {
      return this.depthFirst();
    }
    if (this.algorithm === 'HUNTANDKILL') {
      return this.huntAndKill();
    }
  }

  depthFirst () {
    const df = new DepthFirst(this.width, this.height, this.seed);
    return df.generateMaze();
  }

  huntAndKill () {
    const hunt = new HuntAndKill(this.width, this.weight, this.seed);
    return hunt.generateMaze();
  }
}

module.exports = Generator;
