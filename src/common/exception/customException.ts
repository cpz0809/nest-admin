export class CustomException {
  private code: number;
  private message: string;
  constructor(exceptionEnum: { code: number; message: string }) {
    this.code = exceptionEnum.code;
    this.message = exceptionEnum.message;
  }
  getCode() {
    return this.code;
  }
  getMessage() {
    return this.message;
  }
}
