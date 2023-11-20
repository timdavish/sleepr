import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private readonly transporter = nodemailer.createTransport({
    auth: {
      clientId: this.configService.getOrThrow('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.getOrThrow('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.getOrThrow('GOOGLE_OAUTH_REFRESH_TOKEN'),
      type: 'OAuth2',
      user: this.configService.getOrThrow('SMTP_USER'),
    },
    service: 'gmail',
  });

  constructor(private readonly configService: ConfigService) {}

  async notifyEmail({ email, subject, text }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.getOrThrow('SMTP_USER'),
      subject,
      text,
      to: email,
    });
  }
}
