import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NotifyEmailDto } from './dto';
import { Notification } from './models';
import { NotificationsService } from './notifications.service';

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Mutation(() => Notification, { name: 'notifyEmail' })
  notifyEmail(
    @Args('notifyEmailDto')
    notifyEmailDto: NotifyEmailDto,
  ) {
    return this.notificationsService.notifyEmail(notifyEmailDto);
  }
}
