import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { UserModel } from '../models/user.model';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  @Inject(UserRepository)
  private readonly $user: UserRepository;

  public async execute(data: UpdateUserDto): Promise<UserModel> {
    try {
      await this.validateUser(data.id);
      return this.$user.updateUser(data);
    } catch (error) {
      throw Error(error.message);
    }
  }

  private async validateUser(id: string): Promise<void> {
    const existingUser = await this.$user.findUserById(id);
    if (!existingUser) throw new NotFoundException('User not found.');
  }
}
