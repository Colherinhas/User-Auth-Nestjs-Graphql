import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindUserFilterDto {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  cpf?: string;
}
