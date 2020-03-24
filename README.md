# maze-geneneration

![npm](https://img.shields.io/npm/v/maze-generation)
![NPM](https://img.shields.io/npm/l/maze-generation)
![CircleCI](https://img.shields.io/circleci/build/github/JRIngram/maze-gen)
![npm bundle size](https://img.shields.io/bundlephobia/min/maze-generation)

An npm package used to generate mazes. 

### Installing

Ensure `Node.js` is installed on your machine.

Run `npm i maze-generation`

### Usage

Add the following to your code (where width and height should be replaced by ints corresponding to how wide and tall you want your maze; and seed should be replaced by an int or string):

```
const mazegeneration = require('maze-generation');
// Generate a maze
const generatedMaze = mazegeneration(width,height,seed);
```

To get the string representation of the generated maze write:
```
const stringRepresentation = generatedMaze.toString();
console.log(stringRepresenation);
```

Example output:
```
 _ _ _ _ _ _ _ _ _ _
|  _ _ _  |_ _ _    |
| |_  |  _|  _ _ _| |
|   |_ _  |_  | |  _|
| |_  |_ _  | | | | |
|  _|_  |  _| | |  _|
|_|  _ _|_ _ _|  _| |
|  _|   |_ _ _ _|  _|
| |  _| |   |   |_  |
|  _|  _| |_ _|_ _ _|
|_ _|_ _ _ _ _ _ _ _|

```

To get the JSON representation of the generated maze write:

```
let JSONRepresentation = generatedMaze.toJSON();
```

The outputed JSON object has the following structure (example is a 3 by 3 cell):
```
    {
        rows: [
            [[Object],[Object],[Object]],
            [[Object],[Object],[Object]],
            [[Object],[Object],[Object]],
        ]
    };
```

Where each object is a Cell object, which as the following JSON structure:
```
    {  
        left: bool,
        right: bool, 
        up: bool, 
        down: bool, 
        visited: bool
    }
```

The `left`,`right`,`up`,`down` fields correspond to if the wall exists in that direction. The `visited` field corresponds to if the cell has been visited. This should be marked as `true` for all completed mazes.

## Running the tests
* `npm run test` to run [jest](https://jestjs.io/) tests.
* `npm run linter` to run linter. This project uses [SemiStandard](https://github.com/standard/semistandard) styling.

## Versioning
We use [SemVer](http://semver.org/) for versioning.


## Acknowledgments
* README format based off of [PurpleBooth's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
