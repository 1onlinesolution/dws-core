import { ObjectId } from 'mongodb';
import { Address } from '../address';
import { IMongoIndexType } from '../mongoIndexType';
import { OrderItem } from './orderItem';
import DateTimeUtils from '../../tools/dateTimeUtils';

export enum OrderTerm {
  Month = 1,
  Year,
}

export enum OrderStatus {
  Open = 1,
  Filled,
  Canceled,
}

export enum PaymentStatus {
  Unpaid = 0,
  Paid,
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

export class Order implements IOrder {
  _id = new ObjectId();
  user_id = new ObjectId();
  customer_name = '';
  invoice_number = '';
  address = new Address();
  order_items = [];
  order_status = OrderStatus.Open;
  payment_status = PaymentStatus.Unpaid;
  tax_factor = 0.2;
  term = OrderTerm.Month;
  date_filled = DateTimeUtils.currentUtcDate();
  created_at = this.date_filled;
  modified_at = this.created_at;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor({
    _id = new ObjectId(),
    user_id = new ObjectId(),
    customer_name = '',
    invoice_number = '',
    address = new Address(),
    order_items = [],
    order_status = OrderStatus.Open,
    payment_status = PaymentStatus.Unpaid,
    tax_factor = 0.2,
    term = OrderTerm.Month,
  }) {
    this._id = _id;
    this.user_id = user_id;
    this.address = address;
    this.customer_name = customer_name;
    this.invoice_number = invoice_number;
    this.order_items = order_items;
    this.order_status = order_status;
    this.payment_status = payment_status;
    this.tax_factor = tax_factor;
    this.term = term;

    return this;
  }

  static get indexMap(): Map<string, IMongoIndexType> {
    const createIndexName = (postfix: string) => `index_order_${postfix}`;
    const map = new Map<string, IMongoIndexType>();
    map
      .set(createIndexName('user_id'), {
        fieldOrSpec: { user_id: 1 },
        options: {
          name: createIndexName('user_id'),
          background: true,
        },
      })
      .set(createIndexName('invoice_number'), {
        fieldOrSpec: { invoice_number: 1 },
        options: {
          name: createIndexName('invoice_number'),
          background: true,
        },
      })
      .set(createIndexName('order_status'), {
        fieldOrSpec: { order_status: 1 },
        options: {
          name: createIndexName('order_status'),
          background: true,
        },
      })
      .set(createIndexName('payment_status'), {
        fieldOrSpec: { payment_status: 1 },
        options: {
          name: createIndexName('payment_status'),
          background: true,
        },
      })
      .set(createIndexName('created_at'), {
        fieldOrSpec: { created_at: 1 },
        options: {
          name: createIndexName('created_at'),
          background: true,
        },
      })
      .set(createIndexName('modified_at'), {
        fieldOrSpec: { modified_at: 1 },
        options: {
          name: createIndexName('modified_at'),
          background: true,
        },
      });

    return map;
  }
}
