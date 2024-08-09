import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserSocialMediasRepository } from './user-social-media.repository';
import { UserSocialMediaResolver } from './user-social-media.resolver';
import { CreateUserSocialMediaUseCase } from './use-cases/create-social-media.use-case';

@Module({
  imports: [forwardRef(() => SharedModule)],
  providers: [
    UserSocialMediasRepository,
    CreateUserSocialMediaUseCase,
    UserSocialMediaResolver,
  ],
  exports: [UserSocialMediasRepository],
})
export class UserSocialMediasModule {}
