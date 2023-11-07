import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
