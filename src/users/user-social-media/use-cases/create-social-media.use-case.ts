import { Inject, Injectable } from '@nestjs/common';
import { UserSocialMediasRepository } from '../user-social-media.repository';
import { CreateUserSocialMediasDto } from '../dtos/create-user-social-medias.dto';
import { FindUserSocialMediaDto } from '../dtos/find-user-social-media.dto';
import { UserSocialMediasModel } from '../models/user-social-medias.model';

@Injectable()
export class CreateUserSocialMediaUseCase {
  @Inject(UserSocialMediasRepository)
  private readonly $userSocial: UserSocialMediasRepository;

  public async execute(data: CreateUserSocialMediasDto) {
    try {
      const socialMedia = await this.validateSocialMedia(data);
      return this.createOrUpdateSocialMedia(data, socialMedia);
    } catch (error) {
      throw Error(error.message);
    }
  }

  private async validateSocialMedia(
    data: CreateUserSocialMediasDto,
  ): Promise<UserSocialMediasModel | null> {
    const filters = {
      userId: data.userId,
      socialMedia: data.socialMedia,
    };
    return this.$userSocial.findUserSocialMedia(filters);
  }

  private async createOrUpdateSocialMedia(
    data: CreateUserSocialMediasDto,
    socialMedia: UserSocialMediasModel,
  ): Promise<UserSocialMediasModel> {
    if (socialMedia) {
      return this.$userSocial.updateSocialMedia(socialMedia.id, data);
    }
    return this.$userSocial.createSocialMedia(data);
  }
}
