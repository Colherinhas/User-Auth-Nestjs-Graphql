import { Field, InputType } from '@nestjs/graphql';
import { $Enums, LanguageEnum, Prisma } from '@prisma/client';

@InputType()
export class CreateUserRepositoryDto {
  @Field(() => LanguageEnum)
  language?: LanguageEnum;
  @Field(() => String)
  userId: string;
  @Field(() => String)
  link: string;
}