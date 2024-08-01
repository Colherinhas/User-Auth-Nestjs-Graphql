import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashHelper {
  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, Number(process.env.HASH_SALT_ROUNDS));
  }

  public async validateHash(
    userPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(userPassword, hashedPassword);
  }
}
//TODO create private method to insure password strenght, return error if not
