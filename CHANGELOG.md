# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
