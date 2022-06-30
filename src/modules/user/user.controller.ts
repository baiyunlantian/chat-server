import {
  Controller,
  Get,
  Post,
  Delete,
  Res,
  Body,
  Param,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Express } from 'express'
import { UserService } from './user.service';

@Controller('user')
// @UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('uploadAvatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@Body('userId') userId:string, @UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatarByUserId(userId, file);
  }

  @Post('update')
  updateInfo(@Body() param) {
    return this.userService.updateInfo(param);
  }

  @Post('findListByUsername')
  findListByUsername(@Body('username') username:string) {
    return this.userService.findListByUsername(username);
  }

  @Get('findByName')
  getUsersByUserName() {
    return this.userService.getHello();
  }

  @Delete('delete')
  deleteUserById() {
    return this.userService.getHello();
  }
}
