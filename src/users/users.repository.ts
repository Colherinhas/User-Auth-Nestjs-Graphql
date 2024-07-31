import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DbConnection } from 'src/shared/db/db.connection';

@Injectable()
export class UserRepository {
  @Inject(DbConnection)
  private $db: DbConnection;

  public async findUsers(
    filters?: Partial<Prisma.UserWhereInput>,
  ): Promise<User[]> {
    const userFilters: Partial<Prisma.UserWhereInput> = filters ? filters : {};
    return this.$db.user.findMany({
      where: {
        ...userFilters,
      },
    });
  }

  public async createUser(
    data: Prisma.UserUncheckedCreateInput,
  ): Promise<User> {
    return this.$db.user.create({
      data: { ...data },
    });
  }

  public async updateUser(
    data: Partial<Prisma.UserUncheckedUpdateInput>,
  ): Promise<User> {
    return this.$db.user.update({
      where: { id: data.id as string },
      data: { ...data },
    });
  }
}
