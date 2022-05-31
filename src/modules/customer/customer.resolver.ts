import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { CustomerService } from './customer.service';
import { CustomerType } from './type/customer.type';
import { Customer } from '../../entities/customer.entity';
import { AuthService } from '../auth/auth.service';
import { SignUpInput } from './type/sign-up.input';
import { SignUpPart1Dto } from './dto/sign-up-part-1.dto';


@Resolver(() => CustomerType)
export class CustomerResolver {

  constructor(
    private readonly customerService: CustomerService,
    private readonly authService: AuthService
  ) {}

  @Mutation(() => CustomerType, { name: 'signUp' })
  signUpPart1( @Args({ name: 'input', type: () => SignUpInput }) input: SignUpPart1Dto ) {
    return this.customerService.create(input);
  }

  @Mutation(() => String, { name: 'login' })
  signIn(
    @Args({ name: 'email', type: () => String, nullable: false, }) email: string,
    @Args({ name: 'password', type: () => String, nullable: false, }) password: string
  ) {
    return this.authService.login({ email, password });
  }

  @ResolveField()
  private async customerInfo(@Parent() customer: Customer) {
    const { id } = customer;
    return this.customerService.getCustomerInfoByCustomerId(id);
  }

  @Mutation(() => CustomerType, { name: 'confirmEmail' })
  confirmEmail(
    @Args({ name: 'token', type: () => String }) token: string
  ) {
    return this.customerService.confirmEmail(token);
  }
}
