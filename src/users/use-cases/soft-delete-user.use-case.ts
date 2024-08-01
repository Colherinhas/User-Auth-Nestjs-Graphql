import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { UserResponseModel } from '../models/user-response.model';

@Injectable()
export class SoftDeleteUserUseCase {
  @Inject(UserRepository)
  private readonly $user: UserRepository;

  public async execute(id: string): Promise<UserResponseModel> {
    try {
      await this.verifyUser(id);
      return this.$user.softDeleteUser(id);
    } catch (error) {
      throw Error(error.message);
    }
  }

  private async verifyUser(id: string): Promise<void> {
    const existingUser = await this.$user.findUserById(id);
    if (existingUser.deletedAt)
      throw new BadRequestException('User already deleted.');
    if (!existingUser) throw new NotFoundException('User not found.');
  }
}
