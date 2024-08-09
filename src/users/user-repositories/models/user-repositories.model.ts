import { Field, ID, ObjectType } from '@nestjs/graphql';
import { LanguageEnum, UserRepositories } from '@prisma/client';

@ObjectType()
export class UserRepositoriesModel implements UserRepositories {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  link: string;

  @Field(() => [LanguageEnum])
  language: LanguageEnum[];

  @Field(() => String)
  userId: string;

  @Field(() => Date)
  createdAt: Date;
}
