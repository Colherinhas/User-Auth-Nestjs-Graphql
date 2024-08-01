import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindUserFilterDto } from './dtos/find-user-filters.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { FindUserUseCase } from './use-cases/find-users.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { FindUserByIdUseCase } from './use-cases/find-user-by-id.use-case';
import { SoftDeleteUserUseCase } from './use-cases/soft-delete-user.use-case';
import { UserResponseModel } from './models/user-response.model';

@Resolver()
export class UserResolver {
  @Inject(FindUserByIdUseCase)
  private readonly $findUser: FindUserByIdUseCase;
  @Inject(FindUserUseCase)
  private readonly $findMany: FindUserUseCase;
  @Inject(CreateUserUseCase)
  private readonly $create: CreateUserUseCase;
  @Inject(UpdateUserUseCase)
  private readonly $update: UpdateUserUseCase;
  @Inject(SoftDeleteUserUseCase)
  private readonly $softDelete: SoftDeleteUserUseCase;

  @Query(() => UserResponseModel, { name: 'user' })
  public async findUserById(
    @Args('id', { type: () => String })
    id: string,
  ): Promise<UserResponseModel> {
    return this.$findUser.execute(id);
  }

  @Query(() => [UserResponseModel], { name: 'users' })
  public async findUsers(
    @Args('filters', { type: () => FindUserFilterDto, nullable: true })
    filters?: FindUserFilterDto,
  ): Promise<UserResponseModel[]> {
    return this.$findMany.execute(filters);
  }

  @Mutation(() => UserResponseModel, { name: 'createUser' })
  public async createUser(
    @Args('data', {
      type: () => CreateUserDto,
    })
    data: CreateUserDto,
  ): Promise<UserResponseModel> {
    return this.$create.execute(data);
  }

  @Mutation(() => UserResponseModel, { name: 'updateUser' })
  public async updateUser(
    @Args('data', {
      type: () => UpdateUserDto,
    })
    data: UpdateUserDto,
  ): Promise<UserResponseModel> {
    return this.$update.execute(data);
  }

  @Mutation(() => UserResponseModel, { name: 'deleteUser' })
  public async deleteUser(
    @Args('id', {
      type: () => String,
    })
    id: string,
  ): Promise<UserResponseModel> {
    return this.$softDelete.execute(id);
  }
}

//TODO unban user mutation
