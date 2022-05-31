import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { CustomerInfo } from '../../entities/customer-info.entity';
import { SignUpPart2Dto } from './dto/sign-up-part-2.dto';

@Injectable()
export class CustomerInfoService {

  constructor(
    @InjectModel(CustomerInfo)
    protected readonly customerInfo: typeof CustomerInfo
  ) {}

  create(input: SignUpPart2Dto, transaction: any = null) {
    return this.customerInfo.create(input, { ...(transaction && { transaction }) });
  }

  async findCustomerId(id: string): Promise<CustomerInfo> {
    return this.customerInfo.findOne({
      where: {
        customerId: id
      }
    });
  }
}
