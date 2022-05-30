import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Table({
    timestamps: false,
    indexes: [{
        unique: true,
        fields: ['orderId', 'productId']
    }]
})
export class OrderProduct extends Model<OrderProduct> {
    @Column(uniquePK)
    id: string;

    @ForeignKey(() => Order)
    @Column({ allowNull: false, type: DataType.UUID })
    orderId: string;

    @ForeignKey(() => Product)
    @Column({ allowNull: false, type: DataType.UUID })
    productId: string;

    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 1 })
    quantity: number
}
