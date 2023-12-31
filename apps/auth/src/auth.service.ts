import { User } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(user: User, res: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const expiresAt = new Date();
    expiresAt.setSeconds(
      expiresAt.getSeconds() +
        this.configService.getOrThrow('JWT_EXPIRATION_SECONDS'),
    );

    const token = this.jwtService.sign(tokenPayload);

    res.cookie('Authentication', token, {
      expires: expiresAt,
      httpOnly: true,
    });

    return token;
  }
}
