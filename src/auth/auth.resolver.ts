import { Inject, Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginService } from './service/login.service';
import { AuthModel } from './models/auth.model';
import { UserLoginDto } from './dtos/userLogin.dto';

@Resolver()
export class AuthResolver {
  @Inject(LoginService)
  private readonly $login: LoginService;

  @Mutation(() => AuthModel, { name: 'login' })
  public async userLogin(
    @Args('data', { type: () => UserLoginDto })
    data: UserLoginDto,
  ): Promise<AuthModel> {
    return this.$login.execute(data);
  }
}
