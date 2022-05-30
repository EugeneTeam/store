import { Module } from '@nestjs/common';

import { TokenService } from './token.service';
import { TokenResolver } from './token.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from '../../entities/token.entity';

@Module({
  providers: [
    TokenService,
    TokenResolver,
  ],
  imports: [
    SequelizeModule.forFeature([Token])
  ],
  exports: [
    TokenService
  ]
})
export class TokenModule {}
