import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../models/user.model';

@ObjectType()
export class UserSocialMediasModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  link: string;

  @Field(() => String, { nullable: true })
  socialMedia: string;

  @Field(() => String)
  userId: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => Date, {
    nullable: true,
    description:
      'This field will only be available after the first record update',
  })
  updatedAt: Date | null;
}
