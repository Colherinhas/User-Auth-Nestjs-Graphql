import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @IsNotEmpty({ message: 'Name should not be empty.' })
  @MinLength(1, { message: 'Name should not be empty.' })
  name: string;
}
