import { Request, Response } from 'express';
import Cart from '../model/cartSchema';
import Product from '../model/productSchema';
import mongoose from 'mongoose';

// Add product to cart
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // Check if the cart exists for the user, or create a new cart
    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      // Create a new cart if one doesn't exist for the user
      cart = new Cart({ user_id: userId, cartitems: [] });
    }

    // Check if the product is already in the cart
    const existingItemIndex = cart.cartitems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      // If the product is already in the cart, update the quantity
      cart.cartitems[existingItemIndex].quantity = quantity;
    } else {
      // Otherwise, add the new product to the cart
      cart.cartitems.push({
        product: new mongoose.Types.ObjectId(productId),
        quantity: quantity
      });
    }

    // Save the updated cart
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get cart items for a specific user
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Find the cart for the specified user
    const cart = await Cart.findOne({ user_id: userId }).populate('cartitems.product');

    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
      return;
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
