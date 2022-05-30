import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Customer } from '../../entities/customer.entity';
import { RegistrationsInputDto } from './dto/registrations.input';
import { CustomerInfo } from '../../entities/customer-info.entity';
import { Mailer } from '../../utils/mailer/mailer.service';
import { TEMPLATES_NAME } from '../../utils/mailer/constants';

@Injectable()
export class CustomerService {

  constructor(
      @InjectModel(Customer) protected readonly customer: typeof Customer,
      @InjectModel(CustomerInfo) protected readonly customerInfo: typeof CustomerInfo,
      @Inject(Mailer) protected readonly mailer: Mailer
  ) {}


  async registration(input: RegistrationsInputDto) {
    const password = input.password;
    delete input.password;

    return this.customer.sequelize.transaction(async transaction => {
      const customer: Customer = await this.customer.create({ password }, { transaction });

      await this.mailer.sendMail(
        TEMPLATES_NAME.CONFIRM_PASSWORD,
        {
          url: ''
        }
        );

      return await this.customerInfo.create({
        customerId: customer.id,
        ...input
      }, { transaction });
    });
  }
}
