const Cell = require('./Cell');

class Maze{
    constructor(width, height){
        this.cells = [];
        for(let i = 0; i < height; i++){
            let row = []
            for(let j = 0; j < width; j++){
                let cell = new Cell();
                row.push(cell);
            }
            this.cells.push(row);
        }
    }

    getCellVisited(row, column){
        return this.cells[row][column].getCellVisited();
    }

    visitCell(row, column){
        this.cells[row][column].setCellVisited(true);
    }

    removeWall(row, column, direction){
        this.cells[row][column].removeWall(direction);
        if(direction === "right" && column + 1 < this.cells[row].length){
            this.cells[row][column+1].removeWall("left");
        }
        else if(direction === "left" && column - 1 >= 0){
            this.cells[row][column-1].removeWall("right");
        }
        else if(direction === "up" && (row - 1) >= 0){
            this.cells[row-1][column].removeWall("down");
        }
        else if(direction === "down" && (row + 1) < this.cells.length){
            this.cells[row+1][column].removeWall("up");
        }
    }

    getWallStatus(row, column, direction){
        return this.cells[row][column].getWallStatus(direction);
    }

    getRandomCell(){
        const mazeHeight = this.cells.length;
        const mazeWidth = this.cells[0].length;
        return {randomHeight: Math.floor(Math.random() * mazeHeight) , randomWidth: Math.floor(Math.random() * mazeWidth)}
    }

    getCellNeighbourIndices(row, column){
        let neighbourIndices = {};
        const mazeHeight = this.cells.length;
        const mazeWidth = this.cells[0].length;

        //Get up neighbour
        if(row > 0)
            neighbourIndices.up = {y: (row - 1), x: column}

        //Get down neighbour
        if(row < mazeHeight - 1)
            neighbourIndices.down = {y: (row + 1), x: column}
            
        //Get left neighbour
        if(column > 0)
            neighbourIndices.left = {y: row, x: (column-1)}
            
        //Get right neighbour
        if(column < mazeWidth - 1)
            neighbourIndices.right = {y: row, x: (column+1)}
        return neighbourIndices;


    }
    
    /*
    * Calls getCellNeighbourIndices, checks if each neighbour is unvisited and adds the unvisited cell's coordinates to an array
    * The above array is returned.
    */
    getUnvisitedNeigbourIndices(row, column){
        const neighbourIndices = this.getCellNeighbourIndices(row, column);
        let unvisitedNeighbours = []
        if(typeof neighbourIndices.up != 'undefined' && this.getCellVisited(neighbourIndices.up.y, neighbourIndices.up.x) === false){
            let cell = {
                direction: 'up',
                x: neighbourIndices.up.x,
                y: neighbourIndices.up.y,
            }
            unvisitedNeighbours.push(cell);
        }
        if(typeof neighbourIndices.down !== 'undefined' && this.getCellVisited(neighbourIndices.down.y, neighbourIndices.down.x) === false){
            let cell = {
                direction: 'down',
                x: neighbourIndices.down.x,
                y: neighbourIndices.down.y,
            }
            unvisitedNeighbours.push(cell);
        }
        if(typeof neighbourIndices.left !== 'undefined' && this.getCellVisited(neighbourIndices.left.y, neighbourIndices.left.x) === false){
            let cell = {
                direction: 'left',
                x: neighbourIndices.left.x,
                y: neighbourIndices.left.y,
            }
            unvisitedNeighbours.push(cell);
        }
        if(typeof neighbourIndices.right !== 'undefined' && this.getCellVisited(neighbourIndices.right.y, neighbourIndices.right.x) === false){
            let cell = {
                direction: 'right',
                x: neighbourIndices.right.x,
                y: neighbourIndices.right.y,
            }
            unvisitedNeighbours.push(cell);
        }
        return unvisitedNeighbours;
    }

    toString(){
        let stringRepresentation = "";
        for(let row = 0; row < this.cells.length; row++){
            let rowString = "";
            for(let cell = 0; cell < this.cells[row].length; cell++){
                rowString += this.cells[row][cell].toString();
            }
            if(row + 1 < this.cells.length){
                stringRepresentation += rowString + "\n";
            }
            else{
                stringRepresentation += rowString
            }

        }
        return stringRepresentation;
    }
}

module.exports = Maze;