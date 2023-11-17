import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindOneUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
