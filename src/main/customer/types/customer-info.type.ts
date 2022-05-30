import { ObjectType, Field } from '@nestjs/graphql';
import { UserGender } from "../enums/user-gender.enum";

@ObjectType()
export class CustomerInfo {
  @Field(() => String)
  email: string

  @Field(() => String)
  phone: string

  @Field(() => String)
  firstName: string

  @Field(() => String)
  lastName: string

  @Field(() => String, { nullable: true })
  patronymic: string

  @Field(() => Date, { nullable: true })
  birthday: Date

  @Field(() => UserGender, { defaultValue: UserGender.UNKNOWN })
  gender: UserGender
}
