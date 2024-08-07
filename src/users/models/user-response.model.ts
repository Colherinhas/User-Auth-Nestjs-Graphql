import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserStatusEnum } from '@prisma/client';

@ObjectType()
export class UserResponseModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => UserStatusEnum)
  status: UserStatusEnum;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  cpf: string;

  @Field(() => String)
  photoUrl: string;

  @Field(() => Date, {
    nullable: true,
    description:
      'This field will only be available after the first record update',
  })
  updatedAt: Date | null;

  @Field(() => Date, {
    nullable: true,
  })
  deletedAt: Date | null;
}
