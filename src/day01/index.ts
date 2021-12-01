import { readFileIntoArray } from '../io';

export const calculateIncreases = async () => {
  const numbers = await readFileIntoArray('./data/day1.txt');
  let totalIncreased = 0;
  let currentValue = numbers[0];
  numbers.forEach((number) => {
    if (number > currentValue) {
      totalIncreased += 1;
    }
    currentValue = number;
  });
  console.log('totalIncreased: ', totalIncreased);
};

export const calculateIncreasesInto3 = async () => {
  const numbers = await readFileIntoArray('./data/day1.txt');
  let totalIncreased = 0;
  let previousMappedValues: number[] = [];
  const currentMappedValues: number[] = [];

  numbers.forEach((number, index) => {
    if (currentMappedValues.length === 3) {
      currentMappedValues.shift();
    }
    currentMappedValues.push(number);

    // the first 3 interations are not relevant
    if (index > 3) {
      if (
        calculateMapSize(currentMappedValues) >
        calculateMapSize(previousMappedValues)
      ) {
        totalIncreased += 1;
      }
    }

    previousMappedValues = [...currentMappedValues];
  });
  console.log('totalIncreased: ', totalIncreased);
};

const calculateMapSize = (map: number[]): number =>
  map.reduce((aggregator, current) => aggregator + current, 0);
