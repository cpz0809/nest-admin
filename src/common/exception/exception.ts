export class Exception {
  code: number;
  message: string;
  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
  getCode() {
    return this.code;
  }

  getMessage() {
    return this.message;
  }
}
