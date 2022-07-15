import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendMessage, UserMap } from './entity/friend.entity';
import { User } from '../user/entity/user.entity';
import { FriendService } from './friend.service';
import { UserService } from '../user/user.service';
import { FriendController } from './friend.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([FriendMessage, UserMap, User])
  ],
  providers:[FriendService, UserService],
  controllers:[FriendController],
})

export class FriendModule {}