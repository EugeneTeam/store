import {
    DataType,
    Column,
    HasOne,
    Table,
    Model, HasMany
} from 'sequelize-typescript';
import { hashSync } from 'bcrypt';

import { USER } from '../constants/users.constant';
import { CustomerInfo } from './customer-info.entity';
import { uniquePK } from '../config/columns-types';
import { BonusCards } from './bonus-card.entity';
import { Order } from './order.entity';

@Table({
    timestamps: false,
})
export class Customer extends Model<Customer> {
    @Column(uniquePK)
    id: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
        set(value: string) { this.setDataValue('password', hashSync(value, 13)) }
    })
    password: string

    @Column({
        allowNull: false,
        type: DataType.ENUM(
            USER.STATUSES.ACTIVE,
            USER.STATUSES.INACTIVE,
            USER.STATUSES.BANNED
        ),
        defaultValue: USER.STATUSES.INACTIVE
    })
    status: string;

    @HasOne(() => CustomerInfo, { foreignKey: 'customerId' })
    customerInfo: CustomerInfo;

    @HasOne(() => BonusCards, { foreignKey: 'customerId' })
    bonusCard: BonusCards;

    @HasMany(() => Order)
    orders: Order[];
}
