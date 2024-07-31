import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserRepository } from './users.repository';
import { UserResolver } from './users.resolver';
import { FindUserUseCase } from './use-cases/find-users.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';

@Module({
  imports: [forwardRef(() => SharedModule)],
  providers: [UserRepository, UserResolver, FindUserUseCase, CreateUserUseCase],
  exports: [UserRepository],
})
export class UserModule {}
