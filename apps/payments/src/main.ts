import { PAYMENTS_SERVICE_NAME } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);

  const configService = app.get(ConfigService);

  app.connectMicroservice({
    options: {
      noAck: false,
      queue: PAYMENTS_SERVICE_NAME,
      urls: [configService.getOrThrow('RABBITMQ_URI')],
    },
    transport: Transport.RMQ,
  });

  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
}

bootstrap();
