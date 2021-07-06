import { ObjectId } from 'mongodb';
import { Product } from '../product/product';
export interface IOrderItem {
    _id: ObjectId;
    product_id: ObjectId;
    order_id: ObjectId;
    product: Product;
    quantity: number;
    created_at: Date;
    modified_at: Date;
}
export declare class OrderItem implements IOrderItem {
    _id: ObjectId;
    product_id: ObjectId;
    order_id: ObjectId;
    product: Product;
    quantity: number;
    created_at: Date;
    modified_at: Date;
    constructor({ _id, product_id, order_id, product, quantity }?: {
        _id?: ObjectId | undefined;
        product_id?: ObjectId | undefined;
        order_id?: ObjectId | undefined;
        product?: Product | undefined;
        quantity?: number | undefined;
    });
}
