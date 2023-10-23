# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
### Dependencies
* Bump `@babel/traverse` from `7.21.2` to `7.23.2`.
* Bump `husky` from `8.0.1` to `8.0.3`.
* Bump `jest` from `29.1.2` to `29.7.0`.

## [3.1.2] - 2023-01-25
### Dependencies
* Bump json5 from `2.2.1` to `2.2.3`.

## [3.1.1] - 2022-10-11
### Added
* Maze Solver accessible via the `generateSolution` function on the returned maze.

### Dependencies
* Bump jest from `27.5.1` to `29.1.2` 
* Bump husky from `7.0.4` to `8.0.1`
* Bump minimist from `1.2.5` to `1.2.6`
* Bump semistandard from `16.0.0` to `16.0.1`.

## [3.0.1] - 2022-02-26
### Added
* Donation Link
### Changes
* Bump jest from `26.6.3` to `27.5.1`.
* Bump tmpl from `1.0.4` to `1.0.5`.
* Bump browserslist from `4.16.3` to `4.19.3`.
* Bump ws from `7.4.4` to `7.5.7`.
* Bump hosted-git-info from `2.8.8` to `2.8.9`.
* Bump path-parse from `1.0.6` to `1.0.7`.

## [3.0.0] - 2021-05-18
### Changes
* Package now takes an `options` object as its parameter (which contains height, width, seed and algorithm) rather than taking 4 individual parameters.
* Bump from semi-standard `14.2.3` to `16.0.0`.
* Bump jest from `26.5.2` to `26.6.3`.
* Test coverage improved.
* Bump prando from 5.1.2 to 6.0.1. 

## [2.1.0] - 2020-10-10
### Added
* Additional error handling
* New tests

### Changes
* New max dimensions, to stop heap out of memory errors
* Minor documentation fixes

## [2.0.0] - 2020-04-21
### Added
* Ability to use a seeded random number generator to generate a maze.
* Feature request template.
* .npmignore.
* Hunt and kill algorithm.
* Created a CONTRIBUTING.md file

### Changes
* String representation of the maze to be more clear
* Bump jest from 25.1.0 to 25.4.0
* Improved bug report template.
* Order of parameters for generateMaze.
* Tidied tests and remove unused functions.
* Restructured README:
    * Added links to changelog and contributing
    * Added algorithm descriptions
* Moved linting and unit tests to distinct jobs in circleci

### Security 
* Bump acorn from 6.4.0 to 6.4.1 

## [1.0.2] - 2020-02-24
### Fixed
* Remove duplicate badge in README
* Add link to release version for v1.0.1
* Update README to reference name of the package in NPM

## [1.0.1] - 2020-02-23
### Added
* Badges to README

### Fixed
* Fixed issues with README

## [1.0.0] - 2020-02-23

### Added
* Ability to generate maze using the Recursive Backtracker / Depth First Algorithm.
* Ability to get string representation of the maze.
* Ability to get JSON object representation of the maze.

[1.0.0]: https://github.com/jringram/maze-gen/releases/tag/v1.0.0
[1.0.1]: https://github.com/jringram/maze-gen/releases/tag/v1.0.1
[1.0.2]: https://github.com/jringram/maze-gen/releases/tag/v1.0.2
[2.0.0]: https://github.com/jringram/maze-gen/releases/tag/v2.0.0
[2.1.0]: https://github.com/jringram/maze-gen/releases/tag/v2.1.0
[3.0.0]: https://github.com/jringram/maze-gen/releases/tag/v3.0.0
[3.0.1]: https://github.com/jringram/maze-gen/releases/tag/v3.0.1
[3.1.1]: https://github.com/jringram/maze-gen/releases/tag/v3.1.1
[3.1.2]: https://github.com/jringram/maze-gen/releases/tag/v3.1.2