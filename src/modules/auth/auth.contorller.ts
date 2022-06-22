import { Controller, Get, Post, Body, UseGuards, Request, Param  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() req) {
    return this.authService.login(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('register')
  async register(@Param() req) {
    return this.authService.register(req);
  }
}