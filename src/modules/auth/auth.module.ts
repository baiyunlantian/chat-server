import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.contorller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';

@Module({
  imports:[
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