const DepthFirst = require('./src/GenerationAlgorithms/DepthFirst');

module.exports = (width, height) => {
  const df = new DepthFirst(width, height);
  return df.generateMaze();
};
