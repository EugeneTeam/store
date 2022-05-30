import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { UserPermission } from './user-permission.entity';
import { User } from './user.entity';

@Table({
    updatedAt: false,
})
export class Permission extends Model<Permission> {
    @Column(uniquePK)
    id: string;

    @Column({ allowNull: false, type: DataType.STRING, unique: true })
    permission: string;

    @BelongsToMany(() => User, () => UserPermission)
    users: User[];
}
