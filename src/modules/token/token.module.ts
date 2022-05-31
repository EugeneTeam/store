import { Module } from '@nestjs/common';

import { TokenService } from './token.service';
import { TokenResolver } from './token.resolver';
import { ModelsModule } from '../models/models.module';

@Module({
  providers: [
    TokenService,
    TokenResolver,
  ],
  imports: [
    ModelsModule,
  ],
  exports: [
    TokenService
  ]
})
export class TokenModule {}
