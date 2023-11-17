import { PAYMENTS_SERVICE_NAME, User } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { ReservationsRepository } from './reservations.repository';
import { Reservation } from './models';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE_NAME)
    private readonly paymentsServiceProxy: ClientProxy,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    { email, id: userId }: User,
  ) {
    return this.paymentsServiceProxy
      .send('create_charge', {
        ...createReservationDto.charge,
        email,
      })
      .pipe(
        map((res) => {
          const reservation = new Reservation({
            ...createReservationDto,
            invoiceId: res.id,
            timestamp: new Date(),
            userId,
          });

          return this.reservationsRepository.create(reservation);
        }),
      );
  }

  findAll() {
    return this.reservationsRepository.find({});
  }

  findOne(id: number) {
    return this.reservationsRepository.findOne({ id });
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { id },
      updateReservationDto,
    );
  }

  remove(id: number) {
    return this.reservationsRepository.findOneAndDelete({ id });
  }
}
