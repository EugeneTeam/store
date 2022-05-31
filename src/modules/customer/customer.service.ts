import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { RegistrationCustomerInputDto } from './dto/registration-input.dto';
import { Customer } from '../../entities/customer.entity';
import { CustomerInfoService } from '../customer-info/customer-info.service';
import { TokenService } from '../token/token.service';
import { MailerService } from '../mailer/mailer.service';
import { TEMPLATES_NAME } from '../../constants/mailer.constant';
import { TOKEN_NAMES } from '../../constants/token.constant';
import { Token } from '../../entities/token.entity';
import { CustomerInfo } from '../../entities/customer-info.entity';
import { AuthToken } from '../auth/interfaces';
import { compare } from 'bcrypt';

@Injectable()
export class CustomerService {

  constructor(
    @InjectModel(Customer) protected readonly customer: typeof Customer,
    @Inject(CustomerInfoService) protected readonly customerInfoService: CustomerInfoService,
    @Inject(TokenService) protected readonly tokenService: TokenService,
    @Inject(MailerService) protected readonly mailerService: MailerService
  ) {}

  async create(createCustomerInput: RegistrationCustomerInputDto): Promise<Customer> {
    return this.customer.sequelize.transaction(async transaction => {

      const { url, token } = this.mailerService.generateConfirmationUrl();

      const newCustomer: Customer = await this.customer.create({
        password: createCustomerInput.password
      }, { ...(transaction && { transaction }) });

      delete createCustomerInput.password;

      await this.customerInfoService.create({
        customerId: newCustomer.id,
        ...createCustomerInput,
      }, transaction);

      await this.tokenService.create({
        customerId: newCustomer.id,
        name: TOKEN_NAMES.EMAIL_CONFIRMATION,
        token
      }, transaction);

      await this.mailerService.sendMail(TEMPLATES_NAME.CONFIRM_PASSWORD, { url });

      return newCustomer;
    });
  }

  async getCustomerInfoByCustomerId(id: string): Promise<CustomerInfo> {
    return this.customerInfoService.findCustomerId(id);
  }

  async findByLogin(email: string): Promise<Customer | null> {
    return this.customer.findOne({
      include: {
        required: true,
        model: CustomerInfo,
        where: {
          // @ts-ignore
          email: email
        },
      }
    });
  }

  async login(credential: any): Promise<AuthToken> {
    const user: any = await this.customer.findOne({
      where: {
        //@ts-ignore
        email: credential.login
      }
    });

    const validatePassword: boolean = await compare(
      credential.password,
      user.password
    );

    if (!validatePassword) {
      throw new HttpException('Invalid credential', HttpStatus.BAD_REQUEST);
    }

    return this.tokenService.create(user)
  }

  async confirmEmail(tokenString: string) {
    const token: string = tokenString.split('_')[0];
    const timestamp: string = tokenString.split('_')[1];
    const user = await this.customer.findOne({
      include: {
        model: Token,
        where: {
          token: tokenString,
          name: TOKEN_NAMES.EMAIL_CONFIRMATION
        }
      }
    });
    console.log(user)
  }
}
