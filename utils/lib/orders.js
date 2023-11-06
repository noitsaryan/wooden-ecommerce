import axios from "axios";

export async function createOrder(
  product_sku,
  quantity,
  price,
  totalPrice,
  payment_id,
  signature,
  user_id,
  email
) {
  try {
    const res = await axios.post("/api/create-order", {
      product_sku,
      quantity,
      price,
      totalPrice,
      payment_id,
      signature,
      user_id,
      email,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}

export async function updateStatus(order_id, stage, message) {
  try {
    const res = await axios.post("/api/update-order-status", {
      order_id,
      stage,
      message,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}

export async function getOrders() {
  try {
    const res = await axios.get("/api/get-orders");
    return res;
  } catch (error) {
    return error.message;
  }
}

export async function getOrdersbyId(email) {
  try {
    const res = await axios.get("/api/get-orders-user", {
      user: email,
      order: true,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}
