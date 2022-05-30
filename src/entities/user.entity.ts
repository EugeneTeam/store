import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { Permission } from './permission.entity';
import { UserPermission } from './user-permission.entity';

@Table({
    updatedAt: false,
})
export class User extends Model<User> {
    @Column(uniquePK)
    id: string;

    @Column({ allowNull: false, type: DataType.STRING, unique: true })
    email: string;

    @Column({ allowNull: false, type: DataType.STRING, unique: true })
    username: string;

    @BelongsToMany(() => Permission, () => UserPermission)
    permissions: Permission[];
}
