const Generator = require('./src/Generator');

const gen = new Generator(10, 10);
const maze = gen.huntAndKill(1234);
const maze2 = gen.depthFirst(1234);
console.log(maze.toString());
console.log(maze2.toString());

module.exports = (width, height, seed, algorithm = 'DEPTHFIRST') => {
  const df = new Generator(width, height);
  return df.generateMaze();
};
