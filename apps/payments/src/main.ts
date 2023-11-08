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
      host: '0.0.0.0',
      port: configService.get('PORT_TCP'),
    },
    transport: Transport.TCP,
  });

  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
}

bootstrap();
