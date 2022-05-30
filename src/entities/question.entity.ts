import {
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { Product } from './product.entity';
import { Grade } from './grade.entity';

@Table({
    timestamps: false
})
export class Question extends Model<Question> {
    @Column(uniquePK)
    id: string;

    @ForeignKey(() => Product)
    @Column({ allowNull: false, type: DataType.UUID })
    productId: string;

    @Column({ allowNull: false, type: DataType.STRING })
    message: string;

    @ForeignKey(() => Question)
    @Column(DataType.UUID)
    parentId: string;

    @ForeignKey(() => Grade)
    @Column({ allowNull: false, type: DataType.UUID })
    gradeId: string;

    @HasMany(() => Question, 'parentId')
    child: Question[];
}
