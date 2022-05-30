import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => String)
  customerId: number;

  @Field(() => String)
  name: number;

  @Field(() => String)
  token: number;
}
