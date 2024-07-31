import { Module } from '@nestjs/common';
import { DbConnection } from './db/db.connection';
import { registerEnumType } from '@nestjs/graphql';
import { UserStatusEnum } from '@prisma/client';

@Module({
  providers: [DbConnection],
  exports: [DbConnection],
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
