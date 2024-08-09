import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { CreateUserRepositoryUseCase } from './use-cases/create-user-repository.use-case';
import { UserRepositoriesRepository } from './user-repositories.repository';
import { UserRepositoriesResolver } from './user-repositories.resolver';

@Module({
  imports: [forwardRef(() => SharedModule)],
  providers: [
    CreateUserRepositoryUseCase,
    UserRepositoriesResolver,
    UserRepositoriesRepository,
  ],
  exports: [UserRepositoriesRepository],
})
export class UserRepositoriesModule {}
