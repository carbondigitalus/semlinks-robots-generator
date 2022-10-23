export declare enum LineType {
    allow = "allow",
    blank = "blank",
    comment = "comment",
    crawlDelay = "crawl-delay",
    disallow = "disallow",
    sitemap = "sitemap",
    userAgent = "user-agent",
    other = "other"
}
export interface Line {
    type: LineType;
    content: string;
}
export interface DataFile {
    data: Line[];
}
