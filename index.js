const Generator = require('./src/Generator');

module.exports = (width, height, algorithm = 'DEPTHFIRST', seed = Math.floor(Math.random() * Math.floor(100000))) => {
  const df = new Generator(width, height);
  return df.generateMaze(algorithm, seed);
};
