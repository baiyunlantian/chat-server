import { Controller, Get, Param, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('avatar')
export class AvatarController {
  constructor() {}

  @Get('/:fileName')
  async getFileStream(@Param('fileName') fileName:string, @Res() res) {
    const stream = createReadStream(join('public/avatar', fileName));
    return stream.pipe(res);
  }
}