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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submarineLifeSupport = exports.submarineConsuption = void 0;
var io_1 = require("../io");
var submarineConsuption = function () { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, byteCount, startArray, initialState, count, invertedBinaryResults, index, elementOne, elementZero, binaryResults, numberResults, finalResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, io_1.readFileIntoStringArray)('./data/day3.txt')];
            case 1:
                inputs = _a.sent();
                byteCount = inputs[0].length;
                startArray = Array.from({ length: byteCount }, function () { return 0; });
                initialState = {
                    one: __spreadArray([], startArray, true),
                    zero: __spreadArray([], startArray, true),
                };
                count = inputs.reduce(function (acc, line) {
                    var binaries = line.split('').slice().reverse().map(Number);
                    for (var index = 0; index < binaries.length; index++) {
                        var element = binaries[index];
                        if (element === 1) {
                            acc.one[index]++;
                        }
                        else {
                            acc.zero[index]++;
                        }
                    }
                    return acc;
                }, initialState);
                invertedBinaryResults = {
                    gammaRate: '',
                    epsilonRate: '',
                };
                for (index = 0; index < count.one.length; index++) {
                    elementOne = count.one[index];
                    elementZero = count.zero[index];
                    if (elementOne > elementZero) {
                        invertedBinaryResults.gammaRate += '1';
                        invertedBinaryResults.epsilonRate += '0';
                    }
                    else {
                        invertedBinaryResults.gammaRate += '0';
                        invertedBinaryResults.epsilonRate += '1';
                    }
                }
                binaryResults = {
                    gammaRate: invertedBinaryResults.gammaRate.split('').reverse().join(''),
                    epsilonRate: invertedBinaryResults.epsilonRate.split('').reverse().join(''),
                };
                console.log('binaryResults: ', binaryResults);
                numberResults = {
                    gammaRate: parseInt(binaryResults.gammaRate, 2),
                    epsilonRate: parseInt(binaryResults.epsilonRate, 2),
                };
                console.log('numberResults: ', numberResults);
                finalResult = numberResults.gammaRate * numberResults.epsilonRate;
                console.log('finalResult: ', finalResult);
                return [2 /*return*/];
        }
    });
}); };
exports.submarineConsuption = submarineConsuption;
var calculateCommon = function (binaries, searchPosition, searchCriteria) {
    if (binaries.length === 1) {
        return binaries[0];
    }
    var aggregator = {
        '0': [],
        '1': [],
    };
    binaries.forEach(function (binary) {
        var position = binary[searchPosition];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        aggregator[position].push(binary);
    });
    var mostCommon = '';
    if (searchCriteria === 'more') {
        mostCommon = aggregator['1'].length >= aggregator['0'].length ? '1' : '0';
    }
    else {
        mostCommon = aggregator['0'].length <= aggregator['1'].length ? '0' : '1';
    }
    return calculateCommon(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    aggregator[mostCommon], searchPosition + 1, searchCriteria);
};
var submarineLifeSupport = function () { return __awaiter(void 0, void 0, void 0, function () {
    var inputs, binaries, binaryOxygenGeneratorRating, binaryCO2scrubberRating, lifeSupplyRating;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, io_1.readFileIntoStringArray)('./data/day3.txt')];
            case 1:
                inputs = _a.sent();
                binaries = inputs.map(function (input) { return input.split('').slice(); });
                binaryOxygenGeneratorRating = calculateCommon(binaries, 0, 'more').join('');
                binaryCO2scrubberRating = calculateCommon(binaries, 0, 'less').join('');
                lifeSupplyRating = parseInt(binaryOxygenGeneratorRating, 2) *
                    parseInt(binaryCO2scrubberRating, 2);
                console.log('lifeSupplyRating: ', lifeSupplyRating);
                return [2 /*return*/];
        }
    });
}); };
exports.submarineLifeSupport = submarineLifeSupport;
