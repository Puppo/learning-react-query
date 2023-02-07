export class ResponseError extends Error {
  constructor(message: string, public response: Response) {
    super(message);
  }
}
