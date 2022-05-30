import {
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { Grade } from './grade.entity';
import { Product } from './product.entity';

@Table({
    timestamps: false
})
export class Comment extends Model<Comment> {
    @Column(uniquePK)
    id: string;

    @ForeignKey(() => Product)
    @Column({ allowNull: false, type: DataType.UUID })
    productId: string;

    @Column({ allowNull: false, type: DataType.STRING })
    message: string;

    @ForeignKey(() => Comment)
    @Column(DataType.UUID)
    parentId: string;

    @ForeignKey(() => Grade)
    @Column({ allowNull: false, type: DataType.UUID })
    gradeId: string;

    @Column(DataType.STRING)
    advantages: string;

    @Column(DataType.STRING)
    flaws: string;

    @HasMany(() => Comment, 'parentId')
    child: Comment[];
}
