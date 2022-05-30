import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTokenInput {
  @Field(() => String)
  customerId: number;

  @Field(() => String)
  name: number;

  @Field(() => String)
  token: number;
}
