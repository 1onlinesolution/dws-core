import { ObjectId } from 'mongodb';
import { Address } from '../address';
import { IMongoIndexType } from '../mongoIndexType';
import { OrderItem } from './orderItem';
export declare enum OrderTerm {
    Month = 1,
    Year = 2
}
export declare enum OrderStatus {
    Open = 1,
    Filled = 2,
    Canceled = 3
}
export declare enum PaymentStatus {
    Unpaid = 0,
    Paid = 1
}
export interface IOrder {
    _id: ObjectId;
    user_id: ObjectId;
    customer_name: string;
    invoice_number: string;
    address: Address;
    order_items: OrderItem[];
    order_status: OrderStatus;
    payment_status: PaymentStatus;
    tax_factor: number;
    term: OrderTerm;
    date_filled: Date;
    created_at: Date;
    modified_at: Date;
}
export declare class Order implements IOrder {
    _id: ObjectId;
    user_id: ObjectId;
    customer_name: string;
    invoice_number: string;
    address: Address;
    order_items: never[];
    order_status: OrderStatus;
    payment_status: PaymentStatus;
    tax_factor: number;
    term: OrderTerm;
    date_filled: Date;
    created_at: Date;
    modified_at: Date;
    constructor({ _id, user_id, customer_name, invoice_number, address, order_items, order_status, payment_status, tax_factor, term, }: {
        _id?: ObjectId | undefined;
        user_id?: ObjectId | undefined;
        customer_name?: string | undefined;
        invoice_number?: string | undefined;
        address?: Address | undefined;
        order_items?: never[] | undefined;
        order_status?: OrderStatus | undefined;
        payment_status?: PaymentStatus | undefined;
        tax_factor?: number | undefined;
        term?: OrderTerm | undefined;
    });
    static get indexMap(): Map<string, IMongoIndexType>;
}
