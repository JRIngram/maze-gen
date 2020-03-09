const Prando = require('prando');
const Maze = require('../Maze');

class DepthFirst {
  constructor (width, height, seed = (Math.floor(Math.random() * 10000))) {
    this.rng = new Prando(seed);
    this.maze = new Maze(width, height);
    this.width = width;
    this.height = height;
    this.cellStack = [];
  }

  /**
    * Picks a random cell from the maze and returns it
    * @returns {Cell} A random cell from the maze
    */
  getRandomCell () {
    return { randomHeight: this.rng.nextInt(0, this.height - 1), randomWidth: this.rng.nextInt(0, this.width - 1) };
  }

  /**
   * Runs the following algorithm:
   *  currentCell = random cell
   *  While currentCell has unvisited neighbour:
   *   Select random unvisited neighbour
   *   Remove walls between the two
   *   currentCell = that random unvisited neighbour
   *   Mark currentCell visited push to stack
   *   IF currentCell has no unvisited neighbour:
   *    currentCell = stack.pop()
   */
  generateMaze () {
    // Set currentCell = random cell
    const randomCell = this.getRandomCell();
    // Select random cell
    let currentCell = { x: randomCell.randomWidth, y: randomCell.randomHeight };
    this.generatePath(currentCell);
    while (this.cellStack.length > 0) {
      currentCell = this.cellStack.pop();
      this.generatePath(currentCell);
    }
    return this.maze;
  }

  /**
   * Finds unvisited neighbours of the current cell, removes the wall between the current cell and a random unvisited neighbour and then moves to that cell.
   * @param {{number, number}} currentCell indicies of the current cell
   */
  generatePath (currentCell) {
    // Mark currentCell as visited
    this.maze.visitCell(currentCell.y, currentCell.x);

    // Generate a list of unvisited neighbours
    const unvisitedNeighbours = this.maze.getUnvisitedNeigbourIndices(currentCell.y, currentCell.x);

    // Find which of the unvisited neighbours can be visited
    const validDirections = [];
    for (let i = 0; i < unvisitedNeighbours.length; i++) {
      validDirections.push(unvisitedNeighbours[i].direction);
    }
    if (validDirections.length > 0) {
      // Push current cell to stack to allow for backtracking
      this.cellStack.push(currentCell);
      // Randomly select a valid direction and remove the wall
      const nextDirection = validDirections[this.rng.nextInt(0, validDirections.length - 1)];
      this.maze.removeWall(currentCell.y, currentCell.x, nextDirection);

      // Move to the cell in the direction of the removed wall
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
