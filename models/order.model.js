import mongoose, { Schema, model, models } from "mongoose";
import { NextResponse } from "next/server";
import { updateOrderId } from "./user.model";
import { User } from "./user.model";

const OrderSchema = new Schema(
  {
    order_lists: [
      {
        product_sku: String,
        quantity: Number,
        price: Number,
        totalPrice: Number,
        status: {
          delivered: Boolean,
          state: [
            {
              stage: String,
              message: String,
              completed_stage: Boolean,
            },
          ],
        },
        payments: {
          payment_id: {
            type: String,
            required: true,
          },
          signature: {
            type: String,
            required: true,
          },
        },
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);

// Creating New Order

export const createOrder = async (
  product_sku,
  quantity,
  price,
  totalPrice,
  payment_id,
  signature,
  user_id
) => {
  try {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    const order_lists = {
      product_sku,
      quantity,
      price,
      totalPrice,
      status: {
        delivered: false,
        state: [
          {
            stage: "Order Created",
            message: `Order for SKU: ${product_sku}, is created at ${formattedDate}`,
            completed_stage: true,
          },
        ],
      },
      payments: {
        payment_id,
        signature,
      },
    };

    const check_first_user = await Order.findOne({ user_id }).exec();

    if (check_first_user) {
      check_first_user.order_lists.push(order_lists);
      await check_first_user.save();
      return check_first_user;
    } else {
      const order = await Order.create({
        order_lists,
        user_id,
      });
      await updateOrderId(order._id, user_id);
      return order;
    }
  } catch (error) {
    return error.message;
  }
};

// Get all Orders

export const getAllOrders = async () => {
  const res = await Order.find().exec();
  return res;
};

export const getAllOrdersWithUser = async () => {
  const res = await Order.find().populate("user_id").exec();
  return res;
};

// Update States

export const updateOrderStates = async (order_id, stage, message) => {
  const order = await Order.findOne({ "order_lists._id": order_id }).exec();

  if (!order) {
    return "Order does not exist!";
  }

  const statusUpdate = {
    stage,
    message,
    completed_stage: true,
  };

  const orderObject = order.order_lists.find(e => e._id == order_id)
  const check = orderObject?.status.state.find(e => e.stage == stage)
  if(check) {
    return 'Status already exists!'
  }
  orderObject?.status.state.push(statusUpdate)

  await order.save();

  return orderObject;
};
