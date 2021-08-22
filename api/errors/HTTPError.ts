export class HTTPError extends Error {
  statusCode: number;
  constructor(statusCode: number, msg: string) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export interface HTTPErrorInterface extends Error {
  statusCode: number;
}
