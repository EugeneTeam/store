import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

import { Service } from './service.entity';
import { Product } from './product.entity';

@Table({
    timestamps: false,
})
export class ServiceProduct extends Model<ServiceProduct> {
    @ForeignKey(() => Service)
    @Column({
        allowNull: false,
        type: DataType.UUID,
        primaryKey: true,
        unique: true
    })
    serviceId: string;

    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.UUID,
        primaryKey: true,
        unique: true
    })
    productId: string;
}

