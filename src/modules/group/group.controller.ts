import { Controller, UseGuards, Post, Body, Get, Query, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupService } from './group.service';

class GroupMessages {
  current:number;
  pageSize:number;
  groupId:string;
}

@Controller('group')
@UseGuards(AuthGuard('jwt'))
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // 根据groupId获取group
  @Post('/groupList')
  getGroupListByIds(@Body('groupIds') groupIds:string) {
    return this.groupService.getGroupListByIds(groupIds)
  }

  // 根据userId获取用户所有的群聊组
  @Get('/userGroup')
  getUserGroupsByUserId(@Query('userId') userId:string) {
    return this.groupService.getGroupListByIds(userId)
  }

  // 根据groupId获取群聊组所有的用户
  @Get('/groupUser')
  getGroupUsersByGroupId(@Query('groupId') groupId:string) {
    return this.groupService.getGroupListByIds(groupId)
  }

  // 根据群聊名获取群聊列表
  @Get('/findByName')
  getGroupsByName(@Query('groupName') groupName:string) {
    return this.groupService.getGroupListByIds(groupName)
  }

  // 根据groupId分页获取群聊消息列表
  @Post('/groupMessages')
  getGroupMessages(@Body() params: GroupMessages) {
    console.log('params', params)
    return this.groupService.getGroupListByIds('1');
  }
}