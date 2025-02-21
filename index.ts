import { Generator } from "./src/Generator";
import Prando from "prando";
import type { Config } from "./src/types";

export default (options: Config) => {
  const { width, height } = options;
  let { algorithm, seed } = options

  if (typeof width === 'undefined' || typeof height === 'undefined') {
    throw new Error('An object with the following parameters is required to generate a maze:\n{ height, width, seed (optional), algorithm (optional) }');
  }
  if (typeof algorithm === 'undefined') {
    algorithm = 'DEPTHFIRST';
  }
  if (typeof seed === 'undefined') {
    seed = Math.floor(Math.random() * Math.floor(100000));
  }
  if (typeof width !== 'number' || typeof height !== 'number') {
    throw new Error('Width and height must be numbers');
  }
  if (width === 0 || height === 0) {
    throw new Error('Width and height must be greater than 0');
  } else if (width > 3000 || height > 3000) {
    throw new Error('Height and width must be a maximum of 3000');
  }
  const mazeGen = new Generator(width, height);
  const prando = new Prando(seed);
  return mazeGen.generateMaze(algorithm, prando);
};

