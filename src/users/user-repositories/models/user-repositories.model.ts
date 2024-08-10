import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRepositories } from '@prisma/client';

@ObjectType()
export class UserRepositoriesModel implements UserRepositories {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  link: string;

  @Field(() => [String])
  language: string[];

  @Field(() => String)
  userId: string;

  @Field(() => Date)
  createdAt: Date;
}
