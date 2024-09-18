import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { GlobalExceptionHandler } from './common/exception/globalExceptionHandler';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 参数校验
  app.useGlobalPipes(new ValidationPipe());
  // 异常处理
  app.useGlobalFilters(new GlobalExceptionHandler());
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
