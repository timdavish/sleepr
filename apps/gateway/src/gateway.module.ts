import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import {
  AUTH_SERVICE_NAME,
  LoggerModule,
  NOTIFICATIONS_SERVICE_NAME,
  PAYMENTS_SERVICE_NAME,
  RESERVATIONS_SERVICE_NAME,
} from '@app/common';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { authContext } from './auth.context';

@Module({
  controllers: [],
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
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AUTH_GRAPHQL_URL: Joi.string().required(),
        NOTIFICATIONS_GRAPHQL_URL: Joi.string().required(),
        PAYMENTS_GRAPHQL_URL: Joi.string().required(),
        PORT_HTTP: Joi.number().required(),
        RABBITMQ_URI: Joi.string().required(),
        RESERVATIONS_GRAPHQL_URL: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        gateway: {
          buildService: ({ url }) =>
            new RemoteGraphQLDataSource({
              willSendRequest: ({ context, request }) => {
                request.http.headers.set(
                  'user',
                  context.user ? JSON.stringify(context.user) : null,
                );
              },
              url,
            }),
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: AUTH_SERVICE_NAME,
                url: configService.getOrThrow('AUTH_GRAPHQL_URL'),
              },
              {
                name: NOTIFICATIONS_SERVICE_NAME,
                url: configService.getOrThrow('NOTIFICATIONS_GRAPHQL_URL'),
              },
              {
                name: PAYMENTS_SERVICE_NAME,
                url: configService.getOrThrow('PAYMENTS_GRAPHQL_URL'),
              },
              {
                name: RESERVATIONS_SERVICE_NAME,
                url: configService.getOrThrow('RESERVATIONS_GRAPHQL_URL'),
              },
            ],
          }),
        },
        server: {
          context: authContext,
        },
      }),
    }),
    LoggerModule,
  ],
  providers: [],
})
export class GatewayModule {}
