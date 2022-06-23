import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.contorller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { UserModule } from '../user/user.module';
import { User } from '../user/entity/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn: '600s'},
    })
  ],
  providers:[AuthService, LocalStrategy, JwtStrategy],
  controllers:[AuthController],
})

export class AuthModule {}