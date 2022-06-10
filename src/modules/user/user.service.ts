import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello() {
    return {
      data:true,
      msg:'成功',
    }
  }
}