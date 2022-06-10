import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      data:true,
      msg:'成功'
    }
  }
}
