import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

import { Product } from './product.entity';
import { Category } from './category.entity';


@Table({
    timestamps: false,
})
export class Accessories extends Model<Accessories> {
    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.UUID,
        primaryKey: true,
        unique: true
    })
    productId: string;

    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.UUID,
        primaryKey: true,
        unique: true
    })
    accessoryId: string;

    @ForeignKey(() => Category)
    @Column({ allowNull: false, type: DataType.UUID })
    categoryId: string;
}
