const Prando = require('prando');
const Maze = require('../Maze');
const validAlgorithms = ['DEPTHFIRST', 'HUNTANDKILL'];

class Generator {
  constructor (width, height) {
    this.width = width;
    this.height = height;
  }

  isValidAlgorithm (algorithm) {
    if (typeof algorithm === 'string') {
      return validAlgorithms.includes(algorithm);
    }
  }

  /**
    * Picks a random cell from the maze and returns it
    * @returns {{int, int}} Coordinates of a random cell within the maze
  */
  getRandomCell () {
    return { randomHeight: this.rng.nextInt(0, this.height - 1), randomWidth: this.rng.nextInt(0, this.width - 1) };
  }

  generateMaze (algorithm = 'DEPTHFIRST') {
    if (!this.isValidAlgorithm) {
      throw new Error('Invalid Maze Generation Algorithm');
    }

    if (algorithm.toUpperCase() === 'DEPTHFIRST') {
      return this.depthFirst(this.seed);
    } else if (algorithm.toUpperCase() === 'HUNTANDKILL') {
      return this.huntAndKill(this.seed);
    }
  }

  depthFirst (seed) {
    const rng = new Prando(seed);
    const generatedMaze = new Maze(this.width, this.height);
    const cellStack = [];

    // Set currentCell = random cell
    const randomCell = this.getRandomCell();
    // Select random cell and mark as visited
    let currentCell = { x: randomCell.randomWidth, y: randomCell.randomHeight };

    // Generate the maze
    do {
      generatedMaze.visitCell(currentCell.y, currentCell.x);

      // Generate a list of unvisited neighbours
      const unvisitedNeighbours = generatedMaze.getUnvisitedNeigbourIndices(currentCell.y, currentCell.x);
      // console.log(`Current cell: ${currentCell.x},${currentCell.y}`);

      // Find which of the unvisited neighbours can be visited
      const validDirections = [];
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        validDirections.push(unvisitedNeighbours[i].direction);
      }

      if (validDirections.length > 0) {
        // Push current cell to stack to allow for backtracking
        cellStack.push(currentCell);

        // Randomly select a valid direction and remove the wall
        const nextDirection = validDirections[rng.nextInt(0, validDirections.length - 1)];
        generatedMaze.removeWall(currentCell.y, currentCell.x, nextDirection);

        // Move to the cell in the direction of the removed wall
        for (let i = 0; i < unvisitedNeighbours.length; i++) {
          if (unvisitedNeighbours[i].direction === nextDirection) {
            // console.log(`Current cell: ${currentCell.x},${currentCell.y}`);
            currentCell = { x: unvisitedNeighbours[i].x, y: unvisitedNeighbours[i].y };
            // console.log(`Now is cell: ${currentCell.x},${currentCell.y}`);
          }
        }
      } else {
        currentCell = cellStack.pop();
      }
    } while (cellStack.length > 0);

    return generatedMaze;
  }

  huntAndKill (seed) {
    const hunt = new HuntAndKill(this.width, this.weight, seed);
    return hunt.generateMaze();
  }
}

module.exports = Generator;
