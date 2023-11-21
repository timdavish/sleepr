import { NOTIFICATIONS_SERVICE_NAME } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  const configService = app.get(ConfigService);

  app.connectMicroservice({
    options: {
      queue: NOTIFICATIONS_SERVICE_NAME,
      urls: [configService.getOrThrow('RABBITMQ_URI')],
    },
    transport: Transport.RMQ,
  });

  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  await app.listen(configService.getOrThrow('PORT_HTTP'));
}

bootstrap();
