import { forwardRef, Module } from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { ModelsModule } from '../models/models.module';
import { TokenModule } from '../token/token.module';
import { CustomerInfoModule } from '../customer-info/customer-info.module';
import { MailerModule } from '../mailer/mailer.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [
    CustomerResolver,
    CustomerService,
  ],
  imports: [
    ModelsModule,
    TokenModule,
    CustomerInfoModule,
    MailerModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    CustomerService
  ]
})
export class CustomerModule {}
