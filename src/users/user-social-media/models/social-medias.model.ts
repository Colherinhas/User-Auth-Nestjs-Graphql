import { Field, ObjectType } from '@nestjs/graphql';
import { SocialMediaEnum } from '@prisma/client';

@ObjectType()
export class SocialMediasModel {
  @Field(() => [SocialMediaEnum], { nullable: true })
  socialMediaEnum: SocialMediaEnum[];
}
