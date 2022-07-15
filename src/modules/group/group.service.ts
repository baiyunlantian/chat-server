import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Group, GroupMap } from './entity/group.entity';
import { GroupMessage } from './entity/groupMessage.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class GroupService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupMap) private readonly groupMapRepository: Repository<GroupMap>,
    @InjectRepository(GroupMessage) private readonly groupMessageRepository: Repository<GroupMessage>
  ) {}

  async createGroup(param) {
    const {userId, groupName} = param;
    const group = await this.groupRepository.findOne({groupName});
    if (group) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'群名已存在'
      }, HttpStatus.BAD_REQUEST)
    }else {
      const newGroup = await this.groupRepository.save(param);
      await this.groupMapRepository.save({userId, groupId:newGroup.groupId});

      return {
        msg:'创建群聊成功',
        data:null
      }
    }
  }

  async getGroupListByIds(groupIds:Array<string>) {
    let groupList = [];
    let handleList = [];
    groupIds.forEach(groupId=>{
      handleList.push(this.groupRepository.findOne({groupId}))
    });

    await Promise.all(handleList).then(resList=>{
      resList.forEach(res=>groupList.push(res));
    });

    if (groupList.some(group=>!group)) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'获取群信息有误'
      }, HttpStatus.BAD_REQUEST)
    }else {
      return {
        data:groupList
      }
    }
  }

  async getUserListByGroupId(groupId:string) {
    let handleFns = [], userList = [];
    let list = await this.groupMapRepository.find({groupId});
    console.log('getUserListByGroupId', list)
    list.forEach(item=>{
      handleFns.push(this.userService.findOneByUserId(item.userId))
    });

    await Promise.all(handleFns).then(resList=>{
      resList.forEach(res=>userList.push(res))
    });

    if (userList.some(user=>!user)) {
      throw new HttpException({
        statusCode:HttpStatus.BAD_REQUEST,
        message:'获取群聊组内所有用户信息失败'
      }, HttpStatus.BAD_REQUEST)
    }else {
      return { data:userList }
    }
  }

  async getGroupListByName(groupName:string) {
    const list = await this.groupRepository.find({
      groupName: Like(`%${groupName}%`)
    })

    return { data: list }
  }

  async getGroupListByUserId(userId:string) {
    const list = await this.groupMapRepository.find({userId});
    return await this.getGroupListByIds(list.map(item=>item.groupId));
  }

  async getGroupMessages(param) {
    const { current, pageSize, groupId } = param;
    const list = await this.groupMessageRepository.find({
      where:{groupId},
      skip:(current-1) * pageSize,
      take:pageSize
    })

    return {
      data:{
        list,
        pagination:{
          hasNext:list.length === pageSize,
          pageNum:current,
          pageSize
        }
      }
    }
  }
}