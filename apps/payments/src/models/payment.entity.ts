import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Payment {
  @Field()
  amount: number;

  @Field()
  id: string;
}
