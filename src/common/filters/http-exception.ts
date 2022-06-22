import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionRes: any = exception.getResponse();
    let message = exceptionRes.message;
    console.log(exception);

    if(status === 401) {
      message = '身份过期，请重新登录';
    }

    response
      .status(200)
      .json({
        code:status,
        data:null,
        msg:message
      })
  }
}