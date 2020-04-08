const Prando = require('prando');
const Maze = require('../Maze');

class HuntAndKill {
  constructor (width, height, seed = (Math.floor(Math.random() * 10000))) {
    this.rng = new Prando(seed);
    this.maze = new Maze(width, height);
    this.width = width;
    this.height = height;
  }

  /**
    * Picks a random cell from the maze and returns it
    * @returns {{int, int}} Coordinates of a random cell within the maze
  */
  getRandomCell () {
    return { randomHeight: this.rng.nextInt(0, this.height - 1), randomWidth: this.rng.nextInt(0, this.width - 1) };
  }

  generateMaze () {
  
  }
}

module.exports = HuntAndKill;
