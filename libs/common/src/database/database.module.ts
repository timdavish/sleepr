import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        database: configService.getOrThrow('MYSQL_DATABASE'),
        host: configService.getOrThrow('MYSQL_HOST'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        port: configService.getOrThrow('MYSQL_PORT'),
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
        type: 'mysql',
        username: configService.getOrThrow('MYSQL_USERNAME'),
      }),
    }),
  ],
})
export class DatabaseModule {
  static forFeature(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
