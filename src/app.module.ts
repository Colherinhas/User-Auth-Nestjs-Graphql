import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserRepositoriesModule } from './users/user-repositories/user-repositories.module';
import { UserSocialMediasModule } from './users/user-social-media/user-social-media.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    forwardRef(() => SharedModule),
    UserModule,
    UserSocialMediasModule,
    UserRepositoriesModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
