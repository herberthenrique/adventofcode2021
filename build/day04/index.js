"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playBingo = void 0;
var io_1 = require("../io");
var getBoards = function (input) {
    var bingoBoard = [];
    var boardIndex = -1;
    input.forEach(function (line) {
        console.log('line: ', line);
        if (!line) {
            boardIndex++;
            bingoBoard.push([]);
            return;
        }
        var rows = line
            .trim()
            .split(' ')
            .filter(function (row) { return row !== '' && row !== ' '; })
            .map(function (item) { return ({ num: Number(item), isMarked: false }); });
        bingoBoard[boardIndex].push(rows);
    });
    return bingoBoard;
};
var playBingo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, drawsInput, boardsInput, draws, board, markedBoard, winningBoards;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, io_1.readFileIntoStringArray)('./data/day4.txt')];
            case 1:
                inputs = _a.sent();
                drawsInput = inputs[0], boardsInput = inputs.slice(1);
                draws = drawsInput.trim().split(',').map(Number);
                console.log('draws: ', draws);
                board = getBoards(boardsInput);
                markedBoard = {};
                winningBoards = [];
                drawNumber(draws, board, markedBoard, winningBoards);
                return [2 /*return*/];
        }
    });
}); };
exports.playBingo = playBingo;
function drawNumber(draws, boards, markedBoard, winningBoards) {
    var currentDraw = draws[0], nextDraws = draws.slice(1);
    boards.forEach(function (board, boardIndex) {
        board.forEach(function (row, rowIndex) {
            row.forEach(function (item, itemIndex) {
                if (item.num === currentDraw) {
                    item.isMarked = true;
                    var _a = markBoard(boardIndex.toString(), rowIndex.toString(), itemIndex.toString(), markedBoard, winningBoards), isWinner = _a.isWinner, newMarkedBoard = _a.boardMarked, winnerBoard = _a.winnerBoard;
                    markedBoard = newMarkedBoard;
                    if (isWinner) {
                        calculateWinnerBoard(boards, currentDraw, winnerBoard, winningBoards);
                    }
                }
            });
        });
    });
    if (nextDraws.length && winningBoards.length < boards.length) {
        drawNumber(nextDraws, boards, markedBoard, winningBoards);
    }
    else {
        console.log('no winner');
    }
}
function markBoard(boardIndex, rowIndex, itemIndex, boardMarked, winningBoards) {
    if (winningBoards.includes(Number(boardIndex))) {
        return { isWinner: false, boardMarked: boardMarked };
    }
    if (!boardMarked[boardIndex]) {
        boardMarked[boardIndex] = { columns: {}, rows: {} };
    }
    if (!boardMarked[boardIndex].columns[itemIndex]) {
        boardMarked[boardIndex].columns[itemIndex] = 0;
    }
    if (!boardMarked[boardIndex].rows[rowIndex]) {
        boardMarked[boardIndex].rows[rowIndex] = 0;
    }
    boardMarked[boardIndex].columns[itemIndex] += 1;
    boardMarked[boardIndex].rows[rowIndex] += 1;
    if (boardMarked[boardIndex].columns[itemIndex] === 5 ||
        boardMarked[boardIndex].rows[rowIndex] === 5) {
        return { isWinner: true, boardMarked: boardMarked, winnerBoard: Number(boardIndex) };
    }
    return { isWinner: false, boardMarked: boardMarked };
}
function calculateWinnerBoard(boards, drawNumber, winnerBoard, winningBoards) {
    if (!winnerBoard) {
        return;
    }
    var sumUnmarked = 0;
    var winnerBoardItems = boards[winnerBoard];
    if (winningBoards.includes(winnerBoard)) {
        return;
    }
    winningBoards.push(winnerBoard);
    console.log('winningBoards: ', winningBoards);
    winnerBoardItems.forEach(function (row) {
        row.forEach(function (item) {
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
