import {
    Column,
    DataType,
    HasMany,
    HasOne,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { DISCOUNT } from '../constants/discount.constant';
import { Product } from './product.entity';
import { PromoCode } from './promo-code.entity';

@Table({
    timestamps: false,
})
export class Discount extends Model<Discount> {
    @Column(uniquePK)
    id: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM(
            DISCOUNT.NUMBER,
            DISCOUNT.PERCENT,
        )
    })
    discountType: string;

    @Column({ allowNull: false, type: DataType.DECIMAL(10, 2), })
    discountValue: string;

    @HasMany(() => Product)
    products: Product[];

    @HasOne(() => PromoCode)
    promoCodes: PromoCode[];
}
