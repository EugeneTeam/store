import {
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table
} from 'sequelize-typescript';

import { uniquePK } from '../config/columns-types';
import { DeliveryType } from './delivery-type.entity';
import { PaymentType } from './payment-type.entity';
import { Customer } from './customer.entity';
import { DELIVERY_STATUS } from '../constants/delivery.constant';
import { PAYMENT_STATUS } from '../constants/payment.constant';
import { OrderProduct } from './order-product.entity';

@Table({
    timestamps: false
})
export class Order extends Model<Order> {
    @Column(uniquePK)
    id: string;

    @ForeignKey(() => DeliveryType)
    @Column({ allowNull: false, type: DataType.UUID })
    deliveryTypeId: string;

    @ForeignKey(() => PaymentType)
    @Column({ allowNull: false, type: DataType.UUID })
    paymentTypeId: string;

    @ForeignKey(() => Customer)
    @Column({ allowNull: false, type: DataType.UUID })
    customerId: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM(
            PAYMENT_STATUS.NOT_PAID,
            PAYMENT_STATUS.PAID,
        ),
        defaultValue: PAYMENT_STATUS.NOT_PAID
    })
    paymentStatus: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM(
            DELIVERY_STATUS.PENDING,
            DELIVERY_STATUS.PREPARING_FOR_SHIPMENT,
            DELIVERY_STATUS.READY_FOR_DELIVERY,
            DELIVERY_STATUS.IN_TRANSIT,
            DELIVERY_STATUS.ORDER_RECEIVED,
            DELIVERY_STATUS.CANCELLATION,
            DELIVERY_STATUS.EXCEPTION,
        ),
        defaultValue: DELIVERY_STATUS.PENDING
    })
    deliveryStatus: string;

    @Column(DataType.STRING)
    promoCode: string;

    @Column(DataType.STRING)
    comment: string;

    @Column(DataType.JSON)
    managerInfo: JSON;

    @HasMany(() => OrderProduct)
    orderProduct: OrderProduct[];
}

