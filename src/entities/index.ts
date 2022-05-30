import { CustomerInfo } from './customer-info.entity';
import { Customer } from './customer.entity';
import { BonusCards } from './bonus-card.entity';
import { Category } from './category.entity';
import { Characteristic } from './characteristic.entity';
import { Discount } from './discount.entity';
import { Product } from './product.entity';
import { Accessories } from './accessories.entity';
import { Service } from './service.entity';
import { ServiceProduct } from './service-product.entity';
import { PromoCode } from './promo-code.entity';
import { Image } from './image.enity';
import { Comment } from './comment.entity';
import { Question } from './question.entity';
import { Grade } from './grade.entity';
import { City } from './city.entity';
import { Order } from './order.entity';
import { OrderProduct } from './order-product.entity';
import { PaymentType } from './payment-type.entity';
import { DeliveryType } from './delivery-type.entity';
import { Store } from './store.entity';
import { ProductInStore } from './productInStore.entity';
import { Action } from './action.entity';
import { Permission } from './permission.entity';
import { User } from './user.entity';
import { UserPermission } from './user-permission.entity';
import { Token } from './token.entity';

export const models: Array<any> = [
    CustomerInfo,
    Customer,
    BonusCards,
    Category,
    Characteristic,
    Discount,
    Product,
    Accessories,
    Service,
    ServiceProduct,
    PromoCode,
    Image,
    Comment,
    Question,
    Grade,
    City,
    Order,
    OrderProduct,
    PaymentType,
    DeliveryType,
    Store,
    ProductInStore,
    Action,
    Permission,
    User,
    UserPermission,
    Token
]
