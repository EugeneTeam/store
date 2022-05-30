import {
    Column,
    DataType, ForeignKey,
    HasMany,
    Model,
    Table
} from 'sequelize-typescript';

import { User } from './user.entity';
import { Permission } from './permission.entity';

@Table({
    updatedAt: false,
})
export class UserPermission extends Model<UserPermission> {
    @ForeignKey(() => User)
    @Column({
        allowNull: false,
        type: DataType.STRING,
        primaryKey: true,
        unique: true
    })
    userId: string;

    @ForeignKey(() => Permission)
    @Column({
        allowNull: false,
        type: DataType.STRING,
        primaryKey: true,
        unique: true
    })
    permissionId: string;
}
