import { Resolver,  Mutation, Args } from '@nestjs/graphql';

import { CustomerInfoService } from './customer-info.service';
import { CustomerInfoType } from './type/customer-info.type';
import { SignUpInput } from '../customer/type/sign-up.input';
import { SignUpPart2Dto } from './dto/sign-up-part-2.dto';

@Resolver()
export class CustomerInfoResolver {

  constructor(
    private readonly customerInfoService: CustomerInfoService
  ) {}

  @Mutation(() => CustomerInfoType)
  createCustomerInfoForCustomer(
    @Args({ name: 'input', type: () => SignUpInput }) input: SignUpPart2Dto
  ) {
    return this.customerInfoService.create(input);
  }
}
