export const DELIVERY_STATUS = {
    // заказ ожидает подтверждения
    PENDING: 'PENDING',

    // собирают всё необходимое к отправлению/выдаче
    PREPARING_FOR_SHIPMENT: 'PREPARING_FOR_SHIPMENT',

    // заказ готов к выдаче
    // только для типа доставки САМОВЫВОЗ
    READY_FOR_DELIVERY: 'READY_FOR_DELIVERY',

    // заказ в дороге
    // только для типа доставки В ОТДЕЛЕНИЕ НП
    IN_TRANSIT: 'IN_TRANSIT',

    // пользователь забрал заказ
    ORDER_RECEIVED: 'ORDER_RECEIVED',

    // пользователь отказался от заказа
    CANCELLATION: 'CANCELLATION',

    // исключение
    EXCEPTION: 'EXCEPTION'
}
