import { Field, InputType } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';

@InputType()
export class CreateUserRepositoryDto {
  @Field(() => [LanguageEnum])
  language?: LanguageEnum[];

  @Field(() => String)
  userId: string;

  @Field(() => String)
  link: string;
}
