import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserSocialMediasDto {
  @Field(() => String)
  link: string;

  @Field(() => String)
  socialMedia: string;

  @Field(() => String)
  userId: string;
}
