import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
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
  async validate(username:string, password:string) {
    return await this.authService.validateUser(username, password);
  }
}