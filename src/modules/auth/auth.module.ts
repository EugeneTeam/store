import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CustomerModule } from '../customer/customer.module';
import jwt from '../../config/jwt';
import { ModelsModule } from '../models/models.module';

@Module({
  providers: [
    JwtStrategy,
    AuthService,
  ],
  exports: [
    AuthService,
  ],
  imports: [
    ModelsModule,
    forwardRef(() => CustomerModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ConfigModule.forRoot({
      load: [jwt]
    }),
    JwtModule.registerAsync({
      imports: [
        ConfigModule.forRoot({
          load: [jwt]
        }),
      ],
      useFactory: (configService: ConfigService) => configService.get('JWT'),
      inject: [ConfigService]
    })
  ]
})
export class AuthModule {}
