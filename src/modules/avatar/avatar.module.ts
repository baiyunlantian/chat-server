import { Module } from '@nestjs/common';
import { AvatarController } from './avatar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  controllers:[AvatarController],
})

export class AvatarModule {}