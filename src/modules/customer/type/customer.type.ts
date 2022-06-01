import { ObjectType, Field } from '@nestjs/graphql';

import { UserStatus } from '../../../enums/user-status.enum';
import { CustomerInfoType } from '../../customer-info/type/customer-info.type';

@ObjectType()
export class CustomerType {
  @Field(() => String)
  id: string;

  @Field(() => UserStatus)
  status: UserStatus;

  @Field(() => CustomerInfoType)
  customerInfo: CustomerInfoType;
}
