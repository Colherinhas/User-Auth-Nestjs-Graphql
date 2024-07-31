import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindUserFilterDto {
  @Field(() => String, { nullable: true })
  name?: string;
}
