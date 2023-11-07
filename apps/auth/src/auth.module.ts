import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_EXPIRATION_SECONDS: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        MONGO_DB_URI: Joi.string().required(),
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
    LoggerModule,
    UsersModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
