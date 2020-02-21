const Maze = require('../Maze');

class DepthFirst {
  constructor (width, height) {
    this.maze = new Maze(width, height);
    this.cellStack = [];
  }

  generateMaze () {
    // Set currentCell = random cell
    const randomCell = this.maze.getRandomCell();
    let currentCell = { x: randomCell.randomWidth, y: randomCell.randomHeight };
    this.generatePath(currentCell);
    while (this.cellStack.length > 0) {
      currentCell = this.cellStack.pop();
      this.generatePath(currentCell);
    }

    // While currentCell has unvisited neighbour:
    //  Select random unvisited neighbour
    //  Remove walls between the two
    //  currentCell = that random unvisited neighbour
    //  Mark currentCell visited push to stack
    //  IF currentCell has no unvisited neighbour:
    //      currentCell = stack.pop()
    console.log('Generation complete!');
    return this.maze;
  }

  generatePath (currentCell) {
    // Mark currentCell as visited
    this.maze.visitCell(currentCell.y, currentCell.x);

    const unvisitedNeighbours = this.maze.getUnvisitedNeigbourIndices(currentCell.y, currentCell.x);

    // Find valid directions
    const validDirections = [];
    for (let i = 0; i < unvisitedNeighbours.length; i++) {
      validDirections.push(unvisitedNeighbours[i].direction);
    }
    if (validDirections.length > 0) {
      // Push current cell to stack.
      this.cellStack.push(currentCell);
      // Randomly select a valid direction
      const nextDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
      this.maze.removeWall(currentCell.y, currentCell.x, nextDirection);

      // Find next cell
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        if (unvisitedNeighbours[i].direction === nextDirection) {
          currentCell = { x: unvisitedNeighbours[i].x, y: unvisitedNeighbours[i].y };
          this.generatePath(currentCell);
        }
      }
    }
  }
}

module.exports = DepthFirst;
