import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { UserResponseModel } from '../models/user-response.model';

@Injectable()
export class FindUserByIdUseCase {
  @Inject(UserRepository)
  private readonly $user: UserRepository;

  public async execute(id: string): Promise<UserResponseModel> {
    try {
      const user = await this.$user.findUserById(id);
      if (!user) {
        throw new BadRequestException('User not found.');
      }
      return user;
    } catch (error) {
      throw Error(error.message);
    }
  }
}
