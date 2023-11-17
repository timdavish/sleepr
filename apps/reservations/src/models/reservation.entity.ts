import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Reservation extends AbstractEntity<Reservation> {
  @Column()
  endDate: Date;

  @Column()
  invoiceId: string;

  @Column()
  startDate: Date;

  @Column()
  timestamp: Date;

  @Column()
  userId: number;
}
