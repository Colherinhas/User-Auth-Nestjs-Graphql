import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserResponseModel } from 'src/users/models/user-response.model';

@Injectable()
export class JwtHelper {
  @Inject(JwtService)
  private readonly $jwt: JwtService;

  public generateToken(payload: UserResponseModel): string {
    return this.$jwt.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      privateKey: process.env.JWT_KEY,
    });
  }
}
