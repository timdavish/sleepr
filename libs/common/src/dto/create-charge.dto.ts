import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CardDto } from './card.dto';

export class CreateChargeDto {
  @IsNumber()
  amount: number;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;
}
