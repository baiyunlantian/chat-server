import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status, msg, isHttpException = exception instanceof HttpException;

    // 判断错误类型是否是 HttpException类型
    if (isHttpException) {
      const exceptionRes: any = exception.getResponse();
      status = exception.getStatus();
      msg = exceptionRes.message;
    }else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      msg = '服务器异常';
    }

    if(status === 401) {
      msg = '身份过期，请重新登录';
    }

    response
      .status(isHttpException ? 200 : status)
      .json({
        code:status,
        msg
      })
  }
}