"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileIntoStringArray = exports.readFileIntoArray = exports.readFile = void 0;
var fs_1 = __importDefault(require("fs"));
var readFile = function (filePath) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(filePath, function (err, data) {
            if (err) {
                console.log('err: ', err);
                reject(err);
            }
            else {
                resolve(data.toString());
            }
        });
    });
};
exports.readFile = readFile;
var readFileIntoArray = function (filePath) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(filePath, function (err, data) {
            if (err) {
                console.log('err: ', err);
                reject(err);
            }
            else {
                resolve(data.toString().split('\n').map(Number));
            }
        });
    });
};
exports.readFileIntoArray = readFileIntoArray;
var readFileIntoStringArray = function (filePath) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(filePath, function (err, data) {
            if (err) {
                console.log('err: ', err);
                reject(err);
            }
            else {
                resolve(data.toString().split('\n'));
            }
        });
    });
};
exports.readFileIntoStringArray = readFileIntoStringArray;
