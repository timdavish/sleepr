import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class NotifyEmailDto {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  subject: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  text: string;
}
