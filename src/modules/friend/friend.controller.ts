import { Controller, Get, Query, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendService } from './friend.service';

@Controller('friend')
@UseGuards(AuthGuard('jwt'))
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get('/findFriendList')
  async getFriendListByUserId(@Query('userId') userId:string) {
    return this.friendService.getFriendListByUserId(userId)
  }

  @Post('/friendMessageList')
  async getFriendMessageList(@Body() param) {
    return this.friendService.getFriendMessageList(param)
  }

  @Post('/addFriend')
  async addFriend(@Body() param) {
    return this.friendService.addFriend(param)
  }
}