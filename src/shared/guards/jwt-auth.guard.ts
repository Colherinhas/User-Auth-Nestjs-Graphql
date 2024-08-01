import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
  @Inject(JwtService)
  private readonly $jwt: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    if (!request) {
      throw new ForbiddenException('Invalid token.');
    }
    const token = request.headers.authorization?.split(' ')[1];
    try {
      const decoded = this.$jwt.verify(token, {
        secret: process.env.JWT_KEY,
      });
      if (!decoded.id) {
        throw new ForbiddenException('Not decoded user correctly.');
      }

      request.user = decoded;
    } catch (error) {
      throw new ForbiddenException('Invalid or expired token.');
    }
    return true;
  }
}
