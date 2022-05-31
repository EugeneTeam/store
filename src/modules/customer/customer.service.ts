import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { compare } from 'bcrypt';

import { Customer } from '../../entities/customer.entity';
import { CustomerInfoService } from '../customer-info/customer-info.service';
import { TokenService } from '../token/token.service';
import { MailerService } from '../mailer/mailer.service';
import { TEMPLATES_NAME } from '../../constants/mailer.constant';
import { TOKEN_NAMES } from '../../constants/token.constant';
import { Token } from '../../entities/token.entity';
import { CustomerInfo } from '../../entities/customer-info.entity';
import { AuthToken } from '../auth/interfaces';
import { SignUpPart1Dto } from './dto/sign-up-part-1.dto';

@Injectable()
export class CustomerService {

  constructor(
    @InjectModel(Customer) protected readonly customer: typeof Customer,
    @Inject(CustomerInfoService) protected readonly customerInfoService: CustomerInfoService,
    @Inject(TokenService) protected readonly tokenService: TokenService,
    @Inject(MailerService) protected readonly mailerService: MailerService
  ) {}

  async create(input: SignUpPart1Dto): Promise<Customer> {
    return this.customer.sequelize.transaction(async transaction => {

      const { url, token } = this.mailerService.generateConfirmationUrl();

      const newCustomer: Customer = await this.customer.create({
        password: input.password
      }, { ...(transaction && { transaction }) });

      delete input.password;

      const newCustomerInfo: CustomerInfo = await this.customerInfoService.create({
        customerId: newCustomer.id,
        ...input,
      }, transaction);

      await this.tokenService.create({
        customerId: newCustomer.id,
        name: TOKEN_NAMES.EMAIL_CONFIRMATION,
        token
      }, transaction);

      await this.mailerService.sendMail(
        TEMPLATES_NAME.CONFIRM_PASSWORD,
        { url },
        newCustomerInfo.email
      );

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

    const validatePassword: boolean = await compare(credential.password, user.password);

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
