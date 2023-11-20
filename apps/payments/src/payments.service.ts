import { NOTIFICATIONS_SERVICE_NAME } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.getOrThrow('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE_NAME)
    private readonly notificationServiceProxy: ClientProxy,
  ) {}

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      automatic_payment_methods: {
        allow_redirects: 'never',
        enabled: true,
      },
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
    });

    this.notificationServiceProxy.emit('notify_email', {
      email,
      subject: `Sleepr Payment Successful`,
      text: `Your payment of $${amount} was successful.`,
    });

    return paymentIntent;
  }
}
