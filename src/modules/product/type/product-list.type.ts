import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ProductType } from './product.type';

@ObjectType()
export class ProductListType {
  @Field(() => Float)
  count: number;

  @Field(() => [ProductType])
  rows: [ProductType];
}
