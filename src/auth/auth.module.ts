import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AuthResolver } from './auth.resolver';
import { UserRepository } from 'src/users/users.repository';
import { LoginService } from './service/login.service';

@Module({
  imports: [forwardRef(() => SharedModule)],
  providers: [AuthResolver, UserRepository, LoginService],
})
export class AuthModule {}
