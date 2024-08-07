import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @IsNotEmpty({ message: 'Name should not be empty.' })
  @MinLength(1, { message: 'Name should not be empty.' })
  name: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Password should not be empty.' })
  @MinLength(1, { message: 'Password should not be empty.' })
  password: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsUrl()
  @IsOptional()
  photoUrl?: string;

  @Field(() => String)
  @Length(11, 11, {
    message: 'CPF must have 11 characters, as "XXX-XXX-XXX-XX" ',
  })
  @MinLength(11)
  @MaxLength(11)
  cpf: string;
}
