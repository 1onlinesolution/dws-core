import { ObjectId } from 'mongodb';
import { Product } from '../product/product';
import DateTimeUtils from '../../tools/dateTimeUtils';

export interface IOrderItem {
  _id: ObjectId;
  product_id: ObjectId;
  order_id: ObjectId;
  product: Product;
  quantity: number;
  created_at: Date;
  modified_at: Date;
}

export class OrderItem implements IOrderItem {
  _id = new ObjectId();
  product_id = new ObjectId();
  order_id = new ObjectId();
  product = new Product();
  quantity = 0;
  created_at = DateTimeUtils.currentUtcDate();
  modified_at = this.created_at;

  constructor({ _id = new ObjectId(), product_id = new ObjectId(), order_id = new ObjectId(), product = new Product(), quantity = 0 } = {}) {
    this._id = _id;
    this.product_id = product_id;
    this.order_id = order_id;
    this.product = product;
    this.quantity = quantity;

    return this;
  }
}
