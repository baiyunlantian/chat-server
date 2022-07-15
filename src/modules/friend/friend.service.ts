import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendMessage, UserMap } from './entity/friend.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class FriendService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(FriendMessage) private readonly friendMessageRepository: Repository<FriendMessage>,
    @InjectRepository(UserMap) private readonly userMapRepository: Repository<UserMap>
  ) {}

  async getFriendListByUserId(userId:string) {
    const friendList = await this.userMapRepository.find({userId});
    let infoList = [];
    let handleFns = friendList.map(({ friendId })=>this.userService.findOneByUserId(friendId));

    await Promise.all(handleFns).then(resList=>{
      resList.forEach(res=>infoList.push(res));
    });

    return {
      data:infoList
    }
  }

  async getFriendMessageList(param) {
    const {userId, friendId, current, pageSize} = param;
    const list = await this.friendMessageRepository.find({
      where:{userId, friendId},
      skip:(current-1) * pageSize,
      take:pageSize
    })

    return {
      data:{
        list,
        pagination:{
          hasNext: list.length === pageSize,
          pageNum: current,
          pageSize,
        }
      }
    }
  }

  async addFriend(param) {
    const {userId, friendId, friendName} = param;
    const friend = await this.userService.findOneByUsername(friendName);

    if (!friend) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:`${friendName}不存在`
      }, HttpStatus.BAD_REQUEST)
    }

    const isExit = await this.userMapRepository.findOne({userId, friendId});

    if (isExit) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:`您与${friendName}已经是好友`
      }, HttpStatus.BAD_REQUEST)
    }else {
      await this.userMapRepository.save({userId, friendId});
      return {
        data:friend,
        msg:'添加好友成功'
      }
    }
  }
}