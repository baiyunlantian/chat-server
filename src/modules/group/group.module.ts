import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group, GroupMap } from './entity/group.entity';
import { GroupMessage } from './entity/groupMessage.entity';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Group, GroupMap, GroupMessage]),
  ],
  providers:[GroupService, UserService],
  controllers:[GroupController],
})
export class GroupModule {}
