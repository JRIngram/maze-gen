const Generator = require('./src/Generator');
const Prando = require('prando');

module.exports = (width, height, seed = Math.floor(Math.random() * Math.floor(100000)), algorithm = 'DEPTHFIRST') => {
  const df = new Generator(width, height);
  const prando = new Prando(seed);
  return df.generateMaze(algorithm, prando);
};
