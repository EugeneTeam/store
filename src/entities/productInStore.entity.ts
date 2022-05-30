import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

import { Product } from './product.entity';
import { Store } from './store.entity';

@Table({
    timestamps: false
})
export class ProductInStore extends Model<ProductInStore> {
    @ForeignKey(() => Store)
    @Column({
        allowNull: false,
        type: DataType.UUID,
        primaryKey: true,
        unique: true
    })
    storeId: string;

    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.UUID,
        primaryKey: true,
        unique: true
    })
    productId: string;

    @Column({ allowNull: false, type: DataType.INTEGER })
    quantity: number;
}
