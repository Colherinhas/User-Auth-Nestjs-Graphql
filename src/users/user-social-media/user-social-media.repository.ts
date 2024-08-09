import { Inject, Injectable } from '@nestjs/common';
import { Prisma, UserSocialMedia } from '@prisma/client';
import { DbConnection } from 'src/shared/db/db.connection';

@Injectable()
export class UserSocialMediasRepository {
  @Inject(DbConnection)
  private readonly $db: DbConnection;

  public async findUserSocialMedia(
    filters: Partial<Prisma.UserSocialMediaWhereInput>,
  ): Promise<UserSocialMedia> {
    return this.$db.userSocialMedia.findFirst({
      where: { ...filters },
    });
  }

  public async createSocialMedia(
    data: Prisma.UserSocialMediaUncheckedCreateInput,
  ): Promise<UserSocialMedia> {
    return this.$db.userSocialMedia.create({
      data,
    });
  }

  public async updateSocialMedia(
    id: string,
    data: Prisma.UserSocialMediaUncheckedUpdateInput,
  ): Promise<UserSocialMedia> {
    return this.$db.userSocialMedia.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }
}
