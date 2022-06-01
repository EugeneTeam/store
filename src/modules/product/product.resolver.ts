import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../../entities/product.entity';
import { ProductType } from './type/product.type';
import { CreateProductInput } from './type/create-product.input';
import { ProductListType } from './type/product-list.type';
import { UpdateProductInput } from './type/update-product.input';

@Resolver()
export class ProductResolver {

  constructor(
    @Inject(ProductService) private readonly productService: ProductService
  ) {}

  @Mutation(() => ProductType)
  async createProduct(@Args({ name: 'input', type: () => CreateProductInput }) input: CreateProductDto): Promise<Product> {
    return this.productService.create(input);
  }

  @Query(() => ProductListType, { name: 'getProducts' })
  findAll(
    @Args({ name: 'limit', type: () => Int, nullable: true }) limit: number,
    @Args({ name: 'offset', type: () => Int, nullable: true }) offset: number,
  ) {
    return this.productService.findAll(limit, offset);
  }

  @Query(() => ProductType, { name: 'getProductInfo' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @Args({ name: 'input', type: () => UpdateProductInput }) input: UpdateProductDto,
    @Args('id', { type: () => String }) id: string
  ): Promise<Product> {
    return this.productService.update(id, input);
  }

  @Mutation(() => ProductType)
  removeProduct(@Args({ name: 'id', type: () => String }) id: string): Promise<Product | void> {
    return this.productService.remove(id);
  }
}
