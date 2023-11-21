import { Query, Resolver } from '@nestjs/graphql';
import { Payment } from './models';
import { PaymentsService } from './payments.service';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Query(() => [Payment], { name: 'getPayments' })
  findAll() {
    return this.paymentsService.findAll();
  }
}
