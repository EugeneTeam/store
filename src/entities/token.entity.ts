import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { Customer } from './customer.entity';

@Table({
  timestamps: false,
  indexes: [{
    unique: true,
    fields: ['customerId', 'name']
  }]
})
export class Token extends Model<Token> {
  @Column(uniquePK)
  id: string;

  @ForeignKey(() => Customer)
  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  customerId: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  token: string;
}
