import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { GroupModule } from './modules/group/group.module';
import { AvatarModule } from './modules/avatar/avatar.module';
import { FriendModule } from './modules/friend/friend.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'mychat',
      charset: "utf8mb4", // 设置chatset编码为utf8mb4
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    AuthModule,
    GroupModule,
    AvatarModule,
    FriendModule,
    ChatModule
  ],
})
export class AppModule {}
