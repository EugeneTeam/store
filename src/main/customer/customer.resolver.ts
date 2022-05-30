import {
  Resolver,
  Query,
  Args
} from '@nestjs/graphql';
import { UsePipes } from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CustomerInputRegistration } from './types/customer-registration.type';
import { RegistrationsInputDto } from './dto/registrations.input';
import { ValidationPipeFactory } from '../../utils/validation-factory';
import { Customer } from './types/customer.type';
import { CustomerInfo } from './types/customer-info.type';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
      private readonly customerService: CustomerService
  ) {}

  @UsePipes(ValidationPipeFactory)
  @Query(() => CustomerInfo, { name: 'registration' })
  registration(
      @Args({ name: 'input', type: () => CustomerInputRegistration }) input: RegistrationsInputDto
  ) {
    return this.customerService.registration(input);
  }

}
