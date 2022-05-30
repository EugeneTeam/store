import {
    DataType,
    ForeignKey,
    Column,
    Table,
    Model
} from 'sequelize-typescript';

import { USER_GENDER } from '../constants/users.constant';
import { Customer } from './customer.entity';

@Table({
    timestamps: false,
})
export class CustomerInfo extends Model<CustomerInfo> {
    @ForeignKey(() => Customer)
    @Column({ primaryKey: true, type: DataType.UUID, onDelete: 'CASCADE' })
    customerId: string;

    @Column({ allowNull: false, type: DataType.STRING, unique: true, })
    email: string;

    @Column({ allowNull: false, type: DataType.STRING, })
    phone: string;

    @Column({ allowNull: false, type: DataType.STRING, })
    lastName: string;

    @Column({ allowNull: false, type: DataType.STRING, })
    firstName: string;

    @Column(DataType.STRING)
    patronymic: string;

    @Column(DataType.DATE)
    birthday: Date;

    @Column({
        allowNull: false,
        type: DataType.ENUM(
            USER_GENDER.FEMALE,
            USER_GENDER.MALE,
            USER_GENDER.UNKNOWN
        ),
        defaultValue: USER_GENDER.UNKNOWN
    })
    gender: string;
}
