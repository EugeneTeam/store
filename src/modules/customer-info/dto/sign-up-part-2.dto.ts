import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserGender } from '../../../enums/user-gender.enum';

export class SignUpPart2Dto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password too short' })
  @MaxLength(20, { message: 'Password too long' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({})
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'First name too short' })
  @MaxLength(20, { message: 'First name too long' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Last name too short' })
  @MaxLength(20, { message: 'Last name too long' })
  lastName: string;

  @IsString()
  @IsOptional()
  patronymic: string;

  @IsDate()
  @IsOptional()
  birthday: Date

  @IsString()
  @IsEnum(UserGender)
  gender: string = UserGender.UNKNOWN;
}
