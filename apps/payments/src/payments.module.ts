import { LoggerModule, NOTIFICATIONS_SERVICE_NAME } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  controllers: [PaymentsController],
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: NOTIFICATIONS_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          options: {
            queue: NOTIFICATIONS_SERVICE_NAME,
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
          },
          transport: Transport.RMQ,
        }),
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NOTIFICATIONS_HOST: Joi.string().required(),
        NOTIFICATIONS_PORT_TCP: Joi.number().required(),
        RABBITMQ_URI: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
      }),
    }),
    LoggerModule,
  ],
  providers: [PaymentsService],
})
export class PaymentsModule {}
