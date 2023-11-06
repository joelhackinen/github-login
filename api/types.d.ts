interface MapElement {
  method: string;
  pattern: URLPattern;
  fn: (request: Request, pattern?: URLPatternResult) => Promise<Response>;
}