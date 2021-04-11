'use strict'

const X = false; // wall
const _ = true; // pass

const startCoords = {
    x: 4,
    y: 0,
}

const mazeLeftExit = [
    [X,X,X,X,_,X,X,X,X], 
    [X,_,X,_,_,X,_,_,X], 
    [X,_,X,X,_,X,_,X,X], 
    [_,_,X,_,_,_,_,X,_], 
    [X,_,X,_,X,_,X,X,X], 
    [X,_,_,_,X,_,_,_,X], 
    [X,X,X,X,X,X,X,X,X],
];

const mazeRightExit = [
    [X,X,X,X,_,X,X,X,X], 
    [X,_,X,_,_,X,_,_,X], 
    [X,_,X,X,_,X,_,X,X], 
    [X,_,X,_,_,_,_,_,_], 
    [X,_,X,_,X,_,X,X,X], 
    [X,_,_,_,X,_,_,_,X], 
    [X,X,X,X,X,X,X,X,X],
];

const mazeBottomExit = [
    [X,X,X,X,_,X,X,X,X], 
    [X,_,X,_,_,X,_,_,X], 
    [X,_,X,X,_,X,_,X,X], 
    [X,_,X,_,_,_,_,X,_], 
    [X,_,X,_,X,_,X,X,X], 
    [X,_,_,_,X,_,_,_,X], 
    [X,X,X,_,X,X,X,X,X],
];

const mazeTopExit = [
    [X,X,X,X,_,X,X,_,X], 
    [X,_,X,_,_,X,_,_,X], 
    [X,_,X,X,_,X,_,X,X], 
    [X,_,X,_,_,_,_,X,_], 
    [X,_,X,_,X,_,X,X,X], 
    [X,_,_,_,X,_,_,_,X], 
    [X,X,X,X,X,X,X,X,X],
];


function walk(maze, currPos, path = []) {

    // check if we're not exceeding the boundaries of a maze
    if (currPos.x < 0 || currPos.x >= maze[0].length) return null;
    if (currPos.y < 0 || currPos.y >= maze.length) return null;

    // if we've got to the top or bottom edge of the maze, that's the exit, return the path
    if ((currPos.y === maze.length - 1 || (currPos.y === 0 && path.length > 0)) && maze[currPos.y][currPos.x] === true) {
        return [...path, {x: currPos.x, y: currPos.y}]
    }

    // if we've got to the right or left edge of the maze, that's the exit, return the path 
    if ((currPos.x === 0 || currPos.x === maze[0].length - 1) && maze[currPos.y][currPos.x] === true) {
        return [...path, {x: currPos.x, y: currPos.y}]
    }
    
    // prevent infinite loop
    if (maze[currPos.y][currPos.x] !== true) return null;

    // mark current position as visited
    maze[currPos.y][currPos.x] = false;

    // add the step to the stack
    path.push(currPos);

    // call the function recursively passing it the next potential step
    let nextStep = (walk(maze, {x: currPos.x, y: currPos.y + 1}, path)
            || walk(maze, {x: currPos.x + 1, y: currPos.y}, path)
            || walk(maze, {x: currPos.x, y: currPos.y - 1}, path)
            || walk(maze, {x: currPos.x - 1, y: currPos.y}, path))

    if (nextStep !== null) return nextStep;

    // clean up in case of walking into a deadend
    maze[currPos.y][currPos.x] = true;
    path.pop();

    // if there's no path to exit, return null
    return null;
}

console.log(walk(mazeLeftExit, startCoords));
console.log(walk(mazeRightExit, startCoords));
console.log(walk(mazeBottomExit, startCoords));
console.log(walk(mazeTopExit, startCoords));
