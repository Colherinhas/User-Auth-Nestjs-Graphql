import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { UserModel } from '../models/user.model';

@Injectable()
export class FindUserByIdUseCase {
  @Inject(UserRepository)
  private readonly $user: UserRepository;

  public async execute(id: string): Promise<UserModel> {
    try {
      return this.$user.findUserById(id);
    } catch (error) {
      throw Error(error.message);
    }
  }
}
