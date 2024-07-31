import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserRepository } from './users.repository';
import { UserResolver } from './users.resolver';
import { FindUserUseCase } from './use-cases/find-users.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';

@Module({
  imports: [forwardRef(() => SharedModule)],
  providers: [
    UserRepository,
    UserResolver,
    FindUserUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
  ],
  exports: [UserRepository],
})
export class UserModule {}
