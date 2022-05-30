import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { Category } from './category.entity';


@Table({
    timestamps: false,
})
export class Characteristic extends Model<Characteristic> {
    @Column(uniquePK)
     id: string;

    @ForeignKey(() => Category)
    @Column({ allowNull: false, type: DataType.UUID })
    categoryId: string;

    @Column({ allowNull: false, type: DataType.STRING })
    name: string;

    @Column({
        allowNull: false,
        type: DataType.JSON
    })
    value: JSON;

    @Column(DataType.TEXT)
    description: string;

    @Column(DataType.STRING)
    filterUrl: string;
}
