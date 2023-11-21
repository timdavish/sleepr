import { CurrentUser, User } from '@app/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reservation } from './models';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => Reservation, { name: 'createReservation' })
  create(
    @Args('createReservationDto')
    createReservationDto: CreateReservationDto,
    @CurrentUser()
    user: User,
  ) {
    return this.reservationsService.create(createReservationDto, user);
  }

  @Query(() => [Reservation], { name: 'getReservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Query(() => Reservation, { name: 'getReservation' })
  findOne(
    @Args('id', { type: () => Number })
    id: number,
  ) {
    return this.reservationsService.findOne(id);
  }

  @Mutation(() => Reservation, { name: 'removeReservation' })
  remove(
    @Args('id', { type: () => Number })
    id: number,
  ) {
    return this.reservationsService.remove(id);
  }
}
