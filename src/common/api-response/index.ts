export class ApiResponse {
  private code: number;
  private message: string;
  private data: any;
  private static OK_STATUS = 200;
  private static OK_SUCCESS = 'success';

  constructor(code?: number, message?: string) {
    if (!code || !message) {
      this.code = ApiResponse.OK_STATUS;
      this.message = ApiResponse.OK_SUCCESS;
    } else {
      this.code = code;
      this.message = message;
    }
  }

  public static success(obj?: any) {
    const success = new ApiResponse();
    success.setData(!obj ? '操作成功' : obj);
    return success;
  }

  public static error(exceptionEnum: { code: number; message: string }) {
    return new ApiResponse(exceptionEnum.code, exceptionEnum.message);
  }

  private setData(obj: any) {
    this.data = obj;
  }
}
