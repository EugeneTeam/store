import { Injectable } from '@nestjs/common';

import { RegistrationCustomerInfoInputDto } from './dto/registration-input.dto';
import { CustomerInfo } from '../../entities/customer-info.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CustomerInfoService {

  constructor(
    @InjectModel(CustomerInfo)
    protected readonly customerInfo: typeof CustomerInfo
  ) {}

  create(createCustomerInfoInput: RegistrationCustomerInfoInputDto, transaction: any = null) {
    return this.customerInfo.create(createCustomerInfoInput, { ...(transaction && { transaction }) });
  }
}
