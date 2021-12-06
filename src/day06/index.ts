import { readFileIntoStringArray } from '../io';

const populateMap = (num: number) => {
  const map = {} as { [key: string]: number };
  console.log('map: ', map);
  for (let i = 0; i < num; i++) {
    map[i.toString()] = 0;
  }
  return map;
};

const addFishesToMap = (map: { [key: string]: number }, fishes: number[]) => {
  fishes.forEach((fish) => {
    map[fish.toString()] += 1;
  });
  return map;
};

export const countFishes = async () => {
  const [input] = await readFileIntoStringArray('./data/day6.txt');
  const startingFishes = input.split(',').map(Number);
  let previousDay = 0;
  let aux = 0;
  const map = addFishesToMap(populateMap(9), startingFishes);
  console.log('map: ', map);
  for (let i = 0; i < 256; i++) {
    previousDay = 0;

    Object.keys(map)
      .slice()
      .reverse()
      .forEach((key) => {
        aux = map[key] + 0;
        map[key] = previousDay + 0;
        if (key !== '0') {
          previousDay = aux + 0;
        } else {
          map['8'] = map['8'] + aux;
          map['6'] = map['6'] + aux;
        }
      });
  }

  const count = Object.keys(map).reduce((acc, key) => {
    return acc + map[key];
  }, 0);
  console.log('count: ', count);
  console.log('map: ', map);
};
