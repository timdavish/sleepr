import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { NotifyEmailDto } from './dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notify_email')
  @UsePipes(new ValidationPipe())
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    this.notificationsService.notifyEmail(data);
  }
}
