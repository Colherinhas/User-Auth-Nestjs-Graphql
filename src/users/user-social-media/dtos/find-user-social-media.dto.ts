import { Field, ID, InputType } from '@nestjs/graphql';
import { SocialMediaEnum } from '@prisma/client';

@InputType()
export class FindUserSocialMediaDto {
  @Field(() => String)
  userId?: String;

  @Field(() => SocialMediaEnum)
  socialMedia?: SocialMediaEnum;
}
