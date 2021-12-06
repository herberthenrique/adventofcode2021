import { readFileIntoStringArray } from '../io';

type BingoItem = {
  num: number;
  isMarked: boolean;
};

const getBoards = (input: string[]): BingoItem[][][] => {
  const bingoBoard: BingoItem[][][] = [];
  let boardIndex = -1;
  input.forEach((line) => {
    console.log('line: ', line);
    if (!line) {
      boardIndex++;
      bingoBoard.push([]);
      return;
    }

    const rows = line
      .trim()
      .split(' ')
      .filter((row) => row !== '' && row !== ' ')
      .map((item) => ({ num: Number(item), isMarked: false } as BingoItem));

    bingoBoard[boardIndex].push(rows);
  });

  return bingoBoard;
};

export const playBingo = async () => {
  const inputs = await readFileIntoStringArray('./data/day4.txt');
  const [drawsInput, ...boardsInput] = inputs;

  const draws = drawsInput.trim().split(',').map(Number);

  console.log('draws: ', draws);

  const board = getBoards(boardsInput);
  const markedBoard = {} as MarkedBoard;
  const winningBoards = [] as number[];

  drawNumber(draws, board, markedBoard, winningBoards);
};

function drawNumber(
  draws: number[],
  boards: BingoItem[][][],
  markedBoard: MarkedBoard,
  winningBoards: number[],
) {
  const [currentDraw, ...nextDraws] = draws;

  boards.forEach((board, boardIndex) => {
    board.forEach((row, rowIndex) => {
      row.forEach((item, itemIndex) => {
        if (item.num === currentDraw) {
          item.isMarked = true;

          const {
            isWinner,
            boardMarked: newMarkedBoard,
            winnerBoard,
          } = markBoard(
            boardIndex.toString(),
            rowIndex.toString(),
            itemIndex.toString(),
            markedBoard,
            winningBoards,
          );

          markedBoard = newMarkedBoard;
          if (isWinner) {
            calculateWinnerBoard(
              boards,
              currentDraw,
              winnerBoard,
              winningBoards,
            );
          }
        }
      });
    });
  });

  if (nextDraws.length && winningBoards.length < boards.length) {
    drawNumber(nextDraws, boards, markedBoard, winningBoards);
  } else {
    console.log('no winner');
  }
}

type BoardItem = {
  [key: string]: number;
};

type InnerBoard = {
  columns: BoardItem;
  rows: BoardItem;
};

type MarkedBoard = {
  [key: string]: InnerBoard;
};

type MarkedBoardResult = {
  isWinner: boolean;
  boardMarked: MarkedBoard;
  winnerBoard?: number;
};

function markBoard(
  boardIndex: string,
  rowIndex: string,
  itemIndex: string,
  boardMarked: MarkedBoard,
  winningBoards: number[],
): MarkedBoardResult {
  if (winningBoards.includes(Number(boardIndex))) {
    return { isWinner: false, boardMarked };
  }
  if (!boardMarked[boardIndex]) {
    boardMarked[boardIndex] = { columns: {}, rows: {} } as InnerBoard;
  }

  if (!boardMarked[boardIndex].columns[itemIndex]) {
    boardMarked[boardIndex].columns[itemIndex] = 0;
  }

  if (!boardMarked[boardIndex].rows[rowIndex]) {
    boardMarked[boardIndex].rows[rowIndex] = 0;
  }

  boardMarked[boardIndex].columns[itemIndex] += 1;
  boardMarked[boardIndex].rows[rowIndex] += 1;

  if (
    boardMarked[boardIndex].columns[itemIndex] === 5 ||
    boardMarked[boardIndex].rows[rowIndex] === 5
  ) {
    return { isWinner: true, boardMarked, winnerBoard: Number(boardIndex) };
  }

  return { isWinner: false, boardMarked };
}
function calculateWinnerBoard(
  boards: BingoItem[][][],
  drawNumber: number,
  winnerBoard: number | undefined,
  winningBoards: number[],
) {
  if (!winnerBoard) {
    return;
  }
  let sumUnmarked = 0;

  const winnerBoardItems = boards[winnerBoard];
  if (winningBoards.includes(winnerBoard)) {
    return;
  }
  winningBoards.push(winnerBoard);
  console.log('winningBoards: ', winningBoards);

  winnerBoardItems.forEach((row) => {
    row.forEach((item) => {
      if (!item.isMarked) {
        sumUnmarked += item.num;
      }
    });
  });

  console.log('sumUnmarked: ', sumUnmarked);
  console.log('drawNumber: ', drawNumber);
  console.log('final Result:', sumUnmarked * drawNumber);
  console.log('-------');
}
