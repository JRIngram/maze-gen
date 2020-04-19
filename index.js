const Generator = require('./src/Generator');

module.exports = (width, height, seed, algorithm = 'DEPTHFIRST') => {
  const df = new Generator(width, height);
  return df.generateMaze(algorithm, seed);
};
