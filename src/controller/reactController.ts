import { Request, Response } from 'express';
import ReactCart, { IReactCart, ICartProduct } from '../model/reactCart';

// Get cart items by user_id
export const getReactCartItems = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const cart = await ReactCart.findOne({ user_id: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart.cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add or replace cart items for user_id
export const addOrUpdateReactCartItems = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { cartItems } = req.body;

  try {
    // Delete existing cart items for the user
    await ReactCart.findOneAndDelete({ user_id: userId });

    // Create a new cart with the updated items
    const newCart: IReactCart = await ReactCart.create({
      user_id: userId,
      cartItems
    });

    res.status(201).json(newCart);
  } catch (error) {
    console.error('Error adding or updating cart items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
