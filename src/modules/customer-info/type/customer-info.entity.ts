import { Field, ObjectType } from '@nestjs/graphql';

import { UserGender } from '../../../enums/user-gender.enum';

@ObjectType()
export class CustomerInfoType {
  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  patronymic: string;

  @Field(() => Date)
  birthday: Date;

  @Field(() => UserGender, { defaultValue: UserGender.UNKNOWN })
  gender: UserGender = UserGender.UNKNOWN;
}
