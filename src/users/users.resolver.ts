import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindUserUseCase } from './use-cases/find-users.use-case';
import { UserModel } from './models/user.model';
import { FindUserFilterDto } from './dtos/find-user-filters.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';

@Resolver()
export class UserResolver {
  @Inject(FindUserUseCase)
  private readonly $findMany: FindUserUseCase;
  @Inject(CreateUserUseCase)
  private readonly $create: CreateUserUseCase;

  @Query(() => [UserModel], { name: 'users' })
  public async findUsers(
    @Args('filters', { type: () => FindUserFilterDto, nullable: true })
    filters?: FindUserFilterDto,
  ): Promise<UserModel[]> {
    return this.$findMany.execute(filters);
  }

  @Mutation(() => UserModel, { name: 'createUser' })
  public async createUser(
    @Args('data', {
      type: () => CreateUserDto,
    })
    data: CreateUserDto,
  ): Promise<UserModel> {
    return this.$create.execute(data);
  }
}
