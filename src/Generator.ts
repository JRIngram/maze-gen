import Prando from "prando";
import { Maze, NeighbouringCoordinateWithDirection } from "./Maze.js";
import { Coordinate, Direction } from "./types";

export class Generator {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  /**
   * Returns the generated maze from the generation algorithm pass as a parameter.
   * @param {*} algorithm the algorithm to use to generate the maze
   * @param {*} prando A prando object constructed with the seed to generate the maze
   */
  generateMaze(
    algorithm: string = "DEPTHFIRST",
    prando: Prando = new Prando(),
  ) {
    const capitalisedAlgorithm = algorithm.toUpperCase();
    if (capitalisedAlgorithm === "DEPTHFIRST") {
      return this.depthFirst(prando);
    } else if (capitalisedAlgorithm === "HUNTANDKILL") {
      return this.huntAndKill(prando);
    }
    if (capitalisedAlgorithm == "") {
      return this.depthFirst(prando);
    } else {
      throw new Error(`${algorithm} is an Invalid Maze Generation Algorithm`);
    }
  }

  /**
   * Generates a maze using the Depth First algorithm
   * @param {*} prando A prando object constructed with the seed to generate the maze. Used as arandom number generator.
   */
  depthFirst(prando: Prando): Maze {
    const rng = prando;
    const generatedMaze = new Maze(this.width, this.height);
    const cellStack: Coordinate[] = [];

    // Set currentCell = random cell
    const randomCell = {
      randomHeight: rng.nextInt(0, this.height - 1),
      randomWidth: rng.nextInt(0, this.width - 1),
    };
    // Select random cell and mark as visited
    let currentCell = { x: randomCell.randomWidth, y: randomCell.randomHeight };

    // Generate the maze
    do {
      generatedMaze.visitCell(currentCell.y, currentCell.x);

      // Generate a list of unvisited neighbours
      const unvisitedNeighbours = generatedMaze.getUnvisitedNeigbourIndices(
        currentCell.y,
        currentCell.x,
      );

      // Find which of the unvisited neighbours can be visited
      const validDirections: Direction[] = [];
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        validDirections.push(unvisitedNeighbours[i].direction);
      }

      if (validDirections.length > 0) {
        // Push current cell to stack to allow for backtracking
        cellStack.push(currentCell);

        // Randomly select a valid direction and remove the wall
        const nextDirection =
          validDirections[rng.nextInt(0, validDirections.length - 1)];
        generatedMaze.removeWall(currentCell.y, currentCell.x, nextDirection);

        // Move to the cell in the direction of the removed wall
        for (let i = 0; i < unvisitedNeighbours.length; i++) {
          if (unvisitedNeighbours[i].direction === nextDirection) {
            currentCell = {
              x: unvisitedNeighbours[i].x,
              y: unvisitedNeighbours[i].y,
            };
          }
        }
      } else {
        const nextCell = cellStack.pop();
        if (nextCell) {
          currentCell = nextCell;
        }
      }
    } while (cellStack.length > 0);

    return generatedMaze;
  }

  /**
   * Generates a maze using the Hunt And Kill algorithm
   * @param {*} prando A prando object constructed with the seed to generate the maze. Used as arandom number generator.
   */
  huntAndKill(prando: Prando): Maze {
    const rng = prando;
    let generatedMaze = new Maze(this.width, this.height);

    // Set currentCell = random cell
    const randomCell = {
      randomHeight: rng.nextInt(0, this.height - 1),
      randomWidth: rng.nextInt(0, this.width - 1),
    };

    // Select random cell and mark as visited
    let currentCell = { x: randomCell.randomWidth, y: randomCell.randomHeight };
    generatedMaze = this.randomisedWalk(currentCell, rng, generatedMaze);

    while (generatedMaze.getTotalUnvisitedCells() > 0) {
      const firstUnvisitedCellNeighbours =
        generatedMaze.getFirstUnvisitedCellWithVisitedNeighbour();
      if (!firstUnvisitedCellNeighbours) {
        throw Error(
          "No univisted cells fetched, whilst expecting getTotalUnvisitedCells() > 0",
        );
      }
      currentCell = firstUnvisitedCellNeighbours.firstCell;
      const neighbours = firstUnvisitedCellNeighbours.neighbours;

      generatedMaze.removeWall(
        currentCell.y,
        currentCell.x,
        neighbours[rng.nextInt(0, neighbours.length - 1)].direction,
      );
      generatedMaze.visitCell(currentCell.y, currentCell.x);
      generatedMaze = this.randomisedWalk(currentCell, rng, generatedMaze);
    }

    return generatedMaze;
  }

  /**
   * Get the unvisited neighbours of the current cell
   * @param {[]} unvisitedNeighbours Generated using maze.getUnvisitedNeigbourIndices
   */
  getValidDirections(
    unvisitedNeighbours: NeighbouringCoordinateWithDirection[],
  ): Direction[] {
    const validDirections: Direction[] = [];
    for (let i = 0; i < unvisitedNeighbours.length; i++) {
      validDirections.push(unvisitedNeighbours[i].direction);
    }
    return validDirections;
  }

  /**
   * Performs a randomised walk from the specified current cell
   * @param {{x: int, y: int}} currentCell
   * @param {*} prando Prando random number generator
   * @param {*} maze A Maze object
   * @returns A modified maze object
   */
  randomisedWalk(currentCell: Coordinate, prando: Prando, maze: Maze) {
    const modifiedMaze = maze;
    let unvisitedNeighbours = modifiedMaze.getUnvisitedNeigbourIndices(
      currentCell.y,
      currentCell.x,
    );
    let validDirections = this.getValidDirections(unvisitedNeighbours);

    // If there's an unvisited neighbour
    while (validDirections.length > 0) {
      // Randomly select a valid direction and remove the wall
      const nextDirection =
        validDirections[prando.nextInt(0, validDirections.length - 1)];
      modifiedMaze.removeWall(currentCell.y, currentCell.x, nextDirection);

      // Move to the cell in the direction of the removed wall
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        if (unvisitedNeighbours[i].direction === nextDirection) {
          currentCell = {
            x: unvisitedNeighbours[i].x,
            y: unvisitedNeighbours[i].y,
          };
          modifiedMaze.visitCell(currentCell.y, currentCell.x);
        }
      }

      // Generate a list of unvisited neighbours
      unvisitedNeighbours = modifiedMaze.getUnvisitedNeigbourIndices(
        currentCell.y,
        currentCell.x,
      );
      validDirections = this.getValidDirections(unvisitedNeighbours);
    }

    return modifiedMaze;
  }
}
