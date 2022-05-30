import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CustomerInfoService } from './customer-info.service';
import { CustomerInfoResolver } from './customer-info.resolver';
import { CustomerInfo } from '../../entities/customer-info.entity';

@Module({
  providers: [
    CustomerInfoResolver,
    CustomerInfoService
  ],
  imports: [
    SequelizeModule.forFeature([CustomerInfo])
  ],
  exports: [
    CustomerInfoService
  ]
})
export class CustomerInfoModule {}
