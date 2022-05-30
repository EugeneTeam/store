import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { Token } from '../../entities/token.entity';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {

  constructor(
    @InjectModel(Token) protected readonly token: typeof Token
  ) {}

  async create(createTokenInput: CreateTokenDto, transaction: any = null): Promise<Token> {
    return this.token.create(createTokenInput, { ...(transaction && { transaction }) });
  }
}
