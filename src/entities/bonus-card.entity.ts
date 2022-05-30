import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table, Unique
} from 'sequelize-typescript';

import { Customer } from './customer.entity';

@Table({
    timestamps: false
})
export class BonusCards extends Model<BonusCards> {
    @ForeignKey(() => Customer)
    @Column({ primaryKey: true, type: DataType.UUID, onDelete: 'CASCADE' })
    customerId: string;

    @Unique
    @Column(DataType.STRING)
    code: string;

    @Column(DataType.DECIMAL(10, 2))
    value: number;
}
