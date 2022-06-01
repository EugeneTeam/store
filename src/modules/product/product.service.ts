import { Injectable } from '@nestjs/common';

import { UpdateProductInput } from './type/update-product.input';
import { Product } from '../../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductList } from './interfaces';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product) protected readonly product: typeof Product
  ) {}

  create(input: CreateProductDto): Promise<Product> {
    return this.product.create(input);
  }

  async findAll(limit: number, offset: number): Promise<ProductList | []> {
    return this.product.findAndCountAll({
      ...(limit && { limit }),
      ...(offset && { offset })
    });
  }

  async findOne(id: string): Promise<Product> {
    return this.findByPK(id);
  }

  async update(id: string, input: UpdateProductInput): Promise<Product> {
    const product: Product = await this.findByPK(id);
    return product.update(input);
  }

  async remove(id: string): Promise<Product | void> {
    const product: Product = await this.findByPK(id);
    return product.destroy();
  }

  private async findByPK(pk: string): Promise<Product> {
    const product = await this.product.findByPk(pk);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
}
