import { type MazeCells } from "./Maze.js";
import { type ColumnRowCoordinate } from "./types";

type Cost = number;

interface ColumnRowCoordinateWithSolverAttributes extends ColumnRowCoordinate {
  cost: Cost;
  previousCell?: ColumnRowCoordinateWithSolverAttributes;
}

export class Solver {
  cells: MazeCells;
  path: ColumnRowCoordinate[];
  mazeHeight: number;
  mazeWidth: number;

  constructor(
    cells: MazeCells,
    start: ColumnRowCoordinate,
    goal: ColumnRowCoordinate,
  ) {
    this.cells = cells;
    this.mazeHeight = this.cells.length - 1;
    this.mazeWidth = this.cells[0].length - 1;
    if (start.column < 0 || start.row < 0) {
      throw Error("start column/row must be greater than or equal to 0.");
    }
    if (goal.column < 0 || goal.row < 0) {
      throw Error("goal column/row must be greater than or equal to 0.");
    }
    if (this.mazeHeight < start.row || this.mazeHeight < goal.row) {
      throw Error(
        `start/goal rows must be less than maze height (${this.mazeHeight}).`,
      );
    }
    if (this.mazeWidth < start.column || this.mazeWidth < goal.column) {
      throw Error(
        `start/goal columns must be less than maze width (${this.mazeWidth}).`,
      );
    }

    const openSet: ColumnRowCoordinateWithSolverAttributes[] = [
      { ...start, cost: 0 },
    ];
    const closedSet: ColumnRowCoordinateWithSolverAttributes[] = [];

    const calculateDistanceFromGoal = (
      currentCell: ColumnRowCoordinate,
      goalCell: ColumnRowCoordinate,
    ) => {
      const { row, column } = currentCell;
      const distanceToGoalRow = Math.abs(row - goalCell.row);
      const distanceToGoalColumn = Math.abs(column - goalCell.column);
      return distanceToGoalRow + distanceToGoalColumn;
    };

    const findAvailableCells = (
      currentCellInSet: ColumnRowCoordinateWithSolverAttributes,
    ) => {
      const { row, column, cost } = currentCellInSet;
      const { walls } = cells[row][column];
      const includedInSet = (
        set: ColumnRowCoordinateWithSolverAttributes[],
        row: number,
        column: number,
      ) => {
        let cellInSet = false;
        set.forEach((cell) => {
          if (cell.row === row && cell.column === column) {
            cellInSet = true;
          }
        });
        return cellInSet;
      };

      if (!walls.left) {
        const calulcatedColumn = column - 1;
        if (
          !includedInSet(closedSet, row, calulcatedColumn) &&
          !includedInSet(openSet, row, calulcatedColumn)
        ) {
          const calculatedCost =
            cost +
            calculateDistanceFromGoal({ row, column: calulcatedColumn }, goal);
          openSet.push({
            row,
            column: calulcatedColumn,
            cost: calculatedCost,
            previousCell: currentCellInSet,
          });
        }
      }
      if (!walls.right) {
        const calulcatedColumn = column + 1;
        if (
          !includedInSet(closedSet, row, calulcatedColumn) &&
          !includedInSet(openSet, row, calulcatedColumn)
        ) {
          const calculatedCost =
            cost +
            calculateDistanceFromGoal({ row, column: calulcatedColumn }, goal);
          openSet.push({
            row,
            column: calulcatedColumn,
            cost: calculatedCost,
            previousCell: currentCellInSet,
          });
        }
      }
      if (!walls.up) {
        const calculatedRow = row - 1;
        if (
          !includedInSet(closedSet, calculatedRow, column) &&
          !includedInSet(openSet, calculatedRow, column)
        ) {
          const calculatedCost =
            cost +
            calculateDistanceFromGoal({ row: calculatedRow, column }, goal);
          openSet.push({
            row: calculatedRow,
            column: column,
            cost: calculatedCost,
            previousCell: currentCellInSet,
          });
        }
      }
      if (!walls.down) {
        const calculatedRow = row + 1;
        if (
          !includedInSet(closedSet, calculatedRow, column) &&
          !includedInSet(openSet, calculatedRow, column)
        ) {
          const calculatedCost =
            cost +
            calculateDistanceFromGoal({ row: calculatedRow, column }, goal);
          openSet.push({
            row: calculatedRow,
            column: column,
            cost: calculatedCost,
            previousCell: currentCellInSet,
          });
        }
      }
    };

    let finishedPathfinding = false;
    let goalCellCordinates:
      | ColumnRowCoordinateWithSolverAttributes
      | undefined = undefined;
    while (!finishedPathfinding) {
      if (openSet.length > 0) {
        findAvailableCells(openSet[0]);
        closedSet.push(openSet[0]);
        openSet.shift();
        openSet.sort((cellOne, cellTwo) => {
          return cellOne.cost - cellTwo.cost;
        });
        goalCellCordinates = openSet.find((openSetCell) => {
          return (
            openSetCell.column === goal.column && openSetCell.row === goal.row
          );
        });
        if (goalCellCordinates) {
          finishedPathfinding = true;
        }
      } else {
        finishedPathfinding = true;
        goalCellCordinates = undefined;
        this.path = [];
      }
    }

    const path: ColumnRowCoordinate[] = [];
    if (goalCellCordinates) {
      const constructPath = (cell: ColumnRowCoordinateWithSolverAttributes) => {
        const { row, column } = cell;
        path.push({ row, column });
        if (cell.previousCell) {
          return constructPath(cell.previousCell);
        }
        path.reverse();
      };
      constructPath(goalCellCordinates);
    }
    this.path = path;
  }

  /**
   * Returns an ordered array of cells, with each cell being a cell on the path through the maze.
   */
  toJSON(): ColumnRowCoordinate[] {
    return this.path;
  }

  /**
   * Returns the string representation of the path through the maze
   * e.g.
   *  _ _ _ _ _
   * |S|   |   |
   * |↓ _| | |_|
   * |↳ ↴|_ _| |
   * | |↓|_ ↱ ↴|
   * |_ ↳ → ⇗|G|
   *    ¯ ¯ ¯ ¯
   */
  toString(): string {
    if (this.path.length === 0) {
      return "";
    }
    const numberedPath = this.path.map((cell, index) => {
      return { ...cell, step: index };
    });
    let stringRepresentation = "";

    // Returns the cell that is next in the path
    const findNextStepInPath = (currentStep: number) => {
      return numberedPath.find((cell) => cell.step === currentStep + 1);
    };

    const cellInPath = (row: number, column: number) => {
      return numberedPath.find((pathCell) => {
        return row === pathCell.row && column === pathCell.column;
      });
    };

    for (let topRow = 0; topRow < this.cells[0].length; topRow++) {
      // Adds a top wall to the top cells
      stringRepresentation += this.cells[0][topRow].walls.up ? " _" : "  ";
    }
    stringRepresentation += "\n";

    for (let row = 0; row < this.cells.length; row++) {
      let rowString = "";
      for (let column = 0; column < this.cells[row].length; column++) {
        const pathCell = cellInPath(row, column);
        if (column === 0 && this.cells[row][column].walls.left) {
          // Adds a wall to the left most cell
          stringRepresentation += "|";
        }
        if (pathCell) {
          const nextCellInPath = findNextStepInPath(pathCell.step);
          const previousCellInPath = findNextStepInPath(pathCell.step - 2);

          if (pathCell.step === 0) {
            rowString += "S";
          } else if (nextCellInPath) {
            // calculate the direction of travel
            const nextRowChange = nextCellInPath.row - pathCell.row;
            const nextColumnChange = nextCellInPath.column - pathCell.column;
            let previousRowChange, previousColumnChange;
            if (previousCellInPath) {
              previousRowChange = previousCellInPath.row - pathCell.row;
              previousColumnChange =
                previousCellInPath.column - pathCell.column;
            }

            if (nextRowChange === 1) {
              if (previousColumnChange === 1) {
                rowString += "↶";
              } else if (previousColumnChange === -1) {
                rowString += "↴";
              } else {
                rowString += "↓";
              }
            } else if (nextRowChange === -1) {
              if (previousColumnChange === 1) {
                rowString += "⇖";
              } else if (previousColumnChange === -1) {
                rowString += "⇗";
              } else {
                rowString += "↑";
              }
            } else if (nextColumnChange === 1) {
              if (previousRowChange === 1) {
                rowString += "↱";
              } else if (previousRowChange === -1) {
                rowString += "↳";
              } else {
                rowString += "→";
              }
            } else if (nextColumnChange === -1) {
              rowString += "←";
            }
          } else {
            rowString += "G";
          }

          if (this.cells[row][column].walls.right) {
            rowString += "|";
          } else {
            rowString += " ";
          }
        } else {
          rowString += this.cells[row][column].toString();
        }
      }
      // Add a new line if the last cell of the row
      stringRepresentation +=
        row + 1 < this.cells.length ? rowString + "\n" : rowString;
    }

    stringRepresentation += "\n";
    for (
      let bottomRow = 0;
      bottomRow < this.cells[this.mazeHeight].length;
      bottomRow++
    ) {
      const cellIsInPath = cellInPath(this.mazeHeight, bottomRow);
      if (cellIsInPath) {
        // Adds a bottom wall to the bottom cells only if cell in path
        if (this.cells[this.mazeHeight][bottomRow].walls.down) {
          stringRepresentation += " ¯";
        }
      } else {
        stringRepresentation += "  ";
      }
    }
    return stringRepresentation;
  }
}
