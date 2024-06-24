import mongoose, { Document, Schema, Types } from 'mongoose';
import { IProduct } from './productSchema';

export interface ICartProduct {
  product: Types.ObjectId | IProduct;
  quantity: number;
}

export interface ICart extends Document {
  user_id: string;
  cartitems: ICartProduct[];
}

const cartProductSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const cartSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  cartitems: [cartProductSchema]
});

export default mongoose.model<ICart>('Cart', cartSchema);
