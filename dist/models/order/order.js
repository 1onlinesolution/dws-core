"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.PaymentStatus = exports.OrderStatus = exports.OrderTerm = void 0;
const mongodb_1 = require("mongodb");
const address_1 = require("../address");
const tools_1 = require("../../tools");
var OrderTerm;
(function (OrderTerm) {
    OrderTerm[OrderTerm["Month"] = 1] = "Month";
    OrderTerm[OrderTerm["Year"] = 2] = "Year";
})(OrderTerm = exports.OrderTerm || (exports.OrderTerm = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Open"] = 1] = "Open";
    OrderStatus[OrderStatus["Filled"] = 2] = "Filled";
    OrderStatus[OrderStatus["Canceled"] = 3] = "Canceled";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus[PaymentStatus["Unpaid"] = 0] = "Unpaid";
    PaymentStatus[PaymentStatus["Paid"] = 1] = "Paid";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
class Order {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor({ _id = new mongodb_1.ObjectId(), user_id = new mongodb_1.ObjectId(), customer_name = '', invoice_number = '', address = new address_1.Address(), order_items = [], order_status = OrderStatus.Open, payment_status = PaymentStatus.Unpaid, tax_factor = 0.2, term = OrderTerm.Month, }) {
        this._id = new mongodb_1.ObjectId();
        this.user_id = new mongodb_1.ObjectId();
        this.customer_name = '';
        this.invoice_number = '';
        this.address = new address_1.Address();
        this.order_items = [];
        this.order_status = OrderStatus.Open;
        this.payment_status = PaymentStatus.Unpaid;
        this.tax_factor = 0.2;
        this.term = OrderTerm.Month;
        this.date_filled = tools_1.DateTimeUtils.currentUtcDate();
        this.created_at = this.date_filled;
        this.modified_at = this.created_at;
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
    static get indexMap() {
        const createIndexName = (postfix) => `index_order_${postfix}`;
        const map = new Map();
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
exports.Order = Order;
//# sourceMappingURL=order.js.map