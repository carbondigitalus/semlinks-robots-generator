// Node Modules
import { createReadStream, createWriteStream } from 'fs';
import { createInterface } from 'readline';

// Custom Modules
import { DataFile, Line, LineType } from './options';

export class RobotsGenerator {
  private fileDataParse() {}

    // check for disallow and return values
    const isDisallow = this.checkDirective(parsedLine, LineType.disallow);
    if (isDisallow) return { type: LineType.disallow, content: parsedLine.value };
    // check for allow and return values
    const isAllow = this.checkDirective(parsedLine, LineType.allow);
    if (isAllow) return { type: LineType.allow, content: parsedLine.value };
    // check for crawl-delay and return values
    const isCrawlDelay = this.checkDirective(parsedLine, LineType.crawlDelay);
    if (isCrawlDelay) return { type: LineType.crawlDelay, content: parsedLine.value };
    // check for sitemap and return values
    const isSitemap = this.checkDirective(parsedLine, LineType.sitemap);
    if (isSitemap) {
      return {
        type: LineType.sitemap,
        content: parsedLine.value.toLowerCase()
      };
    }
    return { type: LineType.other, content: parsedLine };
  // remove whitespace before & after line to make writing each line easier
  private trimWhitespace(line: string): string {
    return line.trim();
  }
  // NOT DONE
  public async generateFile() {
  private fileDataGet(): Promise<string> {
    return new Promise((resolve, reject) => {
      // create empty array for returning data
      let fileData: any = [];
      // create interface with the read stream
      const readline = createInterface({
        input: createReadStream('filePath', 'utf8'),
        crlfDelay: Infinity
      });
      // for each line being read, the line event kicks off
      readline.on('line', (line) => {
        // format each line into array
        const lineArray = this.parseLineIntoArray(line);
        // console.log('readFile, array:\n', lineArray);
        // push line into array
        fileData.push(lineArray);
        return fileData;
      });
      readline.on('error', (error) => {
        console.log('parseFile error:\n', error);
        reject(error);
      });
      // when all lines are read, close the stream
      readline.on('close', () => {
        console.log('updated array data:\n', fileData);
        resolve(fileData);
      });
    });
  }
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
