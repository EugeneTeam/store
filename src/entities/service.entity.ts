import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { ServiceProduct } from './service-product.entity';
import { Product } from './product.entity';

@Table({
    timestamps: false,
})
export class Service extends Model<Service> {
    @Column(uniquePK)
    id: string;

    @Column({ allowNull: false, type: DataType.DECIMAL(10, 2) })
    price: number;

    @Column({
        allowNull: false,
        type: DataType.TEXT
    })
    description: string;

    @BelongsToMany(() => Product, () => ServiceProduct)
    products: Product[]
}
