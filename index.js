const Cell = require('./Cell');
const Maze = require('./Maze');
const DepthFirst = require('./GenerationAlgorithms/DepthFirst');

    const df = new DepthFirst(8,8);
    const generatedMaze = df.generateMaze()
    console.log(generatedMaze.toString());