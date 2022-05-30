import {
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { Discount } from './discount.entity';
import { Category } from './category.entity';
import { Accessories } from './accessories.entity';
import { ServiceProduct } from './service-product.entity';
import { Service } from './service.entity';
import { Image } from './image.enity';
import { Comment } from './comment.entity';
import { Question } from './question.entity';
import { ProductInStore } from './productInStore.entity';
import { OrderProduct } from './order-product.entity';

@Table({
    timestamps: false
})
export class Product extends Model<Product> {
    @Column(uniquePK)
    id: string;

    @ForeignKey(() => Category)
    @Column({ type: DataType.UUID, onDelete: 'CASCADE' })
    categoryId: string;

    @Column({ allowNull: false, type: DataType.STRING })
    title: string;

    @Column({ allowNull: false, type: DataType.TEXT })
    description: string;

    @Column({ allowNull: false, type: DataType.DECIMAL(10, 2) })
    price: number;

    @Column({ allowNull: false, type: DataType.STRING })
    vendorCode: string;

    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
    bonusValue: number;

    @ForeignKey(() => Discount)
    @Column({ type: DataType.UUID, onDelete: 'CASCADE' })
    discountId: string;

    @BelongsToMany(() => Product, () => Accessories, 'productId')
    accessories: Accessories[];

    @BelongsToMany(() => Product, () => Accessories, 'accessoryId')
    products: Accessories[];

    @BelongsToMany(() => Service, () => ServiceProduct)
    services: Service[];

    @HasMany(() => Image)
    images: Image[];

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => Question)
    questions: Question[];

    @HasMany(() => ProductInStore)
    productsInStore: ProductInStore[];

    @HasMany(() => OrderProduct)
    orderProduct: OrderProduct[];
}
