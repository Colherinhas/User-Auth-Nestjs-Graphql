import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindUserSocialMediaDto {
  @Field(() => String)
  userId?: string;

  @Field(() => String)
  socialMedia?: string;
}
