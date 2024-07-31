import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, {
    nullable: true,
    description:
      'This field will only be available after the first record update',
  })
  updatedAt: Date | null;
}
