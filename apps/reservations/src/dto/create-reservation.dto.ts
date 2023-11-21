import { CreateChargeDto } from '@app/common';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateReservationDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  @Field(() => CreateChargeDto)
  charge: CreateChargeDto;

  @IsDate()
  @Type(() => Date)
  @Field()
  endDate: Date;

  @IsDate()
  @Type(() => Date)
  @Field()
  startDate: Date;
}
