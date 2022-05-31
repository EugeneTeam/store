import { Module } from '@nestjs/common';

import { CustomerInfoService } from './customer-info.service';
import { CustomerInfoResolver } from './customer-info.resolver';
import { ModelsModule } from '../models/models.module';

@Module({
  providers: [
    CustomerInfoResolver,
    CustomerInfoService
  ],
  imports: [
    ModelsModule
  ],
  exports: [
    CustomerInfoService
  ]
})
export class CustomerInfoModule {}
