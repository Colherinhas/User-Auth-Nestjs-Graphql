import { Module } from '@nestjs/common';
import { DbConnection } from './db/db.connection';
import { registerEnumType } from '@nestjs/graphql';
import { LanguageEnum, SocialMediaEnum, UserStatusEnum } from '@prisma/client';
import { HashHelper } from './helpers/hash.helper';
import { JwtHelper } from './helpers/jwt.helper';
import { JwtGuard } from './guards/jwt-auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  providers: [DbConnection, HashHelper, JwtHelper, JwtGuard, JwtService],
  exports: [DbConnection, HashHelper, JwtHelper, JwtGuard, JwtService],
})
export class SharedModule {
  constructor() {
    registerEnumType(LanguageEnum, {
      name: 'ProgrammingLanguages',
      description: 'Available Programming Languages',
      valuesMap: {
        JavaScript: { description: 'JavaScript' },
        Python: { description: 'Python' },
        Java: { description: 'Java' },
        CSHARP: { description: 'CSHARP' },
        CPLUSPLUS: { description: 'CPLUSPLUS' },
        PHP: { description: 'PHP' },
        TypeScript: { description: 'TypeScript' },
        Ruby: { description: 'Ruby' },
        Swift: { description: 'Swift' },
        Go: { description: 'Go' },
        Kotlin: { description: 'Kotlin' },
        Rust: { description: 'Rust' },
        Dart: { description: 'Dart' },
        Scala: { description: 'Scala' },
        ShellScripting: { description: 'ShellScripting' },
        Perl: { description: 'Perl' },
        ObjectiveC: { description: 'ObjectiveC' },
        R: { description: 'R' },
        Elixir: { description: 'Elixir' },
        Haskell: { description: 'Haskell' },
      },
    });
    registerEnumType(SocialMediaEnum, {
      name: 'SocialMedia',
      description: 'Available Social Media',
      valuesMap: {
        INSTAGRAM: { description: 'INSTAGRAM' },
        FACEBOOK: { description: 'FACEBOOK' },
        LINKEDIN: { description: 'LINKEDIN' },
        GITHUB: { description: 'GITHUB' },
      },
    });
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
