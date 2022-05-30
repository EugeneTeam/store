import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { TokenService } from './token.service';
import { Token } from './type/token.type';
import { CreateTokenInput } from './type/create-token.input';
import { CreateTokenDto } from './dto/create-token.dto';

@Resolver(() => Token)
export class TokenResolver {
  constructor(
    private readonly tokenService: TokenService
  ) {}

  @Mutation(() => Token)
  createToken(
    @Args({ name: 'createTokenInput', type: () => CreateTokenInput }) createTokenInput: CreateTokenDto
  ) {
    return this.tokenService.create(createTokenInput);
  }

  @Query(() => String)
  test() {
    return 'String';
  }
}
