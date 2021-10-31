class Solver {
  constructor (maze, start, goal) {
    this.maze = maze;
    const mazeHeight = this.maze.cells.length - 1;
    const mazeWidth = this.maze.cells[0].length - 1;
    if (start.column < 0 || start.row < 0) {
      throw Error('start column/row must be great than or equal to 0.');
    }
    if (goal.column < 0 || goal.row < 0) {
      throw Error('goal column/row must be great than or equal to 0.');
    }
    if (
      mazeHeight < start.row ||
      mazeHeight < goal.row
    ) {
      throw Error(`start/goal rows must be less than maze height (${mazeHeight}).`);
    }
    if (
      mazeWidth < start.column ||
      mazeWidth < goal.column
    ) {
      throw Error(`start/goal columns must be less than maze width (${mazeWidth}).`);
    }

    const openSet = [{ ...start, cost: 0 }];
    const closedSet = [];

    const calculateDistanceFromGoal = (currentCell, goalCell) => {
      const { row, column } = currentCell;
      const distanceToGoalRow = Math.abs(row - goalCell.row);
      const distanceToGoalColumn = Math.abs(column - goalCell.column);
      return distanceToGoalRow + distanceToGoalColumn;
    };

    const findAvailableCells = (currentCellInSet) => {
      const { row, column, cost } = currentCellInSet;
      const { walls } = maze.cells[row][column];
      const includedInSet = (set, row, column) => {
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
        if (!includedInSet(closedSet, row, calulcatedColumn) && !includedInSet(openSet, row, calulcatedColumn)) {
          const calculatedCost = cost + calculateDistanceFromGoal({ row, column: calulcatedColumn }, goal);
          openSet.push({ row, column: calulcatedColumn, cost: calculatedCost, previousCell: currentCellInSet });
        }
      }
      if (!walls.right) {
        const calulcatedColumn = column + 1;
        if (!includedInSet(closedSet, row, calulcatedColumn) && !includedInSet(openSet, row, calulcatedColumn)) {
          const calculatedCost = cost + calculateDistanceFromGoal({ row, column: calulcatedColumn }, goal);
          openSet.push({ row, column: calulcatedColumn, cost: calculatedCost, previousCell: currentCellInSet });
        }
      }
      if (!walls.up) {
        const calculatedRow = row - 1;
        if (!includedInSet(closedSet, calculatedRow, column) && !includedInSet(openSet, calculatedRow, column)) {
          const calculatedCost = cost + calculateDistanceFromGoal({ row: calculatedRow, column }, goal);
          openSet.push({ row: calculatedRow, column: column, cost: calculatedCost, previousCell: currentCellInSet });
        }
      }
      if (!walls.down) {
        const calculatedRow = row + 1;
        if (!includedInSet(closedSet, calculatedRow, column) && !includedInSet(openSet, calculatedRow, column)) {
          const calculatedCost = cost + calculateDistanceFromGoal({ row: calculatedRow, column }, goal);
          openSet.push({ row: calculatedRow, column: column, cost: calculatedCost, previousCell: currentCellInSet });
        }
      }
    };

    let finishedPathfinding = false;
    let foundGoalCell = null;
    while (!finishedPathfinding) {
      if (openSet.length > 0) {
        findAvailableCells(openSet[0]);
        closedSet.push(openSet[0]);
        openSet.shift();
        openSet.sort((cellOne, cellTwo) => {
          return cellOne.cost - cellTwo.cost;
        });
        foundGoalCell = openSet.find((openSetCell) => {
          return openSetCell.column === goal.column && openSetCell.row === goal.row;
        });
        if (foundGoalCell) {
          finishedPathfinding = true;
        }
      } else {
        finishedPathfinding = true;
        foundGoalCell = false;
        this.path = [];
      }
    }

    const path = [];
    if (foundGoalCell) {
      const constructPath = (cell) => {
        const { row, column } = cell;
        path.push({ row, column });
        if (cell.previousCell) {
          return constructPath(cell.previousCell);
        }
        path.reverse();
      };
      constructPath(foundGoalCell);
    }
    this.path = path;
  }

  toJSON () {
    return this.path;
  }

  toString () {
    if (this.path.length === 0) {
      return '';
    }
    const numberedPath = this.path.map((cell, index) => {
      return { ...cell, step: index };
    });
    let stringRepresentation = '';

    const cellInPath = (row, column) => {
      return numberedPath.find((pathCell) => {
        return row === pathCell.row && column === pathCell.column;
      });
    };

    for (let topRow = 0; topRow < this.maze.cells[0].length; topRow++) {
      // Adds a top wall to the top cells
      stringRepresentation += this.maze.cells[0][topRow].walls.up ? ' _' : '  ';
    }
    stringRepresentation += '\n';

    for (let row = 0; row < this.maze.cells.length; row++) {
      let rowString = '';
      for (let column = 0; column < this.maze.cells[row].length; column++) {
        const pathCell = cellInPath(row, column);
        if (column === 0 && this.maze.cells[row][column].walls.left) {
          // Adds a wall to the left most cell
          stringRepresentation += '|';
        }
        if (pathCell) {
          const finalDigit = pathCell.step % 10;
          rowString += finalDigit;
          if (this.maze.cells[row][column].walls.right) {
            rowString += '|';
          } else {
            rowString += ' ';
          }
        } else {
          rowString += this.maze.cells[row][column].toString();
        }
      }
      // Add a new line if the last cell of the row
      stringRepresentation += row + 1 < this.maze.cells.length ? rowString + '\n' : rowString;
    }

    stringRepresentation += '\n';
    const mazeHeight = this.maze.cells.length - 1;
    for (let bottomRow = 0; bottomRow < this.maze.cells[mazeHeight].length; bottomRow++) {
      const cellIsInPath = cellInPath(mazeHeight, bottomRow);
      if (cellIsInPath) {
        // Adds a bottom wall to the bottom cells only if cell in path
        if (this.maze.cells[mazeHeight][bottomRow].walls.down) {
          stringRepresentation += ' ¯';
        }
      } else {
        stringRepresentation += '  ';
      }
    }
    return stringRepresentation;
  }
}

module.exports = Solver;
