export declare class RobotsGenerator {
    private trimWhitespace;
    private fileDataGet;
    private fileDataParse;
    private isComment;
    private isBlank;
    private combineLine;
    private parseArrayIntoLine;
    generateFile(outPath: string): Promise<boolean>;
}
