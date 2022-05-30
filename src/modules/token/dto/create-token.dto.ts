import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTokenDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
