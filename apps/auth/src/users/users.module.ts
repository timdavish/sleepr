import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { UserDocument, UserSchema } from './models';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersRepository, UsersService],
})
export class UsersModule {}
