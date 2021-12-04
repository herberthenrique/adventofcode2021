import { readFileIntoStringArray } from '../io';

type Point = { one: number[]; zero: number[] };

export const submarineConsuption = async () => {
  const inputs = await readFileIntoStringArray('./data/day3.txt');

  const byteCount = inputs[0].length;
  const startArray = Array.from({ length: byteCount }, () => 0);

  const initialState: Point = {
    one: [...startArray],
    zero: [...startArray],
  };

  const count = inputs.reduce((acc: Point, line: string) => {
    const binaries = line.split('').slice().reverse().map(Number);

    for (let index = 0; index < binaries.length; index++) {
      const element = binaries[index];
      if (element === 1) {
        acc.one[index]++;
      } else {
        acc.zero[index]++;
      }
    }

    return acc;
  }, initialState);

  const invertedBinaryResults = {
    gammaRate: '',
    epsilonRate: '',
  };

  for (let index = 0; index < count.one.length; index++) {
    const elementOne = count.one[index];
    const elementZero = count.zero[index];
    if (elementOne > elementZero) {
      invertedBinaryResults.gammaRate += '1';
      invertedBinaryResults.epsilonRate += '0';
    } else {
      invertedBinaryResults.gammaRate += '0';
      invertedBinaryResults.epsilonRate += '1';
    }
  }

  const binaryResults = {
    gammaRate: invertedBinaryResults.gammaRate.split('').reverse().join(''),
    epsilonRate: invertedBinaryResults.epsilonRate.split('').reverse().join(''),
  };

  console.log('binaryResults: ', binaryResults);

  const numberResults = {
    gammaRate: parseInt(binaryResults.gammaRate, 2),
    epsilonRate: parseInt(binaryResults.epsilonRate, 2),
  };
  console.log('numberResults: ', numberResults);

  const finalResult = numberResults.gammaRate * numberResults.epsilonRate;
  console.log('finalResult: ', finalResult);
};

const calculateCommon = (
  binaries: string[][],
  searchPosition: number,
  searchCriteria: 'more' | 'less',
): string[] => {
  if (binaries.length === 1) {
    return binaries[0];
  }
  const aggregator = {
    '0': [] as number[][],
    '1': [] as number[][],
  };

  binaries.forEach((binary) => {
    const position = binary[searchPosition];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    aggregator[position].push(binary);
  });

  let mostCommon = '';
  if (searchCriteria === 'more') {
    mostCommon = aggregator['1'].length >= aggregator['0'].length ? '1' : '0';
  } else {
    mostCommon = aggregator['0'].length <= aggregator['1'].length ? '0' : '1';
  }

  return calculateCommon(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    aggregator[mostCommon],
    searchPosition + 1,
    searchCriteria,
  );
};

export const submarineLifeSupport = async () => {
  const inputs = await readFileIntoStringArray('./data/day3.txt');
  const binaries = inputs.map((input) => input.split('').slice());

  const binaryOxygenGeneratorRating = calculateCommon(binaries, 0, 'more').join(
    '',
  );
  const binaryCO2scrubberRating = calculateCommon(binaries, 0, 'less').join('');

  const lifeSupplyRating =
    parseInt(binaryOxygenGeneratorRating, 2) *
    parseInt(binaryCO2scrubberRating, 2);
  console.log('lifeSupplyRating: ', lifeSupplyRating);
};
