const DepthFirst = require('./GenerationAlgorithms/DepthFirst');

const df = new DepthFirst(5, 5); // generates a 5 by 5 maze
const generatedMaze = df.generateMaze();
console.log(generatedMaze.toString() + '\n\n');
for (let i = 0; i < 5; i++) {
  console.log(generatedMaze.toJSON().rows[i]);
}
