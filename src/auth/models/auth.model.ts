import { Field, ObjectType } from '@nestjs/graphql';
import { UserResponseModel } from 'src/users/models/user-response.model';

@ObjectType()
export class AuthModel {
  @Field(() => String)
  accessToken: string;

  @Field(() => UserResponseModel)
  user: Partial<UserResponseModel>;
}
