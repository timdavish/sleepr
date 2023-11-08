import { CurrentUser, UserDocument } from '@app/common';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(user, res);
    res.send(user);
  }

  @MessagePattern('authenticate')
  @UseGuards(JwtAuthGuard)
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
