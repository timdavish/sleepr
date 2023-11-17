import { DatabaseModule, Role, User } from '@app/common';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [DatabaseModule, DatabaseModule.forFeature([Role, User])],
  providers: [UsersRepository, UsersService],
})
export class UsersModule {}
