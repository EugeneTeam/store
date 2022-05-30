import { ObjectType, Field } from '@nestjs/graphql';
import { UserStatus } from "../enums/user-status.enum";
import { CustomerInfo } from "./customer-info.type";

@ObjectType()
export class Customer {
  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => UserStatus, { defaultValue: UserStatus.INACTIVE })
  status: UserStatus;

  @Field(() => CustomerInfo)
  customerInfo: CustomerInfo
}
