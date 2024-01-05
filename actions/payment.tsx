"use server"

import { Order } from "@/models/order.model";
import { sendMail } from "@/utils/services/mail";

export const createOrder = async ({
    product_sku,
    quantity,
    price,
    totalPrice,
    payment_id,
    signature,
    user_id,
    email
}) => {
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

        console.log(order_lists)

        const check_first_user = await Order.findOne({ user_id }).exec();

        if (check_first_user) {
            check_first_user.order_lists.push(order_lists);
            await check_first_user.save();

            if (!check_first_user) return {
                message: "Order not created",
                success: false,
            };

            await sendMail(
                `New Order`,
                email,
                `Order Details: <br/> SKU: ${product_sku},<br/> Quantity: ${quantity},<br/> Price: ${price},<br/> Total Price: ${totalPrice},<br/> Payment Id: ${payment_id},<br/> Payment Signature: ${signature},<br/> UserId: ${user_id},<br/> Email: ${email} `
            );
            return {
                message: "Order created successfully",
                success: true,
                data: check_first_user,
            };
        } else {
            const order = await Order.create({
                order_lists,
                user_id,
            });

            if (!order)
                return {
                    message: "Order not created",
                    success: false,
                };
            await sendMail(
                `New Order`,
                email,
                `ORder Details: SKU: ${product_sku},<br/> Quantity: ${quantity},<br/> Price: ${price},<br/> Total Price: ${totalPrice},<br/> Payment Id: ${payment_id},<br/> Payment Signature: ${signature},<br/> UserId: ${user_id},<br/> Email: ${email} `
            );
            return {
                message: "Order created successfully",
                success: true,
                data: order,
            };
        }
    } catch (error) {
        return {
            message: error.message,
            success: false
        }
    }
}