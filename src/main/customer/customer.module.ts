import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";

import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { Customer } from "../../entities/customer.entity";
import { CustomerInfo } from '../../entities/customer-info.entity';
import { Mailer } from '../../utils/mailer/mailer.service';

@Module({
  providers: [
    CustomerResolver,
    CustomerService,
    Mailer
  ],
  imports: [
    SequelizeModule.forFeature([Customer, CustomerInfo]),
  ],
  exports: [
    CustomerResolver
  ]
})
export class CustomerModule {}
