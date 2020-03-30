/**
 * A class to represent an individual cell within the maze
 */
class Cell {
  /**
     * Creates a cell with all 4 walls.
     */
  constructor () {
    this.walls = {
      left: true,
      right: true,
      up: true,
      down: true
    };

    this.visited = false;
  }

  /**
     * Removes the wall in the specified direction.
     * @param {string} direction left;right;up;down. The wall that should be removed.
     */
  removeWall (direction) {
    if (direction === 'left') {
      this.walls.left = false;
    } else if (direction === 'right') {
      this.walls.right = false;
    } else if (direction === 'up') {
      this.walls.up = false;
    } else if (direction === 'down') {
      this.walls.down = false;
    } else {
      throw new Error('Invalid direction');
    }
  }

  /**
     * Returns the fall if the wall exists; returns nothing if the wall does not exist.
     * @param {string} direction left;right;up;down. The wall that should be removed.
     * @returns {bool} true if the wall exists; false if the wall does not exist.
     */
  getWallStatus (direction) {
    if (direction === 'left') {
      return this.walls.left;
    } else if (direction === 'right') {
      return this.walls.right;
    } else if (direction === 'up') {
      return this.walls.up;
    } else if (direction === 'down') {
      return this.walls.down;
    } else {
      throw new Error('Invalid direction');
    }
  }

  /**
     * Marks if a cell has been visited or not
     * @param {bool} visited - The value to set cell.visited to.
     */
  setCellVisited (visited) {
    this.visited = visited;
  }

  /**
     * Returns if the cell has been visited or not
     * @returns {bool} Returns true if cell has been visited and false if not
     */
  getCellVisited () {
    return this.visited;
  }

  /**
     * @return {string} a string representation of a cell:
     * | shows if the right wall exists
     * _ shows if the down wall exists
     * e.g.:
     *  * _| would show if all walls exist (if the cell is a top left cell).
     *  * _  would show if the right wall does not exist
     *  *  | would show if the down wall does not exist
     */
  toString () {
    let representation = '';
    representation += this.walls.down ? '_' : ' ';
    representation += this.walls.right ? '|' : ' ';
    return representation;
  }

  /**
   * Returns the cell as a JSON object
   */
  toJSON () {
    return {
      left: this.walls.left,
      right: this.walls.right,
      up: this.walls.up,
      down: this.walls.down,
      visited: this.visited
    };
  }
}

module.exports = Cell;
