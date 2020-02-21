const DepthFirst = require('./GenerationAlgorithms/DepthFirst');

const df = new DepthFirst(10, 10); // generates a 10 by 10 maze
const generatedMaze = df.generateMaze();
console.log(generatedMaze.toString());
