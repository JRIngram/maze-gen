const Generator = require('./src/Generator');
const Prando = require('prando');

module.exports = (width, height, seed = Math.floor(Math.random() * Math.floor(100000)), algorithm = 'DEPTHFIRST') => {
  if (typeof width !== 'number' || typeof height !== 'number') {
    throw new Error('Width and height must be numbers');
  }
  if (width === 0 | height === 0) {
    throw new Error('Width and height must be greater than 0');
  } else if (width > 3000 || height > 3000) {
    throw new Error('Height and width must be a maximum of 3000');
  }
  const mazeGen = new Generator(width, height);
  const prando = new Prando(seed);
  return mazeGen.generateMaze(algorithm, prando);
};
