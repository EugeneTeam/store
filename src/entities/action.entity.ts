import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { User } from './user.entity';

@Table({
    updatedAt: false,
})
export class Action extends Model<Action> {
    @Column(uniquePK)
    id: string;

    @ForeignKey(() => User)
    @Column({ allowNull: false, type: DataType.UUID })
    managerId: string;

    @Column({ allowNull: false, type: DataType.STRING })
    action: string;

    @Column(DataType.STRING)
    params: string;

    @Column({ allowNull: false, type: DataType.DATE })
    createdAt: Date;
}
