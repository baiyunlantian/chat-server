import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger';
import { HttpExceptionFilter } from './common/filters/http-exception';
import { ResponseInterceptor } from './common/interceptor/responseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 日志
  app.use(logger);

  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3025);
}
bootstrap();
