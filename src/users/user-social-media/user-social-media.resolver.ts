import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserSocialMediasDto } from './dtos/create-user-social-medias.dto';
import { UserSocialMediasModel } from './models/user-social-medias.model';
import { CreateUserSocialMediaUseCase } from './use-cases/create-social-media.use-case';

@Resolver()
export class UserSocialMediaResolver {
  @Inject(CreateUserSocialMediaUseCase)
  private readonly $userSocial: CreateUserSocialMediaUseCase;

  // @Query(() => SocialMediasModel, { name: 'listSocialMedias' })
  // public async listSocialMedias(): Promise<SocialMediasModel> {
  //   const socialMediaValues = Object.values(
  //     SocialMediaEnum,
  //   ) as SocialMediaEnum[];
  //   return {
  //     socialMediaEnum: socialMediaValues,
  //   };
  // }

  @Mutation(() => UserSocialMediasModel, { name: 'createUserSocialMedia' })
  public async createUserSocialMedia(
    @Args('data', {
      type: () => CreateUserSocialMediasDto,
    })
    data: CreateUserSocialMediasDto,
  ): Promise<UserSocialMediasModel> {
    console.log(`createusersocialmedia access`);
    return this.$userSocial.execute(data);
  }
}
