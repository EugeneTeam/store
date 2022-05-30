import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { RegistrationCustomerInputDto } from './dto/registration-input.dto';
import { Customer } from '../../entities/customer.entity';
import { CustomerInfoService } from '../customer-info/customer-info.service';
import { TokenService } from '../token/token.service';
import { MailerService } from '../mailer/mailer.service';
import { TEMPLATES_NAME } from '../../constants/mailer.constant';
import { TOKEN_NAMES } from '../../constants/token.constant';

@Injectable()
export class CustomerService {

  constructor(
    @InjectModel(Customer) protected readonly customer: typeof Customer,
    protected readonly customerInfo: CustomerInfoService,
    protected readonly token: TokenService,
    protected readonly mailer: MailerService
  ) {}

  async create(createCustomerInput: RegistrationCustomerInputDto): Promise<Customer> {
    return this.customer.sequelize.transaction(async transaction => {

      const { url, token } = this.mailer.generateConfirmationUrl();

      const newCustomer: Customer = await this.customer.create({
        password: createCustomerInput.password
      }, { ...(transaction && { transaction }) });

      delete createCustomerInput.password;

      await this.customerInfo.create({
        customerId: newCustomer.id,
        ...createCustomerInput,
      }, transaction);

      await this.token.create({
        customerId: newCustomer.id,
        name: TOKEN_NAMES.EMAIL_CONFIRMATION,
        token
      }, transaction);

      await this.mailer.sendMail(TEMPLATES_NAME.CONFIRM_PASSWORD, { url });

      return newCustomer;
    });
  }
}
