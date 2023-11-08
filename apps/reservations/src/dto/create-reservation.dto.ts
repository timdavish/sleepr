import { CreateChargeDto } from '@app/common';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

export class CreateReservationDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsDate()
  @Type(() => Date)
  startDate: Date;
}
