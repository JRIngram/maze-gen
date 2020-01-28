class Cell
{
    constructor() {
        this.walls = {
            left: true,
            right: true,
            up: true,
            down: true,
        }

        this.visited = false;
    }

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

    setCellVisited(visited){
        this.visited = visited;
    }

    getCellVisited(){
        return this.visited;
    }

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