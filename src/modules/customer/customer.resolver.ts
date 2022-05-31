import { Resolver, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { CustomerService } from './customer.service';
import { CreateCustomerInput } from './type/create-customer.input';
import { RegistrationCustomerInputDto } from './dto/registration-input.dto';
import { CustomerType } from './type/customer.type';
import { Customer } from '../../entities/customer.entity';
import { AuthService } from '../auth/auth.service';

@Resolver(() => CustomerType)
export class CustomerResolver {
  constructor(
    private readonly customerService: CustomerService,
    private readonly authService: AuthService
  ) {}

  @Mutation(() => CustomerType, { name: 'registration' })
  registration(
    @Args({
      name: 'createCustomerInput',
      type: () => CreateCustomerInput
    }) createCustomerInput: RegistrationCustomerInputDto
  ) {
    return this.customerService.create(createCustomerInput);
  }

  @Mutation(() => String, { name: 'login' })
  authorization(
    @Args({ name: 'email', type: () => String, nullable: false, }) email: string,
    @Args({ name: 'password', type: () => String, nullable: false, }) password: string
  ) {
    return this.authService.login({ email, password });
  }

  @ResolveField()
  async customerInfo(@Parent() customer: Customer) {
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
