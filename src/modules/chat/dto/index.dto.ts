// 群组
export class GroupDto {
  groupId: string;
  userId: string; // 群主id
  groupName: string;
  notice: string;
  messages?: GroupMessageDto[];
  createTime: number;
}

// 群消息
export class  GroupMessageDto {
  userId: string;
  groupId: string;
  content: string;
  width?: number;
  height?: number;
  messageType: string;
  time: number;
}

// 好友
export class  FriendDto {
  userId: string;
  username: string;
  avatar: string;
  role?: string;
  tag?: string;
  messages?: FriendMessageDto[];
  createTime: number;
}

// 好友消息
export class  FriendMessageDto {
  userId: string;
  friendId: string;
  content: string;
  width?: number;
  height?: number;
  messageType: string;
  time: number;
}