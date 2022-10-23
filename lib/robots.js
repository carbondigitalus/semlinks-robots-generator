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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotsGenerator = void 0;
// Node Modules
const fs_1 = require("fs");
const readline_1 = require("readline");
// Custom Modules
const options_1 = require("./options");
class RobotsGenerator {
    // remove whitespace before & after line to make writing each line easier
    trimWhitespace(line) {
        return line.trim();
    }
    fileDataGet() {
        return new Promise((resolve, reject) => {
            // create empty string for returning data
            let dataFile = '';
            // get path for data file
            const path = `${__dirname}/data.robots.json`;
            // create interface with the read stream
            const readline = (0, readline_1.createInterface)({
                input: (0, fs_1.createReadStream)(path),
                crlfDelay: Infinity
            });
            readline.on('line', (line) => {
                // console.log('readline:\n', line);
                // return combined strings
                return (dataFile += `${line}`);
            });
            readline.on('error', (error) => {
                console.log('parseFile error:\n', error);
                reject(error);
            });
            // when all lines are read, close the stream
            readline.on('close', () => {
                // console.log('readline data read stream completed:\n', dataFile);
                resolve(dataFile);
            });
        });
    }
    fileDataParse() {
        return __awaiter(this, void 0, void 0, function* () {
            // import file string
            const file = yield this.fileDataGet();
            // console.log('fileDataParse file:\n', file);
            const data = JSON.parse(file);
            // console.log('fileDataParse data:\n', data);
            return data;
        });
    }
    // flag lines with comments
    isComment(line) {
        if (line.type === options_1.LineType.comment)
            return true;
        return false;
    }
    // flag blank lines
    isBlank(line) {
        if (line.type === options_1.LineType.blank)
            return true;
        return false;
    }
    // each directive in the robots file is separated by colon
    combineLine(line) {
        return `${line.type}: ${line.content}\n`;
    }
    // parse file into array format
    parseArrayIntoLine(line) {
        // check to see if the line is a comment
        const isComment = this.isComment(line);
        // if the line is a comment, return line in format
        if (isComment)
            return `#${line.content}\n`;
        // check to see if the line is blank
        const isBlank = this.isBlank(line);
        // if the line is blank, return line in format
        if (isBlank)
            return '\n';
        // otherwise, combine line and return values
        return this.combineLine(line);
    }
    generateFile(outPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataFile = '';
            // get file data
            const file = yield this.fileDataParse();
            // console.log('data:\n', file);
            file.data.forEach((line) => {
                const oneLine = this.parseArrayIntoLine(line);
                console.log(this.trimWhitespace(oneLine));
                return (dataFile += oneLine);
            });
            const writeFile = (0, fs_1.createWriteStream)(`${outPath}/robots.txt`, { encoding: 'utf8' });
            return writeFile.write(dataFile);
        });
    }
}
exports.RobotsGenerator = RobotsGenerator;
