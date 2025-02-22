# maze-generation

![npm](https://img.shields.io/npm/v/maze-generation)
![NPM](https://img.shields.io/npm/l/maze-generation)
![CircleCI](https://img.shields.io/circleci/build/github/JRIngram/maze-gen)
![npm bundle size](https://img.shields.io/bundlephobia/min/maze-generation)

An npm package used to generate mazes with a specified width and height. 

Mazes can be generated using either recursive backtracker (Depth First) or hunt and kill algorithms. See below for details of these algorithms.

Additionally mazes can be generated using seeds, which allows for reproducible maze generation.

## Contributing
Please view our [CONTRIBUTING.md](https://github.com/JRIngram/maze-gen/blob/develop/CONTRIBUTING.md) file for information on how to contribute, report issues and request features.

## Changelog and versioning
Please view our [CHANGELOG.md](https://github.com/JRIngram/maze-gen/blob/develop/CHANGELOG.md) file for information on our updates.

We use [SemVer](http://semver.org/) for versioning.

## Using maze-generation
### Installing

Ensure `Node.js` is installed on your machine.

Run `npm i maze-generation`

### Usage
#### Generation
Add an `options` object to your code, with the following to fields:
* **REQUIRED** `width` and `height` should be replaced by ints corresponding to how wide and tall you want your maze.
* **OPTIONAL** `seed` should be replaced by an int or string and will be used as the seed for the random number generator. Defaults to a random number.
* **OPTIONAL** `algorithm` should be: `'DEPTHFIRST'` or `'HUNTANDKILL'`. Defaults to `'DEPTHFIRST'`.

To stop heap out of memory errors, the maximum allowed height and width is 3000.

```javascript
const mazegeneration = require('maze-generation');

const options = {
    width: 10,
    height: 10,
    seed: 12345,
    algorithm: 'HUNTANDKILL'
}

// Generate a maze
const generatedMaze = mazegeneration(options);
```

To get the string representation of the generated maze write:
```javascript
const stringRepresentation = generatedMaze.toString();
console.log(stringRepresenation);
```

Example output:
```
 _ _ _ _ _ _ _ _ _ _
|   |  _   _ _   _  |
| |_|_  |_ _  | |  _|
|_ _ _ _|   | |_  | |
|    _  | |_ _|  _ _|
| | |_  |_  | |_ _  |
|_|_  | |  _|_ _  | |
|  _ _|_|_ _  | | | |
|  _ _    | |_  |  _|
| |_  | |_ _|  _| | |
|_ _ _|_ _ _ _|_ _ _|

```

To get the JSON representation of the generated maze write:

```typescript
let JSONRepresentation = generatedMaze.toJSON();
```

The outputed JSON object has the following structure (example is a 3 by 3 cell):
```typescript
    {
        rows: [
            [[Object],[Object],[Object]],
            [[Object],[Object],[Object]],
            [[Object],[Object],[Object]],
        ]
    };
```

Where each object is a Cell object, which as the following JSON structure:
```typescript
    {  
        left: bool,
        right: bool, 
        up: bool, 
        down: bool, 
        visited: bool
    }
```

The `left`,`right`,`up`,`down` fields correspond to if the wall exists in that direction. The `visited` field corresponds to if the cell has been visited. This should be marked as `true` for all completed mazes.

##### Algorithms
###### Depth First
```
   CURRENT_CELL = random cell
   Create an empty CELL_STACK
   While CURRENT_CELL has unvisited neighbour:
    Select random unvisited neighbour
    Remove walls between the two
    CURRENT_CELL = that random unvisited neighbour
    Mark CURRENT_CELL as visited and push it to the CELL_STACK
    IF CURRENT_CELL has no unvisited neighbour:
      CURRENT_CELL = CELL_STACK.pop()
```

* More information can be found on the [Wikipedia page](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker).

###### Hunt And Kill
```
  Choose a random starting cell and set that to CURRENT_CELL
  Perform a randomised walk from CURRENT_CELL
  WHILE there's unvisited cells with adjacent visited cells: 
    Find the first unvisited cell with adjacent visited cells and set that cell as the CURRENT_CELL
    Remove the wall between the CURRENT_CELL and a random visited neighbour
    Perform a randomised walk from CURRENT_CELL
```

* More information can be found on [Jamis Buck's blog](https://weblog.jamisbuck.org/2011/1/24/maze-generation-hunt-and-kill-algorithm).
* This algorithm hunts for the "first unvisited cell with adjacent visited cells". First is found by searching each cell on the top row, before moving to the next row. 

#### Solver
The generated maze object contains a function called `generateSolution` which can be used to create a path through the maze. It takes two parameters, a `start` cell and a `goal` cell.

Like the Maze object, the solution object has two methods which can be used for printing the output: `toString()` and `toJSON()`.

`toJSON()` returns an array of cells, which represent the path taken from the start to the goal.

```typescript
// example usage

const options = {
    width: 5,
    height: 5,
    seed: 12345,
    algorithm: 'HUNTANDKILL'
}

const generatedMaze = mazegeneration(options);
console.log(generatedMaze.toString());
//  _ _ _ _ _
// | |   |   |
// |  _| | |_|
// |_  |_ _| |
// | | |_    |
// |_ _ _ _|_|

const start = {
    row: 0,
    column: 0
};
const goal = {
    row: 4,
    column: 4
};
const solution = generatedMaze.generateSolution(start, goal);
console.log(solution.toString());
//  _ _ _ _ _
// |S|   |   |
// |↓ _| | |_|
// |↳ ↴|_ _| |
// | |↓|_ ↱ ↴|
// |_ ↳ → ⇗|G|
//    ¯ ¯ ¯ ¯

console.log(solution.toJSON())
// [
//   { row: 0, column: 0 },
//   { row: 1, column: 0 },
//   { row: 2, column: 0 },
//   { row: 2, column: 1 },
//   { row: 3, column: 1 },
//   { row: 4, column: 1 },
//   { row: 4, column: 2 },
//   { row: 4, column: 3 },
//   { row: 3, column: 3 },
//   { row: 3, column: 4 },
//   { row: 4, column: 4 }
// ]

```
## Support
* Donations to support this project - or even just to say thanks - are welcome here. Please donate via my [Kofi page](https://ko-fi.com/jringram).
## Acknowledgments
* README format based off of [PurpleBooth's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
