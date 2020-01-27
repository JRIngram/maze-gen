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
    maze.removeWall(0,0,"up")
});

test('Can visit visit', () => {
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
    maze.removeWall(0,0,"left");
    expect(maze.toString()).toBe(' =||=||=|\n|=||=||=|\n|=||=||=|')
});

test('Maze to string representation to be correct when removing multiple walls', () => {
    const maze = new Maze(3,3);
    maze.removeWall(0,0,"left");
    maze.removeWall(0,0,"right");
    maze.removeWall(1,1,"up");
    maze.removeWall(1,1,"down");
    expect(maze.toString()).toBe(' = |=||=|\n|=|| ||=|\n|=||=||=|')
});