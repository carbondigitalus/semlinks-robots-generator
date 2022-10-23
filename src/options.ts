export enum LineType {
  comment = 'comment',
  userAgent = 'user-agent',
  allow = 'allow',
  disallow = 'disallow',
  sitemap = 'sitemap',
  crawlDelay = 'crawl-delay',
  blank = 'blank',
  other = 'other'
}
export interface Line {
  type: LineType;
  content: string;
}
}
