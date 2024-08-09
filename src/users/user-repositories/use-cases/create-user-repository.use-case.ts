import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRepositoryDto } from '../dtos/create-user-repository.dto';
import { UserRepositoriesModel } from '../models/user-repositories.model';
import { UserRepositoriesRepository } from '../user-repositories.repository';

@Injectable()
export class CreateUserRepositoryUseCase {
  @Inject(UserRepositoriesRepository)
  private readonly $userRepo: UserRepositoriesRepository;

  public async execute(
    data: CreateUserRepositoryDto,
  ): Promise<UserRepositoriesModel> {
    try {
      return this.$userRepo.createUserRepository(data);
    } catch (error) {
      throw Error(error.message);
    }
  }
}
