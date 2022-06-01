import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ModelsModule } from '../models/models.module';

@Module({
  providers: [
    ProductResolver,
    ProductService
  ],
  imports: [
    ModelsModule,
  ]
})
export class ProductModule {}
