import {
    Column,
    DataType,
    HasMany,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { Comment } from './comment.entity';
import { Question } from './question.entity';

@Table({
    timestamps: false
})
export class Grade extends Model<Grade> {
    @Column(uniquePK)
    id: string;

    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
    like: number;

    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
    dislike: number;

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => Question)
    questions: Question[];
}
