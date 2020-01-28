const Cell = require('./Cell');
const Maze = require('./Maze');

    const maze = new Maze(7,7);
    maze.removeWall(0,0,"right");
    maze.removeWall(0,1,"down");
    maze.removeWall(1,1,"down");
    maze.removeWall(2,1,"right");
    maze.removeWall(2,2,"up");
    maze.removeWall(1,2,"up");
    maze.removeWall(0,2,"up");
    console.log(maze.toString());