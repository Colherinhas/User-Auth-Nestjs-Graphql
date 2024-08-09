import { Field, InputType } from '@nestjs/graphql';
import { SocialMediaEnum } from '@prisma/client';

@InputType()
export class CreateUserSocialMediasDto {
  @Field(() => String)
  link: string;

  @Field(() => SocialMediaEnum)
  socialMedia: SocialMediaEnum;

  @Field(() => String)
  userId: string;
}
