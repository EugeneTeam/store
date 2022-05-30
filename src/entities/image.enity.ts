import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';

import {uniquePK} from '../config/columns-types';
import {Product} from './product.entity';

@Table({
    timestamps: false,
    indexes: [{
        unique: true,
        fields: ['productId', 'order']
    }]
})
export class Image extends Model<Image> {
    @Column(uniquePK)
    id: string;

    @ForeignKey(() => Product)
    @Column({ allowNull: false, type: DataType.UUID })
    productId: string;

    @Column({ allowNull: false, type: DataType.STRING })
    imageUrl: string;

    @Column({ allowNull: false, type: DataType.INTEGER })
    order: number;
}
