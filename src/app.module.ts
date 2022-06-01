import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from '@nestjs/config';
import {
  ApolloDriver,
  ApolloDriverConfig
} from "@nestjs/apollo";
import {
  DirectiveLocation,
  GraphQLDirective
} from 'graphql/index';

import { MailerModule } from '@nestjs-modules/mailer';

import { models } from './entities';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TokenModule } from './modules/token/token.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CustomerInfoModule } from './modules/customer-info/customer-info.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    MailerModule.forRoot({
      transport: process.env.MAILER_TRANSPORT,
      defaults: {
        from: process.env.MAILER_MAIL_FROM
      },
      preview: process.env.NODE_ENV === 'development',
      template: {
        dir: join(process.cwd(), 'src/modules/mailer/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      formatError: (error: any) => {
        switch (true) {
          case error.message === 'Validation error' : return error.extensions.exception.errors.map(item => item.message)
          default: return error;
        }
      },
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      models,
    }),
    TokenModule,
    CustomerModule,
    CustomerInfoModule,
    AuthModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
