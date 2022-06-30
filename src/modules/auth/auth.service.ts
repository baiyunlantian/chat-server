import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(param: User) {
    const user:User = await this.userService.findOneByUsername(param.username);
    const { password, ...userInfo } = user

    const payload = {username:userInfo.username, sub: userInfo.userId};
    return {
      code:200,
      msg:'登陆成功',
      data:{
        access_token:this.jwtService.sign(payload),
        ...userInfo
      }
    }
  }

  async register(param: User) {
    const {username, password} = param;
    const user = await this.userService.findOneByUsername(param.username);

    if (user) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'用户名已存在!'
      }, HttpStatus.BAD_REQUEST);
    }
    else {
      await this.userRepository.save(param);

      return {
        msg:'注册成功',
        data:null,
        code:200
      }
    }
  }
}