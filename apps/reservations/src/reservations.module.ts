import {
  AUTH_SERVICE_NAME,
  DatabaseModule,
  LoggerModule,
  PAYMENTS_SERVICE_NAME,
} from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { ReservationDocument, ReservationSchema } from './models';
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
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT_TCP'),
          },
          transport: Transport.TCP,
        }),
      },
      {
        inject: [ConfigService],
        name: PAYMENTS_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          options: {
            host: configService.get('PAYMENTS_HOST'),
            port: configService.get('PAYMENTS_PORT_TCP'),
          },
          transport: Transport.TCP,
        }),
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT_TCP: Joi.number().required(),
        MONGO_DB_URI: Joi.string().required(),
        PAYMENTS_HOST: Joi.string().required(),
        PAYMENTS_PORT_TCP: Joi.number().required(),
        PORT_HTTP: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: ReservationDocument.name,
        schema: ReservationSchema,
      },
    ]),
    LoggerModule,
  ],
  providers: [ReservationsRepository, ReservationsService],
})
export class ReservationsModule {}
