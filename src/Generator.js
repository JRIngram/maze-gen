const Prando = require('prando');
const Maze = require('./Maze');
const validAlgorithms = ['DEPTHFIRST', 'HUNTANDKILL'];

class Generator {
  constructor (width, height) {
    this.width = width;
    this.height = height;
  }

  isValidAlgorithm (algorithm) {
    return typeof algorithm === 'string' ? validAlgorithms.includes(algorithm.toUpperCase()) : false;
  }

  generateMaze (algorithm = 'DEPTHFIRST', seed = Math.floor(Math.random() * Math.floor(100000))) {
    if (!this.isValidAlgorithm(algorithm.toUpperCase())) {
      throw new Error(`${algorithm} is an Invalid Maze Generation Algorithm`);
    } else {
      if (algorithm.toUpperCase() === 'DEPTHFIRST') {
        return this.depthFirst(this.seed);
      } else if (algorithm.toUpperCase() === 'HUNTANDKILL') {
        return this.huntAndKill(this.seed);
      }
    }
  }

  /**
   * Generates a maze using the Depth First algorithm
   * @param {*} seed  The seed for the used random number generator.
  */
  depthFirst (seed) {
    const rng = new Prando(seed);
    const generatedMaze = new Maze(this.width, this.height);
    const cellStack = [];

    // Set currentCell = random cell
    const randomCell = { randomHeight: rng.nextInt(0, this.height - 1), randomWidth: rng.nextInt(0, this.width - 1) };
    // Select random cell and mark as visited
    let currentCell = { x: randomCell.randomWidth, y: randomCell.randomHeight };

    // Generate the maze
    do {
      generatedMaze.visitCell(currentCell.y, currentCell.x);

      // Generate a list of unvisited neighbours
      const unvisitedNeighbours = generatedMaze.getUnvisitedNeigbourIndices(currentCell.y, currentCell.x);

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
            currentCell = { x: unvisitedNeighbours[i].x, y: unvisitedNeighbours[i].y };
          }
        }
      } else {
        currentCell = cellStack.pop();
      }
    } while (cellStack.length > 0);

    return generatedMaze;
  }

  /**
   * Generates a maze using the Hunt And Kill algorithm
   * @param {*} seed  The seed for the used random number generator.
   */
  huntAndKill (seed) {
    const rng = new Prando(seed);
    let generatedMaze = new Maze(this.width, this.height);

    // Set currentCell = random cell
    const randomCell = { randomHeight: rng.nextInt(0, this.height - 1), randomWidth: rng.nextInt(0, this.width - 1) };

    // Select random cell and mark as visited
    let currentCell = { x: randomCell.randomWidth, y: randomCell.randomHeight };
    generatedMaze = this.randomisedWalk(currentCell, rng, generatedMaze);

    while (generatedMaze.getTotalUnvisitedCells() > 0) {
      const firstUnvisitedCellNeighbours = generatedMaze.getFirstUnvisitedCellWithVisitedNeighbour();
      currentCell = firstUnvisitedCellNeighbours.firstCell;
      const neighbours = firstUnvisitedCellNeighbours.neighbours;

      generatedMaze.removeWall(currentCell.y, currentCell.x, neighbours[rng.nextInt(0, neighbours.length - 1)].direction);
      generatedMaze.visitCell(currentCell.y, currentCell.x);
      generatedMaze = this.randomisedWalk(currentCell, rng, generatedMaze);
    }

    return generatedMaze;
  }

  /**
   * Get the unvisited neighbours of the current cell
   * @param {[]} unvisitedNeighbours Generated using maze.getUnvisitedNeigbourIndices
   */
  getValidDirections (unvisitedNeighbours) {
    const validDirections = [];
    for (let i = 0; i < unvisitedNeighbours.length; i++) {
      validDirections.push(unvisitedNeighbours[i].direction);
    }
    return validDirections;
  }

  /**
   * Performs a randomised walk from the specified current cell
   * @param {{x: int, y: int}} currentCell
   * @param {*} rng Prando random number generator
   * @param {*} maze A Maze object
   * @returns A modified maze object
   */
  randomisedWalk (currentCell, rng, maze) {
    const modifiedMaze = maze;
    let unvisitedNeighbours = modifiedMaze.getUnvisitedNeigbourIndices(currentCell.y, currentCell.x);
    let validDirections = this.getValidDirections(unvisitedNeighbours);

    // If there's an unvisited neighbour
    while (validDirections.length > 0) {
      // Randomly select a valid direction and remove the wall
      const nextDirection = validDirections[rng.nextInt(0, validDirections.length - 1)];
      modifiedMaze.removeWall(currentCell.y, currentCell.x, nextDirection);

      // Move to the cell in the direction of the removed wall
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        if (unvisitedNeighbours[i].direction === nextDirection) {
          currentCell = { x: unvisitedNeighbours[i].x, y: unvisitedNeighbours[i].y };
          modifiedMaze.visitCell(currentCell.y, currentCell.x);
        }
      }

      // Generate a list of unvisited neighbours
      unvisitedNeighbours = modifiedMaze.getUnvisitedNeigbourIndices(currentCell.y, currentCell.x);
      validDirections = this.getValidDirections(unvisitedNeighbours);
    }

    return modifiedMaze;
  }
}

module.exports = Generator;
