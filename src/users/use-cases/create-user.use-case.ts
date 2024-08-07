import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HashHelper } from 'src/shared/helpers/hash.helper';

@Injectable()
export class CreateUserUseCase {
  @Inject(UserRepository)
  private readonly $user: UserRepository;
  @Inject(HashHelper)
  private readonly $hash: HashHelper;

  public async execute(data: CreateUserDto): Promise<User> {
    try {
      data.password = await this.validatePassword(data.password);
      await this.existingUser(data.email, data.cpf);
      return this.$user.createUser(data);
    } catch (err) {
      throw Error(err.message);
    }
  }

  private async validatePassword(password: string): Promise<string | null> {
    const hashedPassword = await this.$hash.hashPassword(password);
    if (!hashedPassword)
      throw new Error('Error while generating password hash');

    return hashedPassword;
  }

  private async existingUser(email: string, cpf: string): Promise<void> {
    const filteremail = { email };
    const filtercpf = { cpf };
    let user = await this.$user.findUsers(filteremail);
    if (user.length > 0) {
      throw new BadRequestException('Email already in use.');
    }
    user = await this.$user.findUsers(filtercpf);
    if (user.length > 0) {
      throw new BadRequestException('CPF already in use.');
    }
  }
}
