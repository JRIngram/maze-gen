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