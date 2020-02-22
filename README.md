# Maze-Gen

![CircleCI](https://img.shields.io/circleci/build/github/JRIngram/maze-gen)

An npm package used to generate mazes. 

### Installing

Ensure `Node.js` is installed on your machine.

Run `npm i`

Run `node index.js` to generate a 5 by 5 maze. Change the parameters of `const df = new DepthFirst(5, 5);` to generated mazes of different sizes, e.g. `const df = new DepthFirst(10, 15);` to generate a 10 by 15 size maze.

Currently the maze is then output in both string and JSON form


## Running the tests

* `npm run test` to run [jest](https://jestjs.io/) tests.
* `npm run linter` to run linter. This project uses [SemiStandard](https://github.com/standard/semistandard) styling.

## Versioning

We use [SemVer](http://semver.org/) for versioning.


## Acknowledgments

* README format based off of [PurpleBooth's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

