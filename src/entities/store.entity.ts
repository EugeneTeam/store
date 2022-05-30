import {
    Column,
    DataType,
    ForeignKey, HasMany,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { City } from './city.entity';
import { ProductInStore } from './productInStore.entity';

@Table({
    timestamps: false
})
export class Store extends Model<Store> {
    @Column(uniquePK)
    id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    address: number;

    @ForeignKey(() => City)
    @Column({ allowNull: false, type: DataType.UUID })
    cityId: string;

    @Column(DataType.STRING)
    openFrom: string;

    @Column(DataType.STRING)
    openUntil: string;

    @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: true })
    isOpen: string;

    @Column(DataType.STRING)
    reason: string;

    @Column(DataType.STRING)
    mapUrl: string;

    @HasMany(() => ProductInStore)
    productsInStore: ProductInStore[];
}
