import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';

import { AuthPayload, AuthToken } from './interfaces';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../../entities/customer.entity';
import { CustomerInfo } from '../../entities/customer-info.entity';


@Injectable()
export class AuthService {

  constructor(
    @Inject(CustomerService) private readonly userService: CustomerService,
    @Inject(JwtService) private readonly jwtService: JwtService
  ) {}

  async login({ email, password }): Promise<string> {
    const customer: Customer = await this.userService.findByLogin(email);

    const validatePassword: boolean = await compare(
      password,
      customer.password
    );

    if (!validatePassword) {
      throw new HttpException('Invalid credential', HttpStatus.BAD_REQUEST);
    }

    return this.signUser({ email: customer.customerInfo.email, id: customer.id });
  }

  private async signUser({ email, id }): Promise<string> {
    return this.jwtService.sign({
      login: email,
      uid: id
    });
  }

  async validateByPayload(payload: AuthPayload): Promise<any> {
    const user: any = await this.userService.findByLogin(payload?.login);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
