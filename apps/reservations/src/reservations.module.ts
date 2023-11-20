import {
  AUTH_SERVICE_NAME,
  DatabaseModule,
  HealthModule,
  LoggerModule,
  PAYMENTS_SERVICE_NAME,
} from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { Reservation } from './models';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { ReservationsService } from './reservations.service';

@Module({
  controllers: [ReservationsController],
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: AUTH_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          options: {
            queue: AUTH_SERVICE_NAME,
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
          },
          transport: Transport.RMQ,
        }),
      },
      {
        inject: [ConfigService],
        name: PAYMENTS_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          options: {
            queue: PAYMENTS_SERVICE_NAME,
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
          },
          transport: Transport.RMQ,
        }),
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT_TCP: Joi.number().required(),
        MYSQL_DATABASE: Joi.string().required(),
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_SYNCHRONIZE: Joi.boolean().required(),
        MYSQL_USERNAME: Joi.string().required(),
        PAYMENTS_HOST: Joi.string().required(),
        PAYMENTS_PORT_TCP: Joi.number().required(),
        PORT_HTTP: Joi.number().required(),
        RABBITMQ_URI: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([Reservation]),
    HealthModule,
    LoggerModule,
  ],
  providers: [ReservationsRepository, ReservationsService],
})
export class ReservationsModule {}
