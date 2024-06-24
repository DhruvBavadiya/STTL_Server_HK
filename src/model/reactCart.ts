import mongoose, { Document, Schema } from 'mongoose';

export interface ICartProduct {
  imageSrc: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  quantity: number;
  _id: string;
}

export interface IReactCart extends Document {
  user_id: string;
  cartItems: ICartProduct[];
}

const reactCartProductSchema: Schema = new Schema({
  imageSrc: { type: String, required: true },
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  _id: { type: String, required: true }
});

const reactCartSchema: Schema = new Schema({
  user_id: { type: String, required: true, unique: true },
  cartItems: [reactCartProductSchema]
});

export default mongoose.model<IReactCart>('ReactCart', reactCartSchema);
