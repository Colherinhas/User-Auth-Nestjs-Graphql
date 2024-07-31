import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  @Inject(UserRepository)
  private readonly $user: UserRepository;

  public async execute(data: CreateUserDto): Promise<User> {
    try {
      return this.$user.createUser(data);
    } catch (err) {
      throw Error(err.message);
    }
  }
}
