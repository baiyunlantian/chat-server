import { Controller, Get, Post, Delete, Req, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class AppController {
  constructor(private readonly service: UserService) {}

  @Get('login')
  login(@Query() loginAccount) {
    console.log('login params', loginAccount);
    return this.service.getHello();
  }

  @Get('logout')
  logout() {
    return this.service.getHello();
  }

  @Post('updatePassword')
  updatePassword() {
    return this.service.getHello();
  }

  @Get('findByName')
  getUsersByUserName() {
    return this.service.getHello();
  }

  @Post('upload')
  uploadAvatar() {
    return this.service.getHello();
  }

  @Delete('delete')
  deleteUserById() {
    return this.service.getHello();
  }
}
