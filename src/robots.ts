// Node Modules
import { createReadStream, readFileSync } from 'fs';
import { createInterface } from 'readline';

// Custom Modules
import { Line, LineSplit, LineType } from './options';

  // remove whitespace before & after line to make parsing each line easier
  private trimWhitespace(line: string): string {
    return line.trim();
  }
export class RobotsGenerator {

  // flag lines with comments
  private isComment(line: string): boolean {
    // the # character starts a comment
    const commentCharacterFlag = '#';
    return line.substring(1) === commentCharacterFlag;
  }

  // flag blank lines
  private isBlank(line: string): boolean {
    const cleanLine = this.trimWhitespace(line);
    if (cleanLine === '' || cleanLine === ' ') {
      return true;
    }
    return false;
  }

  // split line by ":"
  // each directive in the robots file is separated by colon
  private splitLine(line: string): LineSplit {
    const len = line.length;
    const colonIndex = line.indexOf(':');
    return {
      directive: line.substring(0, colonIndex).toLowerCase(),
      value: line.substring(colonIndex + 1, len)
    };
  }

  // check for user-agent
  private checkDirective(line: LineSplit, value: LineType): boolean {
    // @ts-ignore-next-line
    return line.directive.toLowerCase().includes(value);
  }

  // parse file into array format
  private parseLineIntoArray(line: string): Line {
    // trim spaces before-after line
    const trimmedLine = this.trimWhitespace(line);
    // check to see if the line is a comment
    const isComment = this.isComment(trimmedLine);
    // if the line is a comment, return line in format
    if (isComment) return { type: LineType.comment, content: trimmedLine };
    const isBlank = this.isBlank(trimmedLine);
    if (isBlank) return { type: LineType.blank, content: '' };
    // otherwise, split line and parse values
    const parsedLine = this.splitLine(trimmedLine);
    // check for user-agent and return values
    const isUserAgent = this.checkDirective(parsedLine, LineType.userAgent);
    if (isUserAgent) {
      return {
        type: LineType.userAgent,
        content: this.trimWhitespace(parsedLine.value)
      };
    }
    // check for disallow and return values
    const isDisallow = this.checkDirective(parsedLine, LineType.disallow);
    if (isDisallow) return { type: LineType.disallow, content: this.trimWhitespace(parsedLine.value) };
    // check for allow and return values
    const isAllow = this.checkDirective(parsedLine, LineType.allow);
    if (isAllow) return { type: LineType.allow, content: this.trimWhitespace(parsedLine.value) };
    // check for crawl-delay and return values
    const isCrawlDelay = this.checkDirective(parsedLine, LineType.crawlDelay);
    if (isCrawlDelay) return { type: LineType.crawlDelay, content: parsedLine.value };
    // check for sitemap and return values
    const isSitemap = this.checkDirective(parsedLine, LineType.sitemap);
    if (isSitemap) {
      return {
        type: LineType.sitemap,
        content: this.trimWhitespace(parsedLine.value.toLowerCase())
      };
    }
    return { type: LineType.other, content: parsedLine };
  }

  public async parseFile(filePath: string) {
    return new Promise((resolve, reject) => {
      // create empty array for returning data
      let fileData: any = [];
      // create interface with the read stream
      const readline = createInterface({
        input: createReadStream(filePath, 'utf8'),
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

  public logFile(filePath: string) {
    const readStream = readFileSync(filePath, 'utf8');
    // console.log('parsed file:\n', readStream);
    return readStream;
  }
}
