import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  vendorCode: string;

  @IsNotEmpty()
  @IsNumber()
  bonusValue: number;

  @IsOptional()
  @IsString()
  @IsUUID()
  discountId: string;
}
