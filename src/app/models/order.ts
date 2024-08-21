export default class OrderModel {
    orderId?: number;
    lineId?: number;
    dateBackSide: Date = new Date();
    dateAwaySide: Date = new Date();
    numOfChildrenOrders?: number;
    numOfAdoultOrders?: number;
    phone?: string;
}