import {
    Column,
    DataType,
    HasMany,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { Store } from './store.entity';

@Table({
    timestamps: false
})
export class City extends Model<City> {
    @Column(uniquePK)
    id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    name: string;

    @HasMany(() => Store)
    stores: Store[];
}
