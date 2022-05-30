import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { Discount } from './discount.entity';

@Table({
    timestamps: false,
})
export class PromoCode extends Model<PromoCode> {
    @Column(uniquePK)
    id: string;

    @Column({ allowNull: false, type: DataType.STRING, unique: true })
    code: string;

    @ForeignKey(() => Discount)
    @Column({ allowNull: false, type: DataType.UUID })
    discountId: string
}
