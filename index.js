const DepthFirst = require('./src/GenerationAlgorithms/DepthFirst');

module.exports = (width, height, seed) => {
  const df = new DepthFirst(width, height, seed);
  return df.generateMaze();
};
