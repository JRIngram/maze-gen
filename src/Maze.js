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
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        let cell;
        if (i === 0 && j === 0) {
          // Top left cell
          cell = new Cell(true, true);
        } else if (i === 0 && j !== 0) {
          // Top but not leftmost cell
          cell = new Cell(true, false);
        } else if (i !== 0 && j === 0) {
          // Leftmost but not top cell
          cell = new Cell(false, true);
        } else {
          cell = new Cell(false, false);
        }
        row.push(cell);
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
     * Returns if a wall
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
     * @returns {string} The string represention of all cells within the maze.
     *  e.g. |-  =  -|
     *       | ||=  _|
     *       |_  =  =|
     */
  toString () {
    let stringRepresentation = '';
    for (let row = 0; row < this.cells.length; row++) {
      let rowString = '';
      for (let cell = 0; cell < this.cells[row].length; cell++) {
        rowString += this.cells[row][cell].toString();
      }
      if (row + 1 < this.cells.length) {
        stringRepresentation += rowString + '\n';
      } else {
        stringRepresentation += rowString;
      }
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
