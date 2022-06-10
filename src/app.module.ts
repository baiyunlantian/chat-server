import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AppService } from './app.service';

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
    AuthModule
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}
