import { Resolver,  Mutation, Args } from '@nestjs/graphql';

import { CustomerInfoService } from './customer-info.service';
import { RegistrationCustomerInfoInputDto } from './dto/registration-input.dto';
import { CreateCustomerInfoInput } from './type/create-customer-info.input';
import { CustomerInfoType } from './type/customer-info.entity';

@Resolver()
export class CustomerInfoResolver {

  constructor(
    private readonly customerInfoService: CustomerInfoService
  ) {}

  @Mutation(() => CustomerInfoType)
  createCustomerInfo(
    @Args({
      name: 'createCustomerInfoInput',
      type: () => CreateCustomerInfoInput
    }) createCustomerInfoInput: RegistrationCustomerInfoInputDto) {
    return this.customerInfoService.create(createCustomerInfoInput);
  }
}
