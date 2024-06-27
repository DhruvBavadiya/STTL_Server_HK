import { Request, Response } from "express";
import OrderModel from "../model/orderSchema";
import { orderSchema } from "../utils/zod";
import { z } from "zod";
import reactCart from "../model/reactCart";
import mongoose from "mongoose";

const getAllorderForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(404).json("user not found");
    }

    const orders = await OrderModel.find({ user_id: userId });
    if (!orders) {
      res.status(404).json("order not found for user");
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json("Server error occured");
  }
};

const addOrder = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = orderSchema.parse(req.body);
    console.log("Validated Data:", validatedData);

    const { user_id, total, method } = validatedData;
    let cart_id = await reactCart.findOne({ user_id: user_id });
    // cart_id = cart_id?._id
    if(!cart_id){
        await session.abortTransaction();
      return res.status(500).json({ message: "Failed to create order" });
    }
    cart_id = cart_id._id
    console.log(cart_id)
    const date = new Date();

    const order = await OrderModel.create(
      [
        {
          user_id,
          cart_id,
          total,
          method,
          date,
        },
      ],
      { session: session }
    );

    if (!order) {
      await session.abortTransaction();
      return res.status(500).json({ message: "Failed to create order" });
    }

    const deleteCart = await reactCart
      .deleteOne({ user_id: user_id })
      .session(session);

    if (!deleteCart) {
      await session.abortTransaction();
      return res.status(500).json({ message: "Failed to delete cart" });
    }
    await session.commitTransaction();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    await session.abortTransaction();

    if (error instanceof z.ZodError) {
      console.error("Validation Error:", error.errors);
      res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else {
      console.error("Unknown Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } finally {
    session.endSession();
  }
};

export { getAllorderForUser, addOrder };
