import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Like, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { createWriteStream, createReadStream } from "fs";
import { join } from "path";

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

  async uploadAvatarByUserId(userId:string, file:Express.Multer.File) {
    if (!userId) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'field userId is not exit!'
      }, HttpStatus.BAD_REQUEST)
    }

    const user = await this.findOneByUserId(userId);

    const random = Date.now() + '&';
    const stream = createWriteStream(join('public/avatar', random + file.originalname));
    stream.write(file.buffer);
    user.avatar = `/avatar/${random}${file.originalname}`;
    await this.userRepository.save(user);
    return { msg: '修改头像成功', data: user};
  }

  async updateInfo(param: User) {
    const {userId, username, password} = param;
    const user = await this.findOneByUserId(userId);
    user.username = username;
    user.password = password;
    await this.userRepository.save(user);

    return { msg: '修改用户信息成功', data: user};
  }

  async findOneByUserId(userId:string) {
    const user = await this.userRepository.findOne({userId});
    if (!user) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'用户不存在!'
      }, HttpStatus.BAD_REQUEST)
    }
    return user;
  }

  async findOneByUsername(username:string) {
    const user = await this.userRepository.findOne({username});
    return user;
  }

  // 通过username模糊查询
  async findListByUsername(params:any) {
    const {username, userId} = params
    if (!username) {
      return {
        msg:'',
        data:[]
      }
    }
    const list = await this.userRepository.find({
      username: Like(`%${username}%`)
    });
    return {
      msg:'',
      data:list.filter(user=>user.userId !== userId)
    }
  }
}