import { Inject, Injectable } from '@nestjs/common';
import { Prisma, UserRepositories } from '@prisma/client';
import { DbConnection } from 'src/shared/db/db.connection';

@Injectable()
export class UserRepositoriesRepository {
  @Inject(DbConnection)
  private readonly $db: DbConnection;

  public async createUserRepository(
    data: Prisma.UserRepositoriesUncheckedCreateInput,
  ): Promise<UserRepositories> {
    return this.$db.userRepositories.create({
      data,
    });
  }
}
