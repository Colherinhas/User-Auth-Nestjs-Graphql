import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { UserModel } from '../models/user.model';
import { FindUserFilterDto } from '../dtos/find-user-filters.dto';

@Injectable()
export class FindUserUseCase {
  @Inject(UserRepository)
  private readonly $user: UserRepository;

  public async execute(filters?: FindUserFilterDto): Promise<UserModel[]> {
    try {
      return this.$user.findUsers(filters);
    } catch (err) {
      throw Error(err.message);
    }
  }
}
