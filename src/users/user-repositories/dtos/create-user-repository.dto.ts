import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserRepositoryDto {
  @Field(() => String)
  language: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  link: string;
}
