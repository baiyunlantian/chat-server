import { Controller, UseGuards, Post, Body, Get, Query, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupService } from './group.service';

class GroupMessages {
  current:number;
  pageSize:number;
  groupId:string;
}

@Controller('group')
// @UseGuards(AuthGuard('jwt'))
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/create')
  createGroup(@Body() param:object) {
    return this.groupService.createGroup(param)
  }

  // 根据groupId获取group
  @Post('/groupList')
  getGroupListByIds(@Body('groupIds') groupIds:Array<string>) {
    return this.groupService.getGroupListByIds(groupIds)
  }

  // 根据userId获取用户所有的群聊组
  @Get('/groupListWithinUser')
  getGroupListByUserId(@Query('userId') userId:string) {
    return this.groupService.getGroupListByUserId(userId)
  }

  // 根据groupId获取群聊组所有的用户
  @Get('/userListWithinGroup')
  getUserListByGroupId(@Query('groupId') groupId:string) {
    return this.groupService.getUserListByGroupId(groupId)
  }

  // 根据群聊名获取群聊列表
  @Post('/findListByName')
  getGroupListByName(@Body('groupName') groupName:string) {
    return this.groupService.getGroupListByName(groupName)
  }

  // 根据groupId分页获取群聊消息列表
  @Post('/groupMessages')
  getGroupMessages(@Body() params: GroupMessages) {
    return this.groupService.getGroupMessages(params);
  }
}