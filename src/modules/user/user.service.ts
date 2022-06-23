import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  getHello(params?:any) {
    console.log('getHello', params)
    if (params.username === 'yzh') {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'用户名已存在!'
      }, HttpStatus.BAD_REQUEST);
    }else {
      return {
        msg:'失败',
        data:null,
        code:200
      }
    }
  }

  async findOneByUsername(username:string) {
    return await this.userRepository.findOne({username});
  }
}