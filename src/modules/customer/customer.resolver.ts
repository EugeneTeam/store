import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { CustomerService } from './customer.service';
import { CreateCustomerInput } from './type/create-customer.input';
import { RegistrationCustomerInputDto } from './dto/registration-input.dto';
import { CustomerType } from './type/customer.type';

@Resolver()
export class CustomerResolver {
  constructor(
    private readonly customerService: CustomerService
  ) {}

  @Mutation(() => CustomerType, { name: 'registration' })
  createCustomer(
    @Args({
      name: 'createCustomerInput',
      type: () => CreateCustomerInput
    }) createCustomerInput: RegistrationCustomerInputDto
  ) {
    return this.customerService.create(createCustomerInput);
  }
}
