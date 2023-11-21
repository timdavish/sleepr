import { DatabaseModule, Role, User } from '@app/common';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [DatabaseModule, DatabaseModule.forFeature([Role, User])],
  providers: [UsersRepository, UsersResolver, UsersService],
})
export class UsersModule {}
