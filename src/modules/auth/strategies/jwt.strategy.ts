import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { AuthPayload } from '../interfaces';
import { Customer } from '../../../entities/customer.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @Inject(AuthService) private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY
    });
  }

  async validate(payload: AuthPayload): Promise<Customer> {
    const user: Customer = await this.authService.validateByPayload(payload);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
