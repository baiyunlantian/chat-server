import { Controller, Get, Post, Delete, Req, Body, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('login')
  async login(@Body() params) {
    return this.service.getHello(params);
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
