import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductType {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  categoryId: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  vendorCode: string;

  @Field(() => Float, { nullable: true })
  bonusValue: number;

  @Field(() => String, { nullable: true })
  discountId: string;
}
