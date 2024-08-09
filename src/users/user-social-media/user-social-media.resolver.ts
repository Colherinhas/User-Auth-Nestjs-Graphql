import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSocialMediasModel } from './models/user-social-medias.model';
import { CreateUserSocialMediasDto } from './dtos/create-user-social-medias.dto';
import { CreateUserSocialMediaUseCase } from './use-cases/create-social-media.use-case';

@Resolver()
export class UserSocialMediaResolver {
  @Inject(CreateUserSocialMediaUseCase)
  private readonly $userSocial: CreateUserSocialMediaUseCase;

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
