import { Schema, model, Document } from "mongoose";

export enum PaymentMethod {
  Card = "card",
  Cash = "cash",
}

export interface Order extends Document {
  user_id: Schema.Types.ObjectId;
  cart_id: Schema.Types.ObjectId;
  total: number;
  date: Date;
  method: PaymentMethod;
}

const orderSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cart_id: { type: Schema.Types.ObjectId, ref: "ReactCart", required: true },
  total: { type: Number, required: true },
  date: { type: Date, required: true },
  method: { type: String, enum: PaymentMethod, required: true },
});

const OrderModel = model<Order>("Order", orderSchema);

export default OrderModel;
