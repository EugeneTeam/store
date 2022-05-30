import {
    Column,
    DataType,
    HasMany,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { Order } from './order.entity';

@Table({
    timestamps: false
})
export class DeliveryType extends Model<DeliveryType> {
    @Column(uniquePK)
    id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    name: string

    @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: false })
    isActive: boolean;

    @HasMany(() => Order)
    orders: Order[];
}

