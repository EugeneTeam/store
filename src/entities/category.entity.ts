import {
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { Characteristic } from './characteristic.entity';
import { Accessories } from './accessories.entity';
import { Product } from './product.entity';

@Table({
    timestamps: false,
})
export class Category extends Model<Category> {
    @Column(uniquePK)
    id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    name: string;

    @ForeignKey(() => Category)
    @Column(DataType.UUID)
    parentId: string;

    @HasMany(() => Product, 'categoryId')
    products: Product[];

    @HasMany(() => Category, 'parentId')
    child: Category[];

    @HasMany(() => Characteristic, 'categoryId')
    characteristics: Characteristic[];

    @HasMany(() => Accessories, 'categoryId')
    accessories: Accessories[];
}

