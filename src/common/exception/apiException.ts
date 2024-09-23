import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { CustomException } from './customException';

@Catch()
export class ApiException implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const code =
      exception instanceof CustomException
        ? exception.getCode()
        : HttpStatus.BAD_REQUEST;

    const message =
      exception instanceof CustomException ? exception.getMessage() : '';

    const errorResponse = {
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    response.json(errorResponse);
  }
}
