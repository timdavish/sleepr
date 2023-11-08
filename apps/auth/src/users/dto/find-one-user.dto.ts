import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneUserDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
}
