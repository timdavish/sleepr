import { AbstractEntity } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Reservation extends AbstractEntity<Reservation> {
  @Column()
  @Field()
  endDate: Date;

  @Column()
  @Field()
  invoiceId: string;

  @Column()
  @Field()
  startDate: Date;

  @Column()
  @Field()
  timestamp: Date;

  @Column()
  @Field()
  userId: number;
}
