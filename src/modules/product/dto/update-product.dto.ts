import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateProductDto extends CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
