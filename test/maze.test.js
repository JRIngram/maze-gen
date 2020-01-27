const Maze = require('../Maze');

test('Maze created with the correct dimension', () => {
    const maze1 = new Maze(1,1);
    expect(maze1.cells.length).toBe(1);
    expect(maze1.cells[0].length).toBe(1);
    const maze2 = new Maze(5,5);
    expect(maze2.cells.length).toBe(5);
    expect(maze2.cells[0].length).toBe(5);
    const maze3 = new Maze(100,100);
    expect(maze3.cells.length).toBe(100);
    expect(maze3.cells[0].length).toBe(100);
});

test('Can remove cell wall', () => {
    const maze = new Maze(3,3);
    maze.removeWall(0,0,"up");
    expect(maze.getWallStatus(0,0,"up")).toBe(false);
});

test('Removing the right wall of a cell removes the left of the next', () => {
    const maze = new Maze(3,3);
    maze.removeWall(0,1,"right");
    expect(maze.getWallStatus(0,1,"right")).toBe(false);
    expect(maze.getWallStatus(0,2,"left")).toBe(false);
})

test('Removing the right wall of an outer cell works successfully', () => {
    const maze = new Maze(3,3);
    maze.removeWall(0,2,"right");
    expect(maze.getWallStatus(0,2,"right")).toBe(false);
})

test('Removing the left wall of a cell removes the right of the previous', () => {
    const maze = new Maze(3,3);
    maze.removeWall(0,1,"left");
    expect(maze.getWallStatus(0,1,"left")).toBe(false);
    expect(maze.getWallStatus(0,0,"right")).toBe(false);
})

test('Removing the left wall of an outer cell works successfully', () => {
    const maze = new Maze(3,3);
    maze.removeWall(0,0,"left");
    expect(maze.getWallStatus(0,0,"left")).toBe(false);
})

test('Removing the top wall of a cell removes the bottom cell of the one above', ()=>{
    const maze = new Maze(3,3);
    maze.removeWall(2,1,"up");
    expect(maze.getWallStatus(2,1,"up")).toBe(false);
    expect(maze.getWallStatus(1,1,"down")).toBe(false);
});

test('Removing the top wall of an outer cell works successfully', ()=>{
    const maze = new Maze(3,3);
    maze.removeWall(0,2,"up");
    expect(maze.getWallStatus(0,2,"up")).toBe(false);
});

test('Removing the bottom wall of a cell removes the top cell of the one below', ()=>{
    const maze = new Maze(3,3);
    maze.removeWall(0,2,"down");
    expect(maze.getWallStatus(0,2,"down")).toBe(false);
    expect(maze.getWallStatus(1,2,"up")).toBe(false);
});

test('Removing the bottom wall of an out cell works successfully', ()=>{
    const maze = new Maze(3,3);
    maze.removeWall(2,2,"down");
    expect(maze.getWallStatus(2,2,"down")).toBe(false);
})

test('Can visit cells', () => {
    const maze = new Maze(3,3);
    expect(maze.getCellVisited(0,0)).toBe(false);
    maze.visitCell(0,0);
    expect(maze.getCellVisited(0,0)).toBe(true);
})


test('Maze to string representation to be correct on creation', () => {
    const maze = new Maze(3,3);
    expect(maze.toString()).toBe('|=||=||=|\n|=||=||=|\n|=||=||=|')
});

test('Maze to string representation to be correct when removing wall', () => {
    const maze = new Maze(3,3);
    maze.removeWall(0,0,"right");
    expect(maze.toString()).toBe('|=  =||=|\n|=||=||=|\n|=||=||=|')
});

test('Maze to string representation to be correct when removing multiple walls', () => {
    const maze = new Maze(3,3);
    maze.removeWall(0,0,"left");
    maze.removeWall(0,0,"right");
    maze.removeWall(1,1,"up");
    maze.removeWall(1,1,"down");
    expect(maze.toString()).toBe(' =  -||=|\n|=|| ||=|\n|=||_||=|')
});

test('Can create a visible path through a maze', () => {
    const maze = new Maze(3,3);
    maze.removeWall(0,0,"right");
    maze.removeWall(0,1,"down");
    maze.removeWall(1,1,"down");
    maze.removeWall(2,1,"right");
    maze.removeWall(2,2,"up");
    maze.removeWall(1,2,"up");
    maze.removeWall(0,2,"up");
    expect(maze.toString()).toBe('|=  -|| |\n|=|| || |\n|=||_  _|')

})