import { readFileIntoStringArray } from '../io';

type Point = { x: number; y: number };

const getPoints = (input: string): Point => {
  const [x, y] = input.split(',').map(Number);
  return { x, y };
};

type Coordinate = {
  start: Point;
  end: Point;
};

const findBiggestsNumber = (coordinates: Coordinate[]): number[] => {
  let biggestX = 0;
  let biggestY = 0;

  coordinates.forEach((coordinate) => {
    if (coordinate.start.x > biggestX) {
      biggestX = coordinate.start.x;
    }

    if (coordinate.end.x > biggestX) {
      biggestX = coordinate.end.x;
    }

    if (coordinate.start.y > biggestY) {
      biggestY = coordinate.start.y;
    }

    if (coordinate.end.y > biggestY) {
      biggestY = coordinate.end.y;
    }
  });

  return [biggestX, biggestY];
};

const createBoard = (biggestX: number, biggestY: number): number[][] =>
  Array.from({ length: biggestY + 1 + 1 }).map(() =>
    Array.from({ length: biggestX + 1 }).map(() => 0),
  );

export const findCoordinatesIntersection = async () => {
  const coordinatesInput = await readFileIntoStringArray('./data/day5.txt');
  const coordinates = coordinatesInput.map((coordinate) => {
    const [start, end] = coordinate.split(' -> ');
    return {
      start: getPoints(start),
      end: getPoints(end),
    } as Coordinate;
  });

  const [biggestX, biggestY] = findBiggestsNumber(coordinates);
  const board = createBoard(biggestX, biggestY);
  fillBoard(board, coordinates);
};

function fillBoard(board: number[][], coordinates: Coordinate[]) {
  let total = 0;

  coordinates.forEach((coordinate) => {
    const endX =
      coordinate.start.x < coordinate.end.x
        ? coordinate.end.x
        : coordinate.start.x;
    const startX =
      coordinate.start.x > coordinate.end.x
        ? coordinate.end.x
        : coordinate.start.x;

    const endY =
      coordinate.start.y < coordinate.end.y
        ? coordinate.end.y
        : coordinate.start.y;
    const startY =
      coordinate.start.y > coordinate.end.y
        ? coordinate.end.y
        : coordinate.start.y;

    if (
      coordinate.start.x === coordinate.end.x ||
      coordinate.start.y === coordinate.end.y
    ) {
      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          board[y][x] += 1;
          if (board[y][x] === 2) {
            total += 1;
          }
        }
      }
    } else {
      const xDifference = coordinate.end.x - coordinate.start.x;
      const xMultiplier = xDifference >= 0 ? 1 : -1;
      const yDifference = coordinate.end.y - coordinate.start.y;
      const yMultiplier = yDifference >= 0 ? 1 : -1;

      let counter = 0;
      const [start, end] =
        xDifference > yDifference ? [startX, endX] : [startY, endY];

      for (let i = start; i <= end; i++) {
        const x = coordinate.start.x + counter * xMultiplier;
        const y = coordinate.start.y + counter * yMultiplier;
        board[y][x] += 1;
        if (board[y][x] === 2) {
          total += 1;
        }
        counter += 1;
      }
    }
  });
  console.log('total: ', total);
}
