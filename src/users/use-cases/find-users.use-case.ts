import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { FindUserFilterDto } from '../dtos/find-user-filters.dto';
import { UserResponseModel } from '../models/user-response.model';

@Injectable()
export class FindUserUseCase {
  @Inject(UserRepository)
  private readonly $user: UserRepository;

  public async execute(
    filters?: FindUserFilterDto,
  ): Promise<UserResponseModel[]> {
    try {
      return this.$user.findUsers(filters);
    } catch (err) {
      throw Error(err.message);
    }
  }
}
