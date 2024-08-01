import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

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
}
