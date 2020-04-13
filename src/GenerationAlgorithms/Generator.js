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

  // CHOOSE A RANDOM CELL
  // PERFORM RANDOMISED WALK
  // WHILE THERES AN UNVISITED CELL: 
  //  FIND FIRST UNVISITED CELL
  //  IF IT HAS UNVISITED NEIGHBOURS
  //    DO RANDOMISED WALK
  //  ELSE MOVE IN A RANDOM DIRECTION
  huntAndKill (seed) {
    const rng = new Prando(seed);
    let generatedMaze = new Maze(this.width, this.height);

    // Set currentCell = random cell
    const randomCell = { randomHeight: rng.nextInt(0, this.height - 1), randomWidth: rng.nextInt(0, this.width - 1) };

    // Select random cell and mark as visited
    let currentCell = { x: randomCell.randomWidth, y: randomCell.randomHeight };
    generatedMaze = this.randomisedWalk(currentCell, rng, generatedMaze);

    while (generatedMaze.getTotalUnvisitedCells() > 0) {
      currentCell = generatedMaze.getFirstUnvisitedCell();
      console.log(generatedMaze.toString());
      console.log(currentCell);

      // If all neighbours visited
      if (generatedMaze.getUnvisitedNeigbourIndices(currentCell.y, currentCell.x).length === 0) {
        // DO A RANDOM DIRECTION MOVE
        const neighbours = generatedMaze.getCellNeighbours(currentCell.y, currentCell.x);
        generatedMaze.removeWall(currentCell.y, currentCell.x, neighbours[rng.nextInt(0, neighbours.length - 1)].direction);
        generatedMaze.visitCell(currentCell.y, currentCell.x);
      } else {
        generatedMaze = this.randomisedWalk(currentCell, rng, generatedMaze);
      }
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

  randomisedWalk (currentCell, rng, maze) {
    let unvisitedNeighbours = maze.getUnvisitedNeigbourIndices(currentCell.y, currentCell.x);
    let validDirections = this.getValidDirections(unvisitedNeighbours);

    // If there's an unvisited neighbour
    while (validDirections.length > 0) {
      // Randomly select a valid direction and remove the wall
      const nextDirection = validDirections[rng.nextInt(0, validDirections.length - 1)];
      maze.removeWall(currentCell.y, currentCell.x, nextDirection);

      // Move to the cell in the direction of the removed wall
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        if (unvisitedNeighbours[i].direction === nextDirection) {
          currentCell = { x: unvisitedNeighbours[i].x, y: unvisitedNeighbours[i].y };
          maze.visitCell(currentCell.y, currentCell.x);
        }
      }

      // Generate a list of unvisited neighbours
      unvisitedNeighbours = maze.getUnvisitedNeigbourIndices(currentCell.y, currentCell.x);
      validDirections = this.getValidDirections(unvisitedNeighbours);
    }

    return maze;
  }
}

module.exports = Generator;
