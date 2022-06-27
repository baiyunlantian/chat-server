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
import { createReadStream } from 'fs';
import { join } from "path";

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('uploadAvatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Body('userId') userId:string, @UploadedFile() file: Express.Multer.File) {
    return this.service.uploadAvatarByUserId(userId, file);
  }

  @Get('avatar/:fileName')
  async getFileStream(@Param('fileName') fileName:string, @Res() res) {
    const stream = createReadStream(join('public/avatar', fileName));
    return stream.pipe(res);
  }

  @Post('updatePassword')
  updatePassword() {
    return this.service.getHello();
  }

  @Get('findByName')
  getUsersByUserName() {
    return this.service.getHello();
  }

  @Delete('delete')
  deleteUserById() {
    return this.service.getHello();
  }
}
