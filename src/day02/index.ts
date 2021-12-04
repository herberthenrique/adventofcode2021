import { readFileIntoStringArray } from '../io';

const INSTRUCTIONS = {
  FORWARD: 'forward',
  UP: 'up',
  DOWN: 'down',
};

export const calculatePosition = async () => {
  const instructions = await readFileIntoStringArray('./data/day2.txt');
  let horizontalPosition = 0;
  let depthPosition = 0;

  instructions.forEach((instruction) => {
    const [direction, stepsString] = instruction.split(' ');
    const steps = parseInt(stepsString);
    switch (direction) {
      case INSTRUCTIONS.FORWARD:
        horizontalPosition += steps;
        break;
      case INSTRUCTIONS.UP:
        depthPosition -= steps;
        break;
      case INSTRUCTIONS.DOWN:
        depthPosition += steps;
        break;
    }
  });

  const finalHorizontalPosition = depthPosition * horizontalPosition;
  console.log('depthPosition: ', depthPosition);
  console.log('horizontalPosition: ', horizontalPosition);
  console.log('finalHorizontalPosition: ', finalHorizontalPosition);
};

export const calculatePositionWithAim = async () => {
  const instructions = await readFileIntoStringArray('./data/day2.txt');
  let horizontalPosition = 0;
  let depthPosition = 0;
  let aim = 0;

  instructions.forEach((instruction) => {
    const [direction, stepsString] = instruction.split(' ');
    const steps = parseInt(stepsString);
    switch (direction) {
      case INSTRUCTIONS.FORWARD:
        horizontalPosition += steps;
        depthPosition += aim * steps;
        break;
      case INSTRUCTIONS.UP:
        aim -= steps;
        break;
      case INSTRUCTIONS.DOWN:
        aim += steps;
        break;
    }
  });

  const finalHorizontalPosition = depthPosition * horizontalPosition;
  console.log('depthPosition: ', depthPosition);
  console.log('horizontalPosition: ', horizontalPosition);
  console.log('finalHorizontalPosition: ', finalHorizontalPosition);
};
