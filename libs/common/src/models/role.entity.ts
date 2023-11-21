import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../database';

@Entity()
@ObjectType()
@Directive('@shareable')
export class Role extends AbstractEntity<Role> {
  @Column()
  @Field()
  name: string;
}
