// Node Modules
import { createReadStream, createWriteStream } from 'fs';
import { createInterface } from 'readline';

// Custom Modules
import { DataFile, Line, LineType } from './options';

export class RobotsGenerator {
  // remove whitespace before & after line to make writing each line easier
  private trimWhitespace(line: string): string {
    return line.trim();
  }
  public async generateFile() {

  private fileDataGet(): Promise<string> {
    return new Promise((resolve, reject) => {
      // create empty string for returning data
      let dataFile: string = '';
      // get path for data file
      const path = `${__dirname}/data.robots.json`;
      // create interface with the read stream
      const readline = createInterface({
        input: createReadStream(path),
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

  private async fileDataParse(): Promise<DataFile> {
  // flag lines with comments
  private isComment(line: Line): boolean {
    if (line.type === LineType.comment) return true;
    return false;
  }

  // flag blank lines
  private isBlank(line: Line): boolean {
    if (line.type === LineType.blank) return true;
    return false;
  }

  // each directive in the robots file is separated by colon
  private combineLine(line: Line): string {
    return `${line.type}: ${line.content}\n`;
  }

  // parse file into array format
  private parseArrayIntoLine(line: Line): string {
    // check to see if the line is a comment
    const isComment = this.isComment(line);
    // if the line is a comment, return line in format
    if (isComment) return `#${line.content}\n`;
    // check to see if the line is blank
    const isBlank = this.isBlank(line);
    // if the line is blank, return line in format
    if (isBlank) return '\n';
    // otherwise, combine line and return values
    return this.combineLine(line);
  }

}
