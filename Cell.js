/**
 * A class to represent an individual cell within the maze
 */
class Cell
{
    /**
     * Creates a cell with all 4 walls.
     */
    constructor() {
        this.walls = {
            left: true,
            right: true,
            up: true,
            down: true,
        }

        this.visited = false;
    }

    /**
     * Removes the wall in the specified direction.
     * @param {string} direction left;right;up;down. The wall that should be removed.
     */
    removeWall(direction){
        if(direction === "left"){
            this.walls.left = false;
        }
        else if(direction === "right"){
            this.walls.right = false;
        }
        else if(direction === "up"){
            this.walls.up = false;
        }
        else if(direction === "down"){
            this.walls.down = false;
        }
    }
    
    /**
     * Returns the fall if the wall exists; returns nothing if the wall does not exist.
     * @param {string} direction left;right;up;down. The wall that should be removed.
     * @returns {bool} true if the wall exists; false if the wall does not exist.
     */
    getWallStatus(direction){
        if(direction === "left"){
            return this.walls.left;
        }
        else if(direction === "right"){
            return this.walls.right;
        }
        else if(direction === "up"){
            return this.walls.up;
        }
        else if(direction === "down"){
            return this.walls.down;
        }
    }
    
    /**
     * Marks if a cell has been visited or not
     * @param {bool} visited - The value to set cell.visited to.
     */
    setCellVisited(visited){
        this.visited = visited;
    }

    /**
     * Returns if the cell has been visited or not
     * @returns {bool} Returns true if cell has been visited and false if not
     */
    getCellVisited(){
        return this.visited;
    }

    /**
     * @return {string} a string representation of a cell:
     * | show the left & right walls
     * _ shows if only the down wall exists
     * - shows if only the up wall exists
     * = show if both the up and down walls exist
     * e.g.:
     *  * |=| would show if all walls exist
     *  * |-| would show if only the left, right and up wall exists
     *  * |_  would show if only the left and down wall exist.
     */
    toString(){
        let representation = ""
        //Left
        if(this.walls.left === true){
            representation = "|"
        }
        else{
            representation = " "
        }

        //Up abd Down
        if(this.walls.down === true && this.walls.up === true){
            representation += "="
        }
        else if(this.walls.down === false && this.walls.up === true){
            representation += "-"
        }
        else if(this.walls.down === true && this.walls.up === false){
            representation += "_"
        }
        else{
            representation += " "
        }

        //Right
        if(this.walls.right === true){
            representation += "|"
        }
        else{
            representation += " "
        }
        return representation
    }
}

module.exports = Cell;