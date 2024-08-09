import { Field, ID, InputType } from '@nestjs/graphql';
import { UserStatusEnum } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => UserStatusEnum, { nullable: true })
  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum;

  @Field(() => String, { nullable: true })
  cpf?: string;

  @Field(() => String, { nullable: true })
  photoUrl?: string;
}
