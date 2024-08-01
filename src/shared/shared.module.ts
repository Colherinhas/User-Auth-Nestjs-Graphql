import { Module } from '@nestjs/common';
import { DbConnection } from './db/db.connection';
import { registerEnumType } from '@nestjs/graphql';
import { UserStatusEnum } from '@prisma/client';
import { HashHelper } from './helpers/hash.helper';
import { JwtHelper } from './helpers/jwt.helper';
import { JwtGuard } from './guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  providers: [DbConnection, HashHelper, JwtHelper, JwtGuard],
  exports: [DbConnection, HashHelper, JwtHelper, JwtGuard],
})
export class SharedModule {
  constructor() {
    registerEnumType(UserStatusEnum, {
      name: 'UserStatusEnum',
      description: 'User Status Available',
      valuesMap: {
        ACTIVE: { description: 'Active User' },
        INACTIVE: { description: 'Inactive User' },
        BANNED: { description: 'Banned User' },
      },
    });
  }
}
