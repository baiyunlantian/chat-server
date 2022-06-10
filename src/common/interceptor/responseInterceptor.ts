import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(map(response => {
      return {
        code:response.code || 200,
        data:response.data || null,
        msg:response.msg || '',
      }
    }));
  }
}