import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserStatusEnum } from '@prisma/client';
import { HashHelper } from 'src/shared/helpers/hash.helper';
import { JwtHelper } from 'src/shared/helpers/jwt.helper';
import { UserModel } from 'src/users/models/user.model';
import { UserRepository } from 'src/users/users.repository';
import { UserLoginDto } from '../dtos/userLogin.dto';
import { AuthModel } from '../models/auth.model';

@Injectable()
export class LoginService {
  @Inject(UserRepository)
  private readonly $user: UserRepository;
  @Inject(HashHelper)
  private readonly $hash: HashHelper;
  @Inject(JwtHelper)
  private readonly $jwt: JwtHelper;

  public async execute(data: UserLoginDto): Promise<AuthModel> {
    try {
      const user = await this.validateUser(data);
      await this.validatePassword(data.password, user.password);
      return this.generateToken(user);
    } catch (error) {
      throw Error(error.message);
    }
  }

  private async validateUser(data: UserLoginDto): Promise<UserModel> {
    const user = await this.$user.findUserByFilter({
      email: data.email,
      deletedAt: null,
    });
    if (!user) {
      throw new NotFoundException(
        'User not found. If it exists, must have been banned or deleted.',
      );
    }
    if (user.status === UserStatusEnum.BANNED || user.deletedAt) {
      throw new NotFoundException('User banned or deleted.');
    }
    return user;
  }

  private async validatePassword(
    userPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const validPassword = await this.$hash.validateHash(
      userPassword,
      hashedPassword,
    );
    if (validPassword === false) {
      throw new BadRequestException('Wrong password');
    }
  }

  private generateToken(user: UserModel): AuthModel {
    delete user.password;
    const accessToken = this.$jwt.generateToken(user);
    const responseObj: AuthModel = {
      accessToken,
      user,
    };
    return responseObj;
  }
}
