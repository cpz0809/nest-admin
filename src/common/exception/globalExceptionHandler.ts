import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ExceptionEnum } from './exceptionEnum';

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception.message);
    // console.log(host);
  }
}
