import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SocialMediaEnum } from '@prisma/client';
import { CreateUserSocialMediasDto } from './dtos/create-user-social-medias.dto';
import { SocialMediasModel } from './models/social-medias.model';
import { UserSocialMediasModel } from './models/user-social-medias.model';
import { CreateUserSocialMediaUseCase } from './use-cases/create-social-media.use-case';

@Resolver()
export class UserSocialMediaResolver {
  @Inject(CreateUserSocialMediaUseCase)
  private readonly $userSocial: CreateUserSocialMediaUseCase;

  @Query(() => SocialMediasModel, { name: 'listSocialMedias' })
  public async listSocialMedias(): Promise<SocialMediasModel> {
    const socialMediaValues = Object.values(
      SocialMediaEnum,
    ) as SocialMediaEnum[];
    return {
      socialMediaEnum: socialMediaValues,
    };
  }

  @Mutation(() => UserSocialMediasModel, { name: 'createUserSocialMedia' })
  public async createUserSocialMedia(
    @Args('data', {
      type: () => CreateUserSocialMediasDto,
    })
    data: CreateUserSocialMediasDto,
  ): Promise<UserSocialMediasModel> {
    return this.$userSocial.execute(data);
  }
}
