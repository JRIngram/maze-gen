const Cell = require('./Cell');

/**
 * A class to represent the generated maze. This is made of cells
 * @see Cell
 */
class Maze {
  /**
     * Constructs a 2D array of cells
     * @param {*} width The width of the maze, i.e. how many cells each row contains
     * @param {*} height The height of the maze, i.e. how many rows the maze contains
     */
  constructor (width, height) {
    this.cells = [];
    // Create an [i, j] 2D array of cells
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(new Cell());
      }
      this.cells.push(row);
    }
  }

  /**
     * Returns if the cell has been visited or not
     * @param {*} row The row index of the cell
     * @param {*} column The column index of the cell
     * @returns true if the cell has been visited; false if the cell hasn't been visited.
     */
  getCellVisited (row, column) {
    return this.cells[row][column].getCellVisited();
  }

  /**
     * Marks a cell as visited
     * @param {*} row The row index of the cell
     * @param {*} column The column index of the cell
     */
  visitCell (row, column) {
    this.cells[row][column].setCellVisited(true);
  }

  /**
   * Gets the first unvisited cell in the maze with visited neighbours and returns the cell and the neighbours information
   * @returns If true: the first unvisited cell indicies and the indicies of its neighbours; false if no cell with visitedNeighbours exists
   */
  getFirstUnvisitedCellWithVisitedNeighbour () {
    const unvisitedCells = this.getUnvisitedCells();
    for (let i = 0; i < unvisitedCells.length; i++) {
      const visitedNeighbours = this.getVisitedNeigbourIndices(unvisitedCells[i].y, unvisitedCells[i].x);
      if (visitedNeighbours.length > 0) {
        return {
          firstCell: unvisitedCells[i],
          neighbours: visitedNeighbours
        };
      }
    }
    return false;
  }

  getUnvisitedCells () {
    const unvisitedCells = [];
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (!this.getCellVisited(i, j)) {
          unvisitedCells.push({ x: j, y: i });
        }
      }
    }
    return unvisitedCells;
  }

  getTotalUnvisitedCells () {
    return this.getUnvisitedCells().length;
  }

  /**
     * Removes the wall of the selected cell
     * @param {*} row The row index of the cell
     * @param {*} column The column index of the cell
     * @param {string} direction left;right;up;down. The wall that should be removed.
     */
  removeWall (row, column, direction) {
    this.cells[row][column].removeWall(direction);
    if (direction === 'right' && column + 1 < this.cells[row].length) {
      this.cells[row][column + 1].removeWall('left');
    } else if (direction === 'left' && column - 1 >= 0) {
      this.cells[row][column - 1].removeWall('right');
    } else if (direction === 'up' && (row - 1) >= 0) {
      this.cells[row - 1][column].removeWall('down');
    } else if (direction === 'down' && (row + 1) < this.cells.length) {
      this.cells[row + 1][column].removeWall('up');
    }
  }

  /**
     * Returns if a wall exists in the specified direction
     * @param {*} row The row index of the cell
     * @param {*} column The column index of the cell
     * @param {string} direction left;right;up;down. The wall that should be removed.
     * @returns {boolean} true if the wall exists; false if the wall does not exist.
     */
  getWallStatus (row, column, direction) {
    return this.cells[row][column].getWallStatus(direction);
  }

  /**
     * Gets the indicies of neighbouring cells
     * @param {*} row The row index of the cell
     * @param {*} column The column index of the cell
     * @returns {{[]}} An object containing the indicies of neighbouring cells
     */
  getCellNeighbourIndices (row, column) {
    const neighbourIndices = {};
    const mazeHeight = this.cells.length;
    const mazeWidth = this.cells[0].length;

    // Get up neighbour
    if (row > 0) { neighbourIndices.up = { y: (row - 1), x: column }; }

    // Get down neighbour
    if (row < mazeHeight - 1) { neighbourIndices.down = { y: (row + 1), x: column }; }

    // Get left neighbour
    if (column > 0) { neighbourIndices.left = { y: row, x: (column - 1) }; }

    // Get right neighbour
    if (column < mazeWidth - 1) { neighbourIndices.right = { y: row, x: (column + 1) }; }
    return neighbourIndices;
  }

  /**
    * Calls getCellNeighbourIndices, checks if each neighbour is unvisited and adds the unvisited cell's coordinates to an array
    * @param {*} row The row index of the cell
    * @param {*} column The column index of the cell
    * @returns {[]} The indicies of unvisited neighours of the chosen cell
    */
  getUnvisitedNeigbourIndices (row, column) {
    const neighbourIndices = this.getCellNeighbourIndices(row, column);
    const unvisitedNeighbours = [];
    if (typeof neighbourIndices.up !== 'undefined' && this.getCellVisited(neighbourIndices.up.y, neighbourIndices.up.x) === false) {
      const cell = {
        direction: 'up',
        x: neighbourIndices.up.x,
        y: neighbourIndices.up.y
      };
      unvisitedNeighbours.push(cell);
    }
    if (typeof neighbourIndices.down !== 'undefined' && this.getCellVisited(neighbourIndices.down.y, neighbourIndices.down.x) === false) {
      const cell = {
        direction: 'down',
        x: neighbourIndices.down.x,
        y: neighbourIndices.down.y
      };
      unvisitedNeighbours.push(cell);
    }
    if (typeof neighbourIndices.left !== 'undefined' && this.getCellVisited(neighbourIndices.left.y, neighbourIndices.left.x) === false) {
      const cell = {
        direction: 'left',
        x: neighbourIndices.left.x,
        y: neighbourIndices.left.y
      };
      unvisitedNeighbours.push(cell);
    }
    if (typeof neighbourIndices.right !== 'undefined' && this.getCellVisited(neighbourIndices.right.y, neighbourIndices.right.x) === false) {
      const cell = {
        direction: 'right',
        x: neighbourIndices.right.x,
        y: neighbourIndices.right.y
      };
      unvisitedNeighbours.push(cell);
    }
    return unvisitedNeighbours;
  }

  /**
    * Calls getCellNeighbourIndices, checks if each neighbour is visited and adds the visited cell's coordinates to an array
    * @param {*} row The row index of the cell
    * @param {*} column The column index of the cell
    * @returns {[]} The indicies of visited neighours of the chosen cell
  */
  getVisitedNeigbourIndices (row, column) {
    const neighbourIndices = this.getCellNeighbourIndices(row, column);
    const unvisitedNeighbours = [];
    if (typeof neighbourIndices.up !== 'undefined' && this.getCellVisited(neighbourIndices.up.y, neighbourIndices.up.x) === true) {
      const cell = {
        direction: 'up',
        x: neighbourIndices.up.x,
        y: neighbourIndices.up.y
      };
      unvisitedNeighbours.push(cell);
    }
    if (typeof neighbourIndices.down !== 'undefined' && this.getCellVisited(neighbourIndices.down.y, neighbourIndices.down.x) === true) {
      const cell = {
        direction: 'down',
        x: neighbourIndices.down.x,
        y: neighbourIndices.down.y
      };
      unvisitedNeighbours.push(cell);
    }
    if (typeof neighbourIndices.left !== 'undefined' && this.getCellVisited(neighbourIndices.left.y, neighbourIndices.left.x) === true) {
      const cell = {
        direction: 'left',
        x: neighbourIndices.left.x,
        y: neighbourIndices.left.y
      };
      unvisitedNeighbours.push(cell);
    }
    if (typeof neighbourIndices.right !== 'undefined' && this.getCellVisited(neighbourIndices.right.y, neighbourIndices.right.x) === true) {
      const cell = {
        direction: 'right',
        x: neighbourIndices.right.x,
        y: neighbourIndices.right.y
      };
      unvisitedNeighbours.push(cell);
    }
    return unvisitedNeighbours;
  }

  /**
     * @returns {string} The string represention of all cells within the maze.
     *  e.g.
     *  _ _ _
     * |    _|
     * |_| | |
     * | | | |
     * |_ _ _|
     **/
  toString () {
    let stringRepresentation = '';
    for (let topRow = 0; topRow < this.cells[0].length; topRow++) {
      // Adds a top wall to the top cells
      stringRepresentation += this.cells[0][topRow].walls.up ? ' _' : '  ';
    }
    stringRepresentation += '\n';

    for (let row = 0; row < this.cells.length; row++) {
      let rowString = '';
      for (let cell = 0; cell < this.cells[row].length; cell++) {
        // Adds a wall to the left most cell
        if (cell === 0 && this.cells[row][cell].walls.left) {
          stringRepresentation += '|';
        }
        rowString += this.cells[row][cell].toString();
      }
      // Add a new line if the last cell of the row
      stringRepresentation += row + 1 < this.cells.length ? rowString + '\n' : rowString;
    }
    return stringRepresentation;
  }

  /**
   * Returns a JSON representation of the maze.
   * The JSON object contains a rows array, which contains an array for each row.
   * Each row array contains the JSON representations of each cell within the Maze for that row.
   */
  toJSON () {
    const JSONRepresentation = {
      rows: []
    };
    for (let row = 0; row < this.cells.length; row++) {
      const rowArray = [];
      for (let cell = 0; cell < this.cells[row].length; cell++) {
        rowArray.push(this.cells[row][cell].toJSON());
      }
      JSONRepresentation.rows.push(rowArray);
    }
    return JSONRepresentation;
  }
}

module.exports = Maze;
