import { HealthModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_EXPIRATION_SECONDS: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        PORT_HTTP: Joi.number().required(),
        PORT_TCP: Joi.number().required(),
      }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_SECONDS')}s`,
        },
      }),
    }),
    HealthModule,
    LoggerModule,
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
