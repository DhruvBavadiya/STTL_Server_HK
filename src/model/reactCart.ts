import mongoose, { Document, Schema } from 'mongoose';

export interface ICartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  userId:string|null
}

export interface IReactCart extends Document {
  user_id: string;
  cartItems: ICartProduct[];
}

const reactCartProductSchema: Schema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  id: { type: String, required: true },
  userId:{type:String , require:false}
});

const reactCartSchema: Schema = new Schema({
  user_id: { type: String, required: true, unique: true },
  cartItems: [reactCartProductSchema]
});

export default mongoose.model<IReactCart>('ReactCart', reactCartSchema);
