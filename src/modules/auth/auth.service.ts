import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  private readonly users: any[]

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
    this.users = [
      {
        userId: 1,
        username: 'yzh',
        password: 'e10adc3949ba59abbe56e057f20f883e',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'e10adc3949ba59abbe56e057f20f883e',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'e10adc3949ba59abbe56e057f20f883e',
      },
    ]
  }

  async login(user: User) {
    const payload = {username:user.username, sub: user.userId};
    return {
      msg:'登陆成功',
      data:{
        access_token:this.jwtService.sign(payload)
      }
    }
  }

  async register(user: User) {
    const isExit = this.users.find(item => item.username === user.username);
    if (isExit) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'用户名已存在!'
      }, HttpStatus.BAD_REQUEST);
    }else {
      return {
        msg:'注册成功',
        data:null,
        code:200
      }
    }
  }

  async validateUser(username:string, password:string):Promise<any> {
    const user = this.users.find(user => user.username === username);
    if (!user) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'不存在该账号!'
      }, HttpStatus.BAD_REQUEST);
    }else if (password !== user.password) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'密码不正确!'
      }, HttpStatus.BAD_REQUEST);
    }
    return user
  }
}