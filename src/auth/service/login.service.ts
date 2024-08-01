import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { AuthModel } from '../models/auth.model';
import { UserLoginDto } from '../dtos/userLogin.dto';
import { UserStatusEnum } from '@prisma/client';
import { HashHelper } from 'src/shared/helpers/hash.helper';
import { UserModel } from 'src/users/models/user.model';
import { JwtHelper } from 'src/shared/helpers/jwt.helper';

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
    if (!user || user.status === UserStatusEnum.BANNED) {
      throw new NotFoundException('User banned or not found.');
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
