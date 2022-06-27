import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Group, GroupMap } from './entity/group.entity';
import { GroupMessage } from './entity/groupMessage.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) groupRepository: Repository<Group>,
  ) {}

  async getGroupListByIds(groupIds:string) {
    console.log('groupIds', groupIds)
    return {
      data:groupIds
    }
  }
}