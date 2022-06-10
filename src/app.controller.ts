import { Controller, Get, Post, Delete, Req, Body, Param, Query } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
    login(@Query() loginAccount) {
    console.log('login params', loginAccount);
    return this.appService.getHello();
  }

  @Get('logout')
  logout() {
    return this.appService.getHello();
  }

  @Post('updatePassword')
  updatePassword() {
    return this.appService.getHello();
  }

  @Get('findByName')
  getUsersByUserName() {
    return this.appService.getHello();
  }

  @Post('upload')
  uploadAvatar() {
    return this.appService.getHello();
  }

  @Delete('delete')
  deleteUserById() {
    return this.appService.getHello();
  }
}
