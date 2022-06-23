import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    /**
     *  PassportStrategy默认接受的参数字段名username、password
     *  可以自行修改
     * */
    super({
      usernameField:'username',
      passwordField:'password',
    } as IStrategyOptions);
  }

  // 自定义本地策略校验逻辑
  async validate(username:string, _password:string) {
    const user: User = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'不存在该账号!'
      }, HttpStatus.BAD_REQUEST);
    }else if (_password !== user.password) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'密码不正确!'
      }, HttpStatus.BAD_REQUEST);
    }

    const {password, ...userInfo} = user;
    return userInfo;
  }
}