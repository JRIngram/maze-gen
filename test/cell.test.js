const Cell = require('../Cell');

//Walls
test('Walls all present on construction', () => {
    const cell = new Cell();
    expect(cell.walls.left).toBe(true);
    expect(cell.walls.right).toBe(true);
    expect(cell.walls.up).toBe(true);
    expect(cell.walls.down).toBe(true);
});

test('Remove cell function sets cell wall to false', () => {
    const cell = new Cell();
   
    //Left wall
    expect(cell.getWallStatus('left')).toBe(true);
    cell.removeWall('left');
    expect(cell.walls.left).toBe(false);
    expect(cell.getWallStatus('left')).toBe(false);
    
    //Right Wall
    expect(cell.getWallStatus('right')).toBe(true);
    cell.removeWall('right');
    expect(cell.walls.right).toBe(false);
    expect(cell.getWallStatus('right')).toBe(false);
    
    //Up wall
    expect(cell.getWallStatus('up')).toBe(true);
    cell.removeWall('up');
    expect(cell.walls.up).toBe(false);
    expect(cell.getWallStatus('up')).toBe(false);
    
    //Down wall
    expect(cell.getWallStatus('down')).toBe(true);
    cell.removeWall('down');
    expect(cell.walls.down).toBe(false);
    expect(cell.getWallStatus('down')).toBe(false);
});

test('No wall removed if invalid parameter entered', () => {
    const cell = new Cell();
   
    //Left wall
    expect(cell.getWallStatus('test')).toBe(undefined);
    cell.removeWall('test');
    expect(cell.getWallStatus('left')).toBe(true);
    expect(cell.getWallStatus('right')).toBe(true);
    expect(cell.getWallStatus('up')).toBe(true);
    expect(cell.getWallStatus('down')).toBe(true);
})

//Visit and unvisiting
test('Cell is marked as unvisited on start', () => {
    const cell = new Cell();
    expect(cell.visited).toBe(false);
    expect(cell.getCellVisited()).toBe(false);
});

test('Cell can be marked as visited on start', () => {
    const cell = new Cell();
    cell.setCellVisited(true);
    expect(cell.visited).toBe(true);
    expect(cell.getCellVisited()).toBe(true);
})

test('Cell can be marked as unvisited', () => {
    const cell = new Cell();
    cell.setCellVisited(false);
    expect(cell.visited).toBe(false);
})

//String representations
test('String representation displays correctly on construction', () => {
    const cell = new Cell();
    expect(cell.toString()).toBe("|=|")
})

test('String representation correct when removing up wall', () =>{
    const cell = new Cell();
    cell.removeWall('up');
    expect(cell.toString()).toBe("|_|")
});

test('String representation correct when removing left wall', () =>{
    const cell = new Cell();
    cell.removeWall('left');
    expect(cell.toString()).toBe(" =|")
});

test('String representation correct when removing down wall', () =>{
    const cell = new Cell();
    cell.removeWall('down');
    expect(cell.toString()).toBe("|-|");
});

test('String representation correct when removing right wall', () =>{
    const cell = new Cell();
    cell.removeWall('right');
    expect(cell.toString()).toBe("|= ");
});

test('String representation correct when removing up and down wall', () =>{
    const cell = new Cell();
    cell.removeWall('up');
    cell.removeWall('down');
    expect(cell.toString()).toBe("| |");
});


