import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthorizationInput {
  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;
}
